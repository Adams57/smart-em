<template>
  <AuthLayout
    headerTitle="Forgot Password"
    subTitle="Enter an email associated with your DIAP account. We will send you an email to reset your password.">
    <form
      class="space-y-6 mt-[90px]"
      @submit.prevent="onResetPassword"
      autocomplete="off">
      <div>
        <div class="flex items-center justify-between mb-1">
          <label
            for="email"
            class="text-[16px] text-gray-900 dark:text-gray-200"
            >Email</label
          >
          <span v-if="errors?.email" class="text-red-500 text-xs">{{
            errors.email
          }}</span>
        </div>
        <pr-input-text
          id="email"
          v-model="email"
          :class="{ '!border-red-400 !border !rounded-sm': errors?.email }"
          class="w-full"
          placeholder="Enter email" />
      </div>

      <div class="submit-btn-container mt-7">
        <pr-button
          class="w-full"
          type="submit"
          :loading="isResetPasswordLoading"
          :disabled="errors?.email"
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
  import { PasswordResetRequest } from "@/types/auth";
  import { ROUTES } from "@/router/routes";
  import AuthLayout from "./components/AuthLayout.vue";

  const toast = useToast();
  const authStore = useAuthStore();

  const { handleSubmit: handleResetPassword, errors } = useForm({
    validationSchema: yup.object({
      email: yup.string().required("Email is required").email().label("Email")
    })
  });

  const { value: email } = useField("email");

  // Reset Password Mutation
  const { mutate: resetPasswordMutate, isLoading: isResetPasswordLoading } =
    useMutation({
      mutation: async (credentials: PasswordResetRequest) => {
        await authStore.requestPasswordReset(credentials);
        return credentials;
      },
      onError: (error: Error) => {
        toast.add({
          severity: "error",
          summary: "Error",
          detail:
            error.message ||
            "Failed to send password reset email. Please try again.",
          life: 3000
        });
      },
      onSuccess: () => {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Password reset email sent successfully. Check your inbox.",
          life: 3000
        });
      }
    });

  // Handlers
  const onResetPassword = handleResetPassword((values) => {
    resetPasswordMutate({
      email: values.email
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
