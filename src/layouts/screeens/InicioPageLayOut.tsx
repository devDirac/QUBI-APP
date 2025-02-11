import React, { useCallback, useEffect, useState } from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import env from "react-dotenv";
import {
    Grid,
    Box,
    Tooltip,
    Backdrop,
    CircularProgress,
    List,
    ListItem,
    Checkbox,
    ListItemText,
    Button
} from "@mui/material";
import Header from '../../componets/Header/Header';
import BookingCard from '../../examples/Cards/BookingCard';
import SearchFiltro from '../../componets/SearchFiltro/SearchFiltro';
import InsightsIcon from '@mui/icons-material/Insights';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import ModalComponent from '../../componets/Modal';
import { asociaUsuarioProyectoHttp, deleteReporteHttp, eliminaAsociacionUsuarioProyectoHttp, getAllProyectosHttp, setReporteHttp } from '../../actions/junoGeos';
import { getErrorHttpMessage, sleep } from '../../utils';
import { useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import { useIntl } from 'react-intl';
import { getUsersHttp } from '../../actions/auth';
import DeleteIcon from '@mui/icons-material/Delete';
import AddReporteForm from '../../forms/AddReporteForm/AddReporteForm';
import DinamicTableMejorada from '../../componets/DinamicTableMejorada/DinamicTableMejorada';
import ModalConfirm from '../../componets/ModalConfirm/ModalConfirm';

interface Proyecto {
    image: any
    title: string
    description: string
    price: string
    location: string
    usuarios: any[]
}

const InicioPageLayOut: React.FC = () => {

    const intl = useIntl();
    const navigate = useNavigate();
    const [procesando, setProcesando] = useState(false);
    const id_usuario = useSelector((state: StoreType) => state?.app?.user?.data?.id || '0');

    /* Proyecto seleccionado para agregara reporte editar reporte, asignar o desasignar ususarios  */
    const [proyecto, setProyecto] = useState<any>(null);
    /* Reporte */
    const [item, setItem] = useState<any>({});

    /* ususarios para vincular o desvincular  */
    const [usuarios, setUsurios] = useState<any>([]);
    const [selectedUsuarios, setSelectedUsuarios] = useState<any>([]);

    /* Modal mensajes generales */
    const [mensajeAlert, setMensajeAlert] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);

    /* Modal para agregar vuelos o analisis al proyecto */
    const [isAlertOpenAddInforme, setIsAlertOpenAddInforme] = useState(false);
    const handleisAlertOpenAddInforme = () => setIsAlertOpenAddInforme(true);
    const handleisAlerCloseAddInforme = () => setIsAlertOpenAddInforme(false);

    /* Modal para editar el proyecto */
    const [isAlertOpenEditProyect, setIsAlertOpenEditProyect] = useState(false);
    const handleisAlertOpenEditProyect = () => setIsAlertOpenEditProyect(true);
    const handleisAlerCloseEditProyect = () => setIsAlertOpenEditProyect(false);

    /* modal para asignar usuarios */
    const [isAlertOpenAgregarUsuarios, setIsAlertOpenAgregarUsuarios] = useState(false);
    const handleisAlertOpenAgregarUsuarios = () => setIsAlertOpenAgregarUsuarios(true);
    const handleisAlerCloseAgregarUsuarios = () => setIsAlertOpenAgregarUsuarios(false);

    const [data, setData] = useState<Proyecto[]>([]);
    const [dataShow, setDataShow] = useState<Proyecto[]>([]);

    /* Obtiene todos los proyectos asociados al usuario */
    const getData = useCallback(async () => {
        try {
            setProcesando(true);
            const response = await getAllProyectosHttp(id_usuario);
            setData(response);
            setDataShow(response)
            setProcesando(false);
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'login_error' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }, []);

    useEffect(() => {
        getData()
    }, [getData])

    /* Modal pregunta si desea eliminar el reporte */
    const [openModalConfirm, setOpenModalConfirm] = useState(false);

    const getDataUser = useCallback(async () => {
        try {
            setProcesando(true);
            const response = await getUsersHttp();
            setUsurios(response.map((r: any) => {
                return {
                    ...r,
                    ...{
                        activo: r?.activo ? 'Usuario activo' : 'Usuario inactivo'
                    }
                }
            }));
            setProcesando(false);
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || 'Error');
            setProcesando(false);
            handleisAlertOpen();
        }
    }, []);

    useEffect(() => {
        getDataUser();
    }, [getDataUser]);



    const seleccionaProyecto = (r: Proyecto) => {
        navigate('/ver-analisis', { state: r })
    }

    const agregarInforme = (r: Proyecto) => {
        setProyecto(r);
        handleisAlertOpenAddInforme()
    }

    const editarProyecto = (r: Proyecto) => {
        setProyecto(r);
        handleisAlertOpenEditProyect()
    }

    const asignarUsuarios = async (r: Proyecto) => {
        setProyecto(r);
        setSelectedUsuarios(r?.usuarios.map((r: any) => r?.id_usuario))


        handleisAlertOpenAgregarUsuarios()
    }

    const handleFiltro = (textoFiltrar: string) => {
        const text_ = textoFiltrar.toLowerCase().replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ó', 'o').replaceAll('ú', 'u');
        const clonUser = Object.assign([], dataShow);
        if (_.isEmpty(textoFiltrar)) {
            setData(dataShow);
            return;
        }
        setData(
            clonUser.filter(
                (c: any) =>
                    (c?.titulo || '').toLowerCase().replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ó', 'o').replaceAll('ú', 'u').includes(text_.trim()) ||
                    (c?.description || '').toLowerCase().replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ó', 'o').replaceAll('ú', 'u').includes(text_.trim())
            )
        );
    };


    const handleToggleUsuario = (usuarioId: any) => {
        setSelectedUsuarios((prevSelected: any) => {
            if (prevSelected.includes(usuarioId)) {
                return prevSelected.filter((id: any) => id !== usuarioId);
            } else {
                return [...prevSelected, usuarioId];
            }
        });
    };

    const handleGuardar = async () => {
        try {
            setProcesando(true);
            await eliminaAsociacionUsuarioProyectoHttp({ id_proyecto: proyecto?.id });
            await selectedUsuarios.reduce(async (_: any, cat: any) => {
                try {
                    await _;
                    await asociaUsuarioProyectoHttp({ id_usuario: cat, id_proyecto: proyecto?.id });
                } catch (error: any) {
                    console.log(error)
                }
            }, Promise.resolve());
            handleisAlerCloseAgregarUsuarios();
            setProyecto(null)
            setSelectedUsuarios([])
            setMensajeAlert('Exito al asignar los usuarios');
            handleisAlertOpen();
            getData();
            getDataUser();
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || 'Error');
            setProcesando(false);
            handleisAlertOpen();
        }
    };

    const handleAddReporte = async (d: any) => {
        try {
            setProcesando(true);
            console.log(d)
            const data1 = new FormData();
            data1.append("titulo", d?.titulo);
            data1.append("zip_file", d?.file);
            data1.append("id_proyecto", proyecto?.id);
            data1.append("fecha_ejecucion", d?.fecha_ejecucion);
            await setReporteHttp(data1);
            handleisAlerCloseAddInforme();
            setMensajeAlert('Exito al registrar la información de la misión');
            handleisAlertOpen();
            getData();
            getDataUser();
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || 'Error');
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const deletePregunta = (data: any) => {
        setItem(data);
        setOpenModalConfirm(true);
    }

    const handleDeleteReporte = async () => {
        try {
            setProcesando(true);
            handleisAlerCloseEditProyect();
            await deleteReporteHttp({ id: item?.id });
            setMensajeAlert('Exito al eliminar la información de la misión, si desea recuperar esta misión contacte con el administrador del sitio');
            handleisAlertOpen();
            getData();
            getDataUser();
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || 'Error');
            setProcesando(false);
            handleisAlertOpen();
        }
    }


    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            {/* Navbar */}
            <Header />
            {/* Main Content */}
            <Grid container sx={{ flexGrow: 1, textAlign: "center", paddingLeft: 5, paddingRight: 5 }} spacing={2} justifyContent="center" >
                <Grid item xs={12} md={12} style={{ marginTop: 15, marginBottom: 55 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} />
                        <Grid item xs={12} md={6} style={{ paddingRight: 25 }}>
                            <SearchFiltro onFiltro={handleFiltro} />
                        </Grid>
                    </Grid>
                </Grid>
                {
                    data?.length ? data?.map((r: any, key: any) => (
                        <Grid item lg={3} md={6} sm={12} style={{ marginBottom: 20 }} key={key}>
                            <BookingCard
                                image={`${env.API_URL_DOCUMENTOS+''+r?.imagen}?v=${Math.random() + ''} `}
                                title={r?.titulo}
                                description={r?.description}
                                price={`Misiones: ${(r?.reportes || [])?.length}  `}
                                location={r?.ubicacion}
                                action={
                                    <>
                                       {r?.reportes?.length ? <Tooltip title="Ver análisis" placement="bottom" style={{ cursor: 'pointer', marginRight: 5 }} onClick={() => seleccionaProyecto(r)}>
                                            <InsightsIcon color='success' />
                                        </Tooltip> : null}
                                        {id_usuario === 1 ?<Tooltip title="Carga de información de la misión" placement="bottom" style={{ cursor: 'pointer', marginRight: 5 }} onClick={() => agregarInforme(r)}>
                                            <LibraryAddIcon color='primary' />
                                        </Tooltip> : null}
                                        {id_usuario === 1 && r?.reportes?.length ? <Tooltip title="Eliminar información de las misiones" placement="bottom" style={{ cursor: 'pointer', marginRight: 5 }} onClick={() => editarProyecto(r)}>
                                            <DeleteIcon color='error' />
                                        </Tooltip> : null}
                                        {id_usuario === 1 ? <Tooltip title="Asignar usuarios" placement="bottom" style={{ cursor: 'pointer', marginRight: 5 }} onClick={() => asignarUsuarios(r)}>
                                            <PersonAddIcon color='info' />
                                        </Tooltip> : null}
                                    </>
                                }
                            />
                        </Grid>
                    )) : procesando ? 'Cargando la información...' : null
                }
                <br></br>
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
            <ModalComponent handleClose={handleisAlerCloseAddInforme} isOpen={isAlertOpenAddInforme} key={'alertaAddInforme'}>
                <div>
                    <AddReporteForm procesando={procesando} action={(d: any) => {
                        handleAddReporte(d)
                    }} />
                    <Backdrop style={{ zIndex: 1000, color: "#fff" }} open={procesando}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
            </ModalComponent>
            <ModalComponent handleClose={handleisAlerCloseEditProyect} isOpen={isAlertOpenEditProyect} key={'alertaEditProyect'}>
                <Grid container spacing={2} style={{ textAlign: 'center' }}>
                    <Grid item xs={12} style={{marginTop:15}}>
                        <h5>Misiones cargadas al proyecto {proyecto?.titulo} </h5>
                    </Grid>
                    <Grid item xs={12}>
                        {proyecto?.reportes?.length ?
                            <DinamicTableMejorada
                                actions
                                flex
                                soloEliminar
                                enAccion={(accion, data) => {
                                    console.log('data', data, accion)
                                    /* if (accion === 'editar') {
                                        setItem(data);
                                        handleisAlertOpenFormEdit();
                                    }
                                    */
                                    if (accion === 'eliminar') {
                                        deletePregunta(data)
                                    }
                                }}
                                key={'reclasificaciones'}
                                columnsToShow={['titulo', 'fecha_registro', 'fecha_ejecucion']}
                                data={proyecto?.reportes}
                            />
                            : procesando ? 'Cargando información...' : 'Sin registros'}
                    </Grid>
                </Grid>
            </ModalComponent>
            <ModalComponent handleClose={handleisAlerCloseAgregarUsuarios} isOpen={isAlertOpenAgregarUsuarios} key={'alertaAgregarUsuarios'}>
                <Grid container spacing={2} style={{ textAlign: 'center', padding: 15 }} >
                    <Grid item xs={12} style={{ padding: 15 }}>
                        <h5 style={{ color: '#344767' }}>Seleccione los usuarios que desea vincular al proyecto  {proyecto?.titulo}</h5>
                    </Grid>
                    <Grid item xs={12} style={{ padding: 15 }}>
                        <List>
                            {usuarios.map((usr: any) => (
                                <ListItem key={usr.id} button onClick={() => handleToggleUsuario(usr.id)} disabled={usr?.id === 1}>
                                    <Checkbox
                                        edge="start"
                                        checked={selectedUsuarios.includes(usr.id)}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                    <ListItemText primary={usr.email} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={handleisAlerCloseAgregarUsuarios} color="inherit">Cancelar</Button>
                        <Button onClick={handleGuardar} color="primary">Guardar</Button>
                    </Grid>
                    <Backdrop style={{ zIndex: 1000, color: "#fff" }} open={procesando}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Grid>
            </ModalComponent>
            <ModalConfirm onAcept={() => {
                handleDeleteReporte();
                setOpenModalConfirm(false);
            }} onCancel={() => {
                setOpenModalConfirm(false);
            }} open={openModalConfirm} text={'¿Desea eliminar la misión seleccionada?'} title={''} />
        </Box>
    );
}
export default InicioPageLayOut;