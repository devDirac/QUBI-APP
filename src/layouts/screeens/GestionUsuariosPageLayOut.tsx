import React, { useCallback, useEffect, useState } from 'react';
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
import ModalConfirm from '../../componets/ModalConfirm/ModalConfirm';
import AddUserForm from '../../forms/AddUsuarioForm/AddUsuarioForm';
import { editUserHttp, getUsersHttp, registerHttp, setActiveUserHttp } from '../../actions/auth';
import { getErrorHttpMessage } from '../../utils';
import { useIntl } from 'react-intl';

const GestionUsuariosPageLayOut: React.FC = () => {
    const intl = useIntl();
    const [procesando, setProcesando] = useState(false);
    const [data, setData] = useState([]);
    const [item, setItem] = useState<any>({});
    /* Modal alta de usuarios */
    const [isAlertOpenForm, setIsAlertOpenForm] = useState(false);
    const handleisAlertOpenForm = () => setIsAlertOpenForm(true);
    const handleisAlerCloseForm = () => setIsAlertOpenForm(false);
    /* Modal mensajes generales */
    const [mensajeAlert, setMensajeAlert] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);
    /* Modal edicion de usuarios */
    const [isAlertOpenFormEdit, setIsAlertOpenFormEdit] = useState(false);
    const handleisAlertOpenFormEdit = () => setIsAlertOpenFormEdit(true);
    const handleisAlerCloseFormEdit = () => setIsAlertOpenFormEdit(false);
    /* modal pregunta si desea eliminar proyecto */
    const [openModalConfirm, setOpenModalConfirm] = useState(false);

    const deletePregunta = (data: any) => {
        setItem(data);
        setOpenModalConfirm(true);

    }

    const getData = useCallback(async () => {
        try {
            setProcesando(true);
            const response = await getUsersHttp();
            setData(response.map((r: any) => {
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
            setMensajeAlert(message || intl.formatMessage({ id: 'login_error' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    const handleAddUsuario = async (s: any) => {
        try {
            await registerHttp(s)
            setProcesando(true);
            handleisAlerCloseForm();
            setMensajeAlert('Exito al registrar el usuario');
            handleisAlertOpen();
            getData();
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || 'error');
            setProcesando(false);
            handleisAlertOpen();
        }
    }


    const handleEditUsuario = async (s: any) => {
        try {
            setProcesando(true);
            await editUserHttp({ name: s?.name, empresa: s?.empresa, telefono: s?.telefono, foto: s?.foto, id: item?.id })
            handleisAlerCloseFormEdit();
            setMensajeAlert('Exito al actualizar el usuario');
            handleisAlertOpen();
            getData();
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || 'error');
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const handleEditEstatusUsuario = async () => {
        try {
            setProcesando(true);
            await setActiveUserHttp(item);
            setMensajeAlert('Exito al actualizar el estatus del usuario');
            handleisAlertOpen();
            getData();
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || 'error');
            setProcesando(false);
            handleisAlertOpen();
        }
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
                            <h4 style={{ color: 'rgb(40, 51, 74)', fontWeight: 'bolder' }}>Gestión de usuarios</h4>
                        </Grid>
                        <Grid item xs={12} md={12} style={{ textAlign: 'right' }}>
                            <Button variant="outlined" size="small" style={{ color: '#1976d2' }} onClick={() => {
                                handleisAlertOpenForm();
                            }}>
                                Agregar nuevo usuario
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
                            //columnsToShow={['titulo', 'description', 'info', 'ubicacion', 'imagen', 'fecha_registro']}
                            data={data}
                        />
                        : procesando ? 'Cargando información...' : 'Sin registros'}
                </Grid>
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
            <ModalComponent handleClose={handleisAlerCloseForm} isOpen={isAlertOpenForm} key={'alertasaz'}>
                <AddUserForm procesando={procesando} action={(s) => handleAddUsuario(s)} />
            </ModalComponent>
            <ModalComponent handleClose={handleisAlerCloseFormEdit} isOpen={isAlertOpenFormEdit} key={'alertasazedit'}>
                <AddUserForm procesando={procesando} action={(s) => handleEditUsuario(s)} item={item} />
            </ModalComponent>

            <ModalConfirm onAcept={() => {
                handleEditEstatusUsuario();
                setOpenModalConfirm(false);
            }} onCancel={() => {
                setOpenModalConfirm(false);
            }} open={openModalConfirm} text={`¿Desea ${ item?.activo ? 'reactivar' : 'eliminar'} el usuario seleccionado?`} title={''} />
        </Box>
    );
}
export default GestionUsuariosPageLayOut;