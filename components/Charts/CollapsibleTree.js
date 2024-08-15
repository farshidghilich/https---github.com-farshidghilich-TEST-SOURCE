"use client";
import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy'
function CollapsibleTree({ chartID }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current) {
      // Create a root element for the chart
      var root = am5.Root.new(chartID);
      rootRef.current = root;

      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([am5themes_Animated.new(root)]);

      var data = {
        value: 0,
        children: [
          {
            name: "تهران",
            children: [
              {
                name: "دماوند",
                value: 1,
              },
              {
                name: "فیروزکوه",
                value: 1,
              },
              {
                name: "بومهن",
                value: 1,
              },
              {
                name: "رودهن",
                value: 1,
              },
              {
                name: "پرند",
                value: 1,
              },
              {
                name: "ورامین",
                value: 1,
              },
              {
                name: "تهران",
                children: [
                  {
                    name: "پایانه جنوب",
                    value: 1,
                  },
                  {
                    name: "پایانه غرب",
                    value: 1,
                  },
                  {
                    name: "پایانه شرق",
                    value: 1,
                  },
                ],
              },
            ],
          },
          {
            name: "البرز",
            children: [
              {
                name: "کرج",
                value: 1,
                children:[{
                  name:"ترمینال شهید کلانتری",
                  value:1
                }]
              },
              {
                name: "فردیس",
                value: 1,
              },
              {
                name: "مهرشهر",
                value: 1,
              },
              {
                name: "هشتگرد",
                value: 1,
              },
            ],
          },
        ],
      };

      // Create wrapper container
      var container = root.container.children.push(
        am5.Container.new(root, {
          width: am5.percent(100),
          height: am5.percent(100),
          layout: root.verticalLayout,
        })
      );

      // Create series
      // https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
      var series = container.children.push(
        am5hierarchy.ForceDirected.new(root, {
          singleBranchOnly: false,
          downDepth: 2,
          topDepth: 1,
          initialDepth: 1,
          valueField: "value",
          categoryField: "name",
          childDataField: "children",
          idField: "name",
          linkWithField: "linkWith",
          manyBodyStrength: -10,
          centerStrength: 0.8,
        })
      );

      series.get("colors").setAll({
        step: 2,
      });

      series.links.template.set("strength", 0.5);

      series.data.setAll([data]);

      series.set("selectedDataItem", series.dataItems[0]);

      // Make stuff animate on load
      series.appear(1000, 100);
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

export default CollapsibleTree;
