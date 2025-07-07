<script setup lang="ts">
import Column from "primevue/column";
import Table from "../shared/Table.vue";
</script>

<template>
  <Table :items="[]" :tableLayout="'auto'">
    <template #columns>
      <Column field="value" header="Глубина, см"></Column>
      <Column field="temperatureAtDepth" header="Температура &deg;C"></Column>
      <Column field="humidity">
        <template #header>
          <span>Влажность, %<sub>вес</sub></span>
        </template>
      </Column>
      <Column field="pH">
        <template #header>
          <span>pH, отн.ед</span>
        </template>
      </Column>
      <Column field="thermalConductivityIndex">
        <template #header>
          <span>Показатель теплопроводности, Вт/м&deg;C</span>
        </template>
      </Column>
      <Column field="heatFluxValue">
        <template #header>
          <span>Значение теплового потока, Вт/м<sup>2</sup></span>
        </template>
      </Column>
      <Column field="organicContentSubstances" header="Содержание органического вещества, %"></Column>
    </template>
  </Table>
</template>

<style></style>
