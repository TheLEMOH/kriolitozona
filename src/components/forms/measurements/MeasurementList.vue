<script setup lang="ts">
import Group from "../shared/Group.vue";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";

import List from "../shared/List.vue";
import Item from "../shared/ListItem.vue";

import MeasurementDTO from "./models";

defineProps<{
  items: MeasurementDTO[];
}>();

const emit = defineEmits(["update-field"]);
</script>

<template>
  <List :length="items.length">
    <template #body>
      <Item v-for="(item, index) in items" :title="item.name" :index="index">
        <template #fields>
          <Group :title="'Уровень измерения теплового потока:'">
            <template #input>
              <InputNumber :modelValue="item.heatFlowMeasurementLevel" placeholder="Десятичное значение"
                :min-fraction-digits="1" :max-fraction-digits="3"
                @update:modelValue="emit('update-field', { field: 'heatFlowMeasurementLevel', index: index, value: $event })">
              </InputNumber>
            </template>
          </Group>
          <Group :title="'Температура нижнего слоя:'">
            <template #input>
              <InputNumber :modelValue="item.bottomLayerTemperature" placeholder="Десятичное значение"
                :min-fraction-digits="1" :max-fraction-digits="3"
                @update:modelValue="emit('update-field', { field: 'bottomLayerTemperature', index: index, value: $event })">
              </InputNumber>
            </template>
          </Group>
          <Group :title="'Температура верхнего слоя:'">
            <template #input>
              <InputNumber :modelValue="item.topLayerTemperature" placeholder="Десятичное значение"
                :min-fraction-digits="1" :max-fraction-digits="3"
                @update:modelValue="emit('update-field', { field: 'topLayerTemperature', index: index, value: $event })">
              </InputNumber>
            </template>
          </Group>
          <Group :title="'Значение теплового потока:'">
            <template #input>
              <InputNumber :modelValue="item.heatFlowValue" placeholder="Десятичное значение" :min-fraction-digits="1"
                :max-fraction-digits="3"
                @update:modelValue="emit('update-field', { field: 'heatFlowValue', index: index, value: $event })">
              </InputNumber>
            </template>
          </Group>
        </template>
      </Item>
    </template>
  </List>
</template>
