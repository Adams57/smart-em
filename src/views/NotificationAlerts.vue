<template>
  <div class="p-7 flex flex-col gap-6">
    <div
      class="bg-white dark:bg-dark-100 flex-1 px-4 py-7 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-lg shadow-sm shadow-[rgba(0, 0, 0, 0.1)]">
      <h2 class="text-xl font-semibold mb-4">Notifications</h2>
      <div
        class="h-[1px] mb-4 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]"></div>
      <div
        class="h-[1px] mb-4 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]"></div>
      <h2 class="text-gray-500 dark:text-gray-300 font-medium">
        Notification Settings
      </h2>

      <div class="mt-7">
        <p class="font-medium text-[16px]">Balance Alerts</p>
        <p
          class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
          Low balance notifications
        </p>
      </div>
      <div>
        <p class="font-medium text-[16px]">Transactional Notifications</p>
        <p
          class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
          Payment confirmations and receipts
        </p>
      </div>
      <div class="mb-7">
        <p class="font-medium text-[16px]">System Announcement</p>
        <p
          class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
          Maintenance and updates
        </p>
      </div>

      <div
        class="h-[1px] mb-4 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]"></div>
      <div
        class="h-[1px] mb-4 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]"></div>
      <h2 class="text-gray-500 dark:text-gray-300 font-medium">
        Recent Notifications
      </h2>

      <div
        class="flex gap-2 mt-7 px-4 py-2 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-[10px]"
        v-for="value in recentNotifications"
        :key="value.subject">
        <v-icon
          :name="value.icon"
          class="w-7 h-7"
          :style="{ color: value.color }" />
        <div>
          <p class="font-medium text-[16px]">{{ value.subject }}</p>
          <p
            class="font-medium text-[16px] mt-[-5px] mb-3 text-[#BCBCBC] dark:text-gray-300">
            {{ value.message }}
          </p>
          <p
            class="font-medium text-[12px] mt-[-5px] mb-1 text-[#BCBCBC] dark:text-gray-300">
            {{ value.time }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { recentNotifications } from "@/components/dummyData";
</script>
