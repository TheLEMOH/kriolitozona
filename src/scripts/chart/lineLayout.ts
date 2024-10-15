export default {
  grid: { left: "5%", right: "5%", bottom: "10%", top: "10%" },
  xAxis: {
    type: "value",
    boundaryGap: false,
    min: "dataMin",
    max: "dataMax",
    scale: false,
    splitLine: {
      lineStyle: {
        color: "#424b57",
      },
    },
  },
  yAxis: {
    type: "value",
    splitLine: {
      lineStyle: {
        color: "#424b57",
      },
    },
  },

  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
    },
  },
};
