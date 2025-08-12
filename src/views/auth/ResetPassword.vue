<template>
  <AuthLayout
    headerTitle="New Password"
    subTitle="Enter and confirm your new password to reset it.">
    <form
      class="space-y-6 mt-[90px]"
      @submit.prevent="onConfirmPassword"
      autocomplete="off">
      <div>
        <div class="flex items-center justify-between mb-1">
          <label
            for="password"
            class="text-[16px] text-gray-900 dark:text-gray-200"
            >Create New Password</label
          >
          <span v-if="errors?.password" class="text-red-400 text-xs">{{
            errors.password
          }}</span>
        </div>

        <div class="password-container" :class="{ invalid: errors?.password }">
          <pr-password
            id="password"
            v-model="password"
            class="w-full"
            placeholder="Enter password"
            :feedback="false"
            toggleMask />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between mb-1">
          <label
            for="password"
            class="text-[16px] text-gray-900 dark:text-gray-200"
            >Confirm Password</label
          >
          <span v-if="errors?.confirmPassword" class="text-red-400 text-xs">{{
            errors.confirmPassword
          }}</span>
        </div>

        <div
          class="password-container"
          :class="{ invalid: errors?.confirmPassword }">
          <pr-password
            id="confirm_password"
            v-model="confirmPassword"
            class="w-full"
            placeholder="Confirm password"
            :feedback="false"
            toggleMask />
        </div>
      </div>

      <div class="submit-btn-container mt-7">
        <pr-button
          class="w-full"
          type="submit"
          :loading="isAwaitingResponse"
          :disabled="errors?.confirmPassword"
          label="Reset Password" />
      </div>
    </form>
    <div class="mt-4 text-center">
      <span class="text-[16px] font-normal">Back to </span>
      <router-link
        :to="{ name: ROUTES.LOGIN.name }"
        class="text-[16px] font-normal text-blue-400 hover:underline"
        >Login</router-link
      >
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
  import { useForm, useField } from "vee-validate";
  import * as yup from "yup";
  import { useToast } from "primevue/usetoast";
  import { useMutation } from "@pinia/colada";
  import { useAuthStore } from "@/store/auth";
  import { PasswordResetConfirm } from "@/types/auth";
  import { ROUTES } from "@/router/routes";
  import { useRoute } from "vue-router";
  import AuthLayout from "./components/AuthLayout.vue";

  const toast = useToast();
  const authStore = useAuthStore();
  const route = useRoute();

  const token = route.params.token as string;

  const { handleSubmit: handleConfirmPassword, errors } = useForm({
    validationSchema: yup.object({
      password: yup
        .string()
        .required("New Password is required")
        .min(8)
        .max(255)
        .label("Password"),
      confirmPassword: yup
        .string()
        .required("Confirm Password")
        .oneOf([yup.ref("password")], "Passwords must match")
        .label("Confirm Password")
    })
  });

  const { value: password } = useField("password");
  const { value: confirmPassword } = useField("confirmPassword");

  // Reset Password Mutation
  const { mutate: confirmPasswordMutate, isLoading: isAwaitingResponse } =
    useMutation({
      mutation: async (credentials: PasswordResetConfirm) => {
        await authStore.confirmPasswordReset(credentials);
        return credentials;
      },
      onError: (error: Error) => {
        toast.add({
          severity: "error",
          summary: "Error",
          detail:
            error.message ||
            "Failed to reset password. The link may be invalid or expired.",
          life: 3000
        });
      },
      onSuccess: () => {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Your password has been reset successfully. Please log in.",
          life: 3000
        });
      }
    });

  // Handlers
  const onConfirmPassword = handleConfirmPassword((values) => {
    confirmPasswordMutate({
      token,
      password: values.password
    });
  });
</script>

<style scoped>
  :deep(.p-password-input) {
    @apply w-full;
  }

  :deep(.password-container.invalid .p-password-input) {
    border: 1px solid red;
  }
</style>
