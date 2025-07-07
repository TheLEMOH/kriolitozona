<script setup lang="ts">
defineProps<{
  length?: Number;
}>();
</script>

<template>
  <div class="form-body-list">
    <span v-if="length == 0">Нет выбранных элементов</span>

    <slot name="body"></slot>
  </div>
</template>

<style>
.form-body-list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
