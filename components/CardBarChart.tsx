import React, { useEffect } from "react";
import Charter, { ChartConfiguration } from "./chart/Charter";

const CardBarChart = ({ title, total, details, label, xLabel, yLabel }) => {
  const config: ChartConfiguration = {
    type: "bar",
    data: {
      labels: label,
      datasets: [
        {
          label: new Date().getFullYear().toString(),
          backgroundColor: "#ed64a6",
          borderColor: "#ed64a6",
          data: details,
          fill: false,
          barThickness: 8,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      interaction: {
        intersect: false,
        mode: "index",
      },
      plugins: {
        title: {
          display: true,
          text: `Survey participants = ${total}`,
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
        // hover: {
        //   mode: 'nearest',
        //   intersect: false,
        // },
        legend: {
          labels: {
            color: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
      },
      scales: {
        x: {
          display: true,
          ticks: {
            major: {
              enabled: true,
            },
          },
          title: {
            display: true,
            text: xLabel,
          },
          grid: {
            borderDash: [2],
            borderDashOffset: 2,
            color: "rgba(33, 37, 41, 0.3)",
            // zeroLineColor: 'rgba(33, 37, 41, 0.3)',
            // zeroLineBorderDash: [2],
            // zeroLineBorderDashOffset: [2],
          },
        },
        y: {
          display: true,
          ticks: {
            major: {
              enabled: true,
            },
          },
          title: {
            display: true,
            text: yLabel,
          },
          grid: {
            borderDash: [2],
            drawBorder: false,
            borderDashOffset: 2,
            color: "rgba(33, 37, 41, 0.2)",
            // zeroLineColor: 'rgba(33, 37, 41, 0.15)',
            // zeroLineBorderDash: [2],
            // zeroLineBorderDashOffset: [2],
          },
        },
      },
    },
  };
  return (
    <>
      <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white shadow-lg">
        <div className="mb-0 rounded-t bg-transparent px-4 py-3">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-1 flex-grow">
              <h6 className="mb-1 text-xs font-semibold uppercase text-slate-400">
                Survey Report
              </h6>
              <h2 className="text-xl font-semibold text-slate-700">{title}</h2>
            </div>
          </div>
        </div>
        <div className="flex-auto p-4">
          {/* Chart */}
          <Charter className="relative lg:h-[30rem]" chartConfig={config} />
        </div>
      </div>
    </>
  );
};
export default CardBarChart;
