<script lang="ts" setup>
import { ref } from "vue";
import Experiments from "../../../components/tables/experiments/Experiment.vue";

import ExperimentService from "../../../service/experiment";

const items = ref<[]>(await ExperimentService.get());
</script>

<template>
  <Experiments :items="items"></Experiments>
</template>
