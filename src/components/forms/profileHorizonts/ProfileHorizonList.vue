<script setup lang="ts">
import Group from "../shared/Group.vue";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";

import List from "../shared/List.vue";
import Item from "../shared/ListItem.vue";

import HorizonDTO from "./models";

defineProps<{
  items: HorizonDTO[];
}>();

const emit = defineEmits(["update-field"]);

const options = [{ label: "Песчаный" }, { label: "Супесчаный" }, { label: "Глинистый" }, { label: "Тяжелоглинистый" }, { label: "Суглинистый" }, { label: "Легкоглинистый" }];
</script>

<template>
  <List :length="items.length">
    <template #body>
      <Item v-for="(item, index) in items" :title="item.name" :index="index">
        <template #fields>
          <Group :title="'Глубина нижней границы горизонта, см'">
            <template #input>
              <InputText :value="item.depthLowerLimitOfHorizon" placeholder="Целое значение"
                @update:modelValue="emit('update-field', { field: 'depthLowerLimitOfHorizon', index: index, value: $event })">
              </InputText>
            </template>
          </Group>
          <Group :title="'Плотность горизонта, г/см<sup>3</sup>'">
            <template #input>
              <InputText :value="item.horizonDensity" placeholder="Десятичное значение"
                @update:modelValue="emit('update-field', { field: 'horizonDensity', index: index, value: $event })">
              </InputText>
            </template>
          </Group>
          <Group :title="'Содержание органического вещества, %'">
            <template #input>
              <InputText :value="item.organicContentSubstances" placeholder="Проценты (%)"
                @update:modelValue="emit('update-field', { field: 'organicContentSubstances', index: index, value: $event })">
              </InputText>
            </template>
          </Group>
          <Group :title="'Содержание физ.песка, %'">
            <template #input>
              <InputText :value="item.physicalSandContent" placeholder="Десятичное значение"
                @update:modelValue="emit('update-field', { field: 'physicalSandContent', index: index, value: $event })">
              </InputText>
            </template>
          </Group>
          <Group :title="'Содержание физ.глины, %'">
            <template #input>
              <InputText :value="item.physicalClayContent" placeholder="Десятичное значение"
                @update:modelValue="emit('update-field', { field: 'physicalClayContent', index: index, value: $event })">
              </InputText>
            </template>
          </Group>
          <Group :title="'Грансостав'">
            <template #input>
              <Dropdown :modelValue="item.granularComposition" :options="options" optionLabel="label"
                optionValue="label" placeholder="Выберите из списка"
                @update:modelValue="emit('update-field', { field: 'granularComposition', index: index, value: $event })">
              </Dropdown>
            </template>
          </Group>
        </template>
      </Item>
    </template>
  </List>
</template>
