"use client";
import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5xy from "@amcharts/amcharts5/xy";

function StackRadiusChart({ chartID }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current) {
      // https://www.amcharts.com/docs/v5/getting-started/#Root_element
      var root = am5.Root.new(chartID);
      rootRef.current = root;
      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([am5themes_Animated.new(root)]);

      // Generate and set data
      // https://www.amcharts.com/docs/v5/charts/radar-chart/#Setting_data
      function generateDatas() {
        const data = [
          { category: "تهران", value: 3 },
          { category: "اصفهان", value: 2 },
          { category: "شیراز", value: 3 },
          { category: "تبریز", value: 9 },
          { category: "یزد", value: 8 },
          { category: "بوشهر", value: 9 },
          { category: "کرمانشاه", value: 2 },
          { category: "ساری", value: 3 },
          { category: "رشت", value: 7 },
          { category: "بهبهان", value: 4 },
        ];
        data.push(data);
        return data;
      }

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/radar-chart/
      var chart = root.container.children.push(
        am5radar.RadarChart.new(root, {
          panX: false,
          panY: false,
          wheelX: "panX",
          wheelY: "zoomX",
          innerRadius: am5.p50,
          layout: root.verticalLayout,
        })
      );

      // Create axes and their renderers
      // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
      var xRenderer = am5radar.AxisRendererCircular.new(root, {});
      xRenderer.labels.template.setAll({
        textType: "adjusted",
        fontSize: "0.5em",
        fontFamily: "Vazir, sans-serif", // Set your desired font family
      });
   // Add legend
      // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
      var legend = chart.children.push(
        am5.Legend.new(root, {
          centerX: am5.p50,
          x: am5.p50,
          fontSize: "0.5em", // Set your desired font size
        fontFamily: "Vazir, sans-serif", // Set your desired font family
        })
      );
      var xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          maxDeviation: 0,
          categoryField: "category",
          renderer: xRenderer,
          tooltip: am5.Tooltip.new(root, {}),
        })
      );
      legend.data.push(xAxis);
      var yRenderer = am5radar.AxisRendererRadial.new(root, {});
      yRenderer.labels.template.setAll({
        fontSize: "0.5em", // Set your desired font size
        fontFamily: "Vazir, sans-serif", // Set your desired font family
        fill: am5.color(0x000000), // Set label color, if necessary
      });

      var yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: yRenderer,
        })
      );

      // Create series
      // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
      var series = chart.series.push(
        am5radar.RadarColumnSeries.new(root, {
          stacked: true,
          name: "درون استانی",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          categoryXField: "category",
        })
      );
      series.columns.template.setAll({
        tooltipText: "{name}: {valueY}",
        focusable: true,
      });
      series.data.setAll(generateDatas(10));
      series.appear(1000);
      var series1 = chart.series.push(
        am5radar.RadarColumnSeries.new(root, {
          stacked: true,
          name: "برون استانی",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          categoryXField: "category",
        })
      );
      series1.columns.template.setAll({
        tooltipText: "{name}: {valueY}",
        fontSize: "0.5em", // Change to your desired font size
        fontFamily: "Vazir, sans-serif", // Change to your desired font family
      });
      series1.data.setAll(generateDatas(10));
      series1.appear(1000);
      const cursor = chart.set(
        "cursor",
        am5radar.RadarCursor.new(root, {
          behavior: "zoomX",
        })
      );
      cursor.lineY.set("visible", false);
      // slider
      var slider = chart.children.push(
        am5.Slider.new(root, {
          orientation: "horizontal",
          start: 0,
          width: am5.percent(60),
          centerY: am5.p50,
          centerX: am5.p50,
          x: am5.p50,
        })
      );
      slider.events.on("rangechanged", function () {
        var start = slider.get("start");
        var startAngle = 270 - start * 179 - 1;
        var endAngle = 270 + start * 179 + 1;

        chart.setAll({ startAngle: startAngle, endAngle: endAngle });
        yAxis.get("renderer").set("axisAngle", startAngle);
      });

      var data = generateDatas(10);
      xAxis.data.setAll(data);

      // Animate chart
      // https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
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
    <>
      <div id={chartID} style={{ minHeight: "365px", direction: "ltr" }}></div>
    </>
  );
}

export default StackRadiusChart;
