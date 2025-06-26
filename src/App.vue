<script setup lang="ts">
import Default from "./layouts/Default.vue";
import Center from "./layouts/Center.vue";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";

import Header from "./components/header/Header.vue";
import useIsMobile from "./composables/useIsMobile";

import type { Component, ComputedRef } from "vue";
import { computed, provide } from "vue";
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
const { isMobile } = useIsMobile()

const layout = computed<string>(() => route.meta.layout as string);

authStore.refresh();

provide<ComputedRef<boolean>>('isMobile', isMobile)

</script>

<template>
  <Header></Header>
  <transition name="fade" mode="out-in">
    <component :is="components[layout]"></component>
  </transition>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
</template>

<style>
html {
  font-size: clamp(0.625rem, 0.5472rem + 0.2928vw, 1.25rem);
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
