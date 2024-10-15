<script lang="ts" setup>
import { computed } from "vue";

import { useRoute } from "vue-router";

const route = useRoute();

const type = computed(() => route.meta.typePage);
</script>

<template>
  <template v-if="type == 'create'">
    <h1 style="text-align: center">Добавление нового эксперимента в базу данных</h1>
  </template>

  <template v-if="type == 'edit'">
    <h1 style="text-align: center">Редактирование эксперимента</h1>
  </template>
  <p style="text-align: center; font-size: 1.5rem">Заполните все необходимые поля</p>
</template>

<style>
h1 {
  padding: 0;
  margin: 0;
}

p {
  padding: 0;
  margin: 0;
  margin-bottom: 1rem;
}
</style>
