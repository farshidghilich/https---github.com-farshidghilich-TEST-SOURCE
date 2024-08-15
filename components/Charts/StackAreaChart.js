"use client";
import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";

function StackAreaChart({ chartID }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current) {
      // Create a root element for the chart
      var root = am5.Root.new(chartID);
      rootRef.current = root;

      // Set themes
      root.setThemes([am5themes_Animated.new(root)]);

      // Prepare data
      const data = [
        { year: "1391", bus: 1200, miniBus: 300, car: 50 },
        { year: "1392", bus: 1500, miniBus: 320, car: 60 },
        { year: "1393", bus: 1350, miniBus: 250, car: 70 },
        { year: "1394", bus: 1400, miniBus: 280, car: 80 },
        { year: "1395", bus: 1600, miniBus: 300, car: 90 },
        { year: "1396", bus: 1700, miniBus: 290, car: 100 },
        { year: "1397", bus: 1650, miniBus: 270, car: 110 },
        { year: "1398", bus: 1750, miniBus: 260, car: 120 },
        { year: "1399", bus: 1800, miniBus: 280, car: 130 },
        { year: "1400", bus: 1900, miniBus: 290, car: 140 },
        { year: "1401", bus: 2000, miniBus: 285, car: 87 },
        { year: "1402", bus: 1159, miniBus: 277, car: 71 },
      ];

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      var chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          pinchZoomX: true,
          paddingLeft: 0,
        })
      );

      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      var cursor = chart.set(
        "cursor",
        am5xy.XYCursor.new(root, {
          behavior: "none",
        })
      );
      cursor.lineY.set("visible", false);
      const xRenderer = am5xy.AxisRendererX.new(root, {
        minorGridEnabled: true,
        minGridDistance: 70,
      });
      xRenderer.labels.template.setAll({
        textType: "adjusted",
        fontSize: "0.5em",
        fontFamily: "Vazir, sans-serif", // Set your desired font family
      });
      // Create axes
      var xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: "year",
          startLocation: 0.5,
          endLocation: 0.5,
          renderer: xRenderer,
        })
      );
      xAxis.data.setAll(data);
      const yRenderer = am5xy.AxisRendererY.new(root, {
        pan: "zoom",
      });
      yRenderer.labels.template.setAll({
        textType: "adjusted",
        fontSize: "0.5em",
        fontFamily: "Vazir, sans-serif", // Set your desired font family
      });
      var yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: yRenderer,
        })
      );

      // Function to create series
      function createSeries(name, field) {
        var series = chart.series.push(
          am5xy.LineSeries.new(root, {
            name: name,
            xAxis: xAxis,
            yAxis: yAxis,
            stacked: true,
            valueYField: field,
            categoryXField: "year",
            tooltip: am5.Tooltip.new(root, {
              pointerOrientation: "horizontal",
              labelText: "[bold]{name}[/]\n{categoryX}: {valueY}",
            }),
          })
        );

        series.fills.template.setAll({
          fillOpacity: 0.5,
          visible: true,
        });

        series.data.setAll(data);
        series.appear(1000); // Animate on appear
      }

      createSeries("اتوبوس", "bus");
      createSeries("مینی بوس", "miniBus");
      createSeries("سواری", "car");

      // Add scrollbar
      chart.set(
        "scrollbarX",
        am5.Scrollbar.new(root, {
          orientation: "horizontal",
        })
      );

      // Animate chart
      chart.appear(1000, 100);
    }

    return () => {
      if (rootRef.current) {
        rootRef.current.dispose();
        rootRef.current = null;
      }
    };
  }, [chartID]);

  return (
    <div id={chartID} style={{ minHeight: "430px", direction: "ltr" }}></div>
  );
}

export default StackAreaChart;
