<script setup lang="ts">
import { ref } from "vue";

import Column from "primevue/column";
import Table from "../shared/Table.vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";

import { DataTableFilterMeta } from "primevue/datatable";
import { useRouter } from "vue-router";

import { FilterMatchMode } from "primevue/api";

import { stateSoil, landscapes, microrelief, typesOfSoil, isExist, compositions } from "../../../select/select";

defineProps<{
  items: [];
}>();

const router = useRouter();

const dictonary: Record<string, string> = {
  true: 'Да',
  false: 'Нет'
}

const filters = ref<DataTableFilterMeta>({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  date: { value: null, matchMode: FilterMatchMode.DATE_IS },
  soilProfileCondition: { value: null, matchMode: FilterMatchMode.CONTAINS },
  landscape: { value: null, matchMode: FilterMatchMode.CONTAINS },
  microrelief: { value: null, matchMode: FilterMatchMode.CONTAINS },
  typeOfSoil: { value: null, matchMode: FilterMatchMode.CONTAINS },
  isPermafrost: { value: null, matchMode: FilterMatchMode.EQUALS },
  permafrostBoundary: { value: null, matchMode: FilterMatchMode.CONTAINS },
  granularComposition: { value: null, matchMode: FilterMatchMode.EQUALS },
  layerDepth: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const global = ref(["name"]);

const formatDate = (date: string) => {
  const newDate = new Date(date);

  return newDate.toLocaleString("ru", { day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric" });
};

const RedirectEdit = (id: string) => {
  router.push({ name: "experimentEdit", params: { id } });
};

const RedirectOpen = (id: string) => {
  router.push({ name: "experimentDisplay", params: { id } });
};

const UpdateFilters = (e: DataTableFilterMeta) => {
  filters.value = e;
};
</script>

<template>
  <Table :items="items" :filters="filters" @updateFilters="UpdateFilters" :filterDisplay="'row'"
    :globalFilterFields="global" :tableLayout="'fixed'">
    <template #columns>
      <Column field="name" header="Имя п/п" :showFilterMenu="false" style="width: 200px">
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" @input="filterCallback()" type="text" class="p-column-filter"
            placeholder="Поиск по имени" />
        </template>
      </Column>
      <Column field="date" header="Дата" :showFilterMenu="false" style="width: 140px">
        <template #body="slotProps">
          {{ formatDate(slotProps.data.date) }}
        </template>
      </Column>
      <Column field="soilProfileCondition" header="Состояние п/п" :showFilterMenu="false" style="width: 200px">
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="stateSoil" optionValue="label"
            optionLabel="label" placeholder="Выберите из списка">
          </Dropdown>
        </template>
      </Column>
      <Column field="landscape" header="Ландшафт" :showFilterMenu="false" style="width: 180px">
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="landscapes" optionValue="label"
            optionLabel="label" placeholder="Выберите из списка">
          </Dropdown>
        </template>
      </Column>
      <Column field="microrelief" header="Микрорельеф" :showFilterMenu="false" style="width: 180px">
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="microrelief" optionValue="label"
            optionLabel="label" placeholder="Выберите из списка">
          </Dropdown>
        </template>
      </Column>
      <Column field="typeOfSoil" header="Тип почвы" :showFilterMenu="false" style="width: 180px">
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="typesOfSoil" optionValue="label"
            optionLabel="label" placeholder="Выберите из списка">
          </Dropdown>
        </template>
      </Column>
      <Column field="isPermafrost" header="Присутствие мерзлоты" :showFilterMenu="false" style="width: 150px">
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="isExist" optionValue="value"
            optionLabel="label" placeholder="Выберите из списка"> </Dropdown>
        </template>
        <template #body="{ data }">
          {{ dictonary[data.isPermafrost] }}
        </template>
      </Column>
      <Column field="permafrostBoundary" header="Граница залегания мерзлоты" :showFilterMenu="false"
        style="width: 180px">
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" @input="filterCallback()" type="text" class="p-column-filter"
            placeholder="Поиск по имени" />
        </template>
      </Column>
      <Column field="granularComposition" header="Грансостав" :showFilterMenu="false" style="width: 120px">
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="compositions" optionValue="label"
            optionLabel="label" placeholder="Выберите из списка">
          </Dropdown>
        </template>
      </Column>
      <Column field="layerDepth" header="Глубина СТС" :showFilterMenu="false" style="width: 150px">
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" @input="filterCallback()" type="text" class="p-column-filter"
            placeholder="Поиск по имени" />
        </template>
      </Column>
      <Column header="" style="width: 80px">
        <template #body="slotProps">
          <div style="display: flex; gap: 0.5rem">
            <Button icon="pi pi-pencil" raised @click="RedirectEdit(slotProps.data.id)"></Button>
            <Button icon="pi pi-folder-open" raised @click="RedirectOpen(slotProps.data.id)"></Button>
          </div>
        </template>
      </Column>
    </template>
  </Table>
</template>

<style></style>
