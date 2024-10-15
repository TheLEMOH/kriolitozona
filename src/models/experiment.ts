export default interface ExperimentDTO {
  id?: number;
  name?: string;
  date?: string | string[] | Date | Date[];
  number?: number;
  soilProfileCondition?: string;
  landscape?: string;
  lat?: string;
  long?: string;
  geobotany?: string;
  microrelief?: string;
  typeOfSoil?: string;
  isGleying?: boolean;
  isPermafrost?: boolean;
  isPyrogenic?: boolean;
  permafrostBoundary?: number;
  numberOfSoilCuts?: number;
  granularComposition?: string;
  airTemperature?: number;
  layerDepth?: number;
  humidity?: number;
  surfaceAlbedo?: number;
  numberOfGPRTracks?: number;
  scanningFrequency?: string;
  images?: string[];
  files?: string[];
}
