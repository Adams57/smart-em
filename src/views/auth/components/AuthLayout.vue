<template>
  <div class="grid h-dvh place-items-center px-4 py-4">
    <pr-card
      class="card max-w-[635px] pb-8 h-full md:max-h-[761px] w-full px-2 md:px-10">
      <template #content>
        <auth-header
          first="SmartEM"
          second="Drilling & Intervention Activities Planner"
          :headerTitle="props.headerTitle"
          :subTitle="props.subTitle" />
        <div class="mt-10 md:mt-20">
          <slot />
        </div>
      </template>
    </pr-card>
  </div>
</template>

<script lang="ts" setup>
  import AuthHeader from "./AuthHeader.vue";

  interface AuthHeaderProps {
    headerTitle: string;
    subTitle: string;
  }

  const props = defineProps<AuthHeaderProps>();
</script>

<style scoped>
  .grid {
    background-image: url("@/assets/auth-bg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #f0f0f0; /* Fallback color */
  }
  .card {
    z-index: 20;
  }
</style>
