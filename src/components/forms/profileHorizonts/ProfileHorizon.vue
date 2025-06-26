<script lang="ts" setup>
import { ref } from "vue";

import MultiSelect from "primevue/multiselect";

import Form from "../shared/Form.vue";
import Group from "../shared/Group.vue";
import ProfileHorizonList from "./ProfileHorizonList.vue";

import HorizonDTO from "./models";

const props = defineProps<{
  data: HorizonDTO[];
}>();

const emit = defineEmits(["update"]);

const options = ref<HorizonDTO[]>([
  { name: "T", value: 1 },
  { name: "AO", value: 2 },
  { name: "AY", value: 3 },
  { name: "AU", value: 4 },
  { name: "BF", value: 5 },
  { name: "BFH", value: 6 },
  { name: "CR", value: 7 },
  { name: "C", value: 8 },
]);

const selected = ref<HorizonDTO[]>(props.data);

function Update<E extends keyof HorizonDTO>(event: { field: E; index: number; value: HorizonDTO[E] }) {
  selected.value[event.index][event.field] = event.value;
  emit("update", selected.value);
}

function UpdateSelected() {
  emit("update", selected.value);
}
</script>

<template>
  <Form :title="'Строение профиля:'" type="vertical">
    <template #fields>
      <Group :title="'Горизонты:'">
        <template #input>
          <MultiSelect v-model="selected" :options="options" display="chip" optionLabel="name" dataKey="name"
            :maxSelectedLabels="7" placeholder="Выберите горизонты" @update:modelValue="UpdateSelected" />
        </template>
      </Group>

      <ProfileHorizonList :items="selected" @update-field="Update"></ProfileHorizonList>
    </template>
  </Form>
</template>
