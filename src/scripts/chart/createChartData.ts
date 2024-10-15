import Series from "../../models/series";

class CreateChartSeries {
  lineChart<T>(rawData: T[], x: string, y: string): Series[] {
    const data: number[][] = rawData.map((element: any) => {
      return [element[x], element[y]];
    });

    return [
      {
        data: data,
        type: "line",
        lineStyle: { color: "#60a5fa" },
      },
    ];
  }
}

const createChartSeries = new CreateChartSeries();

export default createChartSeries;
