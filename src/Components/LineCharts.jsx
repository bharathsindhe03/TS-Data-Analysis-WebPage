import React from "react";
import ReactECharts from "echarts-for-react";
import NoDataField from "./NoDataFeild";
import { isDartheme } from "../Uitls/ThemeChecker";
export default function LineCharts({ data }) {
  if (data == undefined) return <NoDataField />;

  const chartData = Object.entries(data).map(([x, y]) => ({ x, y }));

  const option = {
    title: {
      text: "Data Distribution",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: chartData.map((item) => item.x),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: chartData.map((item) => item.y),
        type: "line",
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      theme={isDartheme.matches ? "dark" : "light"}
      sx={{ m: "1rem", height: "50vh", width: "50vh" }}
    />
  );
}
