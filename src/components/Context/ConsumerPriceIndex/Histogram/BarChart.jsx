/* eslint-disable react/prop-types */
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect, useState, useEffect } from "react";
import { useParams } from "react-router";

const BarChart = ({ filteredGroceries }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { language } = useParams();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Transform grocery data to chart format with truncated names
  const formattedData = filteredGroceries.map((item) => {
    const fullName = item[`name_${language}`];
    const shortName =
      fullName.length > 20 ? fullName.substring(0, 20) + "..." : fullName;

    return {
      category: shortName,
      fullCategory: fullName, // Store full name for tooltip
      value: item.value,
    };
  });

  useLayoutEffect(() => {
    if (!filteredGroceries || filteredGroceries.length === 0) return;

    const root = am5.Root.new("chartdiv");
    root._logo?.dispose();
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 0,
        paddingRight: 40,
        paddingBottom: 50,
        layout: root.verticalLayout,
      }),
    );

    // Cursor (hidden lines)
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("visible", false);
    cursor.lineY.set("visible", false);

    // Y Axis (categories - grocery items)
    const yRenderer = am5xy.AxisRendererY.new(root, {
      minGridDistance: 25, // Reduced from 50 for tighter spacing
      inversed: true,
    });
    yRenderer.grid.template.set("visible", false);

    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: yRenderer,
      }),
    );

    // X Axis (values) - support negative values with tighter spacing
    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        extraMax: 0.1,
        extraMin: 0.1,
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0.1,
          minGridDistance: 30,
        }),
      }),
    );

    // Responsive font sizes
    const axisFontSize = windowWidth < 769 ? 10 : windowWidth < 1201 ? 11 : 12;
    const bulletFontSize =
      windowWidth < 769 ? 10 : windowWidth < 1201 ? 10 : 11;

    // Y-axis labels with shorter truncation
    yRenderer.labels.template.setAll({
      fontSize: axisFontSize,
      fontFamily: "Verdana",
      maxWidth: 120,
      oversizedBehavior: "truncate",
      ellipsis: "...",
    });

    // Add tooltip to Y-axis labels to show full name
    const labelTooltip = am5.Tooltip.new(root, {
      getFillFromSprite: false,
      autoTextColor: false,
      pointerOrientation: "horizontal",
      keepTargetHover: false,
    });

    labelTooltip.get("background")?.setAll({
      fill: am5.color("#1a1a1a"),
      fillOpacity: 0.95,
      stroke: am5.color("#444444"),
      strokeWidth: 1,
      cornerRadius: 6,
    });

    labelTooltip.label.setAll({
      fill: am5.color("#ffffff"),
      fontSize: 9,
      fontFamily: "Verdana",
      maxWidth: 200, // Smaller max width
      oversizedBehavior: "wrap",
      textAlign: "left",
    });

    labelTooltip.setAll({
      paddingTop: 4,
      paddingBottom: 4,
      paddingLeft: 8,
      paddingRight: 8,
    });

    yRenderer.labels.template.set("tooltip", labelTooltip);
    yRenderer.labels.template.set("tooltipY", am5.percent(50));

    yRenderer.labels.template.adapters.add("tooltipText", (text, target) => {
      const dataItem = target.dataItem;
      if (dataItem && dataItem.dataContext) {
        return dataItem.dataContext.fullCategory || text;
      }
      return text;
    });

    xAxis.get("renderer").labels.template.setAll({
      fontSize: axisFontSize,
      fontFamily: "Verdana",
    });

    // Series
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "value",
        categoryYField: "category",
      }),
    );

    // Color bars based on positive/negative values
    series.columns.template.adapters.add("fill", (fill, target) => {
      const dataItem = target.dataItem;
      if (dataItem) {
        const value = dataItem.get("valueX");
        return value >= 0 ? am5.color(0x83c2e1) : am5.color(0xe18383);
      }
      return fill;
    });

    series.columns.template.setAll({
      cornerRadiusTR: 6,
      cornerRadiusBR: 6,
      strokeOpacity: 0,
      minHeight: 20, // Slightly reduced
    });

    // TOOLTIP - show full category name with word wrapping
    const tooltip = am5.Tooltip.new(root, {
      getFillFromSprite: false,
      autoTextColor: false,
      pointerOrientation: "horizontal",
      keepTargetHover: false,
    });

    tooltip.get("background")?.setAll({
      fill: am5.color("#1a1a1a"),
      fillOpacity: 0.95,
      stroke: am5.color("#444444"),
      strokeWidth: 1,
      strokeOpacity: 0.6,
      cornerRadius: 8,
    });

    const tooltipFontSize = 12;
    const paddingV = 7;
    const paddingH = 9;

    tooltip.label.setAll({
      fill: am5.color("#ffffff"),
      fontSize: tooltipFontSize,
      fontWeight: "600",
      fontFamily: "Verdana",
      maxWidth: 200, // Constrained width
      oversizedBehavior: "wrap",
      textAlign: "left",
    });

    tooltip.setAll({
      paddingTop: paddingV,
      paddingBottom: paddingV,
      paddingLeft: paddingH,
      paddingRight: paddingH,
    });

    series.set("tooltip", tooltip);
    series.columns.template.set(
      "tooltipText",
      "{fullCategory}: {valueX.formatNumber('#.##')}%",
    );

    // Value labels on bars - BLACK color, better positioning
    series.bullets.push(() =>
      am5.Bullet.new(root, {
        locationX: 0.5, // Changed from 0.98 to 0.5 for center
        sprite: am5.Label.new(root, {
          text: "{valueX.formatNumber('#.#')}%",
          fill: am5.color(0x000000), // BLACK color
          fontWeight: "600",
          fontSize: bulletFontSize,
          fontFamily: "Verdana",
          centerY: am5.p50, // Vertically centered
          centerX: am5.p50, // Horizontally centered (changed from am5.p100)
          populateText: true,
          paddingRight: 3,
        }),
      }),
    );

    // Data
    yAxis.data.setAll(formattedData);
    series.data.setAll(formattedData);
    series.appear(1000, 100);

    return () => root.dispose();
  }, [formattedData, windowWidth, filteredGroceries, language]);

  // Dynamic height based on number of items
  const chartHeight = filteredGroceries.length * 35 + 100; // Reduced from 50

  return (
    <>
      <div
        id="chartdiv"
        style={{
          width: "100%",
          maxWidth: "500px",
          minHeight: `${chartHeight}px`,
        }}
      />
    </>
  );
};

export default BarChart;
