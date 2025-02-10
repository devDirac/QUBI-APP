import React, { useEffect, useState } from 'react';
import {
    Typography,
    Grid,
    Box,
    Backdrop,
    CircularProgress,
    Card,
    Stack,
    Divider,
    Chip,
    Avatar
} from "@mui/material";
import Header from '../../componets/Header/Header';
import _ from 'lodash';
import ModalComponent from '../../componets/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import LockResetIcon from '@mui/icons-material/LockReset';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { Form } from 'react-bootstrap';
import { editUserHttp, getUserNuevosAjustes, passwordResetSinTokenHTTP, recoverPasswordGenerateToken, setUser, updatePassword } from '../../actions/auth';
import { getErrorHttpMessage } from '../../utils';
import PasswordRecover from '../../componets/PasswordRecover';
import PasswordResetForm from '../../componets/passwordResetForm';

const PerfilPageLayOut: React.FC = () => {
    const dispatch = useDispatch();
    const [procesando, setProcesando] = useState(false);
    const usuario = useSelector((state: StoreType) => state?.app?.user?.data || {});
    const token = useSelector((state: StoreType) => state?.app?.user?.token || '')
    const [editNombre, setEditNombre] = useState(false);
    const [editNombreTxt, setEditNombreTxt] = useState(usuario?.name);

    const [editTelefono, setEditTelefono] = useState(false);
    const [editTelefonoTxt, setEditTelefonoTxt] = useState(usuario?.telefono);

    const [editEmpresa, setEditEmpres] = useState(false);
    const [editEmpresaTxt, setEditEmpresTxt] = useState(usuario?.empresa);

    /* Modal mensajes generales */
    const [mensajeAlert, setMensajeAlert] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);


    const [isAlertOpenPassword, setIsAlertOpenPassword] = useState(false);
    const handleisAlertOpenPassword = () => setIsAlertOpenPassword(true);
    const handleisAlerClosePassword = () => setIsAlertOpenPassword(false);

    const handleActualizausuario = async (propiedad: string) => {
        try {
            setProcesando(true);
            let obj;
            if (propiedad === 'name') {
                obj = { name: editNombreTxt }
            }
            if (propiedad === 'empresa') {
                obj = { empresa: editEmpresaTxt }
            }
            if (propiedad === 'telefono') {
                obj = { telefono: editTelefonoTxt }
            }
            await editUserHttp({ ...obj, ...{ id: usuario?.id } })
            const user = await getUserNuevosAjustes(usuario?.id || 0, token);
            if (propiedad === 'name') {
                setEditNombre(false);
            }
            if (propiedad === 'empresa') {
                setEditEmpres(false);
            }
            if (propiedad === 'telefono') {
                setEditTelefono(false);
            }


            dispatch(setUser(user));
            setMensajeAlert('Exito al actualizar el usuario');
            handleisAlertOpen();
            setProcesando(false);
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || 'error');
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const recuperaPassword = async (value: any) => {
        try {
            setProcesando(true);
            await passwordResetSinTokenHTTP(value?.password || '', value?.passwordConfirm || '', usuario?.id);
            handleisAlerClosePassword();
            setMensajeAlert('Exito al actualizar la contraseña');
            setProcesando(false);
            handleisAlertOpen();
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || 'error');
            setProcesando(false);
            handleisAlertOpen();
        }
    }


    useEffect(() => {
        setEditNombreTxt(usuario?.name);
        setEditTelefonoTxt(usuario?.telefono);
        setEditEmpresTxt(usuario?.empresa);
    }, [usuario])

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            {/* Navbar */}
            <Header />
            {/* Main Content */}
            <Grid container sx={{ flexGrow: 1, textAlign: "center" }} spacing={2} justifyContent="center" >
                <Grid item xs={12} md={12} style={{ marginTop: 15, marginBottom: 55 }} justifyContent={'center'} justifyItems={'center'} alignContent={'center'}>
                    <Card variant="outlined" sx={{ maxWidth: 550 }}>
                        <Box sx={{ p: 2 }}>
                            <div style={{
                                position: 'relative',
                                bottom: '66px',
                                left: '160px'
                            }}><Avatar alt={''} src={usuario?.foto} sx={{ width: 100, height: 100 }} /></div>
                            <Stack
                                direction="row"
                                sx={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
                            >
                                {!editNombre ? <Typography gutterBottom variant="h5" component="div" >
                                    {usuario?.name} <span onClick={() => {
                                        setEditNombre(true)
                                    }} style={{ cursor: 'pointer' }} title='Cambiar el nombre'><EditIcon /></span>
                                </Typography> : null}

                                {editNombre ? <div style={{ width: '100%' }}>
                                    <Form.Control
                                        key={'nombre'}
                                        placeholder={"Ingrese el nombre"}
                                        value={editNombreTxt}
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            setEditNombreTxt(target?.value);
                                        }}
                                        style={{ borderRight: 'none' }}
                                    />

                                    <span onClick={() => {
                                        handleActualizausuario('name')
                                    }} style={{ cursor: 'pointer' }} title='guarda el nombre'><SaveIcon /></span>

                                    <span onClick={() => {
                                        setEditNombre(false)
                                        setEditNombreTxt(usuario?.name);
                                    }} style={{ cursor: 'pointer' }} title='cancelar'><CancelIcon color='error' /></span>
                                </div> : null}

                            </Stack>
                            <Divider></Divider>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }} style={{ textAlign: 'left' }}>
                                Usuario: {usuario?.usuario} <br></br>
                                Correo electronico: {usuario?.email} <br></br>

                                {!editTelefono ? (<span>Teléfono: {usuario?.telefono} <span onClick={() => {
                                    setEditTelefono(true)
                                }} style={{ cursor: 'pointer' }} title='Cambiar el teléfono'><EditIcon /></span> <br></br></span>) : null}



                                {editTelefono ? (<span><Form.Control
                                    key={'telefono'}
                                    placeholder={"Ingrese el teléfono"}
                                    value={editTelefonoTxt}
                                    onInput={(e: any) => {
                                        const target = e.target as HTMLTextAreaElement;
                                        setEditTelefonoTxt(target?.value);
                                    }}
                                    style={{ borderRight: 'none' }}
                                /> <span onClick={() => {
                                    handleActualizausuario('telefono')
                                }} style={{ cursor: 'pointer' }} title='Guarda el teléfono'><SaveIcon /></span>

                                    <span onClick={() => {
                                        setEditTelefono(false)
                                        setEditTelefonoTxt(usuario?.telefono);
                                    }} style={{ cursor: 'pointer' }} title='cancelar'><CancelIcon color='error' /></span>
                                    <br></br></span>) : null}



                                {!editEmpresa ? (<span>Empresa: {usuario?.empresa} <span onClick={() => {
                                    setEditEmpres(true)
                                }} style={{ cursor: 'pointer' }} title='Cambiar la empresa'><EditIcon /></span> <br></br></span>) : null}

                                {editEmpresa ? (<span><Form.Control
                                    key={'telefono'}
                                    placeholder={"Ingrese el nombre de la empresa"}
                                    value={editEmpresaTxt}
                                    onInput={(e: any) => {
                                        const target = e.target as HTMLTextAreaElement;
                                        setEditEmpresTxt(target?.value);
                                    }}
                                    style={{ borderRight: 'none' }}
                                /> <span onClick={() => {
                                    handleActualizausuario('empresa')
                                }} style={{ cursor: 'pointer' }} title='guardar la empresa'><SaveIcon /></span>
                                    <span onClick={() => {
                                        setEditEmpres(false)
                                        setEditEmpresTxt(usuario?.empresa);
                                    }} style={{ cursor: 'pointer' }} title='cancelar'><CancelIcon color='error' /></span>
                                    <br></br></span>) : null}

                                <span>Si deseas cambiar la contraseña da click <strong onClick={() => {
                                    handleisAlertOpenPassword();
                                }} style={{ color: '#1A73E8', cursor: 'pointer' }}> AQUÍ <LockResetIcon fontSize='large' /> </strong> </span>
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ p: 2 }}>
                            <Typography gutterBottom variant="h5">
                                Proyectos
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                                {usuario?.proyectos?.length ? usuario?.proyectos.map((r: any) => (
                                    <Chip color="info" label={r?.titulo} size="small" style={{ marginBottom: 5 }} />
                                )) : 'Este usuario no tiene proyectos asignados'}
                            </Stack>
                        </Box>
                    </Card>
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

            <ModalComponent handleClose={handleisAlerClosePassword} isOpen={isAlertOpenPassword} key={'alertaPassword'}>
                <div style={{marginTop:15}}>
                    <PasswordResetForm procesando={procesando} enAccion={recuperaPassword} />
                </div>
            </ModalComponent>

        </Box>
    );
}
export default PerfilPageLayOut;