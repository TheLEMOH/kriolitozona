<script lang="ts" setup>
import DataTable from "primevue/datatable";
import { DataTableFilterMeta } from "primevue/datatable";

interface Props {
  items?: [];
  globalFilterFields?: string[];
  filters?: DataTableFilterMeta;
  filterDisplay?: "menu" | "row" | undefined;
  tableLayout?: "fixed" | "auto";
  minWidth?: string;
}

withDefaults(defineProps<Props>(), {
  items: () => [],
  globalFilterFields: () => [],
  filterDisplay: () => "menu",
  tableLayout: () => "auto",
  minWidth: () => "0px",
});

const emit = defineEmits(["updateFilters"]);
</script>

<template>
  <DataTable
    :filters="filters"
    :value="items"
    :globalFilterFields="globalFilterFields"
    stripedRows
    showGridlines
    :filterDisplay="filterDisplay"
    dataKey="id"
    columnResizeMode="expand"
    @update:filters="emit('updateFilters', $event)"
    size="small"
    :tableStyle="{ tableLayout: tableLayout }"
    :style="{ minWidth: minWidth, width: '100%' }"
  >
    <template #empty> Нет объектов. </template>
    <slot name="columns"></slot>
  </DataTable>
</template>

<style>
table tr:first-child th:first-child {
  border-top-left-radius: 6px;
}

table tr:first-child th:last-child {
  border-top-right-radius: 6px;
}

table tr:last-child td:first-child {
  border-bottom-left-radius: 6px;
}

table tr:last-child td:last-child {
  border-bottom-right-radius: 6px;
}

th {
  text-wrap: wrap;
}
</style>
