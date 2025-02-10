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

import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material componets
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Otis Admin PRO React componets
import MDBox from "componets/MDBox";
import MDTypography from "componets/MDTypography";
import MDAvatar from "componets/MDAvatar";
import _ from "lodash";
// Otis Admin PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

function Header({ children, userName, fotoUser, perfilUser }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);


  return (
    <MDBox position="relative" mb={2}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="4rem"
        borderRadius="xl"
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          
        }}
      >
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <MDAvatar src={_.isEmpty(fotoUser) ? '' : fotoUser} alt="profile-image" size="xl" shadow="sm" />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {userName}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                Perfil: {perfilUser}
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
        {children}
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
/* Header.defaultProps = {
  children: "",
  userName: "",
  fotoUser: "",
  perfilUser:""
}; */

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
  userName: PropTypes.string,
  fotoUser: PropTypes.string,
  perfilUser: PropTypes.string,
};

export default Header;
