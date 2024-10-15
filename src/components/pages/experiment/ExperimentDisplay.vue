<script setup lang="ts">
import { Ref, ref, computed } from "vue";
import { useRoute } from "vue-router";

import Form from "../../../components/forms/shared/Form.vue";
import GroupDisplay from "../../../components/forms/shared/GroupDisplay.vue";

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
import Series from "../../../models/series";

import createChartSeries from "../../../scripts/chart/createChartData";

import lineLayout from "../../../scripts/chart/lineLayout";

const route = useRoute();

const id = route.params.id;

const item: Ref = ref<ExperimentDTO>(await ExperimentService.getById(id));
const horizons: Ref = ref<HorizonDTO[]>(await HorizonService.getByExperiment(id));
const depths: Ref = ref<DepthDTO[]>(await DepthService.getByExperiment(id));
const measurements: Ref = ref<MeasurementDTO[]>(await MeasurementService.getByExperiment(id));

const humiditySeries: Series[] = createChartSeries.lineChart<DepthDTO>(depths.value, "value", "humidity");
const temperatureSeries: Series[] = createChartSeries.lineChart<DepthDTO>(depths.value, "value", "temperatureAtDepth");
const heatFluxSeries: Series[] = createChartSeries.lineChart<DepthDTO>(depths.value, "value", "heatFluxValue");
const organicSeries: Series[] = createChartSeries.lineChart<DepthDTO>(depths.value, "value", "organicContentSubstances");

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
          <GroupDisplay :title="'Наличие оглеения'" :value="item.isGleying"></GroupDisplay>
        </div>
        <div class="group-space">
          <GroupDisplay :title="'Присутствие мерзлоты'" :value="item.isPermafrost"></GroupDisplay>
          <GroupDisplay :title="'Пирогенный фактор'" :value="item.isPyrogenic"></GroupDisplay>
          <GroupDisplay :title="'Граница залегания мерзлоты'" :value="item.permafrostBoundary"></GroupDisplay>
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

    <Form :title="'Практические измерения'" :fill="true">
      <template #fields>
        <Measurements :items="measurements"></Measurements>
      </template>
    </Form>

    <ImageEdit :id="item.id" :images="item.images"></ImageEdit>
    <FileEdit :id="item.id" :files="item.files"></FileEdit>

    <Form :title="'График влажности по глубине'" :center="true" :fill="true">
      <template #fields>
        <LineChart :options="lineLayout" :series="humiditySeries"></LineChart>
      </template>
    </Form>

    <Form :title="'График распределения температуры по глубине'" :center="true" :fill="true">
      <template #fields>
        <LineChart :options="lineLayout" :series="temperatureSeries"></LineChart>
      </template>
    </Form>

    <Form :title="'График теплового потока по глубине'" :center="true" :fill="true">
      <template #fields>
        <LineChart :options="lineLayout" :series="heatFluxSeries"></LineChart>
      </template>
    </Form>

    <Form :title="'График содержания органического вещества по глубине'" :center="true" :fill="true">
      <template #fields>
        <LineChart :options="lineLayout" :series="organicSeries"></LineChart>
      </template>
    </Form>
  </div>
</template>

<style>
.group-space {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
