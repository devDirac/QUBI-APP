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
import React from 'react'
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material componets
import Icon from "@mui/material/Icon";

// Otis Admin PRO React componets
import MDBox from "../../../componets/MDBox/index";
import MDTypography from "../../../componets/MDTypography/index";

// Timeline context
import { useTimeline } from "examples/Timeline/context";

// Custom styles for the TimelineItem
import timelineItem from "examples/Timeline/TimelineItem/styles";
import _ from "lodash";

function TimelineItem({ color, icon, title, dateTime, dateTime2, dateTime3, description, lastItem, onSelec, elemento, subtitle }) {
  const isDark = useTimeline();

  return (
    <MDBox position="relative" mb={3} sx={(theme) => timelineItem(theme, { lastItem, isDark })} onClick={() => { onSelec(elemento) }} style={{ cursor: 'pointer' }}>
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgColor={color || 'info'}
        color="white"
        width="2.9rem"
        height="2.9rem"
        borderRadius="50%"
        position="absolute"
        top="8%"
        left="-5px"
        zIndex={2}
        sx={{ fontSize: ({ typography: { size } }) => size.sm }}
      >
        {typeof icon === "string" ? (
          <Icon fontSize="inherit">{icon}</Icon>
        ) : (
          React.cloneElement(icon, { fontSize: "large" })
        )}
      </MDBox>
      <MDBox ml={5.75} pt={description ? 0.7 : 0.5} lineHeight={0} maxWidth="30rem">
        <MDTypography variant="button" fontWeight="medium" color={isDark ? "white" : "dark"}>
          {title}
        </MDTypography>
        {subtitle ? <MDTypography variant="button" fontWeight="light" color={isDark ? "white" : "dark"}>
          {subtitle}
        </MDTypography> : null}
        <MDBox mt={0.5}>
          <MDTypography variant="caption" color={isDark ? "secondary" : "text"}>
            {dateTime}
          </MDTypography>
        </MDBox>
        {
          !_.isEmpty(dateTime2) ? 
          <MDBox mt={0.5}>
          <MDTypography variant="caption" color={isDark ? "secondary" : "text"}>
            {dateTime2}
          </MDTypography>
        </MDBox> : null
        }
        {
          !_.isEmpty(dateTime3) ? 
          <MDBox mt={0.5}>
          <MDTypography variant="caption" color={isDark ? "secondary" : "text"}>
            {dateTime3}
          </MDTypography>
        </MDBox> : null
        }
        <MDBox mt={2} mb={1.5}>
          {description ? (
            <MDTypography variant="button" color={isDark ? "white" : "dark"}>
              {description}
            </MDTypography>
          ) : null}
        </MDBox>
      </MDBox>
    </MDBox>
  );
}
/* 
// Setting default values for the props of TimelineItem
TimelineItem.defaultProps = {
  color: "info",
  lastItem: false,
  description: "",
  elemento: {},
  subtitle:null
}; */

// Typechecking props for the TimelineItem
TimelineItem.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  dateTime2: PropTypes.string,
  dateTime3: PropTypes.string,
  description: PropTypes.string,
  lastItem: PropTypes.bool,
  onSelec: PropTypes.func,
  elemento: PropTypes.object,
  subtitle:PropTypes.string
};

export default TimelineItem;
