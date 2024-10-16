<script lang="ts" setup>
</script>

<template>
  <div class="center">
    <div class="center-body">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style>
.center-body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 51px - 1rem);
  background-color: var(--surface-1);
}

@keyframes animatedBackground {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0px 100vh;
  }
}
</style>
