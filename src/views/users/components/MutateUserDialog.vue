<template>
  <pr-dialog
    :visible="isVisible"
    @after-hide="closeDialog"
    modal
    :header="`${props.mode === 'edit' ? 'Edit' : 'New'} User`"
    :style="{ width: '720px', minHeight: '90vh' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :closable="false"
    :draggable="false"
    :pt="{
      content: 'flex-1 flex! flex-col! overflow-hidden!'
    }">
    <template #header>
      <div class="w-full flex justify-between items-center">
        <div class="flex items-center gap-2">
          <Icon
            :icon="userIcon"
            :fillColor="iconFillColor"
            :strokeColor="iconStrokeColor" />
          <h1 class="text-2xl font-bold text-center">
            {{ props.mode === "edit" ? "Edit" : "Add" }} User
          </h1>
        </div>

        <pr-button
          severity="secondary"
          rounded
          variant="outlined"
          aria-label="Close user dialog"
          class="w-10 h-10"
          @click="closeDialog">
          <v-icon scale="1.2" name="io-close" />
        </pr-button>
      </div>
    </template>

    <div class="px-15 !flex-1 !flex !flex-col">
      <label class="text-2xl mb-5 border-b-1 border-blue-400"
        >Bio Information</label
      >
      <form
        @submit="onBioInfoSubmit"
        class="flex-1 flex flex-col overflow-y-auto h-[calc(60vh)]">
        <div class="flex justify-center mt-3 mb-5">
          <image-upload />
        </div>

        <div class="justify-between gap-2 lg:gap-4 flex mb-4">
          <div class="flex flex-col w-full gap-1">
            <div class="flex justify-between items-center">
              <label for="name" class="font-semibold">First Name</label>
              <small class="text-red-500">{{ name.errorMessage.value }}</small>
            </div>
            <pr-input-text
              id="name"
              v-model="name.value.value"
              autocomplete="off"
              placeholder="Enter first name" />
          </div>
          <div class="flex flex-col w-full gap-1">
            <div class="flex justify-between items-center">
              <label for="lastName" class="font-semibold">Last Name</label>
              <small class="text-red-500">{{
                lastName.errorMessage.value
              }}</small>
            </div>
            <pr-input-text
              id="lastName"
              v-model="lastName.value.value"
              autocomplete="off"
              placeholder="Enter last name" />
          </div>
        </div>

        <div class="flex flex-col w-full gap-1 mb-4">
          <div class="flex justify-between items-center">
            <label for="email" class="font-semibold">Email Address</label>
            <small class="text-red-500">{{ email.errorMessage.value }}</small>
          </div>
          <pr-input-text
            type="email"
            id="email"
            v-model="email.value.value"
            autocomplete="off"
            placeholder="Enter email address" />
        </div>

        <div class="flex-1">
          <div class="flex flex-col gap-1 mb-4">
            <div class="flex justify-between items-center">
              <label for="jobTitle" class="font-semibold"
                >Job Title/Position</label
              >
              <small class="text-red-500">{{
                jobTitle.errorMessage.value
              }}</small>
            </div>
            <pr-input-text
              id="jobTitle"
              v-model="jobTitle.value.value"
              autocomplete="off"
              placeholder="Enter Job title/Position" />
          </div>
        </div>
      </form>
      <!-- <pr-tabs v-model:value="selectedTab" class="flex-1 flex flex-col">
        <pr-tab-list>
          <pr-tab value="bio-information">Bio Information</pr-tab>
        </pr-tab-list>
        <pr-tab-panels
          :pt="{
            root: '!p-0 !pt-4 flex-1 flex flex-col'
          }">
          <pr-tab-panel value="bio-information">
            <form
              @submit="onBioInfoSubmit"
              class="flex-1 flex flex-col overflow-y-auto h-[calc(60vh)]">
              <div class="flex justify-center mt-3 mb-5">
                <image-upload />
              </div>

              <div class="justify-between gap-2 lg:gap-4 flex mb-4">
                <div class="flex flex-col w-full gap-1">
                  <div class="flex justify-between items-center">
                    <label for="name" class="font-semibold">First Name</label>
                    <small class="text-red-500">{{
                      name.errorMessage.value
                    }}</small>
                  </div>
                  <pr-input-text
                    id="name"
                    v-model="name.value.value"
                    autocomplete="off"
                    placeholder="Enter first name" />
                </div>
                <div class="flex flex-col w-full gap-1">
                  <div class="flex justify-between items-center">
                    <label for="lastName" class="font-semibold"
                      >Last Name</label
                    >
                    <small class="text-red-500">{{
                      lastName.errorMessage.value
                    }}</small>
                  </div>
                  <pr-input-text
                    id="lastName"
                    v-model="lastName.value.value"
                    autocomplete="off"
                    placeholder="Enter last name" />
                </div>
              </div>

              <div class="flex flex-col w-full gap-1 mb-4">
                <div class="flex justify-between items-center">
                  <label for="email" class="font-semibold">Email Address</label>
                  <small class="text-red-500">{{
                    email.errorMessage.value
                  }}</small>
                </div>
                <pr-input-text
                  type="email"
                  id="email"
                  v-model="email.value.value"
                  autocomplete="off"
                  placeholder="Enter email address" />
              </div>

              <div class="flex-1">
                <div class="flex flex-col gap-1 mb-4">
                  <div class="flex justify-between items-center">
                    <label for="jobTitle" class="font-semibold"
                      >Job Title/Position</label
                    >
                    <small class="text-red-500">{{
                      jobTitle.errorMessage.value
                    }}</small>
                  </div>
                  <pr-input-text
                    id="jobTitle"
                    v-model="jobTitle.value.value"
                    autocomplete="off"
                    placeholder="Enter Job title/Position" />
                </div>
              </div>
            </form>
          </pr-tab-panel>
        </pr-tab-panels>
      </pr-tabs> -->
    </div>

    <template #footer>
      <div class="flex justify-end gap-2 px-15 mt-4">
        <pr-button
          type="button"
          label="Cancel"
          variant="outlined"
          class="w-[90px]"
          @click="closeDialog" />

        <pr-button
          :label="props.mode === 'edit' ? 'Update' : 'Save'"
          @click="selectedTab === 'bio-information' ? onBioInfoSubmit : null"
          class="w-[90px]"
          :loading="isLoading"
          :disabled="isLoading" />
      </div>
    </template>
  </pr-dialog>
