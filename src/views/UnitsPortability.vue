<template>
  <div
    class="p-7 flex flex-col gap-6">
    <div>
      <div class="flex-1 flex flex-col flex-wrap">
        <h2 class="text-xl font-semibold mb-3">Profile Management</h2>
        <div
          class="bg-white dark:bg-dark-100 flex-1 px-4 py-3 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
          <form @submit.prevent="submitForm">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-7 py-2">
              <div class="flex flex-col gap-4 flex-1">
                <h2 class="text-xl font-semibold">Sender's Details</h2>
                <div>
                  <div class="flex justify-between">
                    <label for="fromMeterId" class="font-medium text-[16px]"
                      >From: Meter ID</label
                    >
                    <span
                      v-if="errors?.fromMeterId"
                      class="text-red-500 text-xs">
                      {{ errors.fromMeterId }}
                    </span>
                  </div>
                  <pr-input-text
                    id="fromMeterId"
                    v-model="fromMeterId"
                    class="w-full"
                    autocomplete="off"
                    placeholder="Enter your meter ID" />
                </div>
                <div>
                  <div class="flex justify-between">
                    <label
                      for="sendersElectricityProvider"
                      class="font-medium text-[16px]"
                      >Sender's Electricity Provider</label
                    >
                    <span
                      v-if="errors?.sendersElectricityProvider"
                      class="text-red-500 text-xs">
                      {{ errors.sendersElectricityProvider }}
                    </span>
                  </div>
                  <pr-select
                    id="sendersElectricityProvider"
                    :options="['PHED', 'BEDC']"
                    v-model="sendersElectricityProvider"
                    class="w-full"
                    autocomplete="off"
                    placeholder="Select electricity provider's name" />
                </div>
                <div>
                  <div class="flex justify-between">
                    <label for="numberOfUnits" class="font-medium text-[16px]"
                      >Number of Units</label
                    >
                    <span
                      v-if="errors?.numberOfUnits"
                      class="text-red-500 text-xs">
                      {{ errors.numberOfUnits }}
                    </span>
                  </div>
                  <pr-input-text
                    id="numberOfUnits"
                    v-model="numberOfUnits"
                    class="w-full"
                    autocomplete="off"
                    placeholder="Enter number of units" />
                </div>
              </div>

              <div class="flex flex-col gap-4 flex-1">
                <h2 class="text-xl font-semibold">Receiver's Details</h2>
                <div>
                  <div class="flex justify-between">
                    <label for="toMeterId" class="font-medium text-[16px]"
                      >To: Meter ID</label
                    >
                    <span v-if="errors?.toMeterId" class="text-red-500 text-xs">
                      {{ errors.toMeterId }}
                    </span>
                  </div>
                  <pr-input-text
                    id="toMeterId"
                    v-model="toMeterId"
                    class="w-full"
                    autocomplete="off"
                    placeholder="Enter recipient's meter ID" />
                </div>
                <div>
                  <div class="flex justify-between">
                    <label
                      for="receiversElectricityProvider"
                      class="font-medium text-[16px]"
                      >Receiver's Electricity Provider</label
                    >
                    <span
                      v-if="errors?.receiversElectricityProvider"
                      class="text-red-500 text-xs">
                      {{ errors.receiversElectricityProvider }}
                    </span>
                  </div>
                  <pr-select
                    id="receiversElectricityProvider"
                    :options="['PHED', 'BEDC']"
                    v-model="receiversElectricityProvider"
                    class="w-full"
                    autocomplete="off"
                    placeholder="Select recipient electricity provider" />
                </div>
                <div>
                  <div class="flex justify-between">
                    <label
                      for="authenticationCode"
                      class="font-medium text-[16px]"
                      >Authentication Code</label
                    >
                    <span
                      v-if="errors?.authenticationCode"
                      class="text-red-500 text-xs">
                      {{ errors.authenticationCode }}
                    </span>
                  </div>
                  <pr-input-text
                    id="authenticationCode"
                    v-model="authenticationCode"
                    class="w-full"
                    autocomplete="off"
                    placeholder="Enter authentication code" />
                </div>
              </div>
            </div>
          </form>

          <div class="flex items-center justify-end gap-2 mt-5 mb-3">
            <pr-button label="Reset" class="w-[150px]" @click="resetForm" />
            <pr-button
              label="Update Profile"
              class="w-[150px]"
              @click="submitForm" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2 class="text-xl font-semibold mb-3">Transfer History</h2>
      <div
        class="bg-white dark:bg-dark-100 flex-1 px-4 py-4 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
        <div v-for="value in transferHistory" :key="value.title"
          class="flex items-center mt-2 justify-between border-b-1 border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]">
          <div>
            <p class="font-medium text-[16px]">{{ value.title }}</p>
            <p
              class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
              {{ value.subTitle }}
            </p>
          </div>
          <div>
            <p class="font-medium text-[16px]">{{ value.unit }}</p>
            <p
              class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
              {{ value.amount }}
            </p>
          </div>
          <div>
            <p class="font-medium text-[16px]"
              :style="{ color: value.statusColor }">{{ value.status }}</p>
            <p
              class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import * as yup from "yup";
  import { ref } from "vue";
  import { useField, useForm } from "vee-validate";
  import { transferHistory } from "@/components/dummyData";

  const isDark = ref(
    window.matchMedia?.("(prefers-color-scheme: dark)").matches
  );

  const { handleSubmit, errors, resetForm } = useForm({
    validationSchema: yup.object({
      fromMeterId: yup.string().required().label("From Meter ID"),
      sendersElectricityProvider: yup
        .string()
        .required()
        .label("Sender's Electricity Provider"),
      toMeterId: yup.string().required().label("To Meter ID"),
      receiversElectricityProvider: yup
        .string()
        .required()
        .label("Receiver's Electricity Provider"),
      numberOfUnits: yup.string().required().label("Number of Units"),
      authenticationCode: yup
        .string()
        .required("Authentication Code is required")
    })
  });

  const { value: fromMeterId } = useField("fromMeterId");
  const { value: sendersElectricityProvider } = useField(
    "sendersElectricityProvider"
  );
  const { value: toMeterId } = useField("toMeterId");
  const { value: receiversElectricityProvider } = useField(
    "receiversElectricityProvider"
  );
  const { value: numberOfUnits } = useField("numberOfUnits");
  const { value: authenticationCode } = useField("authenticationCode");

  const submitForm = handleSubmit(async () => {
    //
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      isDark.value = e.matches;
    });
</script>

<style scoped></style>
