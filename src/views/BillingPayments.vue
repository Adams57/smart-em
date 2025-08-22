<template>
  <div
    class="p-6 h-full flex flex-col gap-10 border border-[var(--color-border-300)] bg-[#F6F6F6] dark:bg-dark-200 dark:border-[var(--p-content-border-color)]">
    <div>
      <h2 class="text-xl font-semibold mb-3">Overview</h2>
      <div class="flex flex-wrap gap-9">
        <div
          class="bg-white dark:bg-dark-100 flex-1 px-6 py-3 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
          <header>
            <h3 class="text-lg font-bold">Current balance</h3>
          </header>

          <div class="mt-5">
            <h4 class="text-[#353535] dark:text-gray-200 text-4xl font-bold">
              ₦23,000
            </h4>
            <p class="text-sm mt-1">Prepaid balance</p>
          </div>
        </div>

        <div
          class="bg-white dark:bg-dark-100 flex-1 px-6 py-3 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
          <header>
            <h3 class="text-lg font-bold">Monthly Bill</h3>
          </header>

          <div class="mt-5">
            <h4 class="text-[#353535] dark:text-gray-200 text-4xl font-bold">
              ₦65,000
            </h4>
            <p class="text-sm mt-1">Due in 5 Days</p>
          </div>
        </div>

        <div
          class="bg-white dark:bg-dark-100 flex-1 px-6 py-3 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
          <header>
            <h3 class="text-lg font-bold">Last Payment</h3>
          </header>

          <div class="mt-5">
            <h4 class="text-[#353535] dark:text-gray-200 text-4xl font-bold">
              ₦100,000
            </h4>
            <p class="text-sm mt-1">25 days ago</p>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-semibold mb-3">Prepaid Recharge</h2>
      <div
        class="bg-white dark:bg-dark-100 flex-1 px-4 py-3 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
        <form @submit.prevent="submitForm">
          <div class="flex flex-col items-center gap-4 flex-wrap">
            <div class="w-full">
              <div class="flex justify-between">
                <label for="rechargeAmount" class="font-medium text-[16px]"
                  >Recharge Amount</label
                >
                <span
                  v-if="errors?.rechargeAmount"
                  class="text-red-500 text-xs">
                  {{ errors.rechargeAmount }}
                </span>
              </div>
              <pr-select
                id="rechargeAmount"
                v-model="rechargeAmount"
                :options="['₦5,000', '₦10,000', '₦15,000', 'Custom Amount']"
                class="w-full"
                placeholder="Current amount" />
            </div>

            <div class="w-full">
              <div class="flex justify-between">
                <label for="paymentMethod" class="font-medium text-[16px]"
                  >Payment Method</label
                >
                <span v-if="errors?.paymentMethod" class="text-red-500 text-xs">
                  {{ errors.paymentMethod }}
                </span>
              </div>
              <pr-select
                id="paymentMethod"
                v-model="paymentMethod"
                :options="['Bank transfer', 'USSD']"
                class="w-full"
                placeholder="Select payment method" />
            </div>
          </div>
        </form>

        <div class="flex items-center justify-end mt-8 mb-5">
          <pr-button
            label="Recharge Now"
            class="w-[170px]"
            @click="submitForm" />
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-semibold mb-3">Payment History</h2>
      <div
        class="bg-white dark:bg-dark-100 flex-1 px-4 py-4 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
        <div
          class="flex items-center justify-between border-b-1 border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]">
          <div>
            <p class="font-medium text-[16px]">Prepaid Recharge</p>
            <p
              class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
              August 10, 2015
            </p>
          </div>
          <div>
            <p class="font-medium text-[16px]">₦100,000.00</p>
            <p
              class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
              Completed
            </p>
          </div>
        </div>

        <div
          class="mt-3 mb-10 flex items-center justify-between border-b-1 border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]">
          <div>
            <p class="font-medium text-[16px]">Prepaid Recharge</p>
            <p
              class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
              July 6, 2015
            </p>
          </div>
          <div>
            <p class="font-medium text-[16px]">₦50,000.00</p>
            <p
              class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
              Completed
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import * as yup from "yup";
  import { ref } from "vue";
  import { useField, useForm } from "vee-validate";

  const isDark = ref(
    window.matchMedia?.("(prefers-color-scheme: dark)").matches
  );

  const { handleSubmit, errors, resetForm } = useForm({
    validationSchema: yup.object({
      rechargeAmount: yup.string().required("Recharge amount is required"),
      paymentMethod: yup.string().required("Payment method is required")
    })
  });

  const { value: rechargeAmount } = useField("rechargeAmount");
  const { value: paymentMethod } = useField("paymentMethod");

  const submitForm = handleSubmit(async () => {
    // Handle form submission logic here
    resetForm();
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      isDark.value = e.matches;
    });
</script>

<style scoped>
  :deep(.p-select) {
    background-color: transparent;
    border-radius: 10px;
  }
</style>
