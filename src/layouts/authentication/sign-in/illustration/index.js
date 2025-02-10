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

import { useState } from "react";

// react-router-dom componets
import { Link } from "react-router-dom";

// @mui material componets
import Switch from "@mui/material/Switch";

// Otis Admin PRO React componets
import MDBox from "../../../../componets/MDBox/index";
import MDTypography from "../../../../componets/MDTypography/index";
import MDInput from "../../../../componets/MDInput/index";
import MDButton from "../../../../componets/MDButton/index";

// Authentication layout componets
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

// Image
import bgImage from "assets/images/illustrations/illustration-reset.jpg";

function Illustration() {
  
  return (
    <IllustrationLayout
      title="Inicio de sesion"
      description="Ingrese su usuario y contreaseña para iniciar sesión"
      illustration={bgImage}
    >
      <MDBox component="form" role="form">
        <MDBox mb={2}>
          <MDInput type="email" label="Email" fullWidth />
        </MDBox>
        <MDBox mb={2}>
          <MDInput type="password" label="Password" fullWidth />
        </MDBox>
        <MDBox mt={4} mb={1}>
          <MDButton variant="gradient" color="info" size="large" fullWidth>
            Iniciar de sesión
          </MDButton>
        </MDBox>
        <MDBox mt={3} textAlign="center">
          <MDTypography variant="button" color="text">
            Se te olvido la contraseña?, haz click{" "}
            <MDTypography
              component={Link}
              to="/recupera-password"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </MDTypography>
          </MDTypography>
        </MDBox>
      </MDBox>
    </IllustrationLayout>
  );
}

export default Illustration;
