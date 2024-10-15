export default interface MeasurementDTO {
  name: string;
  value: number;
  heatFlowMeasurementLevel?: number;
  bottomLayerTemperature?: number;
  topLayerTemperature?: number;
  heatFlowValue?: number;
  experimentId?: number;
}
