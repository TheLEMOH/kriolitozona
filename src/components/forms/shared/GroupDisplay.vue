<script lang="ts" setup>
interface Props {
  title?: string;
  value?: string | number;
}

withDefaults(defineProps<Props>(), {
  title: () => "",
  value: () => "",
});
</script>

<template>
  <div class="form-body-display">
    <span class="form-body-display-label">
      {{ title }}:
    </span>
    <b>{{ value }}</b>
  </div>
</template>

<style>
.form-body-display {
  display: flex;
  font-size: 1rem;
  flex-direction: row;
  gap: 0.5rem;
  max-width: 400px;
  text-align: justify;
  align-items: start;
  justify-content: space-between;
}

.form-body-display-label {
  text-wrap: nowrap;
}

@media (max-width: 768px) {
  .form-body-display {
    justify-content: space-between;
  }
}
</style>
