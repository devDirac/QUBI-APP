import React from 'react'
import bgImage from "assets/images/_logoPrincipal2.png";
import CoverLayout from '../layouts/authentication/components/CoverLayout';
import { Card, Grid, Backdrop, CircularProgress } from '@mui/material';
import MDBox from '../componets/MDBox';
import MDTypography from '../componets/MDTypography';
import ModalComponent from "../componets/Modal";
import { useLoginPage } from "./customHooksPages/useLoginPage";
import LoginForm from "../componets/LoginForm";
import { Link } from "react-router-dom";
import { useIntl } from 'react-intl';
import "./styles.scss";

const LoginPageCover = () => {

  const {
    procesando,
    login,
    isAlertOpen,
    handleisAlerClose,
    mensajeAlert,
    intl
  } = useLoginPage();

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="success"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            {intl.formatMessage({ id: 'login_page_titulo' })}
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            {intl.formatMessage({ id: 'login_page_ingrese_credenciales' })}
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <LoginForm procesando={procesando} enAccion={login} />
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                {intl.formatMessage({ id: 'login_page_texto_recuperar_contrasena_1' })} {' '}
                <MDTypography
                  component={Link}
                  to="/recupera-password"
                  variant="button"
                  color="warning"
                  fontWeight="medium"
                  textGradient
                >
                  {intl.formatMessage({ id: 'login_page_texto_recuperar_contrasena_2' })}
                </MDTypography>
                {' '} {intl.formatMessage({ id: 'login_page_texto_recuperar_contrasena_3' })}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <Backdrop style={{ zIndex: 1000, color: "#fff" }} open={procesando}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
  )
}

export default LoginPageCover
