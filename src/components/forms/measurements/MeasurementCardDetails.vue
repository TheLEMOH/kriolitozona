<script lang="ts" setup>
import GroupDisplay from '../shared/GroupDisplay.vue';
import ExperimentDTO from "../../../models/experiment";

defineProps<{
    item: ExperimentDTO;
}>();
</script>

<template>
    <GroupDisplay :title="'Tемпература воздуха, &deg;C'" :value="item.airTemperature"></GroupDisplay>
    <GroupDisplay :title="'Грубина СТС, см'" :value="item.layerDepth"></GroupDisplay>
    <GroupDisplay :title="'Влажность воздуха, %'" :value="item.humidity"></GroupDisplay>
    <GroupDisplay :title="'Альбедо поверхности (число повторностей)'" :value="item.surfaceAlbedo"></GroupDisplay>
    <GroupDisplay :title="'Количество георадарных треков'" :value="item.numberOfGPRTracks"></GroupDisplay>
    <GroupDisplay :title="'Частота сканирования'" :value="item.scanningFrequency"></GroupDisplay>
</template>

<style></style>