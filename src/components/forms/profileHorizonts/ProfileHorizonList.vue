<script setup lang="ts">
import Group from "../shared/Group.vue";
import InputNumber from "primevue/inputnumber";
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
              <InputNumber :modelValue="item.depthLowerLimitOfHorizon" placeholder="Целое значение"
                @update:modelValue="emit('update-field', { field: 'depthLowerLimitOfHorizon', index: index, value: $event })">
              </InputNumber>
            </template>
          </Group>
          <Group :title="'Плотность горизонта, г/см<sup>3</sup>'">
            <template #input>
              <InputNumber :modelValue="item.horizonDensity" placeholder="Десятичное значение" :min-fraction-digits="1"
                :max-fraction-digits="3"
                @update:modelValue="emit('update-field', { field: 'horizonDensity', index: index, value: $event })">
              </InputNumber>
            </template>
          </Group>
          <Group :title="'Содержание органического вещества, %'">
            <template #input>
              <InputNumber :modelValue="item.organicContentSubstances" placeholder="Проценты (%)"
                :min-fraction-digits="1" :max-fraction-digits="3"
                @update:modelValue="emit('update-field', { field: 'organicContentSubstances', index: index, value: $event })">
              </InputNumber>
            </template>
          </Group>
          <Group :title="'Содержание физ.песка, %'">
            <template #input>
              <InputNumber :modelValue="item.physicalSandContent" placeholder="Десятичное значение"
                :min-fraction-digits="1" :max-fraction-digits="3"
                @update:modelValue="emit('update-field', { field: 'physicalSandContent', index: index, value: $event })">
              </InputNumber>
            </template>
          </Group>
          <Group :title="'Содержание физ.глины, %'">
            <template #input>
              <InputNumber :modelValue="item.physicalClayContent" placeholder="Десятичное значение"
                :min-fraction-digits="1" :max-fraction-digits="3"
                @update:modelValue="emit('update-field', { field: 'physicalClayContent', index: index, value: $event })">
              </InputNumber>
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
