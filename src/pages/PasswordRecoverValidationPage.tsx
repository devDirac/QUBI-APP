import { Backdrop, Box, CircularProgress, Grid, Typography } from '@mui/material';
import { Container } from "react-bootstrap";
import PasswordResetForm from '../componets/passwordResetForm';
import { usePasswordRecoverValidationPage } from './customHooksPages/usePasswordRecoverValidationPage';
import ModalComponent from '../componets/Modal';
import "./styles.scss";
import Header from '../componets/Header/Header';

const PasswordRecoverValidationPage = () => {
    const {
        queryParameters,
        isValidToken,
        procesando,
        actualizaPassword,
        isAlertOpen,
        handleisAlerClose,
        mensajeAlert,
        intl
    } = usePasswordRecoverValidationPage();

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            {/* Navbar */}
            <Header soloLogo />
            <Grid container sx={{ flexGrow: 1, textAlign: "center" }} spacing={2} style={{backgroundColor:'transparent'}} >
                <Grid item xs={12} md={12} style={{ marginTop: 15, marginBottom: 55 }}>
                    <h3 className='titlePages'>{intl.formatMessage({ id: 'password_recover_validacion_page_titulo' })}</h3>
                </Grid>
                {(!queryParameters.get("token") || !isValidToken) && !procesando ? <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <h1>{intl.formatMessage({ id: 'password_recover_validacion_page_token_invalido' })}</h1>
                </Grid> : null}
                {queryParameters.get("token") && isValidToken && !procesando ?   <Grid item lg={12} md={12} sm={12} style={{ marginBottom: 20 }} >
                    <PasswordResetForm procesando={procesando} enAccion={actualizaPassword} />
                </Grid> : null}
            </Grid>
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
            <Box component="footer" sx={{ py: 2, backgroundColor: "#1976d2", color: "white", textAlign: "center" }}>
                <Typography variant="body2">&copy; {new Date().getFullYear()} Qubi. Todos los derechos reservados.</Typography>
            </Box>
        </Box>
    )
}

export default PasswordRecoverValidationPage
