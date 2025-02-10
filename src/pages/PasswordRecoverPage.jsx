import { usePasswordRecoverPage } from "./customHooksPages/usePasswordRecoverPage";
import PasswordRecover from "../componets/PasswordRecover";
import { Card, Grid } from "@mui/material";
import ModalComponent from "../componets/Modal";
import bgImage from "assets/images/bg-reset-cover.jpeg";
import CoverLayout from "../layouts/authentication/components/CoverLayout";
import MDBox from "../componets/MDBox";
import MDTypography from "../componets/MDTypography";
import { Link } from "react-router-dom";
import "./styles.scss";

const PasswordRecoverPage = () => {
  
  const {
    procesando,
    recuperaPassword,
    isAlertOpen,
    handleisAlerClose,
    mensajeAlert,
    intl
  } = usePasswordRecoverPage();

  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            {intl.formatMessage({ id: 'password_recover_page_titulo' })}
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            
          <PasswordRecover procesando={procesando} enAccion={(d) => recuperaPassword(d)} />
          <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                <MDTypography
                  component={Link}
                  to="/login"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  {intl.formatMessage({ id: 'login_page_titulo' })}
                </MDTypography>
              </MDTypography>
            </MDBox>


          </MDBox>
        </MDBox>
      </Card>
      <ModalComponent handleClose={handleisAlerClose} isOpen={isAlertOpen} key={'alerta'}>
                <Grid container spacing={2} style={{ textAlign: 'center' }}>
                    <Grid item xs={12}>
                        <br />
                        <br />
                        <p>{mensajeAlert}</p>
                    </Grid>
                </Grid>
            </ModalComponent>
    </CoverLayout>
  );
};

export default PasswordRecoverPage;
