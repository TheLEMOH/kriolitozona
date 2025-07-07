<script setup lang="ts">
import { Ref, ref, computed } from "vue";
import { useRoute } from "vue-router";

import Form from "../../../components/forms/shared/Form.vue";
import GroupDisplay from "../../../components/forms/shared/GroupDisplay.vue";
import MeasurementCardDetails from "../../forms/measurements/MeasurementCardDetails.vue";

import ProfileHorizon from "../../../components/tables/experiments/ProfileHorizon.vue";
import ProfileDepth from "../../../components/tables/experiments/ProfileDepth.vue";
import Measurements from "../../../components/tables/experiments/Measurements.vue";

import ImageEdit from "../../../components/forms/images/ImageEdit.vue";
import FileEdit from "../../forms/files/FileEdit.vue";
import LineChart from "../../../components/charts/shared/LineChart.vue";

import ExperimentService from "../../../service/experiment";
import HorizonService from "../../../service/horizon";
import DepthService from "../../../service/depth";
import MeasurementService from "../../../service/measurement";

import ExperimentDTO from "../../../models/experiment";
import HorizonDTO from "../../../components/forms/profileHorizonts/models";
import DepthDTO from "../../../components/forms/profileDepth/models";
import MeasurementDTO from "../../../components/forms/measurements/models";

import createChartSeries from "../../../scripts/chart/createChartData";

import lineLayout from "../../../scripts/chart/lineLayout";
import MeasurementDetailsDTO from "../../../models/measurementDetails";
import MeasurementDetailsService from "../../../service/measurementDetails";

const route = useRoute();

const id = route.params.id;

const dictonary: Record<string, string> = {
  true: 'Да',
  false: 'Нет'
}

const item: Ref = ref<ExperimentDTO>(await ExperimentService.getById(id));
const horizons: Ref = ref<HorizonDTO[]>(await HorizonService.getByExperiment(id));
const depths: Ref = ref<DepthDTO[]>(await DepthService.getByExperiment(id));
const measurements: Ref = ref<MeasurementDTO[]>(await MeasurementService.getByExperiment(id));
const measurementDetails: Ref = ref<MeasurementDetailsDTO>(await MeasurementDetailsService.getByExperiment(id))

const groupForChart = [{
  label: 'График влажности по глубине',
  y: 'value',
  x: 'humidity',
}, {
  label: 'График распределения температуры по глубине',
  y: 'value',
  x: 'temperatureAtDepth',
}, {
  label: 'График теплового потока по глубине',
  y: 'value',
  x: 'heatFluxValue',
}, {
  label: 'График содержания органического вещества по глубине',
  y: 'value',
  x: 'organicContentSubstances',
}]

const charts = groupForChart.map(group => {
  return { label: group.label, series: createChartSeries.lineChart<DepthDTO>(depths.value, group.x, group.y) };
})

const title = computed(() => {
  const { name, date } = item.value;
  const newDate = new Date(date);
  return `${name} от ${newDate.toLocaleString("ru")}`;
});

const subtitle = computed(() => {
  const { lat, long } = item.value;
  return `Координаты местности: ${lat} ${long}`;
});

</script>

<template>
  <div class="page">
    <Form :title="title" :subtitle="subtitle" :center="true" :gap="1">
      <template #fields>
        <div class="group-space">
          <GroupDisplay :title="'Геоботаника '" :value="item.geobotany"></GroupDisplay>
        </div>
        <div class="group-space">
          <GroupDisplay :title="'Ландшафт'" :value="item.landscape"></GroupDisplay>
          <GroupDisplay :title="'Состояние почвенного профиля'" :value="item.soilProfileCondition"></GroupDisplay>
          <GroupDisplay :title="'Микрорельеф'" :value="item.microrelief"></GroupDisplay>
          <GroupDisplay :title="'Тип почвы'" :value="item.typeOfSoil"></GroupDisplay>
          <GroupDisplay :title="'Наличие оглеения'" :value="dictonary[item.isGleying]"></GroupDisplay>
        </div>
        <div class="group-space">
          <GroupDisplay :title="'Присутствие мерзлоты'" :value="dictonary[item.isPermafrost]"></GroupDisplay>
          <GroupDisplay :title="'Пирогенный фактор'" :value="dictonary[item.isPyrogenic]"></GroupDisplay>
          <GroupDisplay :title="'Граница залегания мерзлоты, см'" :value="item.permafrostBoundary"></GroupDisplay>
          <GroupDisplay :title="'Число разрезов на почвенном профиле'" :value="item.numberOfSoilCuts"></GroupDisplay>
          <GroupDisplay :title="'Грансостав'" :value="item.granularComposition"></GroupDisplay>
        </div>
      </template>
    </Form>

    <Form :title="'Строение профиля по горизонтам'" :fill="true">
      <template #fields>
        <ProfileHorizon :items="horizons"></ProfileHorizon>
      </template>
    </Form>

    <Form :title="'Характеристики почвенного профиля по глубинам'" :fill="true">
      <template #fields>
        <ProfileDepth :items="depths"></ProfileDepth>
      </template>
    </Form>

    <Form :title="'Практические измерения'" :gap="2" :fill="true">
      <template #fields>
        <MeasurementCardDetails :items="measurementDetails"></MeasurementCardDetails>
      </template>
    </Form>

    <Form :title="'Практические измерения теплового потока'" :fill="true">
      <template #fields>
        <Measurements :items="measurements"></Measurements>
      </template>
    </Form>

    <ImageEdit :id="item.id" :images="item.images"></ImageEdit>
    <FileEdit :id="item.id" :files="item.files"></FileEdit>


    <div class="group-chart">
      <Form v-for="chart in charts" :title="chart.label" :center="true" :fill="true" class="group-chart-form">
        <template #fields>
          <LineChart :options="lineLayout" :series="chart.series"></LineChart>
        </template>
      </Form>
    </div>
  </div>
</template>

<style scoped>
.group-chart {
  display: flex;
  gap: 0rem 1rem;
  flex-wrap: wrap;
}

.group-chart-form {
  width: calc(100% / 2 - 0.5rem) !important
}

@media (max-width: 768px) {
  .group-chart {
    flex-direction: column;
  }

  .group-chart-form {
    width: calc(100%) !important
  }
}

.group-space {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
