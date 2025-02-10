/**
=========================================================
* Otis Admin PRO - v2.0.1
=========================================================
* Product Page: https://material-ui.com/store/items/otis-admin-pro-material-dashboard-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
Coded by www.creative-tim.com
 =========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.*/
import { useEffect, useMemo, useState, useCallback } from "react";
import _ from "lodash";
import env from "react-dotenv";
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
import { useSelector, useDispatch } from "react-redux";
// react-router-dom componets
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { Grid, Tooltip } from '@mui/material'
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
// @mui material componets
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
// Otis Admin PRO React componets
import MDBox from "../../componets/MDBox/index";
import MDTypography from "../../componets/MDTypography/index";
import MenuHome from '../../componets/MenuHome/MenuHome'
import InfoIcon from '@mui/icons-material/Info';
// Otis Admin PRO React example componets
import SidenavCollapse from "../../examples/Sidenav/SidenavCollapse";
import SidenavList from "examples/Sidenav/SidenavList";
import SidenavItem from "examples/Sidenav/SidenavItem";
import ModalComponent from '../../componets/Modal'
import Badge from '@mui/material/Badge';
// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";
import { setFlujo } from '../../actions/flujoInicial';
import { AsistenteVirtualHTTP, setPreguntaCorrectaHTTP } from '../../actions/dinamic.dashboard'
// Otis Admin PRO React context
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
  setDarkMode,
  setFixedNavbar,
  setSidenavColor
} from "context";
import SpeedDial from '@mui/material/SpeedDial';
import ErrorIcon from '@mui/icons-material/Error';
import AppsIcon from '@mui/icons-material/Dashboard';
import { styled } from '@mui/material/styles';
import ProgresoTimeLine from '../../componets/ProgresoTimeLine/ProgresoTimeLine'
import AsistenteForm from '../../componets/AsistenteForm/AsistenteForm';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: 'trasparent',
    color: 'trasparent',
    boxShadow: `0 0 0 0 ${theme.palette.background.paper}`,
    '&::after': {
      position: 'relative',
      top: -9,
      left: -9,
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '2px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.9)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.9)',
      opacity: 0,
    },
  },
}));

