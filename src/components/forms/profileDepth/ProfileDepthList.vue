<script setup lang="ts">
import Group from "../shared/Group.vue";
import InputNumber from "primevue/inputnumber";

import List from "../shared/List.vue";
import Item from "../shared/ListItem.vue";

import Depths from "./models";

defineProps<{
  items: Depths[];
}>();

const emit = defineEmits(["update-field"]);
</script>

<template>
  <List :length="items.length">
    <template #body>
      <Item v-for="(item, index) in items" :title="`${item.value}`" :index="index">
        <template #fields>
          <Group :title="'Температура на глубине &deg;C'">
            <template #input>
              <InputNumber :modelValue="item.temperatureAtDepth" placeholder="Целое значение"
                @update:modelValue="emit('update-field', { field: 'temperatureAtDepth', index: index, value: $event })">
              </InputNumber>
            </template>
          </Group>
          <Group :title="'Влажность, %<sub>вес</sub>'">
            <template #input>
              <InputNumber :modelValue="item.humidity" placeholder="Десятичное значение" :min-fraction-digits="1"
                :max-fraction-digits="3"
                @update:modelValue="emit('update-field', { field: 'humidity', index: index, value: $event })">
              </InputNumber>
            </template>
          </Group>
          <Group :title="'pH, отн.ед'">
            <template #input>
              <InputNumber :modelValue="item.pH" placeholder="Десятичное значение" :min-fraction-digits="1"
                :max-fraction-digits="3"
                @update:modelValue="emit('update-field', { field: 'pH', index: index, value: $event })"></InputNumber>
            </template>
          </Group>
          <Group :title="'Показатель теплопроводности, Вт/м&deg;C'">
            <template #input>
              <InputNumber :modelValue="item.thermalConductivityIndex" placeholder="Десятичное значение"
                :min-fraction-digits="1" :max-fraction-digits="3"
                @update:modelValue="emit('update-field', { field: 'thermalConductivityIndex', index: index, value: $event })">
              </InputNumber>
            </template>
          </Group>
          <Group :title="'Значение теплового потока, Вт/м<sup>2</sup>'">
            <template #input>
              <InputNumber :modelValue="item.heatFluxValue" placeholder="Десятичное значение" :min-fraction-digits="1"
                :max-fraction-digits="3"
                @update:modelValue="emit('update-field', { field: 'heatFluxValue', index: index, value: $event })">
              </InputNumber>
            </template>
          </Group>
          <Group :title="'Содержание органического вещества, %'">
            <template #input>
              <InputNumber :modelValue="item.organicContentSubstances" placeholder="Проценты (%)" :min="0"
                @update:modelValue="emit('update-field', { field: 'organicContentSubstances', index: index, value: $event })">
              </InputNumber>
            </template>
          </Group>
        </template>
      </Item>
    </template>
  </List>
</template>
