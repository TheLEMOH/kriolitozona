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
const isEntered = computed(() => authStore.isEntered);

const itemsUser = ref([
  { label: "Список экспериментов", icon: "pi pi-home", route: { name: "home" } },
  { label: "Добавить эксперимент", icon: "pi pi-plus-circle", route: { name: "experimentCreate" } },
  { label: "Пользователи", icon: "pi pi-users", route: { name: "userAll" } },
  { label: "Добавить пользователя", icon: "pi pi-plus-circle", route: { name: "userCreate" } },
  { label: "О проекте", icon: "pi pi-info-circle", route: { name: "about" } },
  { label: "Контакты", icon: "pi pi-phone", route: { name: "contacts" } },
]);

const itemsGuest = ref([
  { label: "Войти", icon: "pi pi-sign-in", route: { name: "login" } },
  { label: "О проекте", icon: "pi pi-info-circle", route: { name: "about" } },
  { label: "Контакты", icon: "pi pi-phone", route: { name: "contacts" } },
]); 

const items = computed(() => {
  if (isEntered.value) {
    return itemsUser.value;
  } else {
    return itemsGuest.value;
  }
});

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
    <template v-if="isEntered">
      <Divider layout="vertical" />

      <div class="menubar-user">
        {{ client?.login }}
        <Button icon="pi pi-sign-out" text rounded @click="authStore.quit()"> </Button>
      </div>
    </template>
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
