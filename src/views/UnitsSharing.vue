<template>
  <div class="py-5 px-7 flex flex-col gap-5">
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-7">
      <div class="flex-1 w-full">
        <h2 class="text-xl font-semibold mb-3">Share Units</h2>
        <div
          class="bg-white dark:bg-dark-100 flex-1 px-4 py-6 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
          <form @submit.prevent="submitForm">
            <div class="flex flex-col items-center gap-5 flex-wrap">
              <div class="w-full">
                <div class="flex justify-between">
                  <label for="recipientMeterId" class="font-medium text-[16px]"
                    >Recipient Meter ID</label
                  >
                  <span
                    v-if="errors?.recipientMeterId"
                    class="text-red-500 text-xs">
                    {{ errors.recipientMeterId }}
                  </span>
                </div>
                <pr-input-text
                  id="recipientMeterId"
                  v-model="recipientMeterId"
                  class="w-full"
                  :disabled="selectedTab == 0"
                  autocomplete="off"
                  placeholder="Enter meter ID" />
              </div>

              <div class="w-full">
                <div class="flex justify-between">
                  <label for="unitsToSend" class="font-medium text-[16px]"
                    >Amount of Units to Send</label
                  >
                  <span v-if="errors?.unitsToSend" class="text-red-500 text-xs">
                    {{ errors.unitsToSend }}
                  </span>
                </div>
                <pr-input-text
                  id="unitsToSend"
                  v-model="unitsToSend"
                  class="w-full"
                  :disabled="selectedTab == 0"
                  autocomplete="off"
                  placeholder="00000 kWh" />
              </div>

              <div class="w-full">
                <div class="flex justify-between">
                  <label for="equivalentsAmount" class="font-medium text-[16px]"
                    >Equivalents Amount</label
                  >
                  <span
                    v-if="errors?.equivalentsAmount"
                    class="text-red-500 text-xs">
                    {{ errors.equivalentsAmount }}
                  </span>
                </div>
                <pr-input-text
                  id="equivalentsAmount"
                  v-model="equivalentsAmount"
                  class="w-full"
                  :disabled="selectedTab == 0"
                  autocomplete="off"
                  placeholder="₦0000.00h" />
              </div>
            </div>
          </form>

          <div class="flex items-center justify-end mt-8">
            <pr-button
              label="Update Profile"
              class="w-[170px]"
              @click="submitForm" />
          </div>
        </div>
      </div>

      <div class="flex-1 w-full" v-if="selectedTab === 0">
        <h2 class="text-xl font-semibold mb-3">
          Security Verification and Configuration
        </h2>
        <div
          class="bg-white dark:bg-dark-100 flex-1 px-4 py-6 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="font-medium text-[16px]">Two-Factor Authentication</p>
              <p
                class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
                Required for all transfers
              </p>
            </div>
            <pr-toggle-switch v-model="enableTwoFactor" />
          </div>

          <div class="flex items-center justify-between gap-3 mt-6">
            <div>
              <p class="font-medium text-[16px]">Transfer Limits</p>
              <p
                class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
                Minimum: 5kWh
              </p>
            </div>
            <pr-input-text
              v-model="transferLimit"
              class="w-[100px]"
              :disabled="!enableTwoFactor"
              placeholder="100 kWh" />
          </div>

          <div class="flex items-center justify-end mt-34.5">
            <pr-button label="Configure" class="w-[170px]" @click="configure" />
          </div>
        </div>
      </div>

      <div class="flex-1 w-full" v-if="selectedTab === 1">
        <h2 class="text-xl font-semibold mb-3">
          Security Verification and Configuration
        </h2>
        <div
          class="bg-white dark:bg-dark-100 flex-1 px-4 py-6 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
          <h2 class="text-4xl font-semibold mb-11">Configure</h2>
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="font-medium text-[16px]">Two-Factor Authentication</p>
              <p
                class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
                Required for all transfers
              </p>
            </div>
            <pr-toggle-switch v-model="enableTwoFactor" />
          </div>

          <div class="flex items-center justify-between gap-3 mt-6">
            <div>
              <p class="font-medium text-[16px]">Transfer Limits</p>
              <p
                class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
                Minimum: 5kWh
              </p>
            </div>
            <pr-input-text
              v-model="transferLimit"
              class="w-[100px]"
              :disabled="!enableTwoFactor"
              placeholder="100 kWh" />
          </div>

          <div class="flex items-center justify-end mt-13.5">
            <pr-button label="Configure" class="w-[170px]" @click="configure" />
          </div>
        </div>
      </div>
    </div>

    <div>
      <pr-tabs v-model:value="selectedTab">
        <pr-tab-list>
          <pr-tab :value="0">Send Units</pr-tab>
          <pr-tab :value="1">Received Units</pr-tab>
        </pr-tab-list>
        <pr-tab-panels>
          <pr-tab-panel :value="0">
            <div class="flex-1 mx-[-18px] mt-[-15px] px-4 py-6 card-color">
              <div
                class="flex items-center justify-between border-b-1 border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]">
                <div>
                  <p class="font-medium text-[16px]">Sent to MTR-78854125</p>
                  <p
                    class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
                    August 10, 2015
                  </p>
                </div>
                <div>
                  <p class="font-medium text-[16px]">50kWh</p>
                  <p
                    class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
                    ₦10,000
                  </p>
                </div>
              </div>

              <div
                class="mt-3 flex items-center justify-between border-b-1 border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]">
                <div>
                  <p class="font-medium text-[16px]">Sent to MKT-45578120</p>
                  <p
                    class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
                    July 6, 2015
                  </p>
                </div>
                <div>
                  <p class="font-medium text-[16px]">65kWh</p>
                  <p
                    class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
                    ₦13,000
                  </p>
                </div>
              </div>

              <div
                class="mt-3 flex items-center justify-between border-b-1 border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]">
                <div>
                  <p class="font-medium text-[16px]">Sent to MKT-45578120</p>
                  <p
                    class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
                    July 6, 2015
                  </p>
                </div>
                <div>
                  <p class="font-medium text-[16px]">10kWh</p>
                  <p
                    class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
                    ₦22,000
                  </p>
                </div>
              </div>

              <div
                class="mt-3 flex items-center justify-between border-b-1 border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]">
                <div>
                  <p class="font-medium text-[16px]">Sent to MKT-45578120</p>
                  <p
                    class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
                    July 6, 2015
                  </p>
                </div>
                <div>
                  <p class="font-medium text-[16px]">30kWh</p>
                  <p
                    class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
                    ₦7,500
                  </p>
                </div>
              </div>
            </div>
          </pr-tab-panel>
          <pr-tab-panel :value="1">
            <div class="flex-1 mx-[-18px] mt-[-15px] px-4 py-6 card-color">
              <div
                class="flex items-center justify-between border-b-1 border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]">
                <div>
                  <p class="font-medium text-[16px]">Sent to MTR-78854125</p>
                  <p
                    class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
                    August 10, 2015
                  </p>
                </div>
                <div>
                  <p class="font-medium text-[16px]">50kWh</p>
                  <p
                    class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
                    ₦10,000
                  </p>
                </div>
              </div>

              <div
                class="mt-3 flex items-center justify-between border-b-1 border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]">
                <div>
                  <p class="font-medium text-[16px]">Sent to MKT-45578120</p>
                  <p
                    class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
                    July 6, 2015
                  </p>
                </div>
                <div>
                  <p class="font-medium text-[16px]">65kWh</p>
                  <p
                    class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
                    ₦13,000
                  </p>
                </div>
              </div>

              <div
                class="mt-3 flex items-center justify-between border-b-1 border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]">
                <div>
                  <p class="font-medium text-[16px]">Sent to MKT-45578120</p>
                  <p
                    class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
                    July 6, 2015
                  </p>
                </div>
                <div>
                  <p class="font-medium text-[16px]">10kWh</p>
                  <p
                    class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
                    ₦22,000
                  </p>
                </div>
              </div>

              <div
                class="mt-3 flex items-center justify-between border-b-1 border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]">
                <div>
                  <p class="font-medium text-[16px]">Sent to MKT-45578120</p>
                  <p
                    class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
                    July 6, 2015
                  </p>
                </div>
                <div>
                  <p class="font-medium text-[16px]">30kWh</p>
                  <p
                    class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
                    ₦7,500
                  </p>
                </div>
              </div>
            </div>
          </pr-tab-panel>
        </pr-tab-panels>
      </pr-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
  import * as yup from "yup";
  import { ref } from "vue";
  import { useField, useForm } from "vee-validate";

  const selectedTab = ref(0);
  const enableTwoFactor = ref(false);
  const isDark = ref(
    window.matchMedia?.("(prefers-color-scheme: dark)").matches
  );

  const { handleSubmit, errors, resetForm } = useForm({
    validationSchema: yup.object({
      recipientMeterId: yup.string().required().label("Recipient Meter ID"),
      unitsToSend: yup
        .number()
        .required()
        .label("Units to Send")
        .min(1, "Units to Send must be at least 1 kWh"),
      equivalentsAmount: yup
        .number()
        .required()
        .label("Equivalents Amount")
        .min(1, "Equivalents Amount must be at least ₦1.00")
    })
  });

  const { value: recipientMeterId } = useField("recipientMeterId");
  const { value: unitsToSend } = useField("unitsToSend");
  const { value: equivalentsAmount } = useField("equivalentsAmount");
  const { value: transferLimit } = useField("transferLimit");

  const submitForm = handleSubmit(async () => {
    // Handle form submission logic here
    resetForm();
  });

  const configure = () => {
    //
  };

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      isDark.value = e.matches;
    });
</script>

<style scoped>
  :deep(.p-tablist-tab-list) {
    background-color: transparent;
  }

  :deep(.p-tab-active) {
    background-color: white;
  }

  :deep(.p-tabpanels) {
    border-radius: 10px;
    border-top-left-radius: 0px;
  }

  @media (prefers-color-scheme: dark) {
    :deep(.p-tab-active) {
      background-color: var(--color-dark-100) /* #2f2f35 */;
    }
    :deep(.p-tablist-tab-list) {
      background-color: transparent;
    }
    .card-color {
      background-color: var(--color-dark-100) /* #2f2f35 */;
    }
  }
</style>
