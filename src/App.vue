<script setup lang="ts">
import Default from "./layouts/Default.vue";
import Center from "./layouts/Center.vue";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";

import type { Component } from "vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

import { useAuthStore } from "./store/auth";

interface Layout<V> {
  [id: string]: V;
}

const components: Layout<Component> = {
  Default,
  Center,
};

const route = useRoute();
const authStore = useAuthStore();

const layout = computed<string>(() => route.meta.layout as string);

authStore.refresh();
</script>

<template>
  <transition name="fade" mode="out-in">
    <component :is="components[layout]"></component>
  </transition>

  <Toast />
  <ConfirmDialog></ConfirmDialog>
</template>

<style>
html {
  font-size: 14px;
}

body {
  padding: 0;
  margin: 0;
  background-color: var(--surface-0);
}

.page {
  padding-bottom: 1rem;
}

*::-webkit-scrollbar-track {
  background-color: var(--surface-0);
}

*::-webkit-scrollbar {
  width: 10px;
  background-color: var(--surface-0);
}

*::-webkit-scrollbar-thumb {
  background-color: var(--primary-500);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
