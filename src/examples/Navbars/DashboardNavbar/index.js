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
import LaunchIcon from '@mui/icons-material/Launch';
// react-router componets
import { useLocation, Link } from "react-router-dom";
import { Button, ButtonGroup, Card } from 'react-bootstrap'
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import { Backdrop, CircularProgress, Grid } from '@mui/material';
// @material-ui core componets
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// Otis Admin PRO React componets
import MDBox from "../../../componets/MDBox/index";
import MDBadge from "../../../componets/MDBadge/index";
import { useNavigate } from 'react-router-dom';
// Otis Admin PRO React example componets
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import { useSelector } from "react-redux";
import HomeIcon from '@mui/icons-material/Home';
import { useDispatch } from "react-redux";
import {
  NotificationsOutlined,
  Warning as WarningIcon,
  //  Info as InfoIcon,
  Error as ErrorIcon,
  CheckCircle as CheckIcon,
  Circle as CircleIcon,
  AccessTime,
} from "@mui/icons-material";

import {
  //IconButton,
  Badge,
  //Menu,
  MenuItem,
  Typography,
  Box,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material";
// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Otis Admin PRO React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import InfoIcon from '@mui/icons-material/Info';
import "./style.scss";
import ModalComponent from '../../../componets/Modal'
import { getErrorHttpMessage } from '../../../utils';
import { sleep } from "@amcharts/amcharts5/.internal/core/util/Time";
import { getNotificacionesPorUsuarioHTTP, setNotificaciones, removeNotificacionHTTP } from '../../../actions/notificaciones';
import routes from '../../../routes';

function DashboardNavbar({ absolute, light, isMini }) {

  const dispatch_ = useDispatch();
  const notificaciones = useSelector((state) => (state?.app?.notificaciones || []));
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const navigate = useNavigate();
  const userId = useSelector(state => state?.app?.user?.data?.id || false);

  const espacio = useSelector(state => state?.app?.espacio || null);
  const contrato = useSelector(state => state?.app?.contrato || null);

  const [procesando, setProcesando] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [mensajeAlert, setMensajeAlert] = useState('');
  const handleisAlertOpen = () => setIsAlertOpen(true);
  const handleisAlerClose = () => setIsAlertOpen(false);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const getTypeColor = (type) => {
    switch (type) {
      case 7:
        return "warning.main";
      case 8:
        return "warning.main";
      case 3:
        return "error.main";
      case 4:
        return "error.main";
      case 5:
        return "success.main";
      case 6:
        return "info.main";
      case 1:
        return "info.main";
      case 2:
        return "info.main";
      default:
        return "primary.main";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 7:
        return (
          <WarningIcon fontSize="medium" sx={{ color: getTypeColor(type) }} />
        );
      case 8:
        return (
          <WarningIcon fontSize="medium" sx={{ color: getTypeColor(type) }} />
        );
      case 3:
        return (
          <ErrorIcon fontSize="medium" sx={{ color: getTypeColor(type) }} />
        );
      case 4:
        return (
          <ErrorIcon fontSize="medium" sx={{ color: getTypeColor(type) }} />
        );
      case 5:
        return (
          <CheckIcon fontSize="medium" sx={{ color: getTypeColor(type) }} />
        );
      case 6:
        return (
          <InfoIcon fontSize="medium" sx={{ color: getTypeColor(type) }} />
        );
      case 1:
        return (
          <InfoIcon fontSize="medium" sx={{ color: getTypeColor(type) }} />
        );
      case 2:
        return (
          <InfoIcon fontSize="medium" sx={{ color: getTypeColor(type) }} />
        );
      default:
        return <InfoIcon color="primary" />;
    }
  };

  const getBackgroundColor = (type) => {
    switch (type?.toLowerCase()) {
      case "Desasignación de proyecto":
        return "warning";
      case "Desasignación de contrato":
        return "warning";
      case "Avisos importantes":
        return "warning";
      case "Atención de estimacion":
        return "warning";
      case "error":
        return "danger";
      case "danger":
        return "danger";
      case "success":
        return "success";
      case "Asignación de contrato":
        return "primary";
      case "Asignación de proyecto":
        return "primary";
      case "Usuario creado":
        return "success";
      default:
        return "primary";
    }
  };


  const handleAccionNotificacion = async (notificacion, accion) => {
    try {
      setProcesando(true);
      await sleep(2000);
      await removeNotificacionHTTP(notificacion?.id);
      const notificacionesUsuario = await getNotificacionesPorUsuarioHTTP(userId);
      dispatch_(setNotificaciones(notificacionesUsuario));


      /* if (notificacion?.id_tipo_notificacion === 1 || notificacion?.id_tipo_notificacion === 3) {
        dispatch_(setMenuRoutes(routes.find(e => e?.key === 'perfil')));
        navigate(`/inicio`);
      }

      if (notificacion?.id_tipo_notificacion === 2 || notificacion?.id_tipo_notificacion === 4) {
        dispatch_(setMenuRoutes(routes.find(e => e?.key === 'sesion-trabajo')));
        navigate(`/sesion-trabajo-contratos`);
      }

      if (notificacion?.id_tipo_notificacion === 8) {
        dispatch_(setMenuRoutes(routes.find(e => e?.key === 'estimaciones')));
        navigate(`/relacion-estimaciones`);
      } */

      setProcesando(false);
    } catch (error) {
      setProcesando(false);
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || 'Error al marcar la notificación');
      handleisAlertOpen();
    }
  }
  // Render the notifications menu
  const renderMenu = () => (

    <Menu
      anchorEl={openMenu}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      PaperProps={{
        elevation: 3,
        sx: {
          maxHeight: 480,
          width: "400px",
          maxWidth: "400px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          "& .MuiMenuItem-root": {
            px: 2,
            py: 1,
            borderBottom: "1px solid",
            borderColor: "divider",
            "&:last-child": {
              borderBottom: "none",
            },
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Box
        sx={{
          pt: 1,
          px: 2,
          pb: 1,
          bgcolor: "#0000000d",
          borderBottom: "1px solid",
          borderColor: "#0000000d",
          position: "sticky",
          top: 0,
          zIndex: 1,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h6" sx={{ fontSize: "1rem" }}>
          Notificaciones
        </Typography>
        {notificaciones.filter(r => r?.vista === 0 && ((!r?.id_contrato && !r?.id_obra) ? true : ((espacio && contrato) && (r?.id_obra === espacio?.id && r?.id_contrato === contrato?.id)) ? true : (espacio && (contrato || !contrato) && !r?.id_contrato && espacio?.id === r?.id_obra) ? true : false)).length > 0 && (
          <Typography variant="caption" color="text.secondary">
            Tienes ({
              notificaciones.filter(r => r?.vista === 0 && ((!r?.id_contrato && !r?.id_obra) ? true : ((espacio && contrato) && (r?.id_obra === espacio?.id && r?.id_contrato === contrato?.id)) ? true : (espacio && (contrato || !contrato) && !r?.id_contrato && espacio?.id === r?.id_obra) ? true : false)).length}) notificación{notificaciones.filter(r => r?.vista === 0 && ((!r?.id_contrato && !r?.id_obra) ? true : ((espacio && contrato) && (r?.id_obra === espacio?.id && r?.id_contrato === contrato?.id)) ? true : (espacio && (contrato || !contrato) && !r?.id_contrato && espacio?.id === r?.id_obra) ? true : false)).length !== 1 ? "es" : ""} sin leer
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          flex: 1,
          paddingTop: "10px",
          paddingBottom: "30px",
          overflow: "auto",
          maxHeight: "calc(480px - 100px)",
        }}
      >
        {notificaciones.filter(r => r?.vista === 0 && ((!r?.id_contrato && !r?.id_obra) ? true : ((espacio && contrato) && (r?.id_obra === espacio?.id && r?.id_contrato === contrato?.id)) ? true : (espacio && (contrato || !contrato) && !r?.id_contrato && espacio?.id === r?.id_obra) ? true : false)).length === 0 ? (
          <Box
            sx={{
              py: 6,
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            <NotificationsOutlined
              fontSize="40px"
              sx={{ fontSize: 40, mb: 1, opacity: 0.3 }}
            />
            <br />
            <Typography variant="p">
              ¡No tienes notificaciones nuevas!
            </Typography>
          </Box>
        ) : (
          notificaciones.filter(r => r?.vista === 0 && ((!r?.id_contrato && !r?.id_obra) ? true : ((espacio && contrato) && (r?.id_obra === espacio?.id && r?.id_contrato === contrato?.id)) ? true : (espacio && (contrato || !contrato) && !r?.id_contrato && espacio?.id === r?.id_obra) ? true : false)).sort((a, b) => new Date(b?.creada) - new Date(a?.creada)).map((notification, index) => (


            <MenuItem
              style={{ cursor: 'default' }}
              className={`notification-item ${!notification.vista ? "unread" : ""
                } text-${getBackgroundColor(notification.tipo_notificacion)}`}
              key={index}
              sx={{
                m: 0.5,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 1,
                bgcolor: !notification.vista ? "action.hover" : "transparent",
                borderLeft: !notification.vista ? "4px solid red" : "none",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  width: "100%",
                  gap: 1,
                }}
              >
                <Avatar
                  sx={{
                    background: "#ced4da69",
                    width: 30,
                    height: 30,
                    bgcolor: getBackgroundColor(notification.tipo_notificacion),
                  }}
                >
                  {getTypeIcon(notification.id_tipo_notificacion)}
                </Avatar>
                <Box sx={{
                  flex: 1,
                  whiteSpace: 'normal',
                  wordWrap: 'break-word',
                }} >
                  <p style={{ margin: 0, padding: 0, fontWeight: 'bold' }} className={
                    "text-" + getBackgroundColor(notification.tipo_notificacion)
                  }>{notification.descripcion} </p>
                  <p
                    className="fs-75 m-0 text-black notification-description"
                    sx={{
                      display: "-webkit-box",
                    }}
                  >
                    {notification.detalle}
                  </p>
                  <span className="fs-75 text-muted">
                    <AccessTime
                      sx={{ width: "13px", mt: "-2px", opacity: 0.8 }}
                      fontSize="small"
                    />{" "}
                    {notification.creada}
                  </span>
                  <div style={{}}>
                    <ButtonGroup>

                      {notification?.id_tipo_notificacion === 1 ? <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={(e) => {
                          handleAccionNotificacion(notification, 'ir')
                        }}
                      >
                        Ir
                      </Button> : null}

                      {notification?.id_tipo_notificacion === 2 ? <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={(e) => {
                          handleAccionNotificacion(notification, 'ir')
                        }}
                      >
                        Ir
                      </Button> : null}


                      {notification?.id_tipo_notificacion === 8 ? <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={(e) => {
                          handleAccionNotificacion(notification, 'ir')
                        }}
                      >
                        Ir
                      </Button> : null}



                      <Button
                        size="sm"
                        variant={notification?.id_tipo_notificacion === 1 || notification?.id_tipo_notificacion === 2 || notification?.id_tipo_notificacion === 8 ? "outline-danger" : "outline-danger"}
                        onClick={(e) => {
                          handleAccionNotificacion(notification, 'eliminar')
                        }}
                      >
                        {notification?.id_tipo_notificacion === 1 || notification?.id_tipo_notificacion === 2 || notification?.id_tipo_notificacion === 8 ? "Marcar como leída" : 'Marcar como leída'}
                      </Button>
                    </ButtonGroup>
                  </div>
                </Box>
              </Box>
            </MenuItem>



          ))
        )}
      </Box>
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;
      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }
      return colorValue;
    },
  });
  const ruta = useSelector((state) => state?.app?.ruta || null);
  const capitalizarPrimeraLetra = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <p style={{ position: 'relative', top: '3px', color: darkMode ? 'white' : '#344767', fontWeight: 'bolder' }}>
            <small style={{ position: 'relative', bottom: '2px' }}>
              <HomeIcon fontSize="medium" />
            </small>
            {capitalizarPrimeraLetra((route[route.length - 1]).replaceAll('-', ' '))}
          </p>
          {ruta ? <IconButton sx={navbarDesktopMenu} onClick={handleMiniSidenav} size="medium" disableRipple>
            <Icon fontSize="medium" sx={iconsStyle}>
              {miniSidenav ? "menu_open" : "menu"}
            </Icon>
          </IconButton> : null}
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox color={light ? "white" : "inherit"}>
              <IconButton
                size="small"
                style={{cursor:'pointer'}}
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="atras-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={() => navigate(-1)}
              >
                <ArrowBackIcon fontSize="medium" color="primary" />
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                title="Cerrar sesión"
                color="inherit"
                style={{cursor:'pointer'}}
                sx={navbarIconButton}
                aria-controls="atras-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={() => navigate('/logoutPage')}
              >
                <LaunchIcon fontSize="medium" />
              </IconButton>
              <Link to="/perfil-usuario" title="Perfil">
                <IconButton sx={navbarIconButton} size="small"
                  disableRipple
                  title="Perfil"
                  color="inherit"
                  aria-controls="atras-menu"
                  aria-haspopup="true"
                  variant="contained">
                  <ManageAccountsOutlinedIcon fontSize="medium" style={{ color: '#344767' }} />
                </IconButton>
              </Link>
              <IconButton
                size="small"
                style={{cursor:'pointer'}}
                disableRipple
                title="Ajustes"
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
                aria-controls="atras-menu"
                aria-haspopup="true"
                variant="contained"
              >
                <MenuOpenOutlinedIcon fontSize="medium" style={{ color: '#344767' }} />
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                title="Ajustes apariencia del sitio"
                style={{cursor:'pointer'}}
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <SettingsOutlinedIcon fontSize="medium" style={{ color: '#344767' }} />
              </IconButton>
              <IconButton
                size="small"
                title="Mis notificaciones"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                style={{cursor:'pointer'}}
                onClick={handleOpenMenu}
              >
                <Badge badgeContent={notificaciones.filter(r => r?.vista === 0 && ((!r?.id_contrato && !r?.id_obra) ? true : ((espacio && contrato) && (r?.id_obra === espacio?.id && r?.id_contrato === contrato?.id)) ? true : (espacio && (contrato || !contrato) && !r?.id_contrato && espacio?.id === r?.id_obra) ? true : false)).length > 99 ? +99 : notificaciones.filter(r => r?.vista === 0 && ((!r?.id_contrato && !r?.id_obra) ? true : ((espacio && contrato) && (r?.id_obra === espacio?.id && r?.id_contrato === contrato?.id)) ? true : (espacio && (contrato || !contrato) && !r?.id_contrato && espacio?.id === r?.id_obra) ? true : false)).length} color="error">
                  <NotificationsOutlined fontSize={"medium"} />
                </Badge>
              </IconButton>
              {renderMenu()}
            </MDBox>
          </MDBox>
        )}
        {isMini ? (<MDBox style={{cursor:'pointer'}} sx={(theme) => navbarRow(theme, { isMini })}>
          <MDBox color={light ? "white" : "inherit"}>
            <IconButton
              size="small"
              disableRipple
              color="inherit"
              sx={navbarIconButton}
              aria-controls="atras-menu"
              aria-haspopup="true"
              variant="contained"
              onClick={() => navigate(-1)}
            >
            </IconButton>
              <ArrowBackIcon onClick={() => navigate(-1)} fontSize="medium" color="primary" /> <span style={{fontSize:14, fontWeight:'bold'}} onClick={() => navigate(-1)}>Regresar</span>
          </MDBox>
        </MDBox>
        ) : null}

      </Toolbar>
      <ModalComponent handleClose={handleisAlerClose} isOpen={isAlertOpen} key={'alerta'}>
        <Grid container spacing={2} style={{ textAlign: 'center' }}>
          <Grid item xs={12}>
            <br />
            <br />
            <p>{mensajeAlert}</p>
          </Grid>
        </Grid>
      </ModalComponent>
      <Backdrop className='BackdropClass' open={procesando}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </AppBar>
  );
}

DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};
export default DashboardNavbar;
