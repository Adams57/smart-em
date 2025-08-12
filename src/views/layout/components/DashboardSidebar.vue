<template>
  <div
    class="flex flex-col transition-all duration-300 ease-in-out border border-[var(--color-border-300)]"
    :class="isCollapsed ? 'w-[107px]' : 'w-[260px]'">
    <header class="section-header mt-2 relative flex gap-2 items-center">
      <button
        @click="toggleSidebar"
        class="cursor-pointer absolute -right-4 top-[-20px] bottom-0 translate-y-4 w-5 h-8 grid place-items-center rounded-xs bg-[#0084FF] text-white">
        <v-icon
          :name="isCollapsed ? 'bi-arrow-bar-right' : 'bi-arrow-bar-left'"
          scale="1.2" />
      </button>
    </header>

    <nav class="flex-1 overflow-y-auto">
      <ul class="section space-y-4 mt-2">
        <dashboard-link
          title="Dashboard"
          icon="fa-qrcode"
          :collapsed="isCollapsed"
          :route="ROUTES.DASHBOARD.path" />
        <dashboard-link
          title="User Account"
          icon="fa-qrcode"
          :collapsed="isCollapsed"
          :route="'/home'" />
        <dashboard-link
          title="Meter & Consumption"
          icon="fa-qrcode"
          :collapsed="isCollapsed"
          :route="'/home'" />
        <dashboard-link
          title="Billing & Payments"
          icon="fa-qrcode"
          :collapsed="isCollapsed"
          :route="'/home'" />
        <dashboard-link
          title="Complaints & Support"
          icon="fa-qrcode"
          :collapsed="isCollapsed"
          :route="'/home'" />
        <dashboard-link
          title="Units Sharing"
          icon="fa-qrcode"
          :collapsed="isCollapsed"
          :route="'/home'" />
        <dashboard-link
          title="Unit Portability"
          icon="fa-qrcode"
          :collapsed="isCollapsed"
          :route="'/home'" />
        <dashboard-link
          title="Notification & Alerts"
          icon="fa-qrcode"
          :collapsed="isCollapsed"
          :route="'/home'" />
        <dashboard-link
          title="Remote Control"
          icon="fa-qrcode"
          :collapsed="isCollapsed"
          :route="'/home'" />
        <dashboard-link
          title="User Simulator"
          icon="fa-qrcode"
          :collapsed="isCollapsed"
          :route="'/home'" />
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from "vue";
  import DashboardLink from "@/views/layout/components/DashboardLink.vue";
  import { ROUTES } from "@/router/routes";

  const isCollapsed = ref(false);

  const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
  };

  const checkScreenSize = () => {
    isCollapsed.value = window.innerWidth < 768;
  };

  onMounted(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", checkScreenSize);
  });
</script>

<style scoped>
  /* .section-header {
    margin-inline: 1.5rem;
    padding-block: 1rem;
  } */
  .section-header.no-border {
    border-bottom-width: 0;
  }

  .section {
    margin-inline: 1.5rem;
    padding-block: 0.5rem;
  }
  .section.no-border {
    border-bottom-width: 0;
  }
</style>
