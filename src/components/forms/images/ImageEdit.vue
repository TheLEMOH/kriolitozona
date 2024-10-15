<script lang="ts" setup>
import Form from "../shared/Form.vue";
import ImageItem from "./ImageItem.vue";

interface Props {
  id: number;
  images: string[];
}

withDefaults(defineProps<Props>(), {
  id: () => 0,
  images: () => [],
});

const emit = defineEmits(["delete"]);
</script>

<template>
  <Form :title="'Изображения'">
    <template #fields>
      <template v-for="image in images">
        <ImageItem :id="id" :image="image" @delete="emit('delete', $event)"></ImageItem>
      </template>
      <template v-if="images.length == 0">
        <span>Нет изображений</span>
      </template>
    </template>
  </Form>
</template>

<style></style>