const StyledBadgeComplete = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: 'trasparent',
    color: 'trasparent',
    boxShadow: `0 0 0 0 ${theme.palette.background.paper}`,

  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.9)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.9)',
      opacity: 0,
    },
  },
}));

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const navigate = useNavigate()
  const dispatch_ = useDispatch();
  const nameUsuario = useSelector((state) => state?.app?.user?.data?.name || '');
  const proyectosUsuario = useSelector((state) => state?.app?.user?.data?.proyectos || []);
  const archivosCompartidos = useSelector((state) => state?.app?.user?.data?.archivos_compartidos || []);
  const ruta = useSelector((state) => state?.app?.ruta || null);
  const espacio = useSelector((state) => state?.app?.espacio || null);
  const contrato = useSelector((state) => state?.app?.contrato || null);
  const superAdministrador = useSelector((state) => state?.app?.user?.data?.tipo_usuario || [])?.find(e => e?.id === 3);
  const id_usuario = useSelector((state) => state?.app?.user?.data?.id || 0);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [mensajeAlert, setMensajeAlert] = useState('');
  const handleisAlertOpen = () => setIsAlertOpen(true);
  const handleisAlerClose = () => {
    navigate(`/inicio`)
    setIsAlertOpen(false)
  };
  const [isAlertMenuOpen, setIsAlertMenuOpen] = useState(false);
  const handleisAlertMenuOpen = () => setIsAlertMenuOpen(true);
  const handleisAlertMenuClose = () => setIsAlertMenuOpen(false);

  const [isAlertProgreso, setIsAlertProgreso] = useState(false);
  const handleisAlertProgresoOpen = () => setIsAlertProgreso(true);
  const handleisAlertProgresoClose = () => setIsAlertProgreso(false);

  const [isAlertAsistente, setIsAlertAsistente] = useState(false);
  const handleisAlertAsistenteOpen = () => setIsAlertAsistente(true);
  const handleisAlertAsistenteClose = () => {
    setIsAlertAsistente(false);
    setMensajeBienvenida('')
    setRespuesta('')
    setRespuestaId(null)
  };

  const [mensajeBienvenida,setMensajeBienvenida] = useState('');
  const [respuesta,setRespuesta] = useState('');
  const [respuestaId,setRespuestaId] = useState(null);
  const [urlInteligente,setUrlInteligente] = useState('');
  const [procesando,setProcesando] = useState(false);

  const [openCollapse, setOpenCollapse] = useState(false);
  const [openNestedCollapse, setOpenNestedCollapse] = useState(false);
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } = controller;
  const ajustes_sitio = useSelector((state) => state?.app?.user?.data?.ajustes_sitio || [])
  const location = useLocation();
  const { pathname } = location;

  const collapseName = useMemo(() => {
    return pathname.split("/").slice(1)[0];
  }, [pathname])

  const items = pathname.split("/").slice(1);

  const itemParentName = useMemo(() => {
    return items[1]
  }, [items]);

  const itemName = items[items.length - 1];
  const tipoUsuario = useSelector((state) => state?.app?.user?.data?.tipo_usuario || [])
  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    setOpenCollapse(collapseName);
    setOpenNestedCollapse(itemParentName);
  }, [collapseName, itemParentName]);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(dispatch, window.innerWidth < 1200 ? false : transparentSidenav);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
    }
    /**  The event listener that's calling the handleMiniSidenav function when resizing the window. */
    window.addEventListener("resize", handleMiniSidenav);
    // Call the handleMiniSidenav function to set the state with the initial value.
    /*  handleMiniSidenav(); */
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location, transparentSidenav, whiteSidenav]);

  const setAjustes = useCallback(() => {
    if (!_.isEmpty(ajustes_sitio)) {
      setDarkMode(dispatch, (ajustes_sitio?.[0]?.tema_claro_oscuro || 0) === 1 ? true : false);
      setMiniSidenav(dispatch, (ajustes_sitio?.[0]?.menu_lateral_mini || 0) === 1 ? true : false);
      setFixedNavbar(dispatch, (ajustes_sitio?.[0]?.cabecera_fija || 0) === 1 ? true : false)
      setSidenavColor(dispatch, (ajustes_sitio?.[0]?.color_menu_lateral || 'primary'))
    }
    if ((ajustes_sitio?.[0]?.tipo_menu_lateral || '') === 'trasparent') {
      setTransparentSidenav(dispatch, true);
      setWhiteSidenav(dispatch, false);
    }

    if ((ajustes_sitio?.[0]?.tipo_menu_lateral || '') === 'white') {
      setWhiteSidenav(dispatch, true);
      setTransparentSidenav(dispatch, false);
    }

    if ((ajustes_sitio?.[0]?.tipo_menu_lateral || '') === 'dark') {
      setWhiteSidenav(dispatch, false);
      setTransparentSidenav(dispatch, false);
    }
  }, [ajustes_sitio])

  useEffect(() => {
    setAjustes()
  }, [setAjustes])

  const handleNavegarSinEspacio = () => {
    setMensajeAlert('Para poder navegar en el sitio, debe seleccionar un espacio de trabajo');
    handleisAlertOpen()
  }

  const handleNavegarConEspacio = () => {
    dispatch_(setFlujo(null));
  }

  // Render all the nested collapse items from the routes.js
  const renderNestedCollapse = (collapse) => {

    const template = collapse.filter((c) => (c?.allow || []).includes(tipoUsuario?.[0]?.id)).map(({ name, route, key, href }) => {

      return href ? (
        <Link
          key={key}
          href={href}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavItem name={name} nested />
        </Link>
      ) : espacio ||
        (
          route === '/logoutPage' ||
          route === '/inicio' ||
          route === '/inicio' ||
          route === '/firma-digital' ||
          route === '/repositorio-documentos-apm' ||
          route === '/alertas' ||
          route === '/usuario-alta' ||
          route === '/usuarios-gestion' ||
          route === '/permisos-usuario' ||
          route === '/proyecto-alta' ||
          route === '/catalogos' ||
          route === '/repositorio' ||
          superAdministrador
        ) ? (
        name !== "el-finder" ?
          <NavLink to={route} key={key} sx={{ textDecoration: "none" }} onClick={() => {
            handleNavegarConEspacio()
          }}>
            <SidenavItem name={name} color={color === '' ? 'info' : color} active={route === pathname} nested />
          </NavLink> :
          archivosCompartidos.map((er) => {
            return (
              <NavLink to={'#'} key={key} sx={{ textDecoration: "none" }} onClick={() => { window.open(`${env.API_URL_DOCUMENTOS}storage/app/documentos/${espacio?.id || ""}/elFinder/elfinder.html?path=${(er?.path || '').replaceAll('storage/app/documentos/41/elFinder/files/', '')}`, '_blank') }}>
                <SidenavItem name={(er?.path || '').replaceAll('storage/app/documentos/41/elFinder/files/', '')} color={color === '' ? 'info' : color} nested />
              </NavLink>
            )
          })
      ) : (
        <SidenavItem onClick={() => {
          handleNavegarSinEspacio()
        }} name={name} active={route === pathname} nested />
      )

    }
    );
    return template;
  };
  // Render the all the collpases from the routes.js
  const renderCollapse = (collapses) =>
    collapses.filter((c) => (c?.allow || []).includes(tipoUsuario?.[0]?.id)).map(({ name, collapse, route, href, key }) => {

      let returnValue;
      if (collapse) {
        returnValue = (
          <SidenavItem
            key={key}
            color={color === '' ? 'info' : color}
            name={name}
            active={key === itemParentName ? "isParent" : false}
            open={openNestedCollapse === key}
            onClick={({ currentTarget }) =>
              openNestedCollapse === key && currentTarget.classList.contains("MuiListItem-root")
                ? setOpenNestedCollapse(false)
                : setOpenNestedCollapse(key)
            }
          >
            {renderNestedCollapse(collapse)}
          </SidenavItem>
        );
      } else {
        returnValue = href ? (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavItem color={color === '' ? 'info' : color} name={name} active={key === itemName} />
          </Link>
        ) : espacio || (route === '/logoutPage' || route === '/inicio' || route === '/inicio' || route === '/firma-digital' || route === '/repositorio-documentos-apm' || route === '/alertas' || route === '/usuario-alta' || route === '/usuarios-gestion' || route === '/permisos-usuario' || route === '/proyecto-alta' || route === '/catalogos' || route === '/repositorio' || superAdministrador) ? (

          name === 'Reportes voz' && contrato?.id && id_usuario ?

            <NavLink to={'#'} key={key} sx={{ textDecoration: "none" }} onClick={() => { window.open(env.API_URL_NOTAS_VOZ + 'metricas?user=' + id_usuario + '&c=' + contrato?.id + '&p=' + espacio?.id, '_blank') }}>
              <SidenavItem color={color === '' ? 'info' : color} name={name} active={key === itemName} />
            </NavLink> :
            name === 'Reportes voz' && (!contrato?.id || !id_usuario) ?
              null :
              <NavLink to={route} key={key} sx={{ textDecoration: "none" }} onClick={() => { handleNavegarConEspacio() }}>
                <SidenavItem color={color === '' ? 'info' : color} name={name} active={key === itemName} />
              </NavLink>
        ) : (
          <SidenavItem onClick={() => { handleNavegarSinEspacio() }} color={color === '' ? 'info' : color} name={name} active={key === itemName} />
        );
      }
      return <SidenavList key={key}>{returnValue}</SidenavList>;
    });

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(
    ({ type, name, icon, title, collapse, noCollapse, key, href }) => {

      let returnValue;
      if (type === "collapse") {
        returnValue = href ? (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavCollapse
              name={name}
              icon={icon}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </Link>
        ) : (
          <SidenavCollapse
            key={key}
            name={name}
            icon={icon}
            active={key === collapseName}
            open={openCollapse === key}
            onClick={() => (openCollapse === key ? setOpenCollapse(false) : setOpenCollapse(key))}
          >
            {collapse ? renderCollapse(collapse) : null}
          </SidenavCollapse>
        );
      } else if (type === "title") {
        returnValue = (
          <MDTypography
            key={key}
            color={textColor}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </MDTypography>
        );
      } else if (type === "divider") {
        returnValue = (
          <Divider
            key={key}
            light={
              (!darkMode && !whiteSidenav && !transparentSidenav) ||
              (darkMode && !transparentSidenav && whiteSidenav)
            }
          />
        );
      }
      return returnValue;
    }
  );

  const esNaranja = (_.isEmpty(contrato?.estatus_parametro === null ? '' : contrato?.estatus_parametro + '') || contrato?.usuarios_asignados === 0 || _.isEmpty(contrato?.frentes === null ? '' : contrato?.frentes + '') || _.isEmpty(contrato?.clasificacion_contrato === null ? '' : contrato?.clasificacion_contrato + ''))
  const esAzul = !esNaranja && (_.isEmpty(contrato?.pep === null ? '' : contrato?.pep + '') || _.isEmpty(contrato?.clasificacion_contrato === null ? '' : contrato?.clasificacion_contrato + '') || _.isEmpty(contrato?.programa_financiero === null ? '' : contrato?.programa_financiero + ''));
  const esVerde = !esNaranja && !esAzul;


  const handleRespuestaCorrecta = async(id) => {
    try {
      await setPreguntaCorrectaHTTP({pregunta:id?.pregunta, embedding:id?.embedding_pregunta, id_contenido: id?.sql?.id});
      setMensajeAlert('exito al asignar esta respuesta como correcta');
      setRespuestaId(null);
      handleisAlertOpen();  
    } catch (error) {
      setMensajeAlert('Error al realizar la operación');
      handleisAlertOpen();
    }
  }

  const handleContacto = async (data) => {
    try {
      setProcesando(true);
      setRespuestaId(null);
      const res = await AsistenteVirtualHTTP({...data,...{name:nameUsuario}});
      setMensajeBienvenida('');
      setRespuesta(res?.respuestaInteligente);
      setRespuestaId(res);
      setUrlInteligente(res?.sql?.URL || '')
      setProcesando(false)  
    } catch (error) {
      setProcesando(false);
      setRespuestaId(null);
    }
    
  }

  const initAsistente = async () => {
    try {
      setMensajeBienvenida('Hola soy el asistente virtual de APM, ¿en que te puedo ayudar?')
      handleisAlertAsistenteOpen();
    } catch (error) {
      setMensajeAlert('Error al obtener los datos');
      handleisAlertOpen();
    }

  }

  return (
    <>
      {ruta ? <SidenavRoot
        {...rest}
        variant="permanent"
        ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
      >
        <MDBox pt={3} pb={1} px={4} textAlign="center" style={{ paddingRight: 'unset', paddingLeft: 'unset' }}>
          <MDBox
            display={{ xs: "block", xl: "none" }}
            position="absolute"
            top={0}
            right={0}
            p={1.625}
            onClick={closeSidenav}
            sx={{ cursor: "pointer" }}
          >
            <MDTypography variant="h6" color="secondary">
              <Icon sx={{ fontWeight: "bold" }}>close</Icon>
            </MDTypography>
          </MDBox>
          <MDBox alignItems="center" style={{ textAlign: 'center' }}>
            {brand && <MDBox component="img" src={brand} alt="Brand" width="3rem" />}
            <MDBox
              width={!brandName && "100%"}
              style={{ textAlign: 'center', width: '100%' }}
              sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
            >
              <MDTypography style={{ fontWeight: 'bold' }} component="h6" variant="button" color={textColor}>
                {brandName}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
        <Divider
          light={
            (!darkMode && !whiteSidenav && !transparentSidenav) ||
            (darkMode && !transparentSidenav && whiteSidenav)
          }
        />
        <List>{renderRoutes}</List>
        <ModalComponent handleClose={handleisAlerClose} isOpen={isAlertOpen} key={'alerta'}>
          <Grid container spacing={2} style={{ textAlign: 'center' }}>
            <Grid item xs={12}>
              <br />
              <br />
              <p>{mensajeAlert}</p>
            </Grid>
          </Grid>
        </ModalComponent>
      </SidenavRoot> : null}


      <ModalComponent titleBoton={'MINIMIZAR'} size={'xl'} handleClose={handleisAlertMenuClose} isOpen={isAlertMenuOpen} key={'______'}>
        <MenuHome onSeleccion={handleisAlertMenuClose} />
      </ModalComponent>


      <SpeedDial
        onClick={() => {
          handleisAlertMenuOpen()
        }}
        FabProps={{
          sx: {
            bgcolor: '#084d6e',
            '&:hover': {
              bgcolor: '#2d789c',
            }
          }
        }}
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: '95px', right: '10px', width: '100px' }}
        icon={<AppsIcon fontSize="medium" />}
      />


      <SpeedDial
        onClick={() => {
          initAsistente();
        }}
        FabProps={{
          sx: {
            bgcolor: '#0a58ca',
            '&:hover': {
              bgcolor: '#0a58ca',
            }
          }
        }}
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: '230px', right: '10px', width: '100px' }}
        icon={<SmartToyTwoToneIcon fontSize="medium" />}
      />

      <ModalComponent titleBoton={'MINIMIZAR'} size={'xl'} handleClose={handleisAlertAsistenteClose} isOpen={isAlertAsistente} key={'______Asistente'}>
        <AsistenteForm 
          superAdministrador={superAdministrador} 
          enAccion={(data) => { handleContacto(data) }} 
          enAccionCorrecta={(data) => { handleRespuestaCorrecta(data) }} 
          mensajeBienvenida={mensajeBienvenida} 
          respuestaId={respuestaId} 
          respuesta={respuesta} 
          urlInteligente={urlInteligente} 
          procesando={procesando} 
        />
      </ModalComponent>


      <ModalComponent titleBoton={'MINIMIZAR'} size={'xl'} handleClose={handleisAlertProgresoClose} isOpen={isAlertProgreso} key={'______1'}>
        <ProgresoTimeLine onSelect={handleisAlertProgresoClose} />
      </ModalComponent>

      {contrato ? <SpeedDial
        key={'time_line'}
        onClick={() => {
          handleisAlertProgresoOpen()
        }}
        FabProps={{
          sx: {
            bgcolor: esNaranja ? '#FB8C00' : esAzul ? '#0d6efd' : esVerde ? '#20c997' : '',
            '&:hover': {
              bgcolor: esNaranja ? '#c47108' : esAzul ? '#052c65' : esVerde ? '#198754' : '',
            }
          }
        }}
        ariaLabel="test"
        sx={{ position: 'fixed', bottom: '165px', right: '10px', width: '100px' }}
        icon={

          esVerde || esAzul ?
            <Tooltip title="Integridad de la parametrización del contrato"><StyledBadgeComplete
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            > <ErrorIcon fontSize="medium" /></StyledBadgeComplete></Tooltip>
            :

            <Tooltip title="Integridad de la parametrización del contrato"><StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            > <ErrorIcon fontSize="medium" /></StyledBadge></Tooltip>

        }
      /> : null}


    </>
  );
}
// Setting default values for the props of Sidenav
/* Sidenav.defaultProps = {
  color: "info",
  brand: "",
}; */
// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.instanceOf(Array).isRequired,
};
export default Sidenav;
