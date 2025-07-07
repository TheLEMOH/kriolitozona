<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";

import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

import Information from "../../../components/forms/information/Information.vue";
import DescriptionSoil from "../../../components/forms/descriptionSoil/DescriptionSoil.vue";
import ProfileHorizon from "../../../components/forms/profileHorizonts/ProfileHorizon.vue";
import ProfileDepth from "../../../components/forms/profileDepth/ProfileDepth.vue";
import Measurement from "../../../components/forms/measurements/Measurement.vue";
import MeasurementDetails from "../../../components/forms/measurements/MeasurementDetails.vue";
import ImagesUpload from "../../../components/forms/images/ImagesUpload.vue";
import FilesUpload from "../../../components/forms/files/FilesUpload.vue";
import Buttons from "../../../components/forms/shared/Buttons.vue";
import ImageEdit from "../../forms/images/ImageEdit.vue";
import FileEdit from "../../forms/files/FileEdit.vue";

import ExperimentService from "../../../service/experiment";
import DepthService from "../../../service/depth";
import MeasurementService from "../../../service/measurement";
import HorizonService from "../../../service/horizon";

import ExperimentDTO from "../../../models/experiment";
import DepthDTO from "../../../components/forms/profileDepth/models";
import HorizonDTO from "../../../components/forms/profileHorizonts/models";
import MeasurementDTO from "../../../components/forms/measurements/models";
import ExperimentHeader from "../../header/ExperimentHeader.vue";
import imageService from "../../../service/image";
import fileService from "../../../service/file";
import MeasurementDetailsService from "../../../service/measurementDetails";
import MeasurementDetailsDTO from "../../../models/measurementDetails";
import useMeasurementDetails from "../../../composables/useMeasurementDetails";

const router = useRouter();
const route = useRoute();
const toast = useToast();

const id = route.params.id;
const typePage = route.meta.typePage;

const item: Ref = ref<ExperimentDTO>({ images: [], files: [] });
const depths: Ref = ref<DepthDTO[]>([]);
const horizons: Ref = ref<HorizonDTO[]>([]);
const measurements: Ref = ref<MeasurementDTO[]>([]);
const measurementDetails: Ref = ref<MeasurementDetailsDTO[]>([{ experimentId: id }])

const { addDetails, deleteDetails } = useMeasurementDetails(measurementDetails)

if (id) {
  const promiseExperiment = ExperimentService.getById(id);
  const promiseHorizon = HorizonService.getByExperiment(id);
  const promiseDepth = DepthService.getByExperiment(id);
  const promiseMeasurement = MeasurementService.getByExperiment(id);
  const promiseMeasurementDetails = MeasurementDetailsService.getByExperiment(id)

  await Promise.all([promiseExperiment, promiseHorizon, promiseDepth, promiseMeasurement, promiseMeasurementDetails]).then((data) => {
    item.value = data[0];
    horizons.value = data[1];
    depths.value = data[2];
    measurements.value = data[3];
    measurementDetails.value = data[4]

    if (data[4].length == 0)
      measurementDetails.value.push({})
  });
}

function Update<E extends keyof ExperimentDTO>(event: { field: E; value: ExperimentDTO[E] }) {
  item.value[event.field] = event.value;
}

function UpdateDepth(e: DepthDTO[]) {
  depths.value = e;
}

function UpdateHorizon(e: HorizonDTO[]) {
  horizons.value = e;
}

function UpdateMeasurement(e: MeasurementDTO[]) {
  measurements.value = e;
}

function UpdateMeasurementDetails(update: { field: string, value: number | string, index: number }) {
  measurementDetails.value[update.index][update.field] = update.value;
}

const Post = async () => {
  ExperimentService.post(item.value)
    .then((experiment: ExperimentDTO) => {
      depths.value.forEach((depth: DepthDTO) => {
        depth.experimentId = experiment.id;
      });

      horizons.value.forEach((horizon: HorizonDTO) => {
        horizon.experimentId = experiment.id;
      });

      measurements.value.forEach((measurement: MeasurementDTO) => {
        measurement.experimentId = experiment.id;
      });

      const promiseDepth = DepthService.post(depths.value);
      const promiseHorizon = HorizonService.post(horizons.value);
      const promiseMeasurement = MeasurementService.post(measurements.value);

      Promise.all([promiseDepth, promiseHorizon, promiseMeasurement])
        .then(() => {
          toast.add({ severity: "success", summary: "Добавление", detail: "Эксперимент добавлен", life: 2000 });

          router.push({ name: "experimentEdit", params: { id: experiment.id } });
        })
        .catch((er) => {
          toast.add({ severity: "error", summary: "Добавление", detail: er, life: 2000 });
        });
    })
    .catch((err) => {
      toast.add({ severity: "error", summary: "Добавление", detail: err, life: 2000 });
    });
};

