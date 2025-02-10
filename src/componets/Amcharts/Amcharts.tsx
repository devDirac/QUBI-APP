import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

interface HorizontalPartitionChartProps {
  dataOneClick: any
}

const HorizontalPartitionChart: React.FC<HorizontalPartitionChartProps> = (props: HorizontalPartitionChartProps) => {


  const data = [
    {
      name: "Root",
      value: 100,
      customInfo: "Root info",
      children: [
        { name: "Category A", value: 50, customInfo: "Root info", },
        { name: "Category B", value: 30, customInfo: "Root info", },
        {
          name: "Category C",
          value: 20,
          customInfo: "Root info",
          children: [
            { name: "Subcategory C1", value: 10, customInfo: "Root info", },
            { name: "Subcategory C2", value: 10, customInfo: "Root info", },
          ],
        },
      ],
    },
  ]
  const chartRef: any = useRef(null);
  useLayoutEffect(() => {
    // Crear el root element
    const root = am5.Root.new(chartRef.current);
    root?._logo && root._logo.dispose();
    // Establecer tema
    root.setThemes([am5themes_Animated.new(root)]);
    // Crear contenedor
    const container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout,
      })
    );
    // Crear serie
    const series: any = container.children.push(
      am5hierarchy.Partition.new(root, {
        singleBranchOnly: false,
        orientation: "horizontal",
        downDepth: 1,
        initialDepth: 10,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
      })
    );
    
    series.nodes.template.set(
      "labelText",
      "[bold]{name}"
    );


    series.data.setAll(props?.dataOneClick);
    series.set("selectedDataItem", series.dataItems[0]);
    series.setAll({
      minZoomCount: 100, // Asegúrate de incluir todos los nodos sin importar el zoom
      ignoreZeroValues: false, // No ignores nodos con valores bajos
    });
    series.nodes.template.setAll({
      minWidth: 10, // Tamaño mínimo en píxeles
      minHeight: 10, // Altura mínima en píxeles
    });
    // Animar al cargar
    series.appear(1000, 100);
    // Limpieza al desmontar
    return () => {
      root.dispose();
    };
  }, []);
  return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};

export default HorizontalPartitionChart;