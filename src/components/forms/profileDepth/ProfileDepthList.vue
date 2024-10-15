<script setup lang="ts">
import Group from "../shared/Group.vue";
import InputText from "primevue/inputtext";

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
      <Item v-for="(item, index) in items" :title="item.name" :index="index">
        <template #fields>
          <Group :title="'Температура на глубине:'">
            <template #input>
              <InputText
                :value="item.temperatureAtDepth"
                placeholder="Целое значение"
                @update:modelValue="emit('update-field', { field: 'temperatureAtDepth', index: index, value: $event })"
              ></InputText>
            </template>
          </Group>
          <Group :title="'Влажность:'">
            <template #input>
              <InputText
                :value="item.humidity"
                placeholder="Десятичное значение"
                @update:modelValue="emit('update-field', { field: 'humidity', index: index, value: $event })"
              ></InputText>
            </template>
          </Group>
          <Group :title="'pH:'">
            <template #input>
              <InputText :value="item.pH" placeholder="Десятичное значение" @update:modelValue="emit('update-field', { field: 'pH', index: index, value: $event })"></InputText>
            </template>
          </Group>
          <Group :title="'Показатель теплопроводности:'">
            <template #input>
              <InputText
                :value="item.thermalConductivityIndex"
                placeholder="Десятичное значение"
                @update:modelValue="emit('update-field', { field: 'thermalConductivityIndex', index: index, value: $event })"
              ></InputText>
            </template>
          </Group>
          <Group :title="'Значение теплового потока:'">
            <template #input>
              <InputText
                :value="item.heatFluxValue"
                placeholder="Десятичное значение"
                @update:modelValue="emit('update-field', { field: 'heatFluxValue', index: index, value: $event })"
              ></InputText>
            </template>
          </Group>
          <Group :title="'Содержание органического вещества'">
            <template #input>
              <InputText
                :value="item.organicContentSubstances"
                placeholder="Проценты (%)"
                @update:modelValue="emit('update-field', { field: 'organicContentSubstances', index: index, value: $event })"
              ></InputText>
            </template>
          </Group>
        </template>
      </Item>
    </template>
  </List>
</template>
