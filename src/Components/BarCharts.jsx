import React from "react";
import ReactECharts from "echarts-for-react";
import NoDataField from "./NoDataFeild";
import { isDartheme } from "../Uitls/ThemeChecker";
export default function BarCharts({ data }) {
  if (data == undefined) return <NoDataField />;

  const chartData = Object.entries(data).map(([x, y]) => ({ x, y }));
  const index = chartData.map((item) => item.x);
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
      data: index,
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: "value",
    },
    series: {
      type: "bar",
      name: "Direct",
      barWidth: "60%",
      data: chartData.map((item) => item.y),
    },
  };

  return (
    <ReactECharts
    option={option}
      theme={isDartheme.matches ? "dark" : "light"}
      sx={{ m: "1rem", height: "50vh", width: "50vh" }}
      className="cj"
    />
  );
}
