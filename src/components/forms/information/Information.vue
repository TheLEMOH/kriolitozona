<script lang="ts" setup>
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import InputMask from "primevue/inputmask";

import Form from "../shared/Form.vue";
import Group from "../shared/Group.vue";

import { stateSoil, landscapes } from "../../../select/select";

import ExperimentDTO from "../../../models/experiment";
import { computed } from "vue";

const props = defineProps<{
  item: ExperimentDTO;
}>();

const emit = defineEmits(["update-field"]);

const date = computed(() => {
  const string = props.item.date?.toString();

  if (string) {
    return new Date(string as string);
  } else return null;
});

const mask = `99°99'99"`;
</script>

<template>
  <Form :title="'Общая информация об эксперименте:'">
    <template #fields>
      <Group :title="'Название пробной площадки:'">
        <template #input>
          <InputText :value="item.name" placeholder="Текстовое название"
            @update:modelValue="emit('update-field', { field: 'name', value: $event })"></InputText>
        </template>
      </Group>
      <Group :title="'Дата и время проведения эксперимента:'">
        <template #input>
          <Calendar :modelValue="date" id="calendar24h" placeholder="Дата и время" dateFormat="dd.mm.yy"
            showTime hourFormat="24" @update:modelValue="emit('update-field', { field: 'date', value: $event })" />
        </template>
      </Group>
      <Group :title="'Присвоенный номер:'">
        <template #input>
          <InputNumber :modelValue="item.number" placeholder="Целое значение"
            @update:modelValue="emit('update-field', { field: 'number', value: $event })"></InputNumber>
        </template>
      </Group>
      <Group :title="'Состояние почвенного профиля:'">
        <template #input>
          <Dropdown :modelValue="item.soilProfileCondition" :options="stateSoil" optionValue="label" optionLabel="label"
            placeholder="Выберите из списка"
            @update:modelValue="emit('update-field', { field: 'soilProfileCondition', value: $event })"></Dropdown>
        </template>
      </Group>
      <Group :title="'Ландшафт:'">
        <template #input>
          <Dropdown :modelValue="item.landscape" :options="landscapes" optionValue="label" optionLabel="label"
            placeholder="Выберите из списка"
            @update:modelValue="emit('update-field', { field: 'landscape', value: $event })"></Dropdown>
        </template>
      </Group>
      <Group :title="'Координаты:'">
        <template #input>
          <div class="coordinates">
            <InputMask :modelValue="item.lat" placeholder="Широта " :mask="mask"
              @update:modelValue="emit('update-field', { field: 'lat', value: $event })"></InputMask>
            <InputMask :modelValue="item.long" placeholder="Долгота" :mask="mask"
              @update:modelValue="emit('update-field', { field: 'long', value: $event })"></InputMask>
          </div>
        </template>
      </Group>
    </template>
  </Form>
</template>

<style>
.coordinates {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
