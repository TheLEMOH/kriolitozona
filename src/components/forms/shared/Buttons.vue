<script lang="ts" setup>
import { computed } from "vue";
import Button from "primevue/button";
import { useRoute } from "vue-router";
import { useConfirm } from "primevue/useconfirm";

interface Props {
  openButton?: boolean;
}

withDefaults(defineProps<Props>(), {
  openButton: () => true,
});

const route = useRoute();
const confirm = useConfirm();

const emit = defineEmits(["post", "delete", "save", "open"]);

const type = computed(() => route.meta.typePage);

const ConfirmDelete = () => {
  confirm.require({
    message: "Удалить объект?",
    header: "Подтверждение удаления объекта",
    icon: "pi pi-exclamation-triangle",
    rejectClass: "p-button-secondary p-button-outlined",
    rejectLabel: "Отменить",
    acceptClass: "p-button-danger",
    acceptLabel: "Удалить",
    accept: () => {
      emit("delete");
    },
  });
};
</script>

<template>
  <div class="action-buttons">
    <template v-if="type == 'create'">
      <Button label="Создать" size="large" @click="emit('post')" raised></Button>
    </template>
    <template v-if="type == 'edit'">
      <Button label="Удалить" severity="danger" size="large" @click="ConfirmDelete" raised></Button>
      <Button label="Открыть карточку" size="large" @click="emit('open')" raised v-if="openButton"></Button>
      <Button label="Сохранить" size="large" @click="emit('save')" raised></Button>
    </template>
  </div>
</template>

<style>
.action-buttons {
  display: flex;
  justify-content: end;
  gap: 1rem;
}

@media (max-width: 550px) {
  .action-buttons {
    flex-direction: column;
  }
}
</style>
