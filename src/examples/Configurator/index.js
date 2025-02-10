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

// @mui material componets
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Snackbar from '@mui/material/Snackbar';
// Otis Admin PRO React componets
import MDBox from "../../componets/MDBox/index";
import MDTypography from "../../componets/MDTypography/index";
import MDButton from "../../componets/MDButton/index";
import { setIdioma } from '../../actions/idiomas'

// Custom styles for the Configurator
import ConfiguratorRoot from "./ConfiguratorRoot";
import { useSelector, useDispatch } from "react-redux";
// Otis Admin PRO React context
import {
  useMaterialUIController,
  setOpenConfigurator,
  setTransparentSidenav,
  setWhiteSidenav,
  setMiniSidenav,
  setFixedNavbar,
  setSidenavColor,
  setDarkMode,
} from "context";
import { setTemaClaroOscuroHTTP, setMenuLateralMiniHTTP, setCabeceraFijaHTTP, setTipoMenuLateralHTTP, setColorMenuLateralHTTP, setIdiomaHTTP } from '../../actions/ajustesTema'
import { getUserNuevosAjustes, setUser } from '../../actions/auth';

function Configurator() {
  const userId = useSelector((state) => state?.app?.user?.data?.id || false)
  const token = useSelector((state) => state?.app?.user?.token || '')
  const idioma = useSelector((state) => state?.app?.idioma || 'mx');
  const dispatch_ = useDispatch();
  const [controller, dispatch] = useMaterialUIController();
  const [openConfiguracionTema, setOpenConfiguracionTema] = useState(false);
  const [mensajeConfiguracionTema, setMensajeConfiguracionTema] = useState('');
  const {
    openConfigurator,
    miniSidenav,
    fixedNavbar,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [disabled, setDisabled] = useState(false);
  const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];
  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    // The event listener that's calling the handleDisabled function when resizing the window.
    window.addEventListener("resize", handleDisabled);

    // Call the handleDisabled function to set the state with the initial value.
    handleDisabled();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
  const handleTransparentSidenav = () => {
    setTransparentSidenav(dispatch, true);
    setWhiteSidenav(dispatch, false);
    handleTipoMenuLateral('trasparent')
  };
  const handleWhiteSidenav = () => {
    setWhiteSidenav(dispatch, true);
    setTransparentSidenav(dispatch, false);
    handleTipoMenuLateral('white')
  };
  const handleDarkSidenav = () => {
    setWhiteSidenav(dispatch, false);
    setTransparentSidenav(dispatch, false);
    handleTipoMenuLateral('dark')
  };
  const handleMiniSidenav = () => {
    setMiniSidenav(dispatch, !miniSidenav)
    handleMenuLateralMini(!miniSidenav)
  };
  const handleFixedNavbar = () => {
    setFixedNavbar(dispatch, !fixedNavbar)
    handleCabeceraFija(!fixedNavbar)
  };
  const handleDarkMode = () => {
    setDarkMode(dispatch, !darkMode)
    handleTemaClaroOscuro(!darkMode)
  };

  // sidenav type buttons styles
  const sidenavTypeButtonsStyles = ({
    functions: { pxToRem },
    palette: { white, dark, background },
    borders: { borderWidth },
  }) => ({
    height: pxToRem(39),
    background: darkMode ? background.sidenav : white.main,
    color: darkMode ? white.main : dark.main,
    border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,

    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode ? background.sidenav : white.main,
      color: darkMode ? white.main : dark.main,
      border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,
    },
  });

  // sidenav type active button styles
  const sidenavTypeActiveButtonStyles = ({
    functions: { pxToRem, linearGradient },
    palette: { white, gradients, background },
  }) => ({
    height: pxToRem(39),
    background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
    color: darkMode ? background.sidenav : white.main,

    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
      color: darkMode ? background.sidenav : white.main,
    },
  });

  const handleColorMenuLateral = async (color) => {
    try {
      await setColorMenuLateralHTTP({ id_usuario: userId, color_menu_lateral: color });
      const user = await getUserNuevosAjustes(userId, token);
      dispatch_(setUser(user));
      setSidenavColor(dispatch, color);
      setMensajeConfiguracionTema('Se actualizo el color del menu lateral');
      setOpenConfiguracionTema(true);
      setTimeout(() => {
        setOpenConfiguracionTema(false);
      }, 5000);
    } catch (_) {

    }
  }

  const handleTipoMenuLateral = async (color) => {
    try {
      await setTipoMenuLateralHTTP({ id_usuario: userId, tipo_menu_lateral: color });
      const user = await getUserNuevosAjustes(userId, token);
      dispatch_(setUser(user));
      setMensajeConfiguracionTema('Se actualizo tipo de menu lateral')
      setOpenConfiguracionTema(true);
      setTimeout(() => {
        setOpenConfiguracionTema(false);
      }, 5000);
    } catch (_) {

    }
  }

  const handleCabeceraFija = async (value) => {
    try {
      await setCabeceraFijaHTTP({ id_usuario: userId, cabecera_fija: value });
      const user = await getUserNuevosAjustes(userId, token);
      dispatch_(setUser(user));
      setMensajeConfiguracionTema('Se actualizo el ajuste de la cabecera');
      setOpenConfiguracionTema(true);
      setTimeout(() => {
        setOpenConfiguracionTema(false);
      }, 5000);
    } catch (_) {

    }
  }

  const handleMenuLateralMini = async (value) => {
    try {
      await setMenuLateralMiniHTTP({ id_usuario: userId, menu_lateral_mini: value });
      const user = await getUserNuevosAjustes(userId, token);
      dispatch_(setUser(user));
      setMensajeConfiguracionTema('Se actualizo el ajuste del menu lateral');
      setOpenConfiguracionTema(true);
      setTimeout(() => {
        setOpenConfiguracionTema(false);
      }, 5000);
    } catch (_) {

    }
  }

  const handleTemaClaroOscuro = async (value) => {
    try {
      await setTemaClaroOscuroHTTP({ id_usuario: userId, tema_claro_oscuro: value });
      const user = await getUserNuevosAjustes(userId, token);
      dispatch_(setUser(user));
      setMensajeConfiguracionTema('Se actualizo el tema del sitio');
      setOpenConfiguracionTema(true);
      setTimeout(() => {
        setOpenConfiguracionTema(false);
      }, 5000);
    } catch (_) {

    }
  }

  const handleIdioma = async (v) => {
    try {
      await setIdiomaHTTP({ id_usuario: userId, idioma: idioma === 'en' ? 'mx' : 'en' });
      const user = await getUserNuevosAjustes(userId, token);
      dispatch_(setUser(user));
      dispatch_(setIdioma(idioma === 'en' ? 'mx' : 'en'));
      setMensajeConfiguracionTema('Se actualizo el idioma del sitio');
      setOpenConfiguracionTema(true);
      setTimeout(() => {
        setOpenConfiguracionTema(false);
      }, 5000);
    } catch (_) {

    }


  }

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}
      >
        <MDBox>
          <MDTypography variant="h5">APM ajustes del sitio</MDTypography>
          <MDTypography variant="body2" color="text">
            Ajuste la apariencia del sitio.
          </MDTypography>
        </MDBox>

        <Icon
          sx={({ typography: { size }, palette: { dark, white } }) => ({
            fontSize: `${size.lg} !important`,
            color: darkMode ? white.main : dark.main,
            stroke: "currentColor",
            strokeWidth: "2px",
            cursor: "pointer",
            transform: "translateY(5px)",
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </MDBox>
      <Divider />

      <MDBox pt={0.5} pb={3} px={3}>
        <MDBox>
          <MDTypography variant="h6">Color menu lateral</MDTypography>
          <MDBox mb={0.5}>
            {sidenavColors.map((color) => (
              <IconButton
                key={color}
                sx={({
                  borders: { borderWidth },
                  palette: { white, dark, background },
                  transitions,
                }) => ({
                  width: "24px",
                  height: "24px",
                  padding: 0,
                  border: `${borderWidth[1]} solid ${darkMode ? background.sidenav : white.main}`,
                  borderColor: () => {
                    let borderColorValue = sidenavColor === color && dark.main;
                    if (darkMode && sidenavColor === color) {
                      borderColorValue = white.main;
                    }
                    return borderColorValue;
                  },
                  transition: transitions.create("border-color", {
                    easing: transitions.easing.sharp,
                    duration: transitions.duration.shorter,
                  }),
                  backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) =>
                    linearGradient(gradients[color].main, gradients[color].state),
                  "&:not(:last-child)": {
                    mr: 1,
                  },
                  "&:hover, &:focus, &:active": {
                    borderColor: darkMode ? white.main : dark.main,
                  },
                })}
                onClick={() => {
                  handleColorMenuLateral(color)
                }}
              />
            ))}
          </MDBox>
        </MDBox>
        <MDBox mt={3} lineHeight={1}>
          <MDTypography variant="h6">Tipo de menu lateral</MDTypography>
          <MDTypography variant="button" color="text">
            Elija la opción deseada
          </MDTypography>
          <MDBox
            sx={{
              display: "flex",
              mt: 2,
              mr: 1,
            }}
          >
            <MDButton
              color="dark"
              variant="gradient"
              onClick={handleDarkSidenav}
              disabled={disabled}
              fullWidth
              sx={
                !transparentSidenav && !whiteSidenav
                  ? sidenavTypeActiveButtonStyles
                  : sidenavTypeButtonsStyles
              }
            >
              Obscuro
            </MDButton>
            <MDBox sx={{ mx: 1, width: "8rem", minWidth: "8rem" }}>
              <MDButton
                color="dark"
                variant="gradient"
                onClick={handleTransparentSidenav}
                disabled={disabled}
                fullWidth
                sx={
                  transparentSidenav && !whiteSidenav
                    ? sidenavTypeActiveButtonStyles
                    : sidenavTypeButtonsStyles
                }
              >
                trasparente
              </MDButton>
            </MDBox>
            <MDButton
              color="dark"
              variant="gradient"
              onClick={handleWhiteSidenav}
              disabled={disabled}
              fullWidth
              sx={
                whiteSidenav && !transparentSidenav
                  ? sidenavTypeActiveButtonStyles
                  : sidenavTypeButtonsStyles
              }
            >
              blanco
            </MDButton>
          </MDBox>
        </MDBox>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
          lineHeight={1}
        >
          <MDTypography variant="h6">Cabecera fija</MDTypography>
          <Switch checked={fixedNavbar} onChange={handleFixedNavbar} />
        </MDBox>
        <Divider />
        <MDBox display="flex" justifyContent="space-between" alignItems="center" lineHeight={1}>
          <MDTypography variant="h6">Menu lateral mini</MDTypography>
          <Switch checked={miniSidenav} onChange={handleMiniSidenav} />
        </MDBox>
        <Divider />
        {/* <MDBox display="flex" justifyContent="space-between" alignItems="center" lineHeight={1}>
          <MDTypography variant="h6">Tema claro / oscuro </MDTypography>

          <Switch checked={darkMode} onChange={handleDarkMode} />
        </MDBox>
        <Divider /> */}
        <MDBox display="flex" justifyContent="space-between" alignItems="center" lineHeight={1}>
          <MDTypography variant="h6">Ingles / Español </MDTypography>

          <Switch checked={idioma === 'mx'} onChange={handleIdioma} />


        </MDBox>
      </MDBox>
      <Snackbar
        open={openConfiguracionTema}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message={mensajeConfiguracionTema}
      />
    </ConfiguratorRoot>
  );
}

export default Configurator;
