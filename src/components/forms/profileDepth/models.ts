export default interface DepthDTO {
  name: string;
  value: Number;
  temperatureAtDepth?: Number;
  humidity?: Number;
  pH?: Number;
  thermalConductivityIndex?: Number;
  heatFluxValue?: Number;
  organicContentSubstances?: Number;
  experimentId?: number;
}
