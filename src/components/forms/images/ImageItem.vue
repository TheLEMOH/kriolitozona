<script setup lang="ts">
import Card from "primevue/card";
import Image from "primevue/image";
import Button from "primevue/button";

import { useRoute } from "vue-router";

import imageService from "../../../service/image";

const props = defineProps<{
  id: number;
  image: string;
}>();

const emit = defineEmits(["delete"]);

const route = useRoute();

const typePage = route.meta.typePage;

const DownloadImage = (image: string) => {
  imageService.get(props.id, image);
};
</script>

<template>
  <Card style="overflow: hidden">
    <template #header>
      <Image imageClass="image-item" :src="`/api/images/${id}/${image}`" preview />
    </template>
    <template #title>{{ image }}</template>
    <template #footer>
      <div class="card-buttons">
        <Button label="Удалить" severity="danger" outlined @click="emit('delete', image)" v-if="typePage == 'edit'" />
        <Button label="Скачать" class="w-full" outlined @click="DownloadImage(image)" />
      </div>
    </template>
  </Card>
</template>

<style>
.card-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.image-item {
  height: 200px;
}

.p-image {
  width: 100%;
}

@media (max-width: 768px) {
  .image-item {
    object-fit: cover;
    width: 100%;
  }
}
</style>
