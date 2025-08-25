<template>
  <div
    class="px-7 py-4 flex flex-col gap-3">
    <div class="grid grid-cols-1 xl:grid-cols-4 gap-7">
      <div class="xl:col-span-2">
        <h2 class="text-xl font-semibold mb-3">Security Settings</h2>
        <div
          class="bg-white dark:bg-dark-100 flex-1 px-4 py-3 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
          <form @submit.prevent="submitForm">
            <div class="flex flex-col items-center gap-4 flex-wrap">
              <div class="w-full">
                <div class="flex justify-between">
                  <label for="meterId" class="font-medium text-[16px]"
                    >Meter ID</label
                  >
                  <span v-if="errors?.meterId" class="text-red-500 text-xs">
                    {{ errors.meterId }}
                  </span>
                </div>
                <pr-input-text
                  id="meterId"
                  v-model="meterId"
                  class="w-full"
                  autocomplete="off"
                  placeholder="Enter meter ID" />
              </div>

              <div class="w-full">
                <div class="flex justify-between">
                  <label for="meterType" class="font-medium text-[16px]"
                    >Meter Type</label
                  >
                  <span v-if="errors?.meterType" class="text-red-500 text-xs">
                    {{ errors.meterType }}
                  </span>
                </div>
                <pr-select
                  id="meterType"
                  v-model="meterType"
                  :options="['Electricity', 'Water', 'Gas']"
                  class="w-full"
                  placeholder="Select meter type" />
              </div>
            </div>
          </form>

          <div class="flex items-center justify-end mt-8">
            <pr-button
              label="Link Meter"
              class="w-[170px]"
              @click="submitForm" />
          </div>
        </div>
      </div>
      <div class="flex-1 w-full">
        <h2 class="text-xl font-semibold mb-3 text-nowrap">
          Real-Time Usage Monitoring
        </h2>
        <div
          class="bg-white dark:bg-dark-100 flex-1 px-4 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)] text-center py-4">
          <p class="font-normal text-sm mt-7">Current Power Draw</p>
          <p class="font-bold text-[#0084FF] text-4xl">24 kWh</p>
          <p class="font-normal text-sm mt-10">Daily Balance</p>
          <p
            class="font-bold text-2xl mb-[1.81em] text-[#555555] dark:text-gray-200">
            26 kWh
          </p>
        </div>
      </div>
      <div class="flex-1 w-full">
        <h2 class="text-xl font-semibold mb-3 text-nowrap">Set Daily Limit</h2>
        <div
          class="bg-white dark:bg-dark-100 flex-1 px-4 py-24.5 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)] text-center">
          <p class="font-bold text-[#555555] dark:text-gray-200 text-4xl">
            24 kWh
          </p>
          <p class="font-normal text-sm">Current Power Draw</p>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-semibold mb-3">Consumption History</h2>
      <div
        class="bg-white dark:bg-dark-100 flex-1 px-4 py-4 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
        <p class="font-normal text-sm mb-2">Consumption History</p>
        <div
          class="flex items-center justify-between border-b-1 border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]">
          <p class="text-lg text-[#555555] dark:text-gray-200">Today</p>
          <p class="text-lg text-[#555555] dark:text-gray-200 mr-5 mb-2">
            24 kWh
          </p>
        </div>
        <div
          class="flex items-center justify-between border-b-1 border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]">
          <p class="text-lg text-[#555555] dark:text-gray-200">Yesterday</p>
          <p class="text-lg text-[#555555] dark:text-gray-200 mr-5 mb-2">
            74 kWh
          </p>
        </div>
        <div
          class="flex items-center justify-between border-b-1 border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]">
          <p class="text-lg text-[#555555] dark:text-gray-200">This Week</p>
          <p class="text-lg text-[#555555] dark:text-gray-200 mr-5 mb-2">
            350 kWh
          </p>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-semibold mb-3">Security Settings</h2>
      <div
        class="bg-white dark:bg-dark-100 flex-1 px-4 py-4 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
        <div
          class="flex items-center justify-between border-b-1 border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]">
          <div>
            <p class="text-lg">High Usage Alert</p>
            <p class="text-sm mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
              Notifies when usage exceeds limit
            </p>
          </div>
          <pr-toggle-switch v-model="isHighUsageEnabled" class="mr-5" />
        </div>
        <div
          class="flex items-center justify-between border-b-1 border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]">
          <div>
            <p class="text-lg">Daily Limit Alert</p>
            <p class="text-sm mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
              Notifies when usage exceeds limit
            </p>
          </div>
          <pr-toggle-switch v-model="isDailyLimitEnabled" class="mr-5" />
        </div>
        <div
          class="flex items-center justify-between border-b-1 border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]">
          <div>
            <p class="text-lg">Weekly Limit Alert</p>
            <p class="text-sm mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
              Notifies when usage exceeds limit
            </p>
          </div>
          <pr-toggle-switch v-model="isWeeklyLimitEnabled" class="mr-5" />
        </div>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-lg">Monthly Limit Alert</p>
            <p class="text-sm mt-[-5px] mb-1 text-[#BCBCBC] dark:text-gray-300">
              Notifies when usage exceeds limit
            </p>
          </div>
          <pr-toggle-switch v-model="isMonthlyLimitEnabled" class="mr-5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import * as yup from "yup";
  import { useField, useForm } from "vee-validate";
  import { ref } from "vue";

  const isHighUsageEnabled = ref(false);
  const isDailyLimitEnabled = ref(false);
  const isWeeklyLimitEnabled = ref(false);
  const isMonthlyLimitEnabled = ref(false);

  const { handleSubmit, errors, resetForm } = useForm({
    validationSchema: yup.object({
      meterId: yup.string().required().label("Meter ID"),
      meterType: yup.string().required().label("Meter Type")
    })
  });

  const { value: meterId } = useField("meterId");
  const { value: meterType } = useField("meterType");

  const submitForm = handleSubmit(async (values) => {
    console.log("Form submitted with values:", values);
    // Here you would typically send the data to your API
    resetForm();
  });
</script>
