<template>
  <div class="h-dvh flex">
    <div
      class="flex-1 flex flex-col w-[calc(100vw - 80px)] md:w-[calc(100%-300px)]">
      <DashboardTopBar />
      <div class="flex-1 flex">
        <DashboardSidebar />
        <main class="flex-1 overflow-y-auto flex flex-col">
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
