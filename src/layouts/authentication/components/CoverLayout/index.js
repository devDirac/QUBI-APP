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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material componets
import Grid from "@mui/material/Grid";

// Otis Admin PRO React componets
import MDBox from "../../../../componets/MDBox/index";
// import MDTypography from "componets/MDTypography";

// Otis Admin PRO React example componets
import PageLayout from "examples/LayoutContainers/PageLayout";


function CoverLayout({ coverHeight, image, children }) {
  return (
    <PageLayout>
    
      <MDBox
        width="calc(100% - 2rem)"
        minHeight={coverHeight}
        borderRadius="xl"
        mx={2}
        my={2}
        pt={6}
        style={{background:'linear-gradient(270.01deg, rgb(23 ,130 ,130) 0.01%, rgb(23 ,130 ,130) 99.99%)'}}
        pb={28}
        sx={{
          
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MDBox mt={{ xs: -20, lg: -18 }} px={1} width="calc(100% - 2rem)" mx="auto">
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={5} lg={5} xl={5}>
            {children}
          </Grid>
        </Grid>
      </MDBox>
     
    </PageLayout>
  );
}

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
  coverHeight: PropTypes.string,
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
