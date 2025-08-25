<template>
  <div class="p-7 overflow-y-auto flex flex-col gap-6">
    <div>
      <div class="flex-1 flex flex-col flex-wrap">
        <h2 class="text-xl font-semibold mb-3">Profile Management</h2>
        <div
          class="bg-white dark:bg-dark-100 flex-1 px-4 py-3 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
          <p class="font-semibold mb-3">Profile Information</p>
          <form @submit.prevent="submitForm">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-7 py-6">
              <div class="flex flex-col gap-4 flex-1">
                <div>
                  <div class="flex justify-between">
                    <label for="firstName" class="font-medium text-[16px]"
                      >First Name</label
                    >
                    <span v-if="errors?.firstName" class="text-red-500 text-xs">
                      {{ errors.firstName }}
                    </span>
                  </div>
                  <pr-input-text
                    id="firstName"
                    v-model="firstName"
                    class="w-full"
                    autocomplete="off"
                    placeholder="Enter first name" />
                </div>
                <div>
                  <div class="flex justify-between">
                    <label for="email" class="font-medium text-[16px]"
                      >Email</label
                    >
                    <span v-if="errors?.email" class="text-red-500 text-xs">
                      {{ errors.email }}
                    </span>
                  </div>
                  <pr-input-text
                    id="email"
                    v-model="email"
                    class="w-full"
                    autocomplete="off"
                    placeholder="Enter email" />
                </div>
              </div>

              <div class="flex flex-col gap-4 flex-1">
                <div>
                  <div class="flex justify-between">
                    <label for="lastName" class="font-medium text-[16px]"
                      >Other Name</label
                    >
                    <span v-if="errors?.lastName" class="text-red-500 text-xs">
                      {{ errors.lastName }}
                    </span>
                  </div>
                  <pr-input-text
                    id="lastName"
                    v-model="lastName"
                    class="w-full"
                    autocomplete="off"
                    placeholder="Enter other name" />
                </div>
                <div>
                  <div class="flex justify-between">
                    <label for="phoneNumber" class="font-medium text-[16px]"
                      >Phone Number</label
                    >
                    <span
                      v-if="errors?.phoneNumber"
                      class="text-red-500 text-xs">
                      {{ errors.phoneNumber }}
                    </span>
                  </div>
                  <pr-input-text
                    id="phoneNumber"
                    v-model="phoneNumber"
                    class="w-full"
                    autocomplete="off"
                    placeholder="Enter phone number" />
                </div>
              </div>
            </div>
          </form>

          <div class="flex items-center justify-end gap-2 mt-5 mb-3">
            <pr-button label="Reset" class="w-[150px]" @click="resetForm" />
            <pr-button
              label="Update Profile"
              class="w-[150px]"
              :loading="isLoading"
              @click="submitForm" />
          </div>
        </div>
      </div>

      <div class="flex-1 flex items-center gap-7 flex-wrap mt-7">
        <div class="flex-1 w-full">
          <h2 class="text-xl font-semibold mb-3">Security Settings</h2>
          <div
            class="bg-white dark:bg-dark-100 flex-1 px-4 py-3 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
            <div class="flex items-center gap-4 justify-between">
              <p class="text-xl font-semibold">Two-Factor Authentication</p>
              <pr-toggle-switch
                class="w-[50px]"
                v-model="isTwoFactorEnabled"
                :checked="isTwoFactorEnabled"
                @change="toggleTwoFactorAuthentication" />
            </div>
            <p class="text-gray-500 dark:text-gray-200">
              Add an extra layer of security
            </p>

            <form @submit.prevent="changePassword">
              <div class="flex flex-col items-center gap-7 py-3 flex-wrap">
                <div class="w-full">
                  <div class="flex justify-between">
                    <label for="password" class="font-medium text-[16px]"
                      >Password</label
                    >
                    <span v-if="errors?.password" class="text-red-500 text-xs">
                      {{ errors.password }}
                    </span>
                  </div>
                  <pr-input-text
                    id="password"
                    v-model="password"
                    class="w-full"
                    autocomplete="off"
                    placeholder="**********" />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div class="w-full">
                    <div class="flex justify-between">
                      <label for="newPassword" class="font-medium text-[16px]"
                        >New Password</label
                      >
                      <span
                        v-if="errors?.newPassword"
                        class="text-red-500 text-xs">
                        {{ errors.newPassword }}
                      </span>
                    </div>
                    <pr-input-text
                      id="newPassword"
                      v-model="newPassword"
                      class="w-full"
                      autocomplete="off"
                      placeholder="**********" />
                  </div>
                  <div class="w-full">
                    <div class="flex justify-between">
                      <label
                        for="confirmPassword"
                        class="font-medium text-[16px]"
                        >Confirm Password</label
                      >
                      <span
                        v-if="errors?.confirmPassword"
                        class="text-red-500 text-xs">
                        {{ errors.confirmPassword }}
                      </span>
                    </div>
                    <pr-input-text
                      id="confirmPassword"
                      v-model="confirmPassword"
                      class="w-full"
                      autocomplete="off"
                      placeholder="**********" />
                  </div>
                </div>
              </div>
            </form>

            <div class="flex items-center justify-end mt-8">
              <pr-button
                label="Change Password"
                class="w-[170px] mb-4"
                :loading="isLoading"
                @click="changePassword" />
            </div>
          </div>
        </div>
        <div class="flex-1 w-full">
          <h2 class="text-xl font-semibold mb-3">User Role Information</h2>
          <div
            class="bg-white dark:bg-dark-100 flex-1 px-4 py-2 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
            <p class="font-medium text-[16px] pb-3">Current Role</p>
            <pr-select
              v-model="selectedRole"
              :options="['Standard User', 'Admin', 'Super Admin']"
              class="w-[308px] mt-3"
              disabled
              placeholder="Select Role" />

            <p class="font-medium text-[16px] mt-12">Permissions</p>
            <ul
              class="p-4 line list-disc list-inside py-3 pb-12 text-gray-500 dark:text-gray-200 text-lg">
              <li>View energy consumption</li>
              <li>Manage billing and payments</li>
              <li>Share and transfer units</li>
              <li>Contact support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import * as yup from "yup";
  import { onMounted, ref, watch } from "vue";
  import { useToast } from "primevue/usetoast";
  import { useUserStore } from "@/store/user";
  import { useField, useForm } from "vee-validate";
  import { useAuthStore } from "@/store/auth";
  import { useMutation, useQuery, useQueryCache } from "@pinia/colada";
  import { ChangePassword, UpdateUserRequest } from "@/types/auth";

  const userStore = useUserStore();
  const toast = useToast();
  const authStore = useAuthStore();
  const queryCache = useQueryCache();

  const isTwoFactorEnabled = ref(false);
  const isUpdating = ref(false);
  const selectedRole = ref("Standard User");
  const isDark = ref(
    window.matchMedia?.("(prefers-color-scheme: dark)").matches
  );

  const { handleSubmit, errors, resetForm } = useForm({
    validationSchema: yup.object({
      firstName: yup.string().required().label("First Name"),
      email: yup.string().required().label("Email"),
      lastName: yup.string().required().label("Other Name"),
      phoneNumber: yup.string().required().label("Phone Number"),
      password: yup.string().required("Password is required"),
      newpassword: yup
        .string()
        .required("New Password is required")
        .min(6, "New Password must be at least 6 characters")
        .notOneOf(
          [yup.ref("password")],
          "New Password must be different from current password"
        ),
      confirmPassword: yup
        .string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("newpassword")], "Passwords must match")
    })
  });

  const { value: firstName } = useField("firstName");
  const { value: email } = useField("email");
  const { value: lastName } = useField("lastName");
  const { value: phoneNumber } = useField("phoneNumber");
  const { value: password } = useField("password");
  const { value: newPassword } = useField("newPassword");
  const { value: confirmPassword } = useField("confirmPassword");

  const { state, refetch } = useQuery({
    key: ["users"],
    query: () => userStore.fetchUserById(authStore.userId as string)
  });

  const { mutate, isLoading } = useMutation({
    mutation: async (payload: UpdateUserRequest | ChangePassword) => {
      if (!isUpdating.value) {
        return await authStore.changePassword(payload as ChangePassword);
      }
      return await userStore.updateUser(payload as UpdateUserRequest);
    },
    onSuccess: () => {
      queryCache.invalidateQueries({ key: ["users"] });
      toast.add({
        severity: "success",
        summary: "User updated",
        detail: isUpdating.value
          ? "User has been updated successfully"
          : "Password has been changed successfully",
        life: 3000
      });
      isUpdating.value = false;
      refetch();
    },
    onError: () => {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: isUpdating.value
          ? "Failed to update user"
          : "Failed to change password",
        life: 3000
      });
      isUpdating.value = false;
    }
  });

  const submitForm = handleSubmit(async (values) => {
    const userData: UpdateUserRequest = {
      id: authStore.userId as string,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber
    };
    isUpdating.value = true;
    mutate(userData);
  });

  const changePassword = handleSubmit(async (values) => {
    const userData: ChangePassword = {
      oldPassword: values.password,
      newPassword: values.newPassword
    };
    isUpdating.value = false;
    mutate(userData);
  });

  const toggleTwoFactorAuthentication = () => {
    toast.add({
      severity: "info",
      summary: "Two-Factor Authentication",
      detail: isTwoFactorEnabled.value ? "Enabled" : "Disabled",
      life: 3000
    });
  };

  watch(state, (newState) => {
    if (newState.data) {
      const response = newState.data;
      firstName.value = response.firstName || "";
      email.value = response.email || "";
      lastName.value = response.lastName || "";
      phoneNumber.value = response.email || "";
    }
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      isDark.value = e.matches;
    });

  onMounted(() => refetch());
</script>

<style scoped></style>
