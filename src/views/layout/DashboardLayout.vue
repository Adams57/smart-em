<template>
  <div class="h-dvh flex overflow-hidden">
    <div
      class="flex-1 flex flex-col w-[calc(100vw - 80px)] md:w-[calc(100%-300px)]">
      <DashboardTopBar />
      <div class="flex-1 flex">
        <DashboardSidebar />
        <main
          class="flex-1 overflow-y-auto flex flex-col border border-[var(--color-border-300)] bg-[#F6F6F6] dark:bg-dark-200 dark:border-[var(--p-content-border-color)] h-[calc(100vh-80px)] md-[calc(100vh)-120px]">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import DashboardSidebar from "@/views/layout/components/DashboardSidebar.vue";
  import DashboardTopBar from "@/views/layout/components/DashboardTopBar.vue";
</script>
