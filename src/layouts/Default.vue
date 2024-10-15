<script lang="ts" setup>
import Header from "../components/header/Header.vue";
import ProgressBar from "primevue/progressbar";
</script>

<template>
  <div class="default">
    <Header></Header>
    <div class="default-body">
      <Suspense>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
        <template #fallback>
          <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<style>
.default-body {
  padding: 0 1rem 0 1rem;
}
</style>
