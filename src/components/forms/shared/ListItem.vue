<script setup lang="ts">
defineProps({
  title: {
    type: String,
  },
  index: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <div class="form-body-list-item">
    <span class="form-body-list-item-label">
      <b>{{ index + 1 }}. {{ title }}</b>
    </span>
    <slot name="fields"></slot>
  </div>
</template>

<style>
.form-body-list-item {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  border-bottom: 1px solid var(--surface-d);
  padding: 1rem;
}

.form-body-list-item:last-child {
  border: 0px;
}

.form-body-list-item-label {
  width: 60px;
}

@media (max-width: 1100px) {
  .form-body-list-item {
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
  }
}
</style>
