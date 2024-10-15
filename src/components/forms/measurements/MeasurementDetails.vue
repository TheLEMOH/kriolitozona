<script lang="ts" setup>
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";

import Form from "../shared/Form.vue";
import Group from "../shared/Group.vue";

import ExperimentDTO from "../../../models/experiment";

defineProps<{
  item: ExperimentDTO;
}>();

const emit = defineEmits(["update-field"]);

const options = [{ label: "250 МГц" }, { label: "1200 МГц" }];
</script>

<template>
  <Form :title="'Практические измерения:'">
    <template #fields>
      <Group :title="'Tемпература воздуха при эксперименте:'">
        <template #input>
          <InputText
            :value="item.airTemperature"
            placeholder="Десятичное значение"
            @update:modelValue="emit('update-field', { field: 'airTemperature', value: $event })"
          ></InputText>
        </template>
      </Group>
      <Group :title="'Грубина СТС:'">
        <template #input>
          <InputText :value="item.layerDepth" placeholder="Десятичное значение" @update:modelValue="emit('update-field', { field: 'layerDepth', value: $event })"></InputText>
        </template>
      </Group>
      <Group :title="'Влажность воздуха:'">
        <template #input>
          <InputText :value="item.humidity" placeholder="Десятичное значение" @update:modelValue="emit('update-field', { field: 'humidity', value: $event })"></InputText>
        </template>
      </Group>
      <Group :title="'Альбедо поверхности (число повторностей):'">
        <template #input>
          <InputText
            :value="item.surfaceAlbedo"
            placeholder="Десятичное значение/целое"
            @update:modelValue="emit('update-field', { field: 'surfaceAlbedo', value: $event })"
          ></InputText>
        </template>
      </Group>
      <Group :title="'Количество георадарных треков:'">
        <template #input>
          <InputText
            :value="item.numberOfGPRTracks"
            placeholder="Целое значение"
            @update:modelValue="emit('update-field', { field: 'numberOfGPRTracks', value: $event })"
          ></InputText>
        </template>
      </Group>
      <Group :title="'Частота сканирования:'">
        <template #input>
          <Dropdown
            :modelValue="item.scanningFrequency"
            :options="options"
            optionLabel="label"
            optionValue="label"
            placeholder="Выберите из списка"
            @update:modelValue="emit('update-field', { field: 'scanningFrequency', value: $event })"
          ></Dropdown>
        </template>
      </Group>
    </template>
  </Form>
</template>

<style></style>
