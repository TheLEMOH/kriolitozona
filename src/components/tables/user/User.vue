<script setup lang="ts">
import Column from "primevue/column";
import Table from "../shared/Table.vue";
import Button from "primevue/button";

import { useRouter } from "vue-router";

const router = useRouter();

const RedirectEdit = (id: string) => {
  router.push({ name: "userEdit", params: { id } });
};
</script>

<template>
  <Table :items="[]" :filterDisplay="undefined" :tableLayout="'auto'">
    <template #columns>
      <Column field="name" header="ФИО"></Column>
      <Column field="login" header="Логин"></Column>
      <Column header="" style="width: 50px">
        <template #body="slotProps">
          <Button icon="pi pi-pencil" raised @click="RedirectEdit(slotProps.data.id)"></Button>
        </template>
      </Column>
    </template>
  </Table>
</template>

<style></style>
