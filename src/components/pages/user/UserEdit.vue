<script setup lang="ts">
import { ref } from "vue";

import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

import Buttons from "../../forms/shared/Buttons.vue";

import User from "../../forms/user/User.vue";
import UserDTO from "../../../models/user";
import UserService from "../../../service/user";
import UserHeader from "../../header/UserHeader.vue";

const router = useRouter();
const route = useRoute();
const toast = useToast();

const id = route.params.id;
/* const typePage = route.meta.typePage; */

const item = ref<UserDTO>({});

if (id) {
  item.value = await UserService.getById(id);
}

function Update<E extends keyof UserDTO>(event: { field: E; value: UserDTO[E] }) {
  item.value[event.field] = event.value;
}

const CreateUser = async () => {
  UserService.post(item.value)
    .then(() => {
      router.push({ name: "userAll" });

      toast.add({ severity: "success", summary: "Добавление", detail: "Пользователь добавлен", life: 2000 });
    })
    .catch((err) => {
      toast.add({ severity: "error", summary: "Добавление", detail: err, life: 2000 });
    });
};

const SaveUser = async () => {
  UserService.update(item.value)
    .then(() => {
      router.push({ name: "userAll" });

      toast.add({ severity: "success", summary: "Изменение", detail: "Пользователь изменен", life: 2000 });
    })
    .catch((err) => {
      toast.add({ severity: "error", summary: "Добавление", detail: err, life: 2000 });
    });
};

const DeleteUser = async () => {
  UserService.remove(id)
    .then(() => {
      router.push({ name: "userAll" });

      toast.add({ severity: "success", summary: "Удаление", detail: "Пользователь удален", life: 2000 });
    })
    .catch((err) => {
      toast.add({ severity: "error", summary: "Добавление", detail: err, life: 2000 });
    });
};
</script>

<template>
  <div class="page">
    <UserHeader></UserHeader>
    <User :item="item" @update-field="Update"></User>
    <Buttons :open-button="false" @post="CreateUser" @save="SaveUser" @delete="DeleteUser"></Buttons>
  </div>
</template>

<style></style>
