<script setup lang="ts">
import FileUpload, { FileUploadUploadEvent } from "primevue/fileupload";
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
  <Form :title="'Загрузка изображений'">
    <template #fields>
      <FileUpload
        name="images"
        :mode="'basic'"
        accept="image/png"
        :url="`/api/images/${id}`"
        :multiple="true"
        :showUploadButton="false"
        :showCancelButton="false"
        chooseLabel="Выбрать изображения"
        auto
        @upload="Done"
      >
        <template #empty>
          <p>Перетащите картинку вот сюда.</p>
        </template>
      </FileUpload>
    </template>
  </Form>
</template>
