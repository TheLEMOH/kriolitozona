<script setup lang="ts">
import Column from "primevue/column";
import Table from "../shared/Table.vue";
</script>

<template>
  <Table :items="[]" :tableLayout="'auto'">
    <template #columns>
      <Column field="name" header="Глубина"></Column>
      <Column field="heatFlowMeasurementLevel" header="Уровень измерения теплового потока"></Column>
      <Column field="bottomLayerTemperature" header="Температура нижнего слоя"></Column>
      <Column field="topLayerTemperature" header="Температура верхнего слоя"></Column>
      <Column field="heatFlowValue" header="Значение теплового потока"></Column>
    </template>
  </Table>
</template>

<style></style>
