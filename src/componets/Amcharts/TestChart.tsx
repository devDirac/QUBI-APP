import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const TestChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = am5.Root.new(chartRef.current!);

    // Eliminar el logo de amCharts
    root._logo?.dispose();

    // Configurar temas
    root.setThemes([am5themes_Animated.new(root)]);

    // Crear contenedor
    const zoomableContainer = root.container.children.push(
      am5.ZoomableContainer.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        wheelable: true,
        pinchZoom: true,
      })
    );

    // Crear serie ForceDirected
    const series = zoomableContainer.contents.children.push(
      am5hierarchy.ForceDirected.new(root, {
        singleBranchOnly: false,
        downDepth: 1,
        initialDepth: 1,
        nodePadding: 20,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
      })
    );
    series.get('colors')?.set('colors', [am5.color(0x095256),
      am5.color(0x087f8c),
      am5.color(0x5aaa95),
      am5.color(0x86a873),
      am5.color(0xbb9f06)]);

    /* series.get("colors").set("colors", [
      
    ]); */

    // Configurar tooltip
    series.nodes.template.set("tooltipText", "{name}: {value}");

    // Datos de ejemplo
    const data = [
      {
        name: "Root",
        value: 100,
        children: [
          { name: "Category A", value: 50 },
          { name: "Category B", value: 30 },
          {
            name: "Category C",
            value: 20,
            children: [
              { name: "Subcategory C1", value: 10 },
              { name: "Subcategory C2", value: 10 },
            ],
          },
        ],
      },
    ];

    // Establecer datos en la serie
    series.data.setAll(data);

    // Animar el gráfico al cargar
    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};

export default TestChart;