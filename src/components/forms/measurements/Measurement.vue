<script lang="ts" setup>
import { ref } from "vue";

import MultiSelect from "primevue/multiselect";
import Form from "../shared/Form.vue";
import Group from "../shared/Group.vue";

import MeasurementList from "./MeasurementList.vue";

import MeasurementDTO from "./models";

const props = defineProps<{
  data: MeasurementDTO[];
}>();

const emit = defineEmits(["update"]);

const options = ref<MeasurementDTO[]>([
  { name: "5см", value: 5 },
  { name: "10см", value: 10 },
  { name: "15см", value: 15 },
  { name: "20см", value: 20 },
  { name: "25см", value: 25 },
  { name: "30см", value: 30 },
  { name: "35см", value: 35 },
  { name: "40см", value: 40 },
  { name: "45см", value: 45 },
]);

const selected = ref<MeasurementDTO[]>(props.data);

function Update<E extends keyof MeasurementDTO>(event: { field: E; index: number; value: MeasurementDTO[E] }) {
  selected.value[event.index][event.field] = event.value;
  emit("update", selected.value);
}

function UpdateSelected() {
  emit("update", selected.value);
}
</script>

<template>
  <Form :title="'Практические измерения теплового потока:'" type="vertical">
    <template #fields>
      <Group :title="'Показатели теплового потока:'">
        <template #input>
          <MultiSelect v-model="selected" :options="options" display="chip" optionLabel="value" dataKey="value"
            :maxSelectedLabels="7" placeholder="Выберите из списка" @update:modelValue="UpdateSelected" />
        </template>
      </Group>
      <MeasurementList :items="selected" @update-field="Update"></MeasurementList>
    </template>
  </Form>
</template>
