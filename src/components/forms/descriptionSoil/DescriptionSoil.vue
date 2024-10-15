<script lang="ts" setup>
import Textarea from "primevue/Textarea";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";

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
      <Group :title="'Геоботаника:'">
        <template #input>
          <Textarea :value="item.geobotany" placeholder="Введите описание" @update:modelValue="emit('update-field', { field: 'geobotany', value: $event })"></Textarea>
        </template>
      </Group>
      <Group :title="'Микрорельеф:'">
        <template #input>
          <Dropdown
            :modelValue="item.microrelief"
            :options="microrelief"
            optionLabel="label"
            optionValue="label"
            placeholder="Выберите из списка"
            @update:modelValue="emit('update-field', { field: 'microrelief', value: $event })"
          ></Dropdown>
        </template>
      </Group>
      <Group :title="'Тип почвы:'">
        <template #input>
          <Dropdown
            :modelValue="item.typeOfSoil"
            :options="typesOfSoil"
            optionLabel="label"
            optionValue="label"
            placeholder="Выберите из списка"
            @update:modelValue="emit('update-field', { field: 'typeOfSoil', value: $event })"
          ></Dropdown>
        </template>
      </Group>
      <Group :title="'Наличие оглеения:'">
        <template #input>
          <Dropdown
            :modelValue="item.isGleying"
            :options="isExist"
            optionLabel="label"
            optionValue="value"
            placeholder="Выберите из списка"
            @update:modelValue="emit('update-field', { field: 'isGleying', value: $event })"
          ></Dropdown>
        </template>
      </Group>
      <Group :title="'Присутсвие мерзлоты:'">
        <template #input>
          <Dropdown
            :modelValue="item.isPermafrost"
            :options="isExist"
            optionLabel="label"
            optionValue="value"
            placeholder="Выберите из списка"
            @update:modelValue="emit('update-field', { field: 'isPermafrost', value: $event })"
          ></Dropdown>
        </template>
      </Group>
      <Group :title="'Пирогенный фактор:'">
        <template #input>
          <Dropdown
            :modelValue="item.isPyrogenic"
            :options="isExist"
            optionLabel="label"
            optionValue="value"
            placeholder="Выберите из списка"
            @update:modelValue="emit('update-field', { field: 'isPyrogenic', value: $event })"
          ></Dropdown>
        </template>
      </Group>
      <Group :title="'Граница залегания мерзлоты:'">
        <template #input>
          <InputText
            :value="item.permafrostBoundary"
            placeholder="Десятичное значение"
            @update:modelValue="emit('update-field', { field: 'permafrostBoundary', value: $event })"
          ></InputText>
        </template>
      </Group>
      <Group :title="'Число почвенных разрезов на почвенном профиле:'">
        <template #input>
          <InputText
            :value="item.numberOfSoilCuts"
            placeholder="Целое значение"
            @update:modelValue="emit('update-field', { field: 'numberOfSoilCuts', value: $event })"
          ></InputText>
        </template>
      </Group>
      <Group :title="'Грансостав:'">
        <template #input>
          <Dropdown
            :modelValue="item.granularComposition"
            :options="compositions"
            optionLabel="label"
            optionValue="label"
            placeholder="Выберите из списка"
            @update:modelValue="emit('update-field', { field: 'granularComposition', value: $event })"
          ></Dropdown>
        </template>
      </Group>
    </template>
  </Form>
</template>
