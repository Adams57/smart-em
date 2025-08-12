<template>
  <AuthLayout headerTitle="Welcome Back" subTitle="">
    <form
      class="space-y-6 mt-10 md:mt-20"
      @submit.prevent="onEmailLoginSubmit"
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
      <div>
        <div class="flex items-center justify-between mb-1">
          <label
            for="password"
            class="text-[16px] text-gray-900 dark:text-gray-200"
            >Password</label
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
        <div class="mt-2 text-right">
          <router-link
            :to="{ name: ROUTES.FORGOT_PASSWORD.name }"
            class="text-[16px] font-normal text-blue-400 hover:underline"
            >Forgot Password?</router-link
          >
        </div>
      </div>

      <div class="submit-btn-container">
        <pr-button
          class="w-full"
          type="submit"
          :loading="isEmailLoginLoading"
          label="Login" />
      </div>
    </form>

    <!-- Divider -->
    <div class="flex items-center my-4">
      <hr class="flex-grow border-t border-gray-300" />
      <span class="px-3 text-gray-500">or</span>
      <hr class="flex-grow border-t border-gray-300" />
    </div>

    <!-- SSO Login Button -->
    <div class="sso-btn-container">
      <pr-button
        class="w-full"
        :loading="isSsoLoginLoading"
        label="Login with Microsoft"
        severity="secondary"
        @click="onSsoLoginSubmit">
        <icon :icon="microsoftIcon" />
        <span class="ml-1">Login with Microsoft</span>
      </pr-button>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
  import { useForm, useField } from "vee-validate";
  import * as yup from "yup";
  import { useToast } from "primevue/usetoast";
  import { useMutation } from "@pinia/colada";
  import { useAuthStore } from "@/store/auth";
  import { msalInstance } from "@/config/msalConfig";
  import { ref } from "vue";
  import { LoginCredentials } from "@/types/auth";
  import { microsoftIcon } from "@/components/icon-assets/icons";
  import { ROUTES } from "@/router/routes";
  import icon from "@/components/icon-assets/Icon.vue";
  import AuthLayout from "./components/AuthLayout.vue";

  const toast = useToast();
  const authStore = useAuthStore();

  const { handleSubmit: handleEmailLoginSubmit, errors } = useForm({
    validationSchema: yup.object({
      email: yup.string().required("Email is required").email().label("Email"),
      password: yup
        .string()
        .required("Password is required")
        .min(8)
        .max(255)
        .label("Password")
    })
  });

  const { value: email } = useField("email");
  const { value: password } = useField("password");

  // Email/Password Login Mutation
  const { mutate: emailLoginMutate, isLoading: isEmailLoginLoading } =
    useMutation({
      mutation: async (credentials: LoginCredentials) => {
        await authStore.login(credentials);
        return credentials;
      },
      onError: (error: Error) => {
        toast.add({
          severity: "error",
          summary: "Login Failed",
          detail:
            error.message ||
            "Incorrect email or password. Please check your credentials or reset your password.",
          life: 3000
        });
      },
      onSuccess: () => {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "You've logged in successfully",
          life: 3000
        });
      }
    });

  const isSsoLoginLoading = ref(false);

  const onSsoLoginSubmit = () => {
    isSsoLoginLoading.value = true;
    msalInstance.loginRedirect({
      scopes: ["openid", "profile", "email"],
      redirectUri: window.location.origin + "/sso-callback",
      prompt: "select_account"
    });
  };

  // Handlers
  const onEmailLoginSubmit = handleEmailLoginSubmit(async (values) => {
    await emailLoginMutate({
      email: values.email,
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
