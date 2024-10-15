<script setup lang="ts">
import Column from "primevue/column";
import Table from "../shared/Table.vue";

defineProps<{
  items: [];
}>();
</script>

<template>
  <Table :items="items" :tableLayout="'auto'">
    <template #columns>
      <Column field="name" header="Наименование горизонта"></Column>
      <Column field="depthLowerLimitOfHorizon" header="Глубина нижней границы"></Column>
      <Column field="horizonDensity" header="Плотность"></Column>
      <Column field="organicContentSubstances" header="Содержание органического вещества"></Column>
      <Column field="physicalSandContent" header="Содержание физ.песка"></Column>
      <Column field="physicalClayContent" header="Содержание физ.глины"></Column>
      <Column field="granularComposition" header="Грансостав"></Column>
    </template>
  </Table>
</template>

<style></style>
