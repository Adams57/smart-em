<template>
  <div class="p-7 flex flex-col gap-6">
    <div class="flex flex-col gap-5">
      <div
        class="bg-white dark:bg-dark-100 flex-1 px-3 py-5 flex flex-col gap-6 flex-wrap border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-[10px]">
        <h2 class="text-xl font-semibold">Remote Electricity Control</h2>
        <div
          class="bg-white dark:bg-dark-100 flex-1 px-4 py-2 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
          <div class="flex items-center mt-2 justify-between">
            <div>
              <p class="font-medium text-[16px]">Main Power Supply</p>
              <p
                class="font-medium text-[16px] mt-[-5px] text-[#BCBCBC] dark:text-gray-300">
                Control main electricity connection
              </p>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium text-[16px] mt-[-5px]">{{
                useMainPowerSupply ? "ON" : "OFF"
              }}</span>
              <pr-toggle-switch v-model="useMainPowerSupply" />
            </div>
          </div>
        </div>
        <div
          class="bg-white dark:bg-dark-100 flex-1 px-4 py-4 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
          <div class="flex items-center mt-2 justify-between">
            <div>
              <p class="font-medium text-[16px]">Unit Consumption</p>
              <p
                class="font-medium text-[16px] mt-[-5px] text-[#BCBCBC] dark:text-gray-300">
                Enable/Disable unit usage
              </p>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium text-[16px] mt-[-5px]">{{
                useUnitConsumption ? "ENABLED" : "DISABLED"
              }}</span>
              <pr-toggle-switch v-model="useUnitConsumption" />
            </div>
          </div>
        </div>
      </div>

      <div
        class="bg-white dark:bg-dark-100 flex-1 px-3 py-5 flex flex-col gap-6 flex-wrap border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-[10px]">
        <h2 class="text-xl font-semibold">Schedule Control</h2>
        <form @submit.prevent="submitForm">
          <div class="flex flex-col gap-4">
            <div>
              <div class="flex justify-between">
                <label for="autoSwitchOffTime" class="font-medium text-[16px]"
                  >Auto Switch Off Time</label
                >
              </div>
              <pr-select
                id="autoSwitchOffTime"
                v-model="autoSwitchOffTime"
                class="w-full"
                disabled
                autocomplete="off"
                placeholder="Select time" />
            </div>
            <div>
              <div class="flex justify-between">
                <label for="autoSwitchOnTime" class="font-medium text-[16px]"
                  >Auto Switch On Time</label
                >
              </div>
              <pr-select
                id="autoSwitchOnTime"
                v-model="autoSwitchOnTime"
                class="w-full"
                disabled
                autocomplete="off"
                placeholder="Select time" />
            </div>
          </div>
        </form>
        <div class="flex items-center justify-end">
          <pr-button
            label="Save Schedule"
            class="w-[200px]"
            @click="submitForm" />
        </div>
      </div>

      <div
        class="bg-white dark:bg-dark-100 flex-1 px-3 py-5 flex flex-col gap-6 flex-wrap border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-[10px]">
        <h2 class="text-xl font-semibold">Emergency Controls</h2>
        <div
          class="bg-white dark:bg-dark-100 flex-1 px-4 py-2 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
          <div>
            <div class="flex items-center gap-2">
              <v-icon name="bi-shield" class="w-7 h-7" />
              <p
                class="font-medium text-[16px] mt-[-5px] text-[#BCBCBC] dark:text-gray-300">
                Emergency controls should only be used in case of electrical
                emergencies or safety concerns.
              </p>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end">
          <pr-button
            label="Save Schedule"
            class="w-[200px] schedule_button"
            @click="submitForm" />
        </div>
      </div>

      <div
        class="bg-white dark:bg-dark-100 flex-1 px-3 py-5 flex flex-col gap-3 flex-wrap border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-[10px]">
        <h2 class="text-xl font-semibold">Control History</h2>
        <div
          class="flex items-center justify-between border-b-1 border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]">
          <p class="font-medium text-[16px]">Prepaid Recharge</p>
          <p
            class="font-medium text-[16px] text-[#BCBCBC] dark:text-gray-300 mb-3">
            Today 7:00 AM
          </p>
        </div>
        <div
          class="flex items-center justify-between border-b-1 border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]">
          <p class="font-medium text-[16px]">Prepaid Recharge</p>
          <p
            class="font-medium text-[16px] text-[#BCBCBC] dark:text-gray-300 mb-3">
            Yesterday, 11:00 PM
          </p>
        </div>
        <div
          class="flex items-center justify-between border-b-1 border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]">
          <p class="font-medium text-[16px]">Prepaid Recharge</p>
          <p
            class="font-medium text-[16px] text-[#BCBCBC] dark:text-gray-300 mb-3">
            Jan 30, 3:00 PM
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const useMainPowerSupply = ref(false);
  const useUnitConsumption = ref(false);
  const isDark = ref(
    window.matchMedia?.("(prefers-color-scheme: dark)").matches
  );

  const autoSwitchOffTime = ref("");
  const autoSwitchOnTime = ref("");

  const submitForm = () => {
    //
  };

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      isDark.value = e.matches;
    });
</script>

<style scoped>
  .schedule_button {
    background-color: #8d2424 !important;
    border-color: #8d2424 !important;
  }
</style>
