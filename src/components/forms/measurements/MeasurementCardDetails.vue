<script lang="ts" setup>
import List from '../shared/List.vue';
import ListItem from '../shared/ListItem.vue';
import GroupDisplay from '../shared/GroupDisplay.vue';
import MeasurementDetailsDTO from '../../../models/measurementDetails';

defineProps<{
    items: MeasurementDetailsDTO[];
}>();
</script>

<template>
    <List>
        <template #body>
            <ListItem v-for="(item, index) in items" :index="index">
                <template #fields>
                    <GroupDisplay :title="'Tемпература воздуха, &deg;C'" :value="item.airTemperature">
                    </GroupDisplay>
                    <GroupDisplay :title="'Грубина СТС, см'" :value="item.layerDepth"></GroupDisplay>
                    <GroupDisplay :title="'Влажность воздуха, %'" :value="item.humidity"></GroupDisplay>
                    <GroupDisplay :title="'Альбедо поверхности'" :value="item.surfaceAlbedo"></GroupDisplay>
                    <GroupDisplay :title="'Количество георадарных треков'" :value="item.numberOfGPRTracks">
                    </GroupDisplay>
                    <GroupDisplay :title="'Частота сканирования'" :value="item.scanningFrequency"></GroupDisplay>
                </template>
            </ListItem>
        </template>
    </List>
</template>

<style></style>