const Put = async () => {
  const promiseExperiment = ExperimentService.update(item.value);

  depths.value.forEach((depth: DepthDTO) => {
    depth.experimentId = item.value.id;
  });

  horizons.value.forEach((horizon: HorizonDTO) => {
    horizon.experimentId = item.value.id;
  });

  measurements.value.forEach((measurement: MeasurementDTO) => {
    measurement.experimentId = item.value.id;
  });

  measurementDetails.value.forEach((measurement: MeasurementDetailsDTO) => {
    measurement.experimentId = item.value.id;
  });

  const promiseDepth = DepthService.updateBulk(depths.value, item.value.id);
  const promiseHorizon = HorizonService.updateBulk(horizons.value, item.value.id);
  const promiseMeasurement = MeasurementService.updateBulk(measurements.value, item.value.id);
  const promiseMeasurementDetails = MeasurementDetailsService.updateBulk(measurementDetails.value, item.value.id)

  Promise.all([promiseExperiment, promiseDepth, promiseHorizon, promiseMeasurement, promiseMeasurementDetails])
    .then(() => {
      toast.add({ severity: "success", summary: "Изменение", detail: "Эксперимент изменен", life: 2000 });

      router.push({ name: "home" });
    })
    .catch((er) => {
      toast.add({ severity: "error", summary: "Изменение", detail: er, life: 2000 });
    });
};

const Remove = async () => {
  ExperimentService.remove(id)
    .then(() => {
      toast.add({ severity: "success", summary: "Удаление", detail: "Эксперимент удален", life: 2000 });

      router.push({ name: "home" });
    })
    .catch((er) => {
      toast.add({ severity: "error", summary: "Удаление", detail: er, life: 2000 });
    });
};

const Open = async () => {
  router.push({ name: "experimentDisplay", params: { id } });
};

const ImageDone = async (images: string[]) => {
  item.value.images.push(...images);

  await ExperimentService.update({ id: item.value.id, images: item.value.images });
};

const ImageDelete = async (image: string) => {
  const index = item.value.images.findIndex((i: string) => i == image);

  await imageService.remove(item.value.id, image);

  item.value.images.splice(index, 1);

  await ExperimentService.update({ id: item.value.id, images: item.value.images });
};

const FileDone = async (files: [string]) => {
  item.value.files.push(...files);

  await ExperimentService.update({ id: item.value.id, files: item.value.files });
};

const FileDelete = async (file: string) => {
  const index = item.value.files.findIndex((i: string) => i == file);

  await fileService.remove(item.value.id, file);

  item.value.files.splice(index, 1);

  await ExperimentService.update({ id: item.value.id, files: item.value.files });
};
</script>

<template>
  <div class="page">
    <ExperimentHeader></ExperimentHeader>
    <Information :item="item" @update-field="Update"></Information>
    <DescriptionSoil :item="item" @update-field="Update"></DescriptionSoil>
    <ProfileHorizon :data="horizons" @update="UpdateHorizon"></ProfileHorizon>
    <ProfileDepth :data="depths" @update="UpdateDepth"></ProfileDepth>
    <MeasurementDetails :item="measurementDetails" @update-field="UpdateMeasurementDetails" @add="addDetails"
      @delete="deleteDetails"></MeasurementDetails>
    <Measurement :data="measurements" @update="UpdateMeasurement"></Measurement>
    <ImagesUpload :id="item.id" @done="ImageDone" v-if="typePage == 'edit'"></ImagesUpload>
    <ImageEdit :id="item.id" :images="item.images" @delete="ImageDelete" v-if="typePage == 'edit'"></ImageEdit>
    <FilesUpload :id="item.id" @done="FileDone" v-if="typePage == 'edit'"></FilesUpload>
    <FileEdit :id="item.id" :files="item.files" @delete="FileDelete" v-if="typePage == 'edit'"></FileEdit>
    <Buttons @post="Post" @delete="Remove" @save="Put" @open="Open"></Buttons>
  </div>
</template>
