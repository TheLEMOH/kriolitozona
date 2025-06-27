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
  { name: "0", value: 0 },
  { name: "5", value: 5 },
  { name: "10", value: 10 },
  { name: "15", value: 15 },
  { name: "20", value: 20 },
  { name: "25", value: 25 },
  { name: "30", value: 30 },
  { name: "35", value: 35 },
  { name: "40", value: 40 },
  { name: "45", value: 45 },
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
      <Group :title="'Глубины, см'">
        <template #input>
          <MultiSelect v-model="selected" :options="options" display="chip" optionLabel="name" dataKey="name"
            :maxSelectedLabels="7" placeholder="Выберите глубины" @update:modelValue="UpdateSelected" />
        </template>
      </Group>

      <ProfileDepthList :items="selected" @update-field="Update"></ProfileDepthList>
    </template>
  </Form>
</template>
