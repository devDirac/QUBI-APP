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
// prop-types is library for typechecking of props
import PropTypes from "prop-types";
// @mui material componets
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
// Otis Admin PRO React componets
import MDBox from "../../../../componets/MDBox";
import MDTypography from "../../../../componets/MDTypography";

function DefaultInfoCard({ color, icon, title, description, value,onSelec,elemento, esAjustesSitio, colorAjusteSitio }) {
  return (
    <Card style={{border :'solid rgba(0, 0, 0, 0.125)',cursor: 'pointer', height:180}} onClick={() => { onSelec(elemento) }}>
      <MDBox p={2} mx={1} display="flex" justifyContent="center">
        <MDBox
          sx={{ cursor: "pointer" }}
          display="grid"
          justifyContent="center"
          alignItems="center"
          bgColor={color || 'info'}
          color="white"
          width="5rem"
          height="5rem"
          shadow="md"
          borderRadius="lg"
          variant="gradient"
        >
          {typeof icon === "string" ? (
            <Icon fontSize="default">{icon}</Icon>
          ) : (
            React.cloneElement(icon, { fontSize:"large" })
          )}
        </MDBox>
      </MDBox>
      <MDBox pb={2} px={2} textAlign="center" lineHeight={1.25}>
        <MDTypography variant="h6" fontWeight="medium" >
          {title}
        </MDTypography>
        
        {description || value ? <Divider /> : null}

        {description && (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {description}
          </MDTypography>
        )}
        {value && (
          <MDTypography variant="h5" fontWeight="medium" style={esAjustesSitio ? {color:colorAjusteSitio || 'black'} : {}}>
            {value}
          </MDTypography>
        )}
      </MDBox>
    </Card>
  );
}

// Typechecking props for the DefaultInfoCard
DefaultInfoCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelec:PropTypes.func,
  elemento:PropTypes.object,
  esAjustesSitio:PropTypes.bool,
  colorAjusteSitio:PropTypes.string,
  ajustaIconoSize:PropTypes.bool
};

export default DefaultInfoCard;
