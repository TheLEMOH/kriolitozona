<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";

import MultiSelect from "primevue/multiselect";

import Form from "../shared/Form.vue";
import Group from "../shared/Group.vue";
import ProfileDepthList from "./ProfileDepthList.vue";

import DepthDTO from "./models";

const props = defineProps<{
  data: DepthDTO[];
}>();

const emit = defineEmits(["update"]);

const options = ref<DepthDTO[]>([
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

const selected: Ref = ref<DepthDTO[]>(props.data);

function Update<E extends keyof DepthDTO>(event: { field: E; index: number; value: DepthDTO[E] }) {
  selected.value[event.index][event.field] = event.value;
  emit("update", selected.value);
}

function UpdateSelected() {
  emit("update", selected.value);
}
</script>

<template>
  <Form :title="'Характеристики почвенного профиля по глубинам:'" type="vertical">
    <template #fields>
      <Group :title="'Глубины:'">
        <template #input>
          <MultiSelect
            v-model="selected"
            :options="options"
            display="chip"
            optionLabel="name"
            dataKey="name"
            :maxSelectedLabels="7"
            placeholder="Выберите глубины"
            @update:modelValue="UpdateSelected"
          />
        </template>
      </Group>

      <ProfileDepthList :items="selected" @update-field="Update"></ProfileDepthList>
    </template>
  </Form>
</template>
