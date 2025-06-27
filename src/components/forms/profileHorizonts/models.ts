export default interface HorizonDTO {
  name: string;
  value: number;
  depthLowerLimitOfHorizon?: number;
  horizonDensity?: number;
  organicContentSubstances?: number;
  physicalSandContent?: number;
  physicalClayContent?: number;
  granularComposition?: String;
  experimentId?: number;
}
