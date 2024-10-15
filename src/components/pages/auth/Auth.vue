<script setup lang="ts">
import { LoginPost } from "../../../models/auth";
import Login from "../../forms/login/Login.vue";

import { useToast } from "primevue/usetoast";
import { useAuthStore } from "../../../store/auth";

const toast = useToast();
const store = useAuthStore();

const Enter = (event: LoginPost) => {
  store
    .login(event)
    .then(() => {
      toast.add({ severity: "success", summary: "Вход", detail: "Успешно!", life: 2000 });
    })
    .catch((e) => {
      toast.add({ severity: "error", summary: "Вход", detail: e, life: 2000 });
    });
};
</script>

<template>
  <Login @enter="Enter"></Login>
</template>
