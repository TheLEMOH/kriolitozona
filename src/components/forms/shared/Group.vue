<script lang="ts" setup>
interface Props {
  title?: string;
  width?: string;
}

withDefaults(defineProps<Props>(), {
  title: () => "",
  width: () => "500px",
});
</script>

<template>
  <div class="form-body-group" :style="{ maxWidth: width }">
    <span class="form-body-group-label">
      <b>{{ title }}</b>
    </span>
    <slot name="input"></slot>
    <slot></slot>
  </div>
</template>

<style>
.form-body-group {
  display: flex;
  flex-direction: column;
  min-width: 200px;
}

.form-body-group-label {
  padding: 0.5rem 0 0.5rem 0;
}

@media (max-width: 1100px) {
  .form-body-group {
    max-width: none;
  }
}
</style>
