<template>
  <div v-html="parsedIcon"></div>
</template>

<script lang="ts" setup>
  import { computed } from "vue";
  import { colorIcon } from "./icons";

  const props = defineProps({
    icon: String,
    fillColor: String,
    strokeColor: String
  });

  const parsedIcon = computed(() => {
    return colorIcon(
      props.icon as string,
      props.fillColor as string,
      props.strokeColor as string
    );
  });
</script>

<style lang="postcss" scoped></style>
