import React, { useCallback, useEffect, useState } from 'react';
import env from "react-dotenv";
import {
    Typography,
    Grid,
    Box,
    Backdrop,
    CircularProgress,
    Button
} from "@mui/material";
import Header from '../../componets/Header/Header';
import _ from 'lodash';
import ModalComponent from '../../componets/Modal';
import DinamicTableMejorada from '../../componets/DinamicTableMejorada/DinamicTableMejorada';
import { useIntl } from 'react-intl';
import { getErrorHttpMessage } from '../../utils';
import { deleteProyectoHttp, getAllProyectosHttp, storeProyectoHttp, updateProyectoHttp } from '../../actions/junoGeos';
import { useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import AddProyectoForm from '../../forms/AddProyectoForm/AddProyectoForm';
import ModalConfirm from '../../componets/ModalConfirm/ModalConfirm';

const GestionProyectosPageLayOut: React.FC = () => {

    const intl = useIntl();
    const id_usuario = useSelector((state: StoreType) => state?.app?.user?.data?.id || '0');
    const [procesando, setProcesando] = useState(false);
    const [data, setData] = useState([]);
    const [item, setItem] = useState<any>({});
    /* Modal mensajes generales */
    const [mensajeAlert, setMensajeAlert] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);
    /* Modal alta de proyectos */
    const [isAlertOpenForm, setIsAlertOpenForm] = useState(false);
    const handleisAlertOpenForm = () => setIsAlertOpenForm(true);
    const handleisAlerCloseForm = () => setIsAlertOpenForm(false);
    /* Modal edicion de proyectos */
    const [isAlertOpenFormEdit, setIsAlertOpenFormEdit] = useState(false);
    const handleisAlertOpenFormEdit = () => setIsAlertOpenFormEdit(true);
    const handleisAlerCloseFormEdit = () => setIsAlertOpenFormEdit(false);

    /* modal pregunta si desea eliminar proyecto */
    const [openModalConfirm, setOpenModalConfirm] = useState(false);

    /* Obtiene todos los proyectos asociados al usuario */
    const getData = useCallback(async () => {
        try {
            setProcesando(true);
            const response = await getAllProyectosHttp(id_usuario);
            setData(response);
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

    /* agrega el proyecto*/
    const handleAddProyecto = async (d: any) => {
        try {
            setProcesando(true);
            handleisAlerCloseForm();
            const data1 = new FormData();
            data1.append("titulo", d?.titulo);
            data1.append("description", d?.descripcion);
            data1.append("info", d?.info);
            data1.append("ubicacion", d?.ubicacion);
            data1.append("lat", d?.lat + '');
            data1.append("lon", d?.lon + '');
            data1.append("file", d?.file);
            await storeProyectoHttp(data1);
            setMensajeAlert('Exito al registrar el proyecto');
            handleisAlertOpen();
            getData();
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || 'error');
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    /* edita el proyecto*/
    const handleEditProyecto = async (d: any) => {
        try {
            setProcesando(true);
            handleisAlerCloseForm();
            const data1 = new FormData();
            data1.append("titulo", d?.titulo);
            data1.append("description", d?.descripcion);
            data1.append("info", d?.info);
            data1.append("id", item?.id);
            data1.append("ubicacion", d?.ubicacion);
            if (d?.lat !== '') {
                data1.append("lat", d?.lat + '');
            }
            if (d?.lon !== '') {
                data1.append("lon", d?.lon + '');
            }
            if (d?.file !== '') {
                data1.append("file", d?.file);
            }
            await updateProyectoHttp(data1);
            handleisAlerCloseFormEdit()
            setMensajeAlert('Exito al actualizar el proyecto');
            handleisAlertOpen();
            getData();
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || 'error');
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const handleDeleteProyecto = async (data:any) => {
        try {
            setProcesando(true);
            handleisAlerCloseForm();
            await deleteProyectoHttp(data?.id);
            setMensajeAlert('Exito al eliminar el proyecto');
            handleisAlertOpen();
            getData();
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || 'error');
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const deletePregunta = (data: any) => {
        setItem(data);
        setOpenModalConfirm(true);

    }

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            {/* Navbar */}
            <Header />
            {/* Main Content */}
            <Grid container sx={{ flexGrow: 1, textAlign: "center" }} spacing={2} justifyContent="center" >
                <Grid item xs={12} style={{ marginTop: 15, height: '70px', paddingRight: 20 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} style={{ textAlign: 'center', paddingLeft: 40 }}>
                            <h4 style={{ color: 'rgb(40, 51, 74)', fontWeight:'bolder' }}>Gestión de proyectos</h4>
                        </Grid>
                        <Grid item xs={12} md={12} style={{ textAlign: 'right' }}>
                            <Button variant="outlined" size="small" style={{ color: '#1976d2' }} onClick={() => {
                                handleisAlertOpenForm();
                            }}>
                                Agregar nuevo proyecto
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 15, marginBottom: 55, marginLeft: 25, marginRight: 25 }} >
                    {data?.length ?
                        <DinamicTableMejorada
                            actions
                            flex
                            enAccion={(accion, data) => {
                                console.log('data', data, accion)
                                if (accion === 'editar') {
                                    setItem(data);
                                    handleisAlertOpenFormEdit();
                                }
                                if (accion === 'eliminar') {
                                    deletePregunta(data)
                                }
                            }}
                            key={'reclasificaciones'}
                            columnsToShow={['titulo', 'description', 'info', 'ubicacion', 'foto', 'fecha_registro']}
                            data={data.map((r: any) => {
                                return {
                                    titulo: r?.titulo,
                                    description: r?.description,
                                    info: r?.info,
                                    ubicacion: r?.ubicacion,
                                    lat: r?.lat,
                                    lon: r?.lon,
                                    imagen: r?.imagen,
                                    fecha_registro: r?.fecha_registro,
                                    id: r?.id,
                                    id_usuario: r?.id_usuario,
                                    foto:`${env.API_URL_DOCUMENTOS + 'storage/app/'+ r?.imagen }`
                                }
                            })}
                        />
                        : procesando ? 'Cargando información...' : 'Sin registros'}
                </Grid>
            </Grid>
            {/* loader */}
            <Backdrop style={{ zIndex: 1000, color: "#fff" }} open={procesando}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {/* modal mensajes general */}
            <ModalComponent handleClose={handleisAlerClose} isOpen={isAlertOpen} key={'alerta'}>
                <Grid container spacing={2} style={{ textAlign: 'center' }}>
                    <Grid item xs={12}>
                        <br />
                        <br />
                        <p>{mensajeAlert}</p>
                    </Grid>
                </Grid>
            </ModalComponent>
            <ModalComponent handleClose={handleisAlerCloseForm} isOpen={isAlertOpenForm} key={'alertasaz'}>
                <AddProyectoForm action={(d: any) => handleAddProyecto(d)} />
            </ModalComponent>
            <ModalComponent handleClose={handleisAlerCloseFormEdit} isOpen={isAlertOpenFormEdit} key={'alertasazedit'}>
                <AddProyectoForm item={item} action={(d: any) => handleEditProyecto(d)} />
            </ModalComponent>

            <ModalConfirm onAcept={() => {
                handleDeleteProyecto(item);
                setOpenModalConfirm(false);
            }} onCancel={() => {
                setOpenModalConfirm(false);
            }} open={openModalConfirm} text={'¿Desea eliminar el proyecto seleccionado?'} title={''} />
        </Box>
    );
}
export default GestionProyectosPageLayOut;