</template>

<script lang="ts" setup>
  import { ref, toRef, computed, watch } from "vue";
  import { useForm, useField } from "vee-validate";
  import * as yup from "yup";
  import { userIcon } from "@/components/icon-assets/icons";
  import { useToast } from "primevue/usetoast";
  import { useMutation, useQueryCache } from "@pinia/colada";
  import { useUserStore } from "@/store/user";
  import type {
    CreateUserRequest,
    UpdateUserRequest,
    User
  } from "@/types/auth";

  const toast = useToast();
  const props = defineProps<{
    visible: boolean;
    mode: "add" | "edit";
    user: User | null;
  }>();
  const isVisible = toRef(props, "visible");

  const emit = defineEmits(["close-modal", "user-created"]);

  const validationSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    department: yup.string().required("Department is required"),
    operationUnit: yup.object().required("Operation unit is required"),
    jobTitle: yup.string().required("Job title is required"),
    sequence: yup.array()
  });

  const queryCache = useQueryCache();
  const usersStore = useUserStore();
  const { handleSubmit, resetForm, setValues } = useForm({
    validationSchema,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      department: null as string | null,
      jobTitle: "",
      password: "",
      accountType: "SuperAdmin"
    }
  });

  const name = useField("firstName");
  const lastName = useField("lastName");
  const email = useField("email");
  const jobTitle = useField("jobTitle");
  const selectedTab = ref("bio-information");
  const fileInput = ref<HTMLInputElement | null>(null);
  const selectedUserImage = ref<string | null>(null);
  const isDark = ref(
    window.matchMedia?.("(prefers-color-scheme: dark)").matches
  );

  const iconFillColor = computed(() => (isDark.value ? "#2f2f35" : "none"));
  const iconStrokeColor = computed(() => (isDark.value ? "#fff" : "#4b4c4f"));

  const { mutate, isLoading } = useMutation({
    mutation: (payload: CreateUserRequest | UpdateUserRequest) => {
      if (props.mode === "edit") {
        return usersStore.updateUser(payload as UpdateUserRequest);
      }
      return usersStore.createNewUser(payload as CreateUserRequest);
    },
    onSuccess: () => {
      queryCache.invalidateQueries({ key: ["users"] });
      closeDialog();
      toast.add({
        severity: "success",
        summary: `User ${props.mode === "edit" ? "updated" : "created"}`,
        detail: `User has been ${
          props.mode === "edit" ? "updated" : "created"
        } successfully`,
        life: 3000
      });
    },
    onError: () => {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: `Failed to ${props.mode === "edit" ? "update" : "create"} user`,
        life: 3000
      });
    }
  });

  const onBioInfoSubmit = handleSubmit(async (values) => {
    const userData = {
      ...values,
      id: props.mode === "edit" ? props.user?.id : ""
    };
    mutate(userData);
  });

  const closeDialog = (): void => {
    resetForm();
    selectedUserImage.value = null;
    if (fileInput.value) {
      fileInput.value.value = "";
    }
    emit("close-modal");
  };

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      isDark.value = e.matches;
    });

  watch(
    () => props.user,
    (state) => {
      if (state && props.mode === "edit") {
        setValues({
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          department: state.departmentName || "",
          jobTitle: ""
        });
      } else {
        resetForm();
      }
    },
    { immediate: true }
  );
</script>

<style scoped></style>
