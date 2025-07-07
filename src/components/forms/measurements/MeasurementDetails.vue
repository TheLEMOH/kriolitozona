<script lang="ts" setup>
import InputNumber from "primevue/inputnumber";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";

import Form from "../shared/Form.vue";
import Group from "../shared/Group.vue";

import List from "../shared/List.vue";
import Item from "../shared/ListItem.vue"

import MeasurementDetailsDTO from "../../../models/measurementDetails";

import { computed } from "vue";

const props = defineProps<{
  item: MeasurementDetailsDTO[];
}>();

const emit = defineEmits(["update-field", 'add', 'delete']);

const options = [{ label: "250 МГц" }, { label: "1200 МГц" }];

const disableDelete = computed(() => {
  return props.item.length == 1
})

</script>

<template>
  <Form :title="'Практические измерения'">
    <template #fields>
      <List>
        <template #body>
          <Item v-for="(line, index) in item" :index="index">
            <template #fields>
              <Group :title="'Температура воздуха, &deg;C'">
                <template #input>
                  <InputNumber :modelValue="line.airTemperature" placeholder="Десятичное значение"
                    :min-fraction-digits="1" :max-fraction-digits="3"
                    @update:modelValue="emit('update-field', { field: 'airTemperature', index: index, value: $event })">
                  </InputNumber>
                </template>
              </Group>
              <Group :title="'Грубина СТС, см'">
                <template #input>
                  <InputNumber :modelValue="line.layerDepth" placeholder="Десятичное значение" :min-fraction-digits="1"
                    :max-fraction-digits="3"
                    @update:modelValue="emit('update-field', { field: 'layerDepth', index: index, value: $event })">
                  </InputNumber>
                </template>
              </Group>
              <Group :title="'Влажность воздуха, %'">
                <template #input>
                  <InputNumber :modelValue="line.humidity" placeholder="Десятичное значение" :min-fraction-digits="1"
                    :max-fraction-digits="3"
                    @update:modelValue="emit('update-field', { field: 'humidity', index: index, value: $event })">
                  </InputNumber>
                </template>
              </Group>
              <Group :title="'Альбедо поверхности'">
                <template #input>
                  <InputNumber :modelValue="line.surfaceAlbedo" placeholder="Десятичное значение/целое"
                    :min-fraction-digits="1" :max-fraction-digits="3"
                    @update:modelValue="emit('update-field', { field: 'surfaceAlbedo', index: index, value: $event })">
                  </InputNumber>
                </template>
              </Group>
              <Group :title="'Количество георадарных треков'">
                <template #input>
                  <InputNumber :modelValue="line.numberOfGPRTracks" placeholder="Целое значение"
                    @update:modelValue="emit('update-field', { field: 'numberOfGPRTracks', index: index, value: $event })">
                  </InputNumber>
                </template>
              </Group>
              <Group :title="'Частота сканирования'">
                <template #input>
                  <Dropdown :modelValue="line.scanningFrequency" :options="options" optionLabel="label"
                    optionValue="label" placeholder="Выберите из списка"
                    @update:modelValue="emit('update-field', { field: 'scanningFrequency', index: index, value: $event })">
                  </Dropdown>
                </template>
              </Group>

              <div class="buttons">
                <Button severity="danger" icon="pi pi-trash" @click="emit('delete', index)"
                  :disabled="disableDelete"></Button>
                <Button icon="pi pi-plus" @click="emit('add')" v-if="index + 1 == item.length"></Button>
              </div>

            </template>
          </Item>
        </template>
      </List>
    </template>
  </Form>
</template>

<style scoped>
.buttons {
  display: flex;
  gap: 1rem;
}
</style>
