"use client";
import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5percent from "@amcharts/amcharts5/percent";

function PieAmChart(props) {
  const chartID = props.chartID;
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current) {
      const root = am5.Root.new(chartID);
      root.setThemes([am5themes_Animated.new(root)]);
      rootRef.current = root;

      const chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          endAngle: 270,
        })
      );

      const series = chart.series.push(
        am5percent.PieSeries.new(root, {
          valueField: "value",
          categoryField: "category",
          endAngle: 270,
        })
      );

      series.states.create("hidden", {
        endAngle: -90,
      });

      let data = [
        { category: "اتوبوس", value: 501.9 },
        { category: "مینی بوس", value: 301.9 },
        { category: "سواری", value: 201.1 },
      ];

      series.data.setAll(data);
      series.appear(1000, 100);
      // Increase font size for category labels
      series.labels.template.setAll({
        fontSize: "0.5em",
        fontFamily: "Vazir, sans-serif",
        direction:'rtl'
      });

      // Increase font size for value labels
      series.ticks.template.setAll({
        fontSize: "0.5em",
        fontFamily: "Vazir, sans-serif",
        direction:'rtl'
      });
    }

    return () => {
      if (rootRef.current) {
        rootRef.current.dispose();
        rootRef.current = null;
      }
    };
  }, [chartID]);

  return (
    <>
      <div id={chartID} style={{ minHeight: "365px", direction: "ltr" }}></div>
    </>
  );
}

export default PieAmChart;
