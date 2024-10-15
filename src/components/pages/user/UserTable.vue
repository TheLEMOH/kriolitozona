<script lang="ts" setup>
import { ref } from "vue";

import User from "../../tables/user/User.vue";

import UserService from "../../../service/user";

const items = ref<[]>(await UserService.get());
</script>

<template>
  <User :items="items"></User>
</template>
