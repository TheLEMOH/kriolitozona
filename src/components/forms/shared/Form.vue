<script lang="ts" setup>
interface Props {
  title: string;
  subtitle?: string;
  type?: "horizontal" | "vertical";
  center?: boolean;
  gap?: number;
  fill?: boolean;
  width?: string;
}

withDefaults(defineProps<Props>(), {
  title: () => "",
  subtitle: () => "",
  type: () => "horizontal",
  center: () => false,
  gap: () => 1,
  fill: () => false,
  width: () => "100%",
});
</script>

<template>
  <div class="form" :class="[center ? 'form-center' : '']">
    <h2>{{ title }}</h2>
    <h3 v-if="subtitle">{{ subtitle }}</h3>
    <div :class="['form-body', type == 'horizontal' ? 'horizontal' : 'vertical', fill ? 'fill' : '']" :style="{ gap: gap + 'rem', maxWidth: width }">
      <slot name="fields"></slot>
    </div>
  </div>
</template>

<style>
.form {
  background-color: var(--surface-50);
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid var(--surface-d);
  margin-bottom: 1rem;
  overflow-x: auto;
  width: 100%;
  color: var(--surface-900);
}

.form h2 {
  margin: 0;
  padding-bottom: 1rem;
  text-align: center;
}

.form h3 {
  margin: 0;
  padding-bottom: 1rem;
  text-align: center;
}

.form-body {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  flex-shrink: 1;
  margin: auto;
}

.fill {
  width: 100%;
}

.horizontal {
  flex-direction: row;
}

.vertical {
  flex-direction: column;
}

.form-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

@media (max-width: 768px) {
  .form-body {
    flex-direction: column;
  }
}
</style>
