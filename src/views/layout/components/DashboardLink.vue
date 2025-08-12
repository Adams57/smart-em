<template>
  <li
    class="link whitespace-nowrap overflow-hidden px-4 rounded-lg"
    v-tooltip.right="props.collapsed ? props.title : ''">
    <RouterLink
      :to="props.route"
      class="flex items-center gap-2 py-3"
      activeClass="link-active"
      :title="props.collapsed ? props.title : ''">
      <v-icon scale="1.3" :name="props.icon" />
      <span v-if="!props.collapsed">{{ props.title }}</span>
    </RouterLink>
  </li>
</template>

<script lang="ts" setup>
  interface Props {
    title: string;
    route: string;
    icon: string;
    collapsed?: boolean;
  }

  const props = defineProps<Props>();
</script>

<style scoped>
  li.link:has(.link-active) {
    color: #fff;
    background-color: #0084FF;
  }
  li.link:hover {
    color: #00bfff;
  }
</style>
