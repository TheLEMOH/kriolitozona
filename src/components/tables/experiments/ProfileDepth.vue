<script setup lang="ts">
import Column from "primevue/column";
import Table from "../shared/Table.vue";
</script>

<template>
  <Table :items="[]" :tableLayout="'auto'">
    <template #columns>
      <Column field="name" header="Глубина"></Column>
      <Column field="temperatureAtDepth" header="Температура"></Column>
      <Column field="humidity" header="Влажность"></Column>
      <Column field="pH" header="pH"></Column>
      <Column field="thermalConductivityIndex" header="Показатель теплопроводности"></Column>
      <Column field="heatFluxValue" header="Значение теплового потока"></Column>
      <Column field="organicContentSubstances" header="Содержание органического вещества"></Column>
    </template>
  </Table>
</template>

<style></style>
