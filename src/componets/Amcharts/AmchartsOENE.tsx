import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

interface AmchartsOENEProps {
  dataOneClick: any
  enSeleccion: (data: any) => void
}

const AmchartsOENE: React.FC<AmchartsOENEProps> = (props: AmchartsOENEProps) => {

  const chartRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {

    const root = am5.Root.new(chartRef.current!);

    root?._logo && root._logo.dispose();

    root.setThemes([am5themes_Animated.new(root)]);


    const zoomableContainer = root.container.children.push(
      am5.ZoomableContainer.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        wheelable: true,
        pinchZoom: true,
      })
    );

    zoomableContainer.children.push(
      am5.ZoomTools.new(root, {
        target: zoomableContainer,
      })
    );

    const series: any = zoomableContainer.contents.children.push(
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
    series.get('colors')?.set('colors', [am5.color('#1C75BC'),
    am5.color('#00A79D'),
    am5.color('#4A98B9'),
    am5.color('#57957A')]);

    series.labels.template.setAll({
      text: "{name}",
    });
    series.nodes.template.setAll({
      tooltipText: "{name}",
    });

    // Define link bullets
    series.linkBullets.push(function (root: any, source: any, target: any) {
      const bullet: any = am5.Bullet.new(root, {
        locationX: 0.5,
        autoRotate: true,
        autoRotateAngle: 180,
        sprite: am5.Graphics.new(root, {
          fill: source.get("fill"),
          centerY: am5.percent(50),
          centerX: am5.percent(50),
          draw: function (display) {
            display.moveTo(0, -6);
            display.lineTo(16, 0);
            display.lineTo(0, 6);
            display.lineTo(3, 0);
            display.lineTo(0, -6);
          },
        }),
      });
      bullet.animate({
        key: "locationX",
        to: -0.1,
        from: 1.1,
        duration: Math.random() * 500 + 1000,
        loops: Infinity,
        easing: am5.ease.quad,
      });
      return bullet;
    });

    series.nodes.template.events.on("click", function (ev: any) {
      props?.enSeleccion(ev.target?.dataItem?.dataContext)
    });

    series.labels.template.set("minScale", 0);
    series.data.setAll(props?.dataOneClick);
    series.set("selectedDataItem", series.dataItems[0]);
    series.appear(1000, 100);
    return () => {
      root.dispose();
    };
  }, [props.dataOneClick]);

  return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
};

export default AmchartsOENE;