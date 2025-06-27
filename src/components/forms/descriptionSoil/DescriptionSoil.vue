<script lang="ts" setup>
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import InputNumber from "primevue/inputnumber";

import Form from "../shared/Form.vue";
import Group from "../shared/Group.vue";
import ExperimentDTO from "../../../models/experiment";

import { microrelief, typesOfSoil, isExist, compositions } from "../../../select/select";

defineProps<{ item: ExperimentDTO }>();

const emit = defineEmits(["update-field"]);
</script>

<template>
  <Form :title="'Описание почвенного профиля:'">
    <template #fields>
      <Group :title="'Геоботаника'">
        <template #input>
          <Textarea :value="item.geobotany" placeholder="Введите описание"
            @update:modelValue="emit('update-field', { field: 'geobotany', value: $event })"></Textarea>
        </template>
      </Group>
      <Group :title="'Микрорельеф'">
        <template #input>
          <Dropdown :modelValue="item.microrelief" :options="microrelief" optionLabel="label" optionValue="label"
            placeholder="Выберите из списка"
            @update:modelValue="emit('update-field', { field: 'microrelief', value: $event })"></Dropdown>
        </template>
      </Group>
      <Group :title="'Тип почвы'">
        <template #input>
          <Dropdown :modelValue="item.typeOfSoil" :options="typesOfSoil" optionLabel="label" optionValue="label"
            placeholder="Выберите из списка"
            @update:modelValue="emit('update-field', { field: 'typeOfSoil', value: $event })"></Dropdown>
        </template>
      </Group>
      <Group :title="'Наличие оглеения'">
        <template #input>
          <Dropdown :modelValue="item.isGleying" :options="isExist" optionLabel="label" optionValue="value"
            placeholder="Выберите из списка"
            @update:modelValue="emit('update-field', { field: 'isGleying', value: $event })"></Dropdown>
        </template>
      </Group>
      <Group :title="'Присутствие мерзлоты'">
        <template #input>
          <Dropdown :modelValue="item.isPermafrost" :options="isExist" optionLabel="label" optionValue="value"
            placeholder="Выберите из списка"
            @update:modelValue="emit('update-field', { field: 'isPermafrost', value: $event })"></Dropdown>
        </template>
      </Group>
      <Group :title="'Пирогенный фактор'">
        <template #input>
          <Dropdown :modelValue="item.isPyrogenic" :options="isExist" optionLabel="label" optionValue="value"
            placeholder="Выберите из списка"
            @update:modelValue="emit('update-field', { field: 'isPyrogenic', value: $event })"></Dropdown>
        </template>
      </Group>
      <Group :title="'Граница залегания мерзлоты, см'">
        <template #input>
          <InputNumber :modelValue="item.permafrostBoundary" placeholder="Десятичное значение" :min-fraction-digits="1"
            :max-fraction-digits="3"
            @update:modelValue="emit('update-field', { field: 'permafrostBoundary', value: $event })"></InputNumber>
        </template>
      </Group>
      <Group :title="'Число почвенных разрезов на участке'">
        <template #input>
          <InputNumber :modelValue="item.numberOfSoilCuts" placeholder="Целое значение"
            @update:modelValue="emit('update-field', { field: 'numberOfSoilCuts', value: $event })"></InputNumber>
        </template>
      </Group>
      <Group :title="'Грансостав'">
        <template #input>
          <Dropdown :modelValue="item.granularComposition" :options="compositions" optionLabel="label"
            optionValue="label" placeholder="Выберите из списка"
            @update:modelValue="emit('update-field', { field: 'granularComposition', value: $event })"></Dropdown>
        </template>
      </Group>
    </template>
  </Form>
</template>
