<template>
  <div class="grid h-dvh place-items-center">
    <pr-card class="card max-w-[400px] w-full">
      <template #content>
        <div class="text-center">
          <pr-progress-spinner v-if="isLoading" />
          <p v-else-if="error" class="text-red-500">{{ error }}</p>
          <p v-else>
            Processing SSO login<span class="dot-animation">...</span>
          </p>
        </div>
      </template>
    </pr-card>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useToast } from "primevue/usetoast";
  import { ROUTES } from "@/router/routes";
  import { msalInstance } from "@/config/msalConfig";
  import { useAuthStore } from "@/store/auth";
  import { AuthError, AuthResponse } from "msal";

  const router = useRouter();
  const toast = useToast();
  const authStore = useAuthStore();
  const isLoading = ref(true);
  const error = ref<string | null>(null);
  const authResponse = ref<AuthResponse | null>(null);

  onMounted(async () => {
    try {
      msalInstance.handleRedirectCallback(
        (response: AuthResponse) => {
          authResponse.value = response;
        },
        (error: AuthError) => {
          toast.add({
            severity: "error",
            summary: "Error",
            detail:
              error.errorMessage ||
              error.errorCode ||
              error.message === "user_cancelled"
                ? "SSO login was cancelled. Please try again."
                : "An error occurred during Microsoft account login. Try again.",
            life: 3000
          });
        }
      );
      await authStore.ssoLogin(
        authResponse.value?.idToken.rawIdToken as string
      );
    } catch (err: unknown) {
      error.value =
        (err as AuthError).message ||
        "An error occurred during Microsoft account login. Try again.";
      toast.add({
        severity: "error",
        summary: "Error",
        detail: error.value,
        life: 3000
      });
      router.push({ name: ROUTES.LOGIN.name });
    } finally {
      isLoading.value = false;
    }
  });
</script>

<style scoped>
  :deep(.p-progress-spinner) {
    width: 50px;
    height: 50px;
  }

  @keyframes dots {
    0% {
      content: ".";
    }
    33% {
      content: "..";
    }
    66% {
      content: "...";
    }
  }

  .dot-animation::after {
    display: inline-block;
    text-align: left;
    animation: ellipsis 1.2s infinite steps(3, end);
    content: "...";
    overflow: hidden;
    vertical-align: bottom;
    width: 1.5em;
  }

  @keyframes ellipsis {
    0% {
      content: ".";
    }
    33% {
      content: "..";
    }
    66% {
      content: "...";
    }
    100% {
      content: "";
    }
  }
</style>
