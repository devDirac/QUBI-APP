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
import { Button } from 'react-bootstrap';
import { useState, useCallback } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// prop-types is library for typechecking of props
import PropTypes from "prop-types";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Backdrop, CircularProgress, Tooltip } from '@mui/material';
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import Icon from "@mui/material/Icon";
import MDBox from "../../../../componets/MDBox/index";
import MDTypography from "../../../../componets/MDTypography/index";
import MDAvatar from "../../../../componets/MDAvatar/index";
import { Grid } from "@mui/material";
import env from "react-dotenv";
import { useSelector, useDispatch } from 'react-redux';
import logo from "assets/images/logo.png";
import { useNavigate } from 'react-router-dom';
import { getAvancesConfirmadosHttp, getAvancesPendientesPorEstimarHttp, enviarCorreoHttp } from '../../../../actions/avance';
import ModalComponent from '../../../../componets/Modal';
import { numericFormatter } from 'react-number-format';
import { getErrorHttpMessage } from '../../../../utils';
import { useIntl } from 'react-intl';
import { useMaterialUIController } from 'context';
import { setMenuRoutes } from '../../../../actions/menu';
import routes from '../../../../routes'
import DinamicTableMejorada from '../../../../componets/DinamicTableMejorada/DinamicTableMejorada';
import moment from 'moment';

