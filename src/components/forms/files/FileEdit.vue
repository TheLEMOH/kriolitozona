<script lang="ts" setup>
import Form from "../shared/Form.vue";
import FileItem from "./FileItem.vue";

interface Props {
  id: number;
  files: string[];
}

withDefaults(defineProps<Props>(), {
  id: () => 0,
  files: () => [],
});

const emit = defineEmits(["delete"]);
</script>

<template>
  <Form :title="'Файлы'" :type="'vertical'">
    <template #fields>
      <template v-for="file in files">
        <FileItem :id="id" :file="file" @delete="emit('delete', $event)"></FileItem>
      </template>
      <template v-if="files.length == 0">
        <span>Нет файлов</span>
      </template>
    </template>
  </Form>
</template>

<style></style>
