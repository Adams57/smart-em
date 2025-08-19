<template>
  <div class="h-full flex flex-col justify-center items-center">
    <img src="../assets/empty.svg" class="max-w-80 lg:max-w-100" />
    <p class="text-center lg:text-lg">
      There are no
      {{
        `${props.listType}(${props.pluralSuffix ? props.pluralSuffix : "s"})`
      }}
      in the database.<br />
      You can click the <b>Add</b> or <b>Import</b>
      {{
        `${props.listType}(${props.pluralSuffix ? props.pluralSuffix : "s"})`
      }}
      button to get started
    </p>
  </div>
</template>

<script lang="ts" setup>
  interface Props {
    listType: string;
    pluralSuffix?: string;
  }

  const props = defineProps<Props>();
</script>
