<script lang="ts" setup>
import InputText from "primevue/inputtext";

import Form from "../shared/Form.vue";
import Group from "../shared/Group.vue";

import UserDTO from "../../../models/user";

defineProps<{
  item: UserDTO;
}>();

const width = "600px";

const emit = defineEmits(["update-field"]);
</script>

<template>
  <Form :title="'Общая информация:'" :type="'vertical'" :width="width">
    <template #fields>
      <Group :title="'ФИО:'" :width="width">
        <template #input>
          <InputText :value="item.name" placeholder="Введите имя" @update:modelValue="emit('update-field', { field: 'name', value: $event })"></InputText>
        </template>
      </Group>
      <Group :title="'Логин:'" :width="width">
        <template #input>
          <InputText :value="item.login" placeholder="Введите логин" @update:modelValue="emit('update-field', { field: 'login', value: $event })"></InputText>
        </template>
      </Group>
      <Group :title="'Пароль:'" :width="width">
        <template #input>
          <InputText :value="item.password" placeholder="Введите пароль" @update:modelValue="emit('update-field', { field: 'password', value: $event })"></InputText>
        </template>
      </Group>
    </template>
  </Form>
</template>

<style></style>
