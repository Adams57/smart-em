<template>
  <header
    :class="!isFullwidth ? 'gap-8' : 'gap-0'"
    class="flex items-center justify-between mb-4">
    <div class="flex-1 flex gap-4" v-if="!props.hideSearch">
      <div
        :class="!isFullwidth ? 'min-w-30 max-w-[25rem]' : 'w-full'"
        class="flex-1">
        <pr-icon-field>
          <pr-input-icon>
            <v-icon name="io-search" />
          </pr-input-icon>
          <pr-input-text
            v-model="searchQuery"
            placeholder="Search..."
            class="w-full header-search-input"
            size="small"
            @input="onSearch" />
        </pr-icon-field>
      </div>
      <div class="card flex justify-center" v-if="!props.hideFilter">
        <pr-select
          v-model="selectedFilter"
          :options="options"
          optionLabel="name"
          placeholder="Filter"
          class="w-min 2xl:w-42"
          size="small"
          @change="onOptionChange" />
        <pr-divider
          v-if="selectedFilter && selectedFilter.name !== 'All'"
          layout="vertical" />
        <pr-select
          v-if="selectedFilter && selectedFilter.name !== 'All'"
          v-model="filter"
          filter
          :options="subOptions"
          optionLabel="name"
          :placeholder="`Select ${selectedFilter.name}`"
          class="w-min 2xl:w-52"
          size="small"
          @change="onSubOptionChange" />
      </div>
    </div>

    <div class="flex items-center gap-4">
      <div v-if="isActivity">
        <div v-if="(selectedTableRows?.length ?? 0) > 1" class="flex gap-2">
          <pr-button
            severity="danger"
            @click="emit('setDeleteModalVisible')"
            size="small">
            <span class="flex items-center gap-1">
              <v-icon class="mt-0.5" name="io-trash" />
              <span>Delete {{ title }}s</span>
            </span>
          </pr-button>

          <pr-button size="small" @click="emit('handleMenuExport')">
            <span class="flex items-center gap-1">
              <v-icon scale="0.9" class="mt-0.5" name="bi-upload" />
              Export Selection
            </span>
          </pr-button>
        </div>

        <div class="flex items-center gap-2" v-else>
          <pr-button @click="emit('openMutateModal')" size="small">
            <span class="flex items-center gap-1">
              <v-icon class="mt-0.5" name="bi-plus-lg" animation="pulse" />
              <span>New {{ sub_title }}</span>
            </span>
          </pr-button>

          <!-- <pr-button
            v-if="showImportButtons"
            variant="outlined"
            size="small"
            @click="visible = true">
            <span class="flex items-center gap-2">
              <v-icon
                scale="0.9"
                class="mt-0.5"
                name="bi-download"
                animation="pulse" />
              Import Template
            </span>
          </pr-button> -->
        </div>
      </div>
      <div class="flex items-center gap-2" v-else>
        <pr-button
          v-if="(selectedTableRows?.length ?? 0) > 1"
          severity="danger"
          size="small"
          @click="emit('setDeleteModalVisible')">
          <span class="flex items-center gap-1">
            <v-icon class="mt-0.5" name="hi-trash" animation="pulse" />
            <span>Delete {{ title }}s</span>
          </span>
        </pr-button>

        <pr-button size="small" @click="emit('openMutateModal')">
          <span class="flex items-center gap-1">
            <v-icon class="mt-0.5" name="bi-plus-lg" animation="pulse" />
            <span>New {{ title }}</span>
          </span>
        </pr-button>

        <!-- <pr-button
          v-if="showImportButtons"
          variant="outlined"
          size="small"
          @click="visible = true">
          <span class="flex items-center gap-2">
            <v-icon
              scale="0.9"
              class="mt-0.5"
              name="bi-download"
              animation="pulse" />
            Import Template
          </span>
        </pr-button> -->
      </div>
      <slot name="buttons" />
    </div>
  </header>
</template>

<script setup lang="ts" generic="T">
  import { ref } from "vue";

  const props = defineProps<{
    options?: object[];
    subOptions?: object[];
    hideFilter?: boolean;
    hideSearch?: boolean;
    isFullwidth?: boolean;
    selectedTableRows?: T[];
    isDeleteModalVisible?: boolean;
    showImportButtons?: boolean;
    isActivity?: boolean;
    title?: string;
    sub_title?: string;
  }>();

  const emit = defineEmits([
    "search",
    "initialFilterChange",
    "subFilterChange",
    "openMutateModal",
    "handleImport",
    "setDeleteModalVisible",
    "handleMenuExport",
    "import-success"
  ]);

  const searchQuery = ref("");
  // const visible = ref(false);

  const onSearch = (): void => {
    emit("search", searchQuery.value);
  };

  const selectedFilter = ref();
  const filter = ref();

  const onOptionChange = () => {
    filter.value = {};
    emit("initialFilterChange", selectedFilter.value.name);
  };

  const onSubOptionChange = () => {
    if (filter.value) {
      emit("subFilterChange", filter.value.name);
    }
  };

  const resetFilter = () => {
    selectedFilter.value = null;
    filter.value = null;
  };

  defineExpose({ resetFilter });
</script>
