/* eslint-disable react/prop-types */
import { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5percent from "@amcharts/amcharts5/percent";
const PieChart = ({ data, year }) => {
  console.log(data, year);

  useLayoutEffect(() => {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new("chartdiv");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        endAngle: 270,
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        endAngle: 270,
      })
    );

    series.states.create("hidden", {
      endAngle: -90,
    });

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series.data.setAll([
      {
        category: "Lithuania",
        value: 501.9,
      },
      {
        category: "Czechia",
        value: 301.9,
      },
      {
        category: "Ireland",
        value: 201.1,
      },
      {
        category: "Germany",
        value: 165.8,
      },
      {
        category: "Australia",
        value: 139.9,
      },
      {
        category: "Austria",
        value: 128.3,
      },
      {
        category: "UK",
        value: 99,
      },
    ]);

    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: "300px", height: "300px" }}></div>;
};

export default PieChart;
