<template>
  <div>
    <div class="flex items-center justify-center mt-5 gap-2">
      <icon :icon="logoIcon" />
      <div>
        <p class="text-[23.13px] text-blue-900 dark:text-blue-400 font-bold">
          {{ first }}
        </p>
        <p class="text-[7.71px] text-blue-900 dark:text-blue-400 mt-[-4px]">
          {{ second }}
        </p>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center mb-4 mt-9">
      <div
        class="text-2xl sm:text-3xl md:text-[40px] text-gray-800 dark:text-gray-200 font-semibold">
        {{ headerTitle }}
      </div>
      <p
        class="text-[16px] text-center max-w-[430px] text-gray-600 dark:text-gray-300 mt-3">
        {{ subTitle }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { logoIcon } from "@/components/icon-assets/icons";
  import icon from "@/components/icon-assets/Icon.vue";

  defineProps({
    first: String,
    second: String,
    headerTitle: String,
    subTitle: String
  });
</script>

<style scoped></style>