// Custom styles for ComplexProjectCard
function ComplexProjectCard({ color, image, title, dateTime, description, members, contratos, dropdown, element, onSelect, onSelectMembers, esContrato, coordenadas, muestraMap, muestraAvances, alertaImporteCatalogoVsImporteContrato, importeConcepto }) {
  const contrato = useSelector((state) => state?.app?.contrato || null);
  const perfil = useSelector((state) => (state?.app?.user?.data?.id_tipo_usuario || 0));
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const dispatch = useDispatch();
  const [procesando, setProcesando] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const [isOpenActividades, setIsOpenActividades] = useState(false);
  const handleOpenActividades = () => setIsOpenActividades(true);
  const handleCloseActividades = () => setIsOpenActividades(false);
  const [actividades, setActividades] = useState([]);


  const [isOpenAvancesPendientesEstimar, setIsOpenAvancesPendientesEstimar] = useState(false);
  const handleOpenAvancesPendientesEstimar = () => setIsOpenAvancesPendientesEstimar(true);
  const handleCloseAvancesPendientesEstimar = () => setIsOpenAvancesPendientesEstimar(false);
  const [avancesPendientesEstimar, setAvancesPendientesEstimar] = useState([]);



  const [avances, setAvances] = useState([]);
  const intl = useIntl();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [mensajeAlert, setMensajeAlert] = useState('');
  const handleisAlertOpen = () => setIsAlertOpen(true);
  const handleisAlerClose = () => setIsAlertOpen(false);


  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: env.googleMapsKey
  })

  const containerStyle = {
    width: '100%',
    height: '150px'
  };


  const getAvances = useCallback(async () => {
    try {
      setProcesando(true);
      const avancesPorConfirmar = await getAvancesConfirmadosHttp(contrato?.id);
      setAvances(avancesPorConfirmar.map((a) => {
        return {
          detalleConcepto: a?.detalleConcepto,
          frentes: a?.frentes || {},
          fecha_registro: a?.fecha_registro,
          usuario: a?.usuario,
          concepto: a?.concepto,
          cantidad_contrato: a?.cantidad_contrato,
          cantidad_visual: a?.cantidad_visual,
          cantidad_confirmada: a?.cantidad_confirmada,
          comentarios: a?.comentarios,
          descripcion_estatus: a?.descripcion_estatus,
          estatus: a?.estatus,
          avance: numericFormatter((+(a?.cantidad_confirmada / a?.cantidad_contrato) * 100) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: '%' }),
          fecha_hora: a?.fecha_hora,
          fecha_hora_c: a?.fecha_hora_c,
          id: a?.id,
          id_concepto: a?.id_concepto,
          id_estimacion: a?.id_estimacion,
          id_usuario: a?.id_usuario,
          tipo: a?.tipo,
          tipo_descripcion: a?.tipo_descripcion
        }
      }));
      if (avancesPorConfirmar?.length) {
        handleOpen();
      } else {
        setMensajeAlert('Sin resultados');
        handleisAlertOpen();
      }
      setProcesando(false)
    } catch (error) {
      setProcesando(false);
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'get_elementos_error' }));
      handleisAlertOpen();
    }
  }, [contrato?.id]);


  const handleClicAvancesPendientes = async () => {
    try {
        const response = await getAvancesPendientesPorEstimarHttp(contrato?.id);
        setAvancesPendientesEstimar(response)
        handleOpenAvancesPendientesEstimar()
    } catch (error) {
      setProcesando(false);
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'get_elementos_error' }));
      handleisAlertOpen();
    }
  }

  const handlePlantillaCorreo = async () => {
    try {
        const response = await enviarCorreoHttp();
    } catch (error) {
      setProcesando(false);
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'get_elementos_error' }));
      handleisAlertOpen();
    }
  }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item lg={!muestraAvances ? 12 : contrato ? 12 : 12} md={!muestraAvances ? 12 : contrato ? 12 : 12} sm={!muestraAvances ? 12 : 12} xl={!muestraAvances ? 12 : contrato ? 12 : 12} xs={!muestraAvances ? 12 : 12} style={{ minHeight: 180 }}>
        <Card style={alertaImporteCatalogoVsImporteContrato && alertaImporteCatalogoVsImporteContrato >= 1 ? { border: 'solid 1px rgba(0, 0, 0, 0.125)', boxShadow: '-1px 0px 12px 0px rgba(209,191,75,1)' } : { border: 'solid 1px rgba(0, 0, 0, 0.125)' }}>
          <MDBox p={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MDBox display="flex" alignItems="center" style={{ justifyContent: 'space-between' }}>
                  <MDAvatar
                    onClick={() => {
                      onSelect && onSelect(element)
                    }}
                    src={image || logo}
                    alt={title}
                    size="md"
                    variant="rounded"
                    bgColor={color || "dark"}
                    sx={{ p: 0, mt: -6, borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl }}
                  />
                  <MDBox ml={2} mt={-2} lineHeight={2} style={{ flex: 1 }} >
                    <MDTypography variant="h7" textTransform="capitalize" fontWeight="medium" style={{ fontSize: '16px' }}>
                      {title}
                    </MDTypography>
                  </MDBox>
                  {onSelect ? <Button
                    style={{
                      position: 'relative',
                      top: '-33px',
                      backgroundColor: '#344767',
                      border: 'solid 1px #344767'
                    }}
                    size='sm'
                    variant="primary"
                    onClick={() => {
                      onSelect && onSelect(element)
                    }}
                  >
                    <RemoveRedEyeIcon />
                  </Button> : null}


                  {alertaImporteCatalogoVsImporteContrato && alertaImporteCatalogoVsImporteContrato >= 1 ? <div style={{
                    position: 'relative',
                    top: '-33px',
                    left: '10px',

                  }}>  <Tooltip
                    title={`Este contrato tiene una diferencia del ${alertaImporteCatalogoVsImporteContrato}% entre el importe capturado en el contrato y el importe calculado de la cantidad de los conceptos que es de: ${numericFormatter((importeConcepto) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })} `}>
                      <ReportGmailerrorredIcon style={{color:'red'}} />
                    </Tooltip>
                  </div> : null}
                  {dropdown && (
                    <MDTypography
                      color="secondary"
                      onClick={dropdown.action}
                      sx={{
                        ml: "auto",
                        mt: -1,
                        alignSelf: "flex-start",
                        py: 1.25,
                      }}
                    >
                      <Icon fontSize="default" sx={{ cursor: "pointer", fontWeight: "bold" }}>
                        more_vert
                      </Icon>
                    </MDTypography>
                  )}
                  {dropdown?.menu}
                </MDBox>
              </Grid>
              <Grid item xs={12} md={muestraMap ? 4 : 12} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <MDBox style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <p style={{ fontSize: '14px' }}>{description}</p>
                </MDBox>
              </Grid>
              {muestraMap && <Grid item xs={12} md={6}>
                {
                  isLoaded ? (
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      onLoad={map => {
                        const bounds = new window.google.maps.LatLngBounds();
                        map.fitBounds(bounds);
                      }}
                      center={{
                        lat: coordenadas.lat,
                        lng: coordenadas.lng,
                      }}
                      zoom={4}
                    >
                      {
                        coordenadas ? <Marker position={{ lat: coordenadas.lat, lng: coordenadas.lng }} /> : null
                      }
                      <></>
                    </GoogleMap>
                  ) : <></>
                }
              </Grid>}
            </Grid>
            <Divider />
            <MDBox display="flex" justifyContent="space-between" alignItems="center" >
              <Grid container  /* direction="column" */ alignItems="center" /* justifyContent="center" */>
                <Grid item xs={12} md={muestraAvances && contrato ? 1 : element?.espacio ? 3 : 4}>
                  {members > -1 ? (
                    <MDBox display="flex" flexDirection="column" lineHeight={0} style={{ textAlign: 'center', cursor: onSelectMembers ? 'pointer' : 'default' }} onClick={() => {
                      onSelectMembers && onSelectMembers(element)
                    }}>
                      <MDTypography variant="button" fontWeight="medium">
                        {members}
                      </MDTypography>
                      <MDTypography variant="button" fontWeight="regular" color="secondary">
                        {onSelectMembers ? 'Perfiles asignados' : 'Usuarios asignados'}
                      </MDTypography>
                    </MDBox>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={muestraAvances && contrato ? 1 : element?.espacio ? 3 : 4}>
                  {contratos > -1 && contratos ? (
                    <MDBox display="flex" flexDirection="column" lineHeight={0} style={{ textAlign: 'center' }}>
                      <MDTypography variant="button" fontWeight="medium">
                        {contratos}
                      </MDTypography>
                      <MDTypography variant="button" fontWeight="regular" color="secondary">
                        {+contratos > 1 ? 'Contratos' : 'Contrato'}
                      </MDTypography>
                    </MDBox>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={muestraAvances && contrato ? 1 : element?.espacio ? 3 : 4}>
                  {dateTime ? (
                    <MDBox display="flex" flexDirection="column" lineHeight={0} style={{ textAlign: 'center' }}>
                      <MDTypography variant="button" fontWeight="medium">
                        {dateTime}
                      </MDTypography>
                      <MDTypography variant="button" fontWeight="regular" color="secondary">
                        {!esContrato ? intl.formatMessage({ id: 'fecha_de_entrega' }) : intl.formatMessage({ id: 'input_fecha_registro' })}
                      </MDTypography>
                    </MDBox>
                  ) : null}
                </Grid>

                {element?.espacio ? (<Grid item xs={12} md={muestraAvances && contrato ? 1 : 1}>

                  <MDBox display="flex" flexDirection="column" lineHeight={0} style={{ textAlign: 'center' }}>
                    <MDTypography variant="button" fontWeight="medium">
                      {element?.espacio || 0} (MB)
                    </MDTypography>
                    <MDTypography variant="button" fontWeight="regular" color="secondary" onClick={()=>{
                      handlePlantillaCorreo()
                    }}>
                      Espacio utilizado
                    </MDTypography>
                  </MDBox>

                </Grid>) : null}


                <Grid item xs={12} md={2}>
                  {muestraAvances && contrato ? (
                    <MDBox display="flex" flexDirection="column" lineHeight={0} style={{ textAlign: 'center', cursor: 'pointer' }} onClick={(e) => {
                      [1, 3, 2].includes(perfil) && navigate('/avance-por-confirmar')
                    }}>
                      <MDTypography variant="button" fontWeight="medium">
                        {contrato?.avances_por_confirmar + ''}
                      </MDTypography>
                      <MDTypography variant="button" fontWeight="light" style={{ color: '#fb8c00', fontWeight: 'bolder' }}>
                        Avances por confirmar
                      </MDTypography>
                    </MDBox>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={2}>
                  {muestraAvances && contrato ? (
                    <MDBox display="flex" flexDirection="column" lineHeight={0} style={{ textAlign: 'center', cursor: 'pointer' }} onClick={(e) => {
                      getAvances();
                    }}>
                      <MDTypography variant="button" fontWeight="medium">
                        {contrato?.avances_confirmados + ''}
                      </MDTypography>
                      <MDTypography variant="button" fontWeight="regular" style={{ color: '#4CAF50', fontWeight: 'bolder' }}>
                        Avances confirmados
                      </MDTypography>
                    </MDBox>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={2}>
                  {muestraAvances && contrato ? (
                    <MDBox display="flex" flexDirection="column" lineHeight={0} style={{ textAlign: 'center', cursor: 'pointer' }} onClick={(e) => {
                      handleOpenActividades();
                      setActividades((contrato?.actividades || []).filter((r) => {
                        const fecha = moment(r?.fecha);
                        return fecha.isBetween(moment().startOf('week'), moment().endOf('week'), 'day', '[]');
                      }))
                    }}>
                      <MDTypography variant="button" fontWeight="medium">
                        {(contrato?.actividades || []).filter((r) => {
                          const fecha = moment(r?.fecha);
                          return fecha.isBetween(moment().startOf('week'), moment().endOf('week'), 'day', '[]');
                        })?.length}
                      </MDTypography>
                      <MDTypography variant="button" fontWeight="regular" style={{ color: '#1A73E8', fontWeight: 'bolder' }}>
                        Actividades para esta semana
                      </MDTypography>
                    </MDBox>
                  ) : null}
                </Grid>

                <Grid item xs={12} md={2}>

                  {muestraAvances && contrato ? (
                    <MDBox display="flex" flexDirection="column" lineHeight={0} style={{ textAlign: 'center', cursor: 'pointer' }} onClick={(e) => {
                      handleClicAvancesPendientes()

                    }}>
                      <MDTypography variant="button" fontWeight="medium">
                        {contrato?.avances_pendientes_estimar || 0}
                      </MDTypography>
                      <MDTypography variant="button" fontWeight="regular" style={{ color: '#de5055', fontWeight: 'bolder' }}>
                        Avances pendientes por estimar
                      </MDTypography>
                    </MDBox>
                  ) : null}
                </Grid>


              </Grid>
            </MDBox>
          </MDBox>
        </Card>
      </Grid>


      <ModalComponent
        handleClose={handleClose}
        isOpen={isOpen}
        size='xl'
      >
        <Grid container>
          <Grid item xs={12} style={{ padding: 12, textAlign: 'right' }}>
            {[1, 3, 5].includes(perfil) ? <Button
              variant="primary"
              onClick={(e) => {
                dispatch(setMenuRoutes(routes.find(e => e?.key === 'estimaciones')));
                navigate('/realizar-estimacion')
              }}
            >
              Estimar avances
            </Button> : null}
          </Grid>
          <Grid item xs={12}>
            {avances?.length ? <DinamicTableMejorada
              tituloExcel={'Lista de avances confirmados'}
              columnsToShow={[
                'fecha_registro',
                'usuario',
                'concepto',
                'cantidad_contrato',
                'cantidad_visual',
                'cantidad_confirmada',
                'descripcion_estatus',
                'avance'
              ]}
              enAccion={(accion, detalle) => { }}
              clickEnRow
              data={avances}
              titulo={'Lista de avances confirmados'}
            /> : null}
          </Grid>

        </Grid>
      </ModalComponent>

      <ModalComponent
        handleClose={handleCloseAvancesPendientesEstimar}
        isOpen={isOpenAvancesPendientesEstimar}
        size='xl'
      >
        <Grid container>
          <Grid item xs={12}>
           {/* {JSON.stringify(avancesPendientesEstimar)} */}
           {avancesPendientesEstimar?.length ? <DinamicTableMejorada
              tituloExcel={'Lista de actividades para esta semana'}
              /* columnsToShow={[
                'fecha_registro',
                'usuario',
                'concepto',
                'cantidad_contrato',
                'cantidad_visual',
                'cantidad_confirmada',
                'descripcion_estatus',
                'avance'
              ]} */
              data={avancesPendientesEstimar.map((r)=> {
                return {
                  concepto: r?.concepto,
                  descripcion: "MANO DE OBRA PARA LUMINARIO MODELO POWER LIGHT 400W 5000K 120° 120-277V CON VISERA ANTIDESLUMBRANTE  - CODIGO PWHTLMOWT50WBD120-277VLBFFL - UBICACIÓN ILUMINACIÓNEN EXTERIORES. EL PRECIO INCLUYE: MANO DE OBRA",
                  cantidad_acumulada: r?.cantidad_acumulada,
                  cantidad_ejecutada:r?.cantidad_ejecutada,
                  importe: numericFormatter(r?.importe + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: '', prefix:'$' }),
                  importe_acumulado: numericFormatter(r?.importe_acumulado + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: '', prefix:'$' }),
                  pendiente_estimar: numericFormatter(r?.pendiente_estimar + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: '', prefix:'' }),
                  precio_unitario: numericFormatter(r?.precio_unitario + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: '', prefix:'$' }),
                  unidad: numericFormatter(r?.unidad + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: '', prefix:'' }),
                  a_estimar: r?.volumen_estimar,
                }
              })}
              titulo={'Avances pendientes por estimar'}
            /> : 'Sin resultados'}
          </Grid>

        </Grid>
      </ModalComponent>

      <ModalComponent
        handleClose={handleCloseActividades}
        isOpen={isOpenActividades}
        size='xl'
      >
        <Grid container>
          <Grid item xs={12}>
            {actividades?.length ? <DinamicTableMejorada
              tituloExcel={'Lista de actividades para esta semana'}
              /* columnsToShow={[
                'fecha_registro',
                'usuario',
                'concepto',
                'cantidad_contrato',
                'cantidad_visual',
                'cantidad_confirmada',
                'descripcion_estatus',
                'avance'
              ]} */
              data={actividades}
              titulo={'Lista de actividades para esta semana'}
            /> : 'Sin resultados'}
          </Grid>

        </Grid>
      </ModalComponent>

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
    </Grid>

  );
}

// Typechecking props for the ProfileInfoCard
ComplexProjectCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string,
  description: PropTypes.node.isRequired,
  element: PropTypes.object,
  members: PropTypes.number,
  contratos: PropTypes.number,
  onSelect: PropTypes.func,
  onSelectMembers: PropTypes.func,
  esContrato: PropTypes.bool,
  coordenadas: PropTypes.object,
  muestraMap: PropTypes.bool,
  muestraAvances: PropTypes.bool,
  alertaImporteCatalogoVsImporteContrato: PropTypes.number,
  importeConcepto: PropTypes.number,
  dropdown: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      action: PropTypes.func,
      menu: PropTypes.node,
    }),
  ]),
};

export default ComplexProjectCard;
