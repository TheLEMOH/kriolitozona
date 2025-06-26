export default interface DepthDTO {
  name: string;
  value: number;
  temperatureAtDepth?: number;
  humidity?: number;
  pH?: number;
  thermalConductivityIndex?: number;
  heatFluxValue?: number;
  organicContentSubstances?: number;
  experimentId?: number;
}
