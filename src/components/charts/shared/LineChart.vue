<script setup lang="ts">
import { ref, computed } from "vue";

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";

import Series from "../../../models/series";

import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from "echarts/components";

use([CanvasRenderer, LineChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent]);

import VChart from "vue-echarts";

const props = defineProps<{
  options: Object;
  series: Series[];
}>();

const isExist = computed(() => (props.series[0].data.length == 0 ? false : true));

const option = ref({
  ...props.options,
  series: props.series,
});
</script>

<template>
  <v-chart class="chart" :option="option" autoresize v-if="isExist" />
  <span v-else>Нет данных для построения графика</span>
</template>

<style>
.chart {
  height: 300px;
  width: 100%;
}
</style>
