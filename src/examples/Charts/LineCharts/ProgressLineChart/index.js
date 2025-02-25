/**
=========================================================
* Otis Admin PRO - v2.0.1
=========================================================

* Product Page: https://material-ui.com/store/items/otis-admin-pro-material-dashboard-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 componets
import { Line } from "react-chartjs-2";

// @mui material componets
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Otis Admin PRO React componets
import MDBox from "../../../../componets/MDBox/index";
import MDTypography from "../../../../componets/MDTypography/index";
import MDProgress from "../../../../componets/MDProgress/index";

// ProgressLineChart configurations
import configs from "examples/Charts/LineCharts/ProgressLineChart/config";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  LineElement,
  BarElement,
  Title,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

function ProgressLineChart({ color, icon, title, count, progress, height, chart }) {

  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
);

  const { data, options } = configs(color, chart.labels || [], title, chart.data || []);

  return (
    <Card>
      <MDBox display="flex" alignItems="center" pt={2} px={2}>
        <MDBox
          width="3rem"
          height="3rem"
          display="grid"
          justifyContent="center"
          alignItems="center"
          borderRadius="md"
          shadow="md"
          color="white"
          bgColor={color}
          variant="gradient"
        >
          <Icon fontSize="default">{icon}</Icon>
        </MDBox>
        <MDBox ml={2} lineHeight={1}>
          <MDTypography
            variant="button"
            fontWeight="regular"
            textTransform="capitalize"
            color="text"
          >
            {title}
          </MDTypography>
          {count ? (
            <MDTypography variant="h5" fontWeight="bold">
              {count}
            </MDTypography>
          ) : null}
        </MDBox>
        <MDBox width="25%" ml="auto">
          <MDTypography display="block" variant="caption" fontWeight="medium" color="text">
            {progress}%
          </MDTypography>
          <MDBox mt={0.25}>
            <MDProgress variant="gradient" color={color} value={progress} />
          </MDBox>
        </MDBox>
      </MDBox>
      {useMemo(
        () => (
          <MDBox mt={2}>
            <Line data={data} options={options} style={{ height }} />
          </MDBox>
        ),
        [chart, height]
      )}
    </Card>
  );
}

// Setting default values for the props of ProgressLineChart
ProgressLineChart.defaultProps = {
  color: "info",
  count: 0,
  height: "6.25rem",
};

// Typechecking props for the ProgressLineChart
ProgressLineChart.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  progress: PropTypes.number.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.instanceOf(Object).isRequired,
};

export default ProgressLineChart;
