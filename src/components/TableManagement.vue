<template>
  <div
    class="flex-1 overflow-y-hidden border-t border-t-neutral-200 dark:border-t-neutral-700 pt-1">
    <pr-data-table
      :class="enableRowClick && 'clickable-rows'"
      :value="filteredTableData"
      stripedRows
      size="medium"
      scrollable
      removableSort
      scrollHeight="calc(100vh - 270px)"
      v-model:selection="selectedRows"
      dataKey="id"
      class="uppercase-headers"
      @update:selection="onRowSelectChange"
      @row-click="onRowClick">
      <pr-column
        v-if="props.multiselect"
        selectionMode="multiple"
        headerStyle="width: 3rem" />
      <slot />
    </pr-data-table>
  </div>
</template>

<script lang="ts" setup generic="T">
  import { ref, computed, watch } from "vue";

  interface Props {
    tableData: object[];
    multiselect?: boolean;
    searchQuery?: string;
    filterQuery?: string;
    unSelectRows?: boolean;
    enableRowClick?: boolean;
  }

  interface RowClickEvent {
    data: T;
  }

  const emit = defineEmits(["update:selection", "row-click"]);
  const props = defineProps<Props>();
  const selectedRows = ref([]);

  const filteredTableData = computed(() => {
    if (props.filterQuery) {
      const query = props.filterQuery.toLowerCase();
      return props.tableData.filter((row) => {
        return Object.entries(row).some(
          ([key, value]) =>
            key !== "id" &&
            value !== null &&
            value !== undefined &&
            value.toString().toLowerCase() === query
        );
      });
    }

    if (!props.searchQuery) return props.tableData;

    const query = props.searchQuery.toLowerCase().trim();
    return props.tableData.filter((row) => {
      return Object.entries(row).some(
        ([key, value]) =>
          key !== "id" &&
          value !== null &&
          value !== undefined &&
          value.toString().toLowerCase().includes(query)
      );
    });
  });

  const onRowSelectChange = (): void => {
    emit("update:selection", selectedRows.value);
  };

  const onRowClick = (event: RowClickEvent) => {
    emit("row-click", event?.data);
  };

  watch(
    () => props.unSelectRows,
    (newValue) => {
      if (newValue) {
        selectedRows.value = [];
      }
    },
    { immediate: true }
  );
</script>

<style scoped>
  :deep(.p-datatable-thead th) {
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 500;
    color: #626265;
  }

  @media (prefers-color-scheme: dark) {
    :deep(.p-datatable-thead th) {
      color: #eee;
    }
  }

  :deep(.clickable-rows .p-datatable-tbody > tr) {
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  :deep(.clickable-rows .p-datatable-tbody > tr:hover) {
    background-color: #f6f6f6;
  }

  @media (prefers-color-scheme: dark) {
    :deep(.clickable-rows .p-datatable-tbody > tr:hover) {
      background-color: var(--p-content-border-color) !important;
    }
  }
</style>
