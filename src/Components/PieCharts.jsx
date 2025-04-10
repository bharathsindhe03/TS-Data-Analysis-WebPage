import React from "react";
import ReactECharts from "echarts-for-react";
import NoDataField from "./NoDataFeild";
import { isDartheme } from "../Uitls/ThemeChecker";
export default function PieCharts({ data }) {
  if (data == undefined) return <NoDataField />;
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));
  const option = {
    title: {
      text: "Data Distribution",
      left: "center",
    },
    tooltip: {
      trigger: "item",
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
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
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
