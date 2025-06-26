<script lang="ts" setup>
import { ComputedRef, inject, watch } from "vue";
import TabMenu from "primevue/tabmenu";
import Button from "primevue/button";
import Divider from "primevue/divider";

import useTheme from "../../composables/theme";
import useHeader from "../../composables/header";

const isMobile = inject<ComputedRef<boolean>>('isMobile')

const { items, isEntered, client, name, active, quit, setRouteIndex } = useHeader();
const { changeTheme, setTheme } = useTheme();

setRouteIndex();
setTheme();

watch(name, () => {
  setRouteIndex();
});
</script>

<template>
  <header class="menubar">
    <TabMenu :model="items" v-model:activeIndex="active" style="flex-shrink: 0">
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <template v-if="isMobile">
            <a :href="href" v-bind="props.action" @click="navigate" v-tooltip.bottom="item.label">
              <span v-bind="props.icon" />
            </a>
          </template>
          <template v-else>
            <a :href="href" v-bind="props.action" @click="navigate">
              <span v-bind="props.icon" />
              <span v-bind="props.label">{{ item.label }}</span>
            </a>
          </template>

        </router-link>
      </template>
    </TabMenu>
    <template v-if="isEntered">
      <Divider layout="vertical" />
      <div class="menubar-user">
        {{ client?.login }}
        <Button icon="pi pi-sign-out" text rounded @click="quit()"> </Button>
        <Button icon="pi pi-moon" text rounded @click="changeTheme()"> </Button>
      </div>
    </template>
  </header>
</template>

<style>
.menubar {
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 1rem;
  background-color: var(--surface-0);
  border: var(--surface-50) 1px solid;
  scrollbar-width: none;
  z-index: 100;
}

.menubar-user {
  display: flex;
  align-items: center;
  padding-right: 1rem;
  gap: 1rem;
}

@media (max-width: 700px) {
  .menubar {
    justify-content: start;
  }
}
</style>
