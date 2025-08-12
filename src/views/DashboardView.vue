<template>
  <div class="p-7 h-full flex flex-col gap-6 border border-[var(--color-border-300)] bg-[#F6F6F6]">
    <div class="flex gap-6">
      <div
        class="bg-white flex-1 px-4 py-3 border border-[var(--color-border-300)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
        <header class="flex items-center justify-between">
          <h3 class="text-lg font-bold">Today's Usage</h3>
          <div class="flex flex-col items-center h-4">
            <v-icon name="bi-lightning-fill" scale="1.2" class="text-amber-400" />
            <small>₦200/unit</small>
          </div>
        </header>

        <div class="mt-5">
          <h4 class="text-amber-400 text-4xl font-bold">5.3kW</h4>
          <div class="mt-1 flex items-center justify-between">
            <p class="text-gray-600">12% of yesterday</p>
            <p class="font-bold">₦4,000</p>
          </div>
        </div>
      </div>

      <div
        class="bg-white flex-1 px-4 py-3 border border-[var(--color-border-300)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
        <header class="flex items-center justify-between">
          <h3 class="text-lg font-bold">Total Usage</h3>
          <div class="flex flex-col items-center h-4">
            <v-icon name="bi-lightning-fill" scale="1.2" class="text-red-700" />
            <small>₦200/unit</small>
          </div>
        </header>

        <div class="mt-5">
          <h4 class="text-red-700 text-4xl font-bold">50.60W</h4>
          <div class="mt-1 flex items-center justify-between">
            <p class="text-gray-600">12% of yesterday</p>
            <p class="font-bold">₦20,000</p>
          </div>
        </div>
      </div>

      <div
        class="bg-white flex-1 px-4 py-3 border border-[var(--color-border-300)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
        <header class="flex items-center justify-between">
          <h3 class="text-lg font-bold">Unit Balance</h3>
          <div class="flex flex-col items-center h-4">
            <v-icon name="bi-lightning-fill" scale="1.2" class="text-green-500" />
            <small>₦200/unit</small>
          </div>
        </header>

        <div class="mt-5">
          <h4 class="text-green-500 text-4xl font-bold">55.3kW</h4>
          <div class="mt-1 flex items-center justify-between">
            <p class="text-gray-600">12% of yesterday</p>
            <p class="font-bold">₦12,000</p>
          </div>
        </div>
      </div>

      <div
        class="bg-white flex-1 px-4 py-3 border border-[var(--color-border-300)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
        <header class="flex items-center justify-between">
          <h3 class="text-lg font-bold">Grid Status</h3>
          <div class="flex flex-col items-center h-4">
            <v-icon name="bi-circle-fill" scale="1.2" class="text-[#0084FF] w-4 h-4" />
            <small></small>
          </div>
        </header>

        <div class="mt-5">
          <h4 class="text-[#0084FF] text-4xl font-bold">Active</h4>
          <div class="mt-1 flex items-center justify-between">
            <p class="text-gray-600">12% of yesterday</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 flex gap-6 flex-wrap">
      <!-- First Column -->
      <div
        class="bg-white flex-1 px-4 py-3 border border-[var(--color-border-300)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
        <h4 class="font-bold">Usage History</h4>
      </div>

      <!-- Second Column -->
      <div class="flex-1 flex flex-col gap-6">
        <div class="flex-1 flex flex-col gap-4">
          <div
            class="bg-white flex-1 px-4 py-3 border border-[var(--color-border-300)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
            <h4 class="font-bold">Consumer Category</h4>
          </div>
          <div
            class="bg-white flex-1 px-4 py-3 border border-[var(--color-border-300)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
            <h4 class="font-bold">
              Electricity Availability Statistics (hrs)
            </h4>
          </div>
        </div>

        <div
          class="bg-white flex-1 px-4 py-3 border border-[var(--color-border-300)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
          <h4 class="font-bold">Notifications & Alerts</h4>
        </div>
      </div>

      <!-- Third Column -->
      <div class="flex-1 flex flex-col gap-4">
        <div
          class="bg-white flex-1 px-4 py-3 border border-[var(--color-border-300)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
          <h4 class="font-bold">Electricity Demand & Supply</h4>
        </div>
        <div class="flex-1 flex flex-col gap-4">          
          <div
            class="bg-white flex-1 px-4 py-3 border border-[var(--color-border-300)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
            <h4 class="font-bold">Complaints & Support</h4>
          </div>
          
          <div class="flex gap-4 max-h-[100px] h-full">
            <div
              class="bg-white flex-1 flex flex-col justify-between px-4 py-3 border border-[var(--color-border-300)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
              <h4 class="font-bold">Total Units Shared</h4>

              <p class="text-4xl font-semibold text-blue-500">253</p>
            </div>
            
            <div
              class="bg-white flex-1 flex flex-col justify-between px-4 py-3 border border-[var(--color-border-300)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
              <h4 class="font-bold">Remote Control</h4>

              <div class="mt-2 flex items-center">
                <span
                  class="mr-2 text-sm font-medium"
                  :class="{ 'text-gray-400': isRemoteOn }"
                  >Off</span
                >
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="isRemoteOn"
                    class="sr-only peer"
                    @change="handleToggle" />
                  <div
                    class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200">
                    <div
                      class="absolute top-0.5 left-[2px] bg-white border border-gray-300 rounded-full h-5 w-5 transition-all duration-200 peer-checked:translate-x-5"
                      :class="{ 'translate-x-5': isRemoteOn }"></div>
                  </div>
                </label>
                <span
                  class="ml-2 text-sm font-medium"
                  :class="{ 'text-gray-400': !isRemoteOn }"
                  >On</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  const isRemoteOn = ref(false);

  const handleToggle = () => {
    console.log("Remote control is now:", isRemoteOn.value ? "ON" : "OFF");
    // Add any additional toggle logic here
  };
</script>

<style scoped></style>
