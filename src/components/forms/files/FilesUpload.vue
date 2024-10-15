<script setup lang="ts">
import FileUpload from "primevue/fileupload";
import { FileUploadUploadEvent } from "primevue/fileupload";

import Form from "../shared/Form.vue";

defineProps<{
  id: number | undefined;
}>();

const emit = defineEmits(["done"]);

const Done = (event: FileUploadUploadEvent) => {
  const json = JSON.parse(event.xhr.response);

  emit("done", json);
};
</script>

<template>
  <Form :title="'Загрузка файлов'">
    <template #fields>
      <FileUpload
        name="files"
        :mode="'basic'"
        :url="`/api/files/${id}`"
        :multiple="true"
        :showUploadButton="false"
        :showCancelButton="false"
        chooseLabel="Выбрать файлы"
        auto
        @upload="Done"
      >
        <template #empty>
          <p>Перетащите файл вот сюда.</p>
        </template>
      </FileUpload>
    </template>
  </Form>
</template>
