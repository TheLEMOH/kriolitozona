<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import TabMenu from "primevue/tabmenu";
import Button from "primevue/button";
import Divider from "primevue/divider";
import { useRoute } from "vue-router";
import { useAuthStore } from "../../store/auth";

const route = useRoute();
const authStore = useAuthStore();

const client = computed(() => authStore.getClient);

const items = ref([
  { label: "Главная", icon: "pi pi-home", route: { name: "home" } },
  { label: "Пользователи", icon: "pi pi-users", route: { name: "userAll" } },
  { label: "Добавить пользователя", icon: "pi pi-plus-circle", route: { name: "userCreate" } },
  { label: "Добавить эксперимент", icon: "pi pi-plus-circle", route: { name: "experimentCreate" } },
]);

const active = ref(0);

const name = computed(() => route.name);

const SetRouteIndex = () => {
  active.value = items.value.findIndex((element) => element.route?.name == name.value);
};

SetRouteIndex();

watch(name, () => {
  SetRouteIndex();
});
</script>

<template>
  <header class="menubar">
    <TabMenu :model="items" v-model:activeIndex="active" style="flex-shrink: 0">
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span v-bind="props.icon" />
            <span v-bind="props.label">{{ item.label }}</span>
          </a>
        </router-link>
      </template>
    </TabMenu>
    <Divider layout="vertical" />
    <div class="menubar-user">
      {{ client.login }}
      <Button label="Выйти" size="small" rounded @click="authStore.quit()"> </Button>
    </div>
  </header>
</template>

<style>
.menubar {
  display: flex;
  justify-content: center;
  overflow-x: auto;
  margin-bottom: 1rem;
  background-color: var(--surface-50);
  scrollbar-width: none;
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
