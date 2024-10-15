<script setup lang="ts">
import Button from "primevue/button";

import { useRoute } from "vue-router";

import fileService from "../../../service/file";

const props = defineProps<{
  id: number;
  file: string;
}>();

const emit = defineEmits(["delete"]);

const route = useRoute();

const typePage = route.meta.typePage;

const DownloadFile = (file: string) => {
  fileService.get(props.id, file);
};
</script>

<template>
  <div class="file">
    <i class="pi pi-file" style="font-size: 1.5rem"></i>
    <span>{{ file }}</span>
    <Button label="Удалить" severity="danger" outlined size="small" @click="emit('delete', file)" v-if="typePage == 'edit'"></Button>
    <Button label="Скачать" severity="primary" outlined size="small" @click="DownloadFile(file)"></Button>
  </div>
</template>

<style>
.file {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
