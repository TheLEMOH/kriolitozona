<script setup lang="ts">
import { ref } from "vue";

import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import { LoginPost } from "../../../models/auth";

const emit = defineEmits(["enter"]);

const user = ref<LoginPost>({ login: "", password: "" });

const Enter = () => {
  emit("enter", user.value);
};
</script>

<template>
  <div class="login" @keyup.enter="Enter">
    <h1>База экспериментальных данных исследования гидротермических процессов в криалитозоне Красноярского края.</h1>
    <h2>Вход в личный кабинет клиента</h2>
    <div class="login-form">
      <div class="login-form-group">
        <InputText class="login-input" id="login" v-model="user.login" placeholder="Введите логин"></InputText>
      </div>
      <div class="login-form-group">
        <Password inputClass="login-input" inputId="password" v-model="user.password" placeholder="Введите пароль" :feedback="false"></Password>
      </div>
      <Button class="login-button" label="Войти" size="large" @mousedown="Enter" type="submit"></Button>
    </div>
  </div>
</template>

<style>
.login {
  max-width: 600px;
  background: var(--surface-0);
  padding: 2rem;
  margin: 1rem;
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  border: var(--highlight-text-color) 1px solid;
  z-index: 10;
}

.login-input {
  background: transparent !important;
}

.login h1 {
  margin: 0;
  text-align: center;
}

.login h2 {
  text-align: center;
}

.login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
}

.login-form-group {
  display: flex;
  flex-direction: column;
}

@media (max-width: 425px) {
  .login h1 {
    font-size: 1.5rem;
  }

  .login h2 {
    font-size: 1rem;
  }
}

@media (max-width: 320px) {
  .login h1 {
    font-size: 1rem;
  }

  .login h2 {
    font-size: 0.9rem;
  }
}
</style>
