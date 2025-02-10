import type { DinamicTableProps } from "./types";
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { saveAs } from 'file-saver';
import InfoIcon from '@mui/icons-material/Info';
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import * as XLSX from 'xlsx'
import { TableColumn } from "react-data-table-component";
import AccionesTable from "./AccionesTable";
import { Avatar, Button, Chip, Grid, Link, Tooltip } from "@mui/material";
import env from "react-dotenv";
import CloudIcon from '@mui/icons-material/Cloud';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import WebIcon from '@mui/icons-material/Web';
import OpcionesRepo from "./OpcionesRepo";
import PreviewIcon from '@mui/icons-material/Preview';
import { useMaterialUIController } from "context";
import { useSelector } from "react-redux";
import { StoreType } from "../../types/geericTypes";
import _ from "lodash";
import { columnsNames } from "./columnsNames";
import moment from "moment";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import './style.scss';
import { useCallback, useMemo, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Volumen from './Volumen';
import { numericFormatter } from 'react-number-format';
import CommentIcon from '@mui/icons-material/Comment';
import VolumenDeducir from "./VolumenDeducir";
import Progreso from '../Progreso/index';

export const useAccionesTable = (props: DinamicTableProps) => {

  const [data, setData] = useState<any[]>((props?.data || []).map((e: any) => {
    if (e.hasOwnProperty('Permisos')) {
      return { ...e, ...{ Permisos: JSON.stringify(e?.Permisos) } };
    } else {
      return e;
    }
  }));

  const [controller] = useMaterialUIController();
  const {
    darkMode
  } = controller;
  moment.locale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
  } as any
  );
  const tipoUsuarios = useSelector(
    (state: StoreType) => state?.app?.catalogos?.['apm_tipo_usuarios']
  );

  const esNumero = (valor: any) => {
    const valorLimpio = (valor + '').replace(/[%$,\s]/g, '');
    const numeroEntero = Number(valorLimpio);
    return !isNaN(numeroEntero);
  }

  const printFechaFinalColor = (row: any, x: any) => {
    return (<div style={{ backgroundColor: '#ffe4e1', color: '#333' }}><Tooltip title={moment(row?.[x] || "").format("MMMM DD YYYY")}><p style={{ whiteSpace: 'normal', overflowWrap: 'break-word', wordBreak: 'keep-all', wordWrap: 'break-word' }}> {moment(row?.[x] || "").format("MMMM DD YYYY")}</p></Tooltip></div>)
  }

  const printNotas = (row: any, x: any) => {
    return (
      <Grid container>
        {
          (row?.[x] || []).map((r: any, key: number) => {
            return (<Grid key={key} item xs={12}> <p style={{ color: 'black', whiteSpace: 'normal', overflowWrap: 'break-word', wordBreak: 'keep-all', wordWrap: 'break-word' }}>{r}</p></Grid>)
          })
        }
      </Grid>
    )
  }

  const printObservacionesCronoFinanciero = (row: any, x: any) => {
    return (
      <Grid container>
        {
          (row?.[x] || []).map((r: any, key: number) => {
            switch (r) {
              case "El contrato ha excedido el periodo contratado":
                return (<Grid key={key} item xs={12}> <p style={{ color: '#a94442', whiteSpace: 'normal', overflowWrap: 'break-word', wordBreak: 'keep-all', wordWrap: 'break-word' }}>{r}</p></Grid>)
              case "El avance fisico es inferior al avance financiero (Pre estimado).":
                return (<Grid key={key} item xs={12}> <p style={{ color: '#a94442', whiteSpace: 'normal', overflowWrap: 'break-word', wordBreak: 'keep-all', wordWrap: 'break-word' }}>{r}</p></Grid>)
              case "El avance financiero es inferior, se recomienda estimar.":
                return (<Grid key={key} item xs={12}> <p style={{ color: '#337ab7', whiteSpace: 'normal', overflowWrap: 'break-word', wordBreak: 'keep-all', wordWrap: 'break-word' }}>{r}</p></Grid>)
              case "El avance es menor al tiempo transcurrido.":
                return (<Grid key={key} item xs={12}> <p style={{ color: '#337ab7', whiteSpace: 'normal', overflowWrap: 'break-word', wordBreak: 'keep-all', wordWrap: 'break-word' }}>{r}</p></Grid>)
              default:
                return (<Grid key={key} item xs={12}> <p style={{ color: 'black', whiteSpace: 'normal', overflowWrap: 'break-word', wordBreak: 'keep-all', wordWrap: 'break-word' }}>{r}</p></Grid>)
            }
          })
        }
      </Grid>
    )
  }

  const tool = (row: any, x: any) => {
    let text = row?.[x] === 0 ? '0' : x === 'descripcion' ? (row?.[x] || "").substring(0, 40) + '...' : x === 'linea_base' || x === 'fecha_inicio' || x === 'fecha_fin' || x === 'fecha_final' ? moment(row?.[x] || "").format("MMMM DD YYYY") : x === 'fecha_registro' ? moment(row?.[x] || "").format("MMMM DD YYYY, H:mm:ss") : (row?.[x] || "");
    if (x === 'msg_relacion_contratos') {
      switch (text) {
        case 'Contrato vigente':
          return (<Tooltip title={(row?.[x] || "")}><p style={{ whiteSpace: 'normal', wordWrap: 'normal', overflowWrap: 'anywhere', wordBreak: 'break-word', color: '#337ab7' }}><InfoIcon /> {text}</p></Tooltip>)
        case 'Contrato terminado':
          return (<Tooltip title={(row?.[x] || "")}><p style={{ whiteSpace: 'normal', wordWrap: 'normal', overflowWrap: 'anywhere', wordBreak: 'break-word', color: '#3c763d' }}> <CheckIcon /> {text}</p></Tooltip>)
        case 'Cierre administrativo':
          return (<Tooltip title={(row?.[x] || "")}><p style={{ whiteSpace: 'normal', wordWrap: 'normal', overflowWrap: 'anywhere', wordBreak: 'break-word', color: '#8a6d3b' }}><DoNotDisturbAltIcon />{text}</p></Tooltip>)
        case 'Contrato Vigente':
          return (<Tooltip title={(row?.[x] || "")}><p style={{ whiteSpace: 'normal', wordWrap: 'normal', overflowWrap: 'anywhere', wordBreak: 'break-word', color: '#337ab7' }}><InfoIcon /> {text}</p></Tooltip>)
        case 'Contrato Terminado':
          return (<Tooltip title={(row?.[x] || "")}><p style={{ whiteSpace: 'normal', wordWrap: 'normal', overflowWrap: 'anywhere', wordBreak: 'break-word', color: '#3c763d' }}> <CheckIcon /> {text}</p></Tooltip>)
        case 'Cierre Administrativo':
          return (<Tooltip title={(row?.[x] || "")}><p style={{ whiteSpace: 'normal', wordWrap: 'normal', overflowWrap: 'anywhere', wordBreak: 'break-word', color: '#8a6d3b' }}><DoNotDisturbAltIcon />{text}</p></Tooltip>)
        default:
          return (<Tooltip title={(row?.[x] || "")}><p style={{ whiteSpace: 'normal', wordWrap: 'normal', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>{text}</p></Tooltip>)
      }
    }
    return (
      <Tooltip
        title={row?.[x] === 0 ? '0' : x === 'linea_base' || x === 'fecha_inicio' || x === 'fecha_fin' || x === 'fecha_final' ? moment(row?.[x] || "").format("MMMM DD YYYY") : x === 'fecha_registro' ? moment(row?.[x] || "").format("MMMM DD YYYY, H:mm:ss") : (row?.[x] || "")}>
        <p style={!esNumero(text) || x === 'periodo' ? { whiteSpace: 'normal', overflowWrap: 'break-word', wordBreak: 'keep-all', wordWrap: 'break-word' } : {}} >
          { typeof text ==='string'  ? text.replace(/\./g, '. ') : text}
        </p>
      </Tooltip>
    );
  };

  const filteredItems = (props?.data || []).map((e: any) => {
    if (e.hasOwnProperty('Permisos')) {
      return { ...e, ...{ Permisos: JSON.stringify(e?.Permisos) } };
    } else {
      return e;
    }
  });
  const keys = Object.keys(filteredItems?.[0]);

  const newKeys = props?.columnsToShow ? _.remove(keys, (n) => {
    return props?.columnsToShow.includes(n);
  }) : keys;

  const columns: TableColumn<any>[] = newKeys.map((dta) => {
    return {
      ...{
        /* headerStyle: {
          position: 'sticky',
          left: 0,
          backgroundColor: 'red', // Mismo fondo para el encabezado
          zIndex: 2, // Mayor que el contenido para que el encabezado quede encima
        }, */
        id: dta,
        sortable: props?.noOrdenaColumnas ? false : true,
        name: (<Tooltip title={columnsNames.find((c: any) => c?.id === dta)?.value || (dta[0].toUpperCase() +  dta.substring(1)).replaceAll('_',' ')}><>{(columnsNames.find((c: any) => c?.id === dta)?.value || (dta[0].toUpperCase() +  dta.substring(1)).replaceAll('_',' ')) as any}</></Tooltip>),
        selector: (row: any) => row?.[dta] || "",
        cell: (row: any) => (
          props?.esDetalleOeneUno && dta === 'avances' ? printAvanceOene(row, dta) :
            props?.esPendienteContabilizar && dta === 'pendiente_contabilizar' ? printPendienteContabilizar(row, dta) :
              props?.esCPO ? pintaCpo(row, dta) :
                props?.newDashboardContratosVencer && dta === 'fecha_final' ? printFechaFinalColor(row, dta) :
                  props?.newDashboardContratosVencer && dta === 'observaciones' ? printObservacionesCronoFinanciero(row, dta) :
                    props?.newDashboardContratosVencer && dta === 'notas' ? printNotas(row, dta) :
                      dta === 'contrato' && props?.esAvanceConGrafica ? creaDetalleAvance(row) :
                        dta === 'asignar_usuarios_carpeta_compartida' ? verUsuariosAsignacion(row) :
                          dta === 'cta_contratos' && props?.esPlanMaestro ? verCntratosClasificacion(row) :
                            dta === 'factura' ? factura(row, dta) :
                              (props?.esInsumos && (dta === 'total_entradas')) ? printTotalEntradas(row, dta) :
                                (props?.esInsumos && (dta === 'total_salidas')) ? printTotalSalidas(row, dta) :
                                  (props?.esInsumos && (dta === 'disponible')) ? printDisponibles(row, dta) :
                                    (props?.esCatalogoDeConceptos && (dta === 'concepto_eee')) ? printConceptoCatalogoConceptos(row, dta) :
                                      (props?.esMatriz && (dta === 'avance')) || (props?.esMatriz && (dta === 'avance_acumulado')) ? setFormatoPorcentaje(row, dta) :
                                        props?.onValueVolumen && dta === 'concepto' && !props?.esMatriz ? printConcepto(row, dta) :
                                          props?.onValueVolumen && dta === 'comentarios' ? verComentarios(row, dta) :
                                            (props?.onValueVolumen && (dta === 'precio_unitario')) || (props?.onValueVolumen && (dta === 'importe_acumulado')) || (props?.onValueVolumen && (dta === 'importe')) || (props?.onValueVolumen && (dta === 'importeAcumuladoActual')) || (props?.onValueVolumen && (dta === 'importeAcumuladoAnterior')) || (props?.onValueVolumen && (dta === 'precio')) ?
                                              setFormatoMoneda(row, dta) :
                                              (props?.onValueVolumen && (dta === 'cantidad_ejecutada')) || (props?.onValueVolumen && (dta === 'pendiente_estimar')) || (props?.onValueVolumen && (dta === 'cantidad_acumulada')) ?
                                                setFormatoUnidad(row, dta) :
                                                dta === "volumen_estimar" ? volumen(row, dta) : dta === "volumen_deducir" ? volumenDeducir(row, dta) : dta === "ir" || dta === 'path' ? ruta(row, dta) : dta === "ruta" ? ruta(row, dta) : dta === "Permisos" ? permiso(row, dta) : dta === "foto" ? foto(row, dta) : dta === "id_tipo_usuario" ? tipoUsuario(row, dta) : dta === "usuarios_asignados" ? usuariosAsignados(row, dta) : dta === 'usuariosAsignadosProyecto' ? usuariosAsignadosProyecto(row, dta) : dta === 'direccion' ? mapa(row, dta) : tool(row, dta)),
      }, ...props?.onValueVolumen && dta === "volumen_estimar" ? { width: '220px' } : dta === "volumen_deducir" ? {} : props?.onValueVolumen && dta === "comentarios" ? { width: '110px' } : {},
      style: dta === "contrato" ? {
       /*  position: 'sticky',
        left: 0,
        backgroundColor: '#fff', // Fondo blanco para que no se superponga con el contenido
        zIndex: 1, */
      } : {},

    };
  });

  const printAvanceOene = (row: any, dta: any) => {
    return (
      <Grid container style={{ textAlign: 'left', padding: 0, margin: 0, height: '250px', overflow: 'scroll' }}>
        <Grid item xs={12} style={{ padding: 0, margin: 0, }}>
          {(row?.avances || []).map((r: any) => {

            return (
              <Grid container>
                <Grid item xs={12} style={{ padding: 0, margin: 0, }}>
                  <p ><strong>Cantidad:</strong>{numericFormatter(row?.avances?.[0]?.cantidad + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' })}</p>
                </Grid>
                <Grid item xs={12} style={{ padding: 0, margin: 0, }}>
                  <p ><strong>PU:</strong>{numericFormatter(row?.avances?.[0]?.pu + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: ' $' })}</p>
                </Grid>
                <Grid item xs={12} style={{ padding: 0, margin: 0, }}>
                  <p ><strong>Fecha ejecución:</strong>{row?.avances?.[0]?.fecha_ejecucion}</p>
                </Grid>
                <Grid item xs={12} style={{ padding: 0, margin: 0, }}>
                  <p ><strong>Fecha registro:</strong>{row?.avances?.[0]?.fecha_registro}</p>
                </Grid>
                <Grid item xs={12} style={{ padding: 0, margin: 0, }}>
                  <p style={{ width: '100%', border: 'solid 1px grey' }}></p>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>

    );
  }

  const printPendienteContabilizar = (row: any, dta: any) => {
    return (
      <Grid container style={{ textAlign: 'left', padding: 0, margin: 0, }}>
        {row?.pendiente_contabilizar_data?.Uno ? <Grid item xs={12} style={{ padding: 0, margin: 0, }}>
          <p style={{ color: '#00c0ef' }}>{numericFormatter(row?.pendiente_contabilizar_data?.Uno + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: ' $' })}</p>
        </Grid> : null}
        {row?.pendiente_contabilizar_data?.Dos ? <Grid item xs={12} style={{ padding: 0, margin: 0, }}>
          <p>{numericFormatter(row?.pendiente_contabilizar_data?.Dos + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: ' $' })}</p>
        </Grid> : null}
        {row?.pendiente_contabilizar_data?.Tres ? <Grid item xs={12} style={{ padding: 0, margin: 0, }}>
          <p onClick={() => handleRowClicked(row)} style={{ color: '#337ab7', cursor: 'pointer' }}>{numericFormatter(row?.pendiente_contabilizar_data?.Tres + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: ' $' })}</p>
        </Grid> : null}
      </Grid>
    );
  }
  const pintaCpo = (row: any, x: any) => {
    if (x === 'clasificacion_pmo') {
      return (
        <p style={{ whiteSpace: 'normal', overflowWrap: 'break-word', wordBreak: 'keep-all', wordWrap: 'break-word' }}>{row?.[x]}</p>
      );
    }
    return (
      <Grid container style={{ textAlign: 'left', padding: 0, margin: 0, }}>
        {row?.[x]?.acumulado_anteriores_1 ? <Grid item xs={12} style={{ padding: 0, margin: 0, }}>
          <p style={{ color: '#00c0ef' }}>{numericFormatter(row?.[x]?.acumulado_anteriores_1 + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: ' $' })}</p>
        </Grid> : null}
        {row?.[x]?.acumulado_anteriores_2 ? <Grid item xs={12} style={{ padding: 0, margin: 0, }}>
          <p>{numericFormatter(row?.[x]?.acumulado_anteriores_2 + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: ' $' })}</p>
        </Grid> : null}
        {row?.[x]?.acumulado_anteriores_3 ? <Grid item xs={12} style={{ padding: 0, margin: 0, }}>
          <p style={{ color: '#337ab7' }}>{numericFormatter(row?.[x]?.acumulado_anteriores_3 + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: ' $' })}</p>
        </Grid> : null}
      </Grid>
    );
  }

  const creaDetalleAvance = (row: any) => {
    return (
      <Grid container spacing={0} style={{ textAlign: 'center', padding: 0, margin: 0, }}>
        <Grid item lg={4} md={4} sm={12} xl={4} xs={12} style={{ textAlign: 'center', paddingTop: 40, paddingBottom: 40, margin: 0 }}>
          <Grid container spacing={2} style={{ padding: 0, margin: 0, }}>
            <Grid item xs={12} style={{ textAlign: 'left', whiteSpace: 'normal', overflowWrap: 'break-word', wordBreak: 'keep-all', wordWrap: 'break-word', paddingRight: 15 }}>
              <p><strong>Contratista: {row?.detalle?.contratista}</strong></p>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'left', cursor: 'pointer' }} onClick={() => handleRowClicked(row?.detalle)} >
              <p>ID contrato : {row?.detalle?.id_contrato}</p>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'left', whiteSpace: 'normal', overflowWrap: 'break-word', wordBreak: 'keep-all', wordWrap: 'break-word', paddingRight: 15 }}>
              <p>Proyecto: {row?.detalle?.obra}</p>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'left' }}>
              <p>Nombre: {row?.detalle?.nombre}</p>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'left' }}>
              <p>Importe: {numericFormatter(row?.detalle?.importe + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: ' $' })} </p>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'left' }}>
              <p>Estatus: <i className={`icon fa fa-${row?.detalle?.forma} text-${row?.detalle?.color}`}> {row?.detalle?.msg}</i></p>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'left', cursor: 'pointer' }}>
              <p onClick={() => { props?.enAccion && props?.enAccion('ir_apm', row?.detalle); }}> <SettingsIcon /> Ir a APM</p>
              <p onClick={() => { handleRowClicked(row?.detalle); }}> <DashboardIcon /> Ver dashboard del proyecto</p>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={8} md={8} sm={12} xl={8} xs={12} style={{ paddingTop: 30, paddingBottom: 30, textAlign: 'left' }}>
          <p className='inicio-new-dashboard-sub-titulo' style={{ color: 'rgb(87, 110, 133)', fontSize: 15 }}><strong>% Avance programado ajustado {numericFormatter((row?.data?.porcentaje_prog_ajustado || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: '%' })}</strong> <Progreso avance={row?.data?.porcentaje_prog_ajustado} color='rgb(143 177 197)' /> </p>
          <p className='inicio-new-dashboard-sub-titulo' style={{ color: 'rgb(87, 110, 133)', fontSize: 15 }}><strong>% Avance Programado {numericFormatter((row?.data?.porcentaje_programado || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: '%' })}</strong> <Progreso avance={row?.data?.porcentaje_programado} color='rgb(128 158 175)' /></p>
          <p className='inicio-new-dashboard-sub-titulo' style={{ color: 'rgb(87, 110, 133)', fontSize: 15 }}><strong>% Avance Fisico {numericFormatter((row?.data?.porcentaje_fisico || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: '%' })}</strong> <Progreso avance={row?.data?.porcentaje_fisico} color='rgb(74 152 185)' /></p>
          <p className='inicio-new-dashboard-sub-titulo' style={{ color: 'rgb(87, 110, 133)', fontSize: 15 }}><strong>% Avance financiero {numericFormatter((row?.data?.porcentaje_financiero || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: '%' })}</strong> <Progreso avance={row?.data?.porcentaje_financiero} color='rgb(87 149 122)' /></p>
          <p className='inicio-new-dashboard-sub-titulo' style={{ color: 'rgb(87, 110, 133)', fontSize: 15 }}><strong>% Avance anticipo + financiero {numericFormatter((row?.data?.porcentaje_anticipo_mas_financiero || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: '%' })}</strong> <Progreso avance={row?.data?.porcentaje_anticipo_mas_financiero} color='#00a79d' /></p>
        </Grid>
      </Grid>
    )

  }

  const printDisponibles = (row: any, x: any) => {
    const disponible = row?.disponible;
    const reorden = row?.reorden;
    return (<p style={{ fontWeight: 'bold', color: disponible <= reorden && disponible > 0 ? 'red' : 'black' }}>{disponible}</p>);
  }

  const printTotalSalidas = (row: any, x: any) => {
    return (
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ textAlign: 'center', padding: 0, margin: 0, }}>
        <Grid item xs={12} style={{ textAlign: 'center', padding: 0, margin: 0 }}>
          {row?.[x]}
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center', padding: 0, margin: 0 }}>
          [{
            numericFormatter(((+row?.[x]) / (+row?.cantidad_proyecto)) * 100 + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: ' %' })
          }]
        </Grid>
      </Grid>

    );
  }

  const printTotalEntradas = (row: any, x: any) => {
    return (
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ textAlign: 'center', padding: 0, margin: 0, }}>
        <Grid item xs={12} style={{ textAlign: 'center', padding: 0, margin: 0 }}>
          {row?.[x]}
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center', padding: 0, margin: 0 }}>
          [{
            numericFormatter(((+row?.[x]) / (+row?.cantidad_proyecto)) * 100 + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: ' %' })
          }]
        </Grid>
      </Grid>

    );
  }

  const printConceptoCatalogoConceptos = (row: any, x: any) => {
    return (
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ textAlign: 'center', padding: 0, margin: 0, }}>
        <Grid item xs={12} style={{ textAlign: 'center', padding: 0, margin: 0 }}>
          <Tooltip title={row?.[x]}><Chip label={row?.[x]} style={{ color: '#fff', backgroundColor: row?.estatusNumero === 1 ? 'green' : 'orange', fontWeight: 'bold' }} /></Tooltip>
        </Grid>
        {row?.estatusNumero !== 1 && row?.estatusNumero !== 0 ? <Grid item xs={12} style={{ textAlign: 'center', padding: 0, margin: 0 }}>
          <p>
            {
              row?.estatusNumero === 4 ? 'Se requiere de precio unitario' :
                row?.estatusNumero === 3 ? 'Se requiere dictamen por parte de la coordinación' :
                  row?.estatusNumero === 2 ? 'En acuerdo cliente - contratista' :
                    ''
            }
          </p>
        </Grid> : null}
      </Grid>

    );
  }

  const printConcepto = (row: any, x: any) => {
    return (<p style={{ color: '#fb8c00', fontWeight: 'bold' }}>{row?.concepto},<strong style={{ color: '#1A73E8' }}>{` (frente:${row?.frentes?.[0]?.frente || ''}) ${row?.subfrentes?.[0]?.frente ? ', (subfrente:' + (row?.subfrentes?.[0]?.frente || '') + ')' : ''}`}</strong></p>);
  }


  const factura = (row: any, x: any) => {
    return (<p style={{ fontWeight: 'bold' }}>{row?.[x] ? 'S' : row?.[x] === '' ? '' : 'N'}</p>);
  }


  const setFormatoMoneda = (row: any, x: any) => {
    const text = numericFormatter(row?.[x], { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' });
    return (<p>{text}</p>);
  }

  const setFormatoPorcentaje = (row: any, x: any) => {
    const text = numericFormatter(row?.[x] + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: ' %' });
    return (<p>{text}</p>);
  }

  const setFormatoUnidad = (row: any, x: any) => {
    const text = numericFormatter(row?.[x] + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: ' ' + (row?.unidad || '') });
    return (<p>{text}</p>);
  }

  const mapa = (row: any, x: any) => {
    const location = (isNaN(+row?.latitud) || isNaN(+row?.longitud)) ? null : { lat: +row?.latitud, lng: +row?.longitud }
    const defaultProps = {
      center: location || {
        lat: 19.42847,
        lng: -99.12766
      },
      zoom: 7
    };
    const containerStyle = {
      width: '100px',
      height: '80px'
    };

    return (
      <Grid container spacing={2} style={{ textAlign: 'center', height: '100px', }}>
        <Grid item xs={12} style={{ height: '80px', width: '100px' }}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultProps.center}
            zoom={7}
          >
            {location ? <Marker position={{
              lat: location.lat,
              lng: location.lng,
            }}
            /> : null}
            <></>
          </GoogleMap>
        </Grid>
      </Grid>
    )
  }

  const verComentarios = (row: any, x: any) => {
    return (
      <div key={row?.id}>
        <Button
          id="basic-button"
          aria-haspopup="true"
          onClick={() => {
            props?.verComentarios && props?.verComentarios(row);
          }}
        >
          <CommentIcon fontSize="large" />
        </Button>
      </div>
    );
  }

  const verCntratosClasificacion = (row: any) => {
    return (
      <div key={row?.id}>
        <Button
          id="basic-button"
          aria-haspopup="true"
          onClick={() => {
            props?.verComentarios && props?.verComentarios(row);
          }}
        >
          Ver contratos
        </Button>
      </div>
    );
  }

  const verUsuariosAsignacion = (row: any) => {
    return (
      <div key={row?.id}>
        <Button
          id="basic-button"
          aria-haspopup="true"
          onClick={() => {
            props?.verComentarios && props?.verComentarios(row);
          }}
        >
          Asignar usuarios
        </Button>
      </div>
    );
  }

  const usuariosAsignadosProyecto = (row: any, x: any) => {
    return (
      <div key={row?.id}>
        <Button
          id="basic-button"
          aria-haspopup="true"
          onClick={() => {
            props?.onVerUsuariosAsignados && props?.onVerUsuariosAsignados(row);
          }}
        >
          <PersonSearchIcon fontSize="large" />
        </Button>
      </div>
    );
  }

  const usuariosAsignados = (row: any, x: any) => {
    return (
      <div key={row?.id}>
        <Button
          id="basic-button"
          aria-haspopup="true"
          onClick={() => {
            props?.onVerUsuariosAsignados && props?.onVerUsuariosAsignados(row);
          }}
        >
          <PersonSearchIcon fontSize="large" />
        </Button>
      </div>
    );
  }

  const tipoUsuario = (row: any, x: any) => {
    const tipoUsuarioText = tipoUsuarios.find((e: any) => e?.id === row?.[x]);
    return (<p>{(tipoUsuarioText?.tipo || "")}</p>);
  }

  const foto = (row: any, x: any) => {
    return (
      <Avatar alt={''} src={row?.[x]} sx={{ width: 30, height: 30 }} />
    );
  };

  const volumen = (row: any, x: any) => {
    return (
      <Volumen comentarios_estimacion={row?.comentarios_estimacion} enComentario={() => props?.enAccion && props?.enAccion('enComentario', row)} volumen_estimar={(+row?.cantidad_ejecutada) + (+row?.pendiente_estimar)} prefix={row?.unidad || ''} darkMode={darkMode} value={(row?.[x] + '') || ""} name={row?.id} id={row?.id} onValue={(v) => { props?.onValueVolumen && props?.onValueVolumen(v) }} />
    );
  }

  const volumenDeducir = (row: any, x: any) => {
    return (
      <VolumenDeducir
        volumen_estimado={(+row?.volumen_estimado || 0)}
        darkMode={darkMode}
        value={(row?.[x] + '') || ""}
        id={row?.id}
        onValue={(v) => { props?.onValueVolumen && props?.onValueVolumen(v) }} />
    );
  }

  const ruta = (row: any, x: any) => {
    const r = env.API_URL_DOCUMENTOS === 'https://diracapm.qubi.com.mx/' ? `${(row?.[x] || "").replaceAll('storage/app/', '')} ` : row?.[x] || "";

    return (
      <Link
        target="_blank"
        href={`${env.API_URL_DOCUMENTOS}/${r}`}
      >
        {!props?.opcionesRepo ? <CloudIcon color="primary" /> : <PreviewIcon color='primary' />}
      </Link>
    );
  };

  const permiso = (row: any, x: any) => {
    const newRow = JSON.parse(row?.Permisos);
    const icons = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    return (
      <div style={{ width: '100%' }}>
        <Grid container spacing={2}>
          {icons.map((e: any) => {
            const esAsignado = newRow.find((n: any) => n?.tipo_permiso_id === e?.id);
            return (<Grid key={e?.id} item xs={3} sm={3} lg={3} xl={3} md={3} style={{ textAlign: 'center', alignItems: 'center' }} >
              {e?.id === 1 ?
                <Tooltip title={esAsignado ? "Crear carpetas (asignado)" : "Crear carpetas (sin asignar)"}>
                  <CreateNewFolderIcon onClick={() => permisos(row, esAsignado ? 'crear_carpetas-remove' : 'crear_carpetas-add', e?.id)} style={{ cursor: 'pointer' }} color={esAsignado ? 'primary' : 'disabled'} />
                </Tooltip> :
                e?.id === 2 ?
                  <Tooltip title={esAsignado ? "Agregar carpetas a usuario (asignado)" : "Agregar carpetas a usuario (sin asignar)"}><FolderSharedIcon onClick={() => permisos(row, esAsignado ? 'agregar_carpetas_a_usuarios-remove' : 'agregar_carpetas_a_usuarios-add', e?.id)} style={{ cursor: 'pointer' }} color={esAsignado ? 'primary' : 'disabled'} /></Tooltip> :
                  e?.id === 3 ?
                    <Tooltip title={esAsignado ? "Crear proyectos (asignado)" : "Crear proyectos (sin asignar)"}><AccountTreeIcon onClick={() => permisos(row, esAsignado ? 'crear_proyectos-remove' : 'crear_proyectos-add', e?.id)} style={{ cursor: 'pointer' }} color={esAsignado ? 'primary' : 'disabled'} /></Tooltip> :
                    e?.id === 4 ?
                      <Tooltip title={esAsignado ? "Asignar landing pages (asignado)" : "Asignar landing pages (sin asignar)"}><WebIcon onClick={() => permisos(row, esAsignado ? 'asignar_landing_pages-remove' : 'asignar_landing_pages-add', e?.id)} style={{ cursor: 'pointer' }} color={esAsignado ? 'primary' : 'disabled'} /></Tooltip> :
                      null}
            </Grid>)
          })}
        </Grid>
      </div>
    );
  };

  const customStyles: any = darkMode ? {
    headRow: {
      style: {
        color: 'white',
        backgroundColor: 'rgb(223 223 223)'
      },
    },
    headCells: {
      style: {
        position: 'sticky',
        top: 0,
        backgroundColor: '#fff',
        zIndex: 1,
      },
    },
    cells: {
      style: {
        whiteSpace: 'nowrap',
      },
    },
    rows: {
      stripedStyle: {
        color: 'white',
        backgroundColor: '#1f283e'
      },
      style: {
        color: 'white',
        backgroundColor: '#1f283e',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
      },
    },

    pagination: {
      style: {
        color: 'white',
        backgroundColor: '#1f283e'
      },
    },
    footer: {
      style: {
        padding: '10px',
        textAlign: 'center',
        backgroundColor: '#f1f1f1',
      },
    },
    table: {
      style: {
        width: '100%', // Asegura que la tabla ocupe el 100% del ancho del contenedor
      },
    },
  } : {
    headCells: {
      style: {
        position: 'sticky',
        top: 0,
        backgroundColor: '#fff',
        zIndex: 1,
      },
    },
    cells: {
      style: {
        whiteSpace: 'nowrap',
      },
    },
  };

  const handleRowClicked = (row: any) => {
    props?.enAccion && props?.enAccion('detalle', row);
  };

  const permisos = (row: any, accion: string, idpermiso: number) => {
    props?.enAccion && props?.enAccion(accion, row, idpermiso);
  };

  const conditionalRowStyles: any = [
    {
      when: (row: any) =>
        (row.hasOwnProperty('activo') && !row?.activo) ||
        (row.hasOwnProperty('id_estatus') && (!row?.id_estatus || row?.id_estatus === 'Inactivo')) ||
        (row.hasOwnProperty('estatus') && row?.estatus !== '' && (!row?.estatus || row?.estatus === 'Inactivo')),
      style: {
        backgroundColor: "rgb(255 113 113)",
      },
    },
    {
      when: (row: any) => (row.hasOwnProperty('id') && row?.id === props?.idProyectoActivo),
      style: {
        backgroundColor: "#91ee91",
      },
    },
    {
      when: () => props?.clickEnRow,
      style: {
        cursor: "pointer",
      },
    },
    {
      when: (row: any) => props?.esEdicionEstimacion && row?.noValidar,
      style: {
        backgroundColor: "#5992e5",
      },
    },
    {
      when: (row: any) => props?.esPlanMaestro && row.hasOwnProperty('empresa') && (row?.empresa || '').includes('Total:'),
      style: {
        backgroundColor: "#5992e5",
      },
    },
    {
      when: (row: any) => props?.esPlanMaestro && row.hasOwnProperty('clasificacion') && (row?.clasificacion || '').includes('Total'),
      style: {
        backgroundColor: "#5992e5",
      },
    }

  ];

  const acciones = (row: any) => {
    if ((row?.id || '') === "Totales" || props?.esEntradasSalidas) {
      return <></>
    }

    return (
      row?.hasOwnProperty('aplicado') && row?.aplicado === 0 ? <AccionesTable
        verDetalleNewDashbaord={props?.verDetalleNewDashbaord}
        esInsumos={props?.esInsumos}
        esParametrosAnalisis={props?.esParametrosAnalisis}
        esCatalogoDeConceptos={props?.esCatalogoDeConceptos}
        esEstimacionesCreadasContratista={props?.esEstimacionesCreadasContratista}
        esEstimacionesContratista={props?.esEstimacionesContratista}
        esDocumentoFrente={props?.esDocumentoFrente}
        esFrentes={props?.esFrentes}
        esPrograma={props?.esPrograma}
        esHito={props?.esHito}
        esResponsablesConcepto={props?.esResponsablesConcepto}
        esListaEstimacionesDefinitivas={props?.esListaEstimacionesDefinitivas}
        esMatriz={props?.esMatriz}
        titulo={props?.titulo === "Herramientas"}
        tit={props?.titulo}
        esContrato={props?.esContrato}
        esAvancePorConfirmar={props?.esAvancePorConfirmar}
        accioesBitacoraEstimaciones={props?.accioesBitacoraEstimaciones}
        accioesConsultaEstimaciones={props?.accioesConsultaEstimaciones}
        row={row}
        enAccion={(accion) => props?.enAccion && props?.enAccion(accion, row)}
      /> : row?.hasOwnProperty('aplicado') && row?.aplicado !== 0 ? <></> : <AccionesTable
        esInsumos={props?.esInsumos}
        accioesBitacoraEstimaciones={props?.accioesBitacoraEstimaciones}
        accioesConsultaEstimaciones={props?.accioesConsultaEstimaciones}
        esParametrosAnalisis={props?.esParametrosAnalisis}
        esCatalogoDeConceptos={props?.esCatalogoDeConceptos}
        esDocumentoFrente={props?.esDocumentoFrente}
        esEstimacionesContratista={props?.esEstimacionesContratista}
        esEstimacionesCreadasContratista={props?.esEstimacionesCreadasContratista}
        esHito={props?.esHito}
        esPrograma={props?.esPrograma}
        esResponsablesConcepto={props?.esResponsablesConcepto}
        esMatriz={props?.esMatriz}
        esListaEstimacionesDefinitivas={props?.esListaEstimacionesDefinitivas}
        esFrentes={props?.esFrentes}
        titulo={props?.titulo === "Herramientas"}
        tit={props?.titulo}
        verDetalleNewDashbaord={props?.verDetalleNewDashbaord}
        esContrato={props?.esContrato}
        esAvancePorConfirmar={props?.esAvancePorConfirmar}
        row={row}
        enAccion={(accion) => props?.enAccion && props?.enAccion(accion, row)}
      />
    )
  };

  const opcionesRepo = (row: any) => {
    return (
      <OpcionesRepo
        enAccion={(accion) => props?.enAccion && props?.enAccion(accion, row)}
      />
    )
  };

  if (props?.actions && !props?.esEntradasSalidas && !props?.esAvanceConGrafica) {
    columns.unshift({
      name: "Herramientas",
      selector: (row: any) => row.id,
      cell: acciones,
    });
  }

  if (props?.opcionesRepo) {
    columns.unshift({
      name: "Eliminar",
      selector: (row: any) => row.id,
      cell: opcionesRepo,
    });
  }

  const handleFiltro = useCallback((textoFiltrar: string) => {
    const text_ = textoFiltrar.toLowerCase().replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ó', 'o').replaceAll('ú', 'u');

    const columnsNames = Object.keys((props?.data || [])?.[0]);
    const columnsToFilter = columnsNames.filter(e => (!e.includes('id') && !e.includes('fecha') && !e.includes('estatus')));
    const clonData = Object.assign([], (props?.data || []).map((e: any) => {
      if (e.hasOwnProperty('Permisos')) {
        return { ...e, ...{ Permisos: JSON.stringify(e?.Permisos) } };
      } else {
        return e;
      }
    }));
    if (_.isEmpty(text_)) {
      setData((props?.data || []).map((e: any) => {
        if (e.hasOwnProperty('Permisos')) {
          return { ...e, ...{ Permisos: JSON.stringify(e?.Permisos) } };
        } else {
          return e;
        }
      }));
      return;
    }

    setData(
      clonData.filter((c: any) => {
        let bandera = 0;
        columnsToFilter.forEach(element => {
          bandera += (typeof c?.[element] !== 'string') ? 0 : (c?.[element]).toLowerCase().replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ó', 'o').replaceAll('ú', 'u').includes(text_.trim()) ? 1 : 0;
        });
        return bandera > 0;
      })
    );
  }, [props?.data]);

  const handleExportarExcel = () => {
    const resultado = data.flatMap((obj: any) => {
      const propArray = Object.keys(obj).find(key => Array.isArray(obj[key]));
      if (propArray) {
        return obj[propArray].map((subObj: any) => ({
          ...obj,
          ...subObj,
          [propArray]: 'Detalle del conjunto'
        }));
      }
      return obj;
    });
    const worksheet = XLSX.utils.json_to_sheet(resultado);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja 1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${props?.tituloExcel || 'Documento de excel'}.xlsx`);
  }

  return {
    columns,
    handleRowClicked,
    customStyles,
    conditionalRowStyles,
    darkMode,
    handleFiltro,
    data,
    handleExportarExcel
  }
}