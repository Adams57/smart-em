<template>
  <div class="p-7 h-full flex flex-col gap-6 border border-[var(--color-border-300)] bg-[#F6F6F6] dark:bg-dark-200 dark:border-[var(--p-content-border-color)]">
    <div class="flex flex-wrap gap-6">
      <div
        class="bg-white dark:bg-dark-100 flex-1 px-4 py-3 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
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
            <p class="text-gray-600 dark:text-gray-200">12% of yesterday</p>
            <p class="font-bold">₦4,000</p>
          </div>
        </div>
      </div>

      <div
        class="bg-white dark:bg-dark-100 flex-1 px-4 py-3 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
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
            <p class="text-gray-600 dark:text-gray-200">12% of yesterday</p>
            <p class="font-bold">₦20,000</p>
          </div>
        </div>
      </div>

      <div
        class="bg-white dark:bg-dark-100 flex-1 px-4 py-3 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
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
            <p class="text-gray-600 dark:text-gray-200">12% of yesterday</p>
            <p class="font-bold">₦12,000</p>
          </div>
        </div>
      </div>

      <div
        class="bg-white dark:bg-dark-100 flex-1 px-4 py-3 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
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
            <p class="text-gray-600 dark:text-gray-200">12% of yesterday</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 flex gap-6 flex-wrap">
      <!-- First Column -->
      <div
        class="bg-white dark:bg-dark-100 
          py-3 border w-full 2xl:w-[400px]
          border-[var(--color-border-300)] 
          dark:border-[var(--p-content-border-color)] 
          rounded-lg shadow-sm 
          shadow-[rgba(0, 0, 0, 0.1)]">
        <h4 class="font-bold border-b-1 border-gray-200 dark:border-[var(--p-content-border-color)] px-4 pb-3">Usage History</h4>
        <div class="flex justify-between items-center border-b-1 border-gray-200 dark:border-[var(--p-content-border-color)] pb-3">
          <div class="flex flex-col items-center py-2 px-4">
            <p>Period</p>
            <pr-select
              class="rounded-[20px] w-[120px]"
              size="small"
              :options="['Daily', 'Weekly', 'Last 30 Days']"
              v-model="selectedPeriod"/>
          </div>
          <div class="flex flex-col items-center py-2 px-4">
            <p>Total</p>
            <p
              class="p-1 border-1 text-center
                border-[var(--color-border-300)] 
                dark:border-[var(--p-content-border-color)] 
                rounded-2xl w-[120px]"
              size="small">
              60kW
            </p>
          </div>
        </div>

        <div class="h-[490px] pt-2 overflow-y-auto">
          <div v-for="(value, index) in USAGE_HISTORY" 
            :key="index" 
            class="flex flex-1 items-center 
              justify-between px-4 py-2">
            <div>{{ value.period }}</div>
            <div class="flex items-center justify-end gap-1 pr-3">
              {{ value.total }}
              <v-icon v-if="index < 1"
                name="bi-circle-fill" 
                scale="1.2" 
                class="text-dark-100 dark:text-gray-200 w-2 h-2" />
              <span class="w-2 h-2" v-else></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Second Column -->
      <div class="flex-1 flex flex-col gap-6">
        <div class="flex-1 flex flex-col gap-4">
          <div
            class="bg-white dark:bg-dark-100 flex-1 px-4 py-2 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
            <h4 class="font-bold">Consumer Category</h4>
            <div class="flex justify-between gap-2 items-center mt-2">
              <div class="flex flex-col items-center">
                <p class="text-sm">Band</p>
                <p class="text-[#0084FF] 
                  pb-2 px-4 border-1 
                  border-gray-200 rounded-[10px]
                  dark:border-[var(--p-content-border-color)] 
                  text-[41px] font-semibold">A</p>
              </div>

              <div class="flex flex-col">
                <p class="text-sm whitespace-nowrap">Expected Daily Supply (hrs)</p>
                <p class="px-3 border-1 
                  border-gray-200 rounded-[10px]
                  dark:border-[var(--p-content-border-color)]">24</p>
                <p class="text-sm whitespace-nowrap">Actual Supply (hrs)</p>
                <p class="px-3 border-1 
                  border-gray-200 rounded-[10px]
                  dark:border-[var(--p-content-border-color)]">10</p>
              </div>

              <div class="flex flex-col">
                <p class="text-sm whitespace-nowrap">Power Deficit (hrs)</p>
                <p class="py-[19px] px-3 rounded-[10px]
                  border-1 border-gray-200 
                  dark:border-[var(--p-content-border-color)] 
                  text-2xl font-semibold">14</p>
              </div>
            </div>
          </div>
          <div
            class="bg-white dark:bg-dark-100 flex-1 px-4 py-2 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
            <div class="flex justify-between">
              <h4 class="font-bold">Electricity Availability Statistics (hrs)</h4>
              <p class="text-[#0084FF] 
                px-4 border-1 
                border-gray-200 rounded-[10px]
                dark:border-[var(--p-content-border-color)] 
                text-[22px] font-bold">467</p>
            </div>
            <div>
              <div class="flex items-end justify-between gap-2 mt-6 h-[120px]">
                <div class="flex flex-col items-center">
                  <div class="rounded-full bg-purple-300 w-10 h-[52px] flex items-center justify-center text-lg font-bold shadow">52</div>
                  <span class="text-xs mt-1">Week 1</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="rounded-full bg-green-300 w-10 h-[70px] flex items-center justify-center text-lg font-bold shadow">80</div>
                  <span class="text-xs mt-1">Week 2</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="rounded-full bg-blue-300 w-10 h-[80px] flex items-center justify-center text-lg font-bold shadow">90</div>
                  <span class="text-xs mt-1">Week 3</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="rounded-full bg-red-300 w-10 h-[110px] flex items-center justify-center text-lg font-bold shadow">120</div>
                  <span class="text-xs mt-1">Week 4</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="rounded-full bg-blue-200 w-10 h-[90px] flex items-center justify-center text-lg font-bold shadow">100</div>
                  <span class="text-xs mt-1">Week 5</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="rounded-full bg-orange-200 w-10 h-[60px] flex items-center justify-center text-lg font-bold shadow">70</div>
                  <span class="text-xs mt-1">Week 6</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="rounded-full bg-green-400 w-10 h-[65px] flex items-center justify-center text-lg font-bold shadow">75</div>
                  <span class="text-xs mt-1">Week 7</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-white dark:bg-dark-100 flex-1 px-4 py-2 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
          <h4 class="font-bold">Notifications & Alerts</h4>
          <div v-for="(value, index) in NOTIFICATIONS_ALERTS" 
            :key="index"
            class="mt-2">
            <div class="flex justify-between items-center gap-2
              p-1 px-3 border-1 
              border-gray-200 rounded-[10px]
              dark:border-[var(--p-content-border-color)]">
              <div>{{ value.title }}</div>
              <div class="flex
                items-center 
                justify-end w-[120px] gap-1">
                {{ value.time }}
                <v-icon v-if="index < 2"
                  name="bi-circle-fill" 
                  scale="1.2" 
                  class="text-[#0084FF] w-2 h-2" />
                <span class="w-2 h-2" v-else></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Third Column -->
      <div class="flex-1 flex flex-col gap-4">
        <div
          class="bg-white dark:bg-dark-100 flex-1 px-4 py-3 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
          <h4 class="font-bold mb-2">Electricity Demand & Supply</h4>
          <Chart type="line" :data="demandSupplyData" :options="demandSupplyOptions(chartColor)" style="height: 260px;" />
        </div>
        <div class="flex-1 flex flex-col gap-4">          
          <div
            class="bg-white dark:bg-dark-100 flex-1 px-4 py-3 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
            <h4 class="font-bold">Complaints & Support</h4>
            <div v-for="(value, index) in COMPLAINTS_SUPPORT" 
              :key="index"
              class="mt-2">
              <div class="flex justify-between items-center gap-2
                p-1 px-3 border-1 
                border-gray-200 rounded-[10px]
                dark:border-[var(--p-content-border-color)]">
                <div>{{ value.title }}</div>
                <div class="flex
                  items-center 
                  justify-end w-[120px] gap-1">
                  {{ value.time }}
                  <v-icon
                    name="bi-circle-fill" 
                    scale="1.2" 
                    class="text-red-700 w-2 h-2" />
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex gap-4 max-h-[100px] h-full">
            <div
              class="bg-white dark:bg-dark-100 flex-1 flex flex-col justify-between px-4 py-3 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
              <h4 class="font-bold">Total Units Shared</h4>

              <p class="text-4xl font-semibold text-blue-500">253</p>
            </div>
            
            <div
              class="bg-white dark:bg-dark-100 flex-1 flex flex-col justify-between px-4 py-3 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
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
import { COMPLAINTS_SUPPORT, demandSupplyData, demandSupplyOptions, NOTIFICATIONS_ALERTS, USAGE_HISTORY } from "@/components/dummyData";
import { computed, ref } from "vue";
import Chart from 'primevue/chart';

  const isRemoteOn = ref(false);
  const selectedPeriod = ref("Daily");
  const isDark = ref(
    window.matchMedia?.("(prefers-color-scheme: dark)").matches
  );

  const chartColor = computed(() => (isDark.value ? "white" : "#333"));

  const handleToggle = () => {
    console.log("Remote control is now:", isRemoteOn.value ? "ON" : "OFF");
    // Add any additional toggle logic here
  };

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      isDark.value = e.matches;
    });
</script>

<style scoped>
  :deep(.p-select) {
    background-color: transparent;
    border-radius: 20px;
  }
</style>
