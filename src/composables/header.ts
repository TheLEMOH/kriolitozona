import { ref, computed } from "vue";
import { useAuthStore } from "../store/auth";
import { useRoute } from "vue-router";

export default function useHeader() {
  const route = useRoute();
  const authStore = useAuthStore();

  const isEntered = computed(() => authStore.isEntered);
  const client = computed(() => authStore.getClient);

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

  const setRouteIndex = () => {
    active.value = items.value.findIndex((element) => element.route?.name == name.value);
  };

  return { items, isEntered, client, name, active, quit: authStore.quit, setRouteIndex };
}
