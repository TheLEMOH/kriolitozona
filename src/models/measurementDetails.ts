export default interface MeasurementDetailsDTO {
    experimentId?: number | string | string[],
    airTemperature?: number,
    layerDepth?: number,
    humidity?: number,
    surfaceAlbedo?: number,
    numberOfGPRTracks?: number,
    scanningFrequency?: string,
}