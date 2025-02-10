import React from 'react';
import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../InputField';
import CampoAvatar from '../CampoAvatar/CampoAvatar';
import _ from 'lodash';
import { useAddUserForm } from './useAddUserForm'
import SelectField from '../SelectField';
import { useIntl } from 'react-intl';
import './style.scss';

export interface AddUserFormProps {
    action: (data: any) => void
    procesando: boolean
    item?: any
    moduloContrato?: boolean
    contratoId?: number
    obra?: number
    resetForm:boolean
    onReset:()=>void
    onSelectObra?:(obra:any)=>void
}

const AddUserForm: React.FC<AddUserFormProps> = (props: AddUserFormProps) => {
    const intl = useIntl();
    const {
        formik,
        darkMode,
        usuario,
        setUsuario,
        name,
        setName,
        email,
        setEmail,
        password,
        setPasword,
        password_confirm,
        setPasword_confirm,
        telefono,
        setTelefono,
        foto,
        setImagen,
        tipoUsuarios,
        tipo_usuario,
        setTipo_Usuario,
        catalogoPerfiles,
        catalogoPuestos,
        catalogoPaginasInicio,
        id_perfil,
        id_puesto,
        id_landin_page,
        orden,
        setId_perfil,
        setId_puesto,
        setId_landin_page,
        setOrden,
        catalogoProyectos,
        obra,
        setTObra,
        empresa,
        setEmpresa
    } = useAddUserForm(props);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Grid item xs={12} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '10px', minHeight: '600px' } : { backgroundColor: '#fff', padding: '10px', minHeight: '600px' }}>
                    <FormikProvider value={formik}>
                        <Form.Group className="mb-3 " >
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <InputField
                                        required
                                        value={usuario || ''}
                                        name="usuario"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("usuario", target?.value || '');
                                            setUsuario(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'general_usuario' })}
                                        placeholder={intl.formatMessage({ id: 'input_usaurio_descripcion' })}
                                        type="text"
                                        id="usuario"
                                        formik={formik?.getFieldMeta('usuario')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField
                                        required
                                        value={name || ''}
                                        name="name"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("name", target?.value || '');
                                            setName(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_nombre' })}
                                        placeholder={intl.formatMessage({ id: 'input_nombre_descripcion' })}
                                        type="text"
                                        id="name"
                                        formik={formik?.getFieldMeta('name')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField
                                        required
                                        value={email || ''}
                                        name="email"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("email", target?.value || '');
                                            setEmail(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'general_correo' })}
                                        placeholder={intl.formatMessage({ id: 'input_correo_descripcion' })}
                                        type="email"
                                        id="email"
                                        formik={formik?.getFieldMeta('email')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField
                                        required
                                        value={password || ''}
                                        name="password"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("password", target?.value || '');
                                            setPasword(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_contrasena' })}
                                        placeholder={intl.formatMessage({ id: 'input_contrasena_descripcion' })}
                                        type="password"
                                        id="password"
                                        formik={formik?.getFieldMeta('password')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField
                                        required
                                        value={password_confirm || ''}
                                        name="password_confirm"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("password_confirm", target?.value || '');
                                            setPasword_confirm(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_contrasena_confirmacion' })}
                                        placeholder={intl.formatMessage({ id: 'input_contrasena_confirmacion_descripcion' })}
                                        type="password"
                                        id="password_confirm"
                                        formik={formik?.getFieldMeta('password_confirm')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField
                                        required
                                        value={telefono || ''}
                                        name="telefono"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("telefono", target?.value || '');
                                            setTelefono(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_telefono' })}
                                        placeholder={intl.formatMessage({ id: 'input_telefono_descripcion' })}
                                        type="text"
                                        id="text"
                                        formik={formik?.getFieldMeta('telefono')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_tipo_usuario' })}
                                        value={tipo_usuario}
                                        options={tipoUsuarios.filter((e: any) => e?.id !== 3).map((e: any) => {
                                            return {
                                                label: e?.tipo,
                                                value: e?.id
                                            }
                                        })}
                                        name="tipo_usuario"
                                        id="tipo_usuario"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("tipo_usuario", target?.value || '');
                                            setTipo_Usuario(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('tipo_usuario')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_proyecto' })}
                                        value={obra}
                                        options={catalogoProyectos.map((e: any) => {
                                            return {
                                                label: e?.obra,
                                                value: e?.id
                                            }
                                        })}
                                        name="obra"
                                        id="obra"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("obra", target?.value || '');
                                            setTObra(target?.value);
                                            props?.onSelectObra && props?.onSelectObra(target?.value)
                                        }}
                                        formik={formik?.getFieldMeta('obra')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField
                                        required
                                        value={empresa || ''}
                                        name="empresa"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("empresa", target?.value || '');
                                            setEmpresa(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_empresa' })}
                                        placeholder={intl.formatMessage({ id: 'input_empresa_descripcion' })}
                                        type="text"
                                        id="empresa"
                                        formik={formik?.getFieldMeta('empresa')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <h5>Avatar</h5>
                                    <CampoAvatar foto={foto} alt={usuario} onChangeImage={setImagen} />
                                    <br />
                                </Grid>
                                {props?.moduloContrato ? <Grid item xs={6} md={6}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'general_perfil' })}
                                        value={id_perfil}
                                        options={catalogoPerfiles.map((e: any) => {
                                            return {
                                                label: e?.nombre,
                                                value: e?.id
                                            }
                                        })}
                                        name="id_perfil"
                                        id="id_perfil"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("id_perfil", target?.value || '');
                                            setId_perfil(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('id_perfil')}
                                    />
                                </Grid> : null}
                                {props?.moduloContrato ? <Grid item xs={6} md={6}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'general_puesto' })}
                                        value={id_puesto}
                                        options={catalogoPuestos.map((e: any) => {
                                            return {
                                                label: e?.nombre,
                                                value: e?.id
                                            }
                                        })}
                                        name="id_puesto"
                                        id="id_puesto"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("id_puesto", target?.value || '');
                                            setId_puesto(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('id_puesto')}
                                    />
                                </Grid> : null}
                                {props?.moduloContrato ? <Grid item xs={6} md={6}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_pagina_inicio' })}
                                        value={id_landin_page}
                                        options={catalogoPaginasInicio.map((e: any) => {
                                            return {
                                                label: e?.nombre,
                                                value: e?.id
                                            }
                                        })}
                                        name="id_landin_page"
                                        id="id_landin_page"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("id_landin_page", target?.value || '');
                                            setId_landin_page(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('id_landin_page')}
                                    />
                                </Grid> : null}
                                {props?.moduloContrato ? <Grid item xs={6} md={6}>
                                    <InputField
                                        required
                                        value={orden || ''}
                                        name="orden"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("orden", target?.value || '');
                                            setOrden(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_orden' })}
                                        placeholder={intl.formatMessage({ id: 'input_orden_descripcion' })}
                                        type="text"
                                        id="orden"
                                        formik={formik?.getFieldMeta('orden')}
                                    />
                                </Grid> : null}
                                <Grid item xs={12} md={12}>
                                    <Button
                                        variant="primary"
                                        disabled={props?.procesando || !formik.dirty || !formik.isValid || _.isEmpty(foto)}
                                        onClick={(e: any) => {
                                            props?.action(!props?.moduloContrato ? {
                                                name,
                                                email,
                                                password,
                                                telefono,
                                                foto,
                                                usuario,
                                                id_tipo_usuario: tipo_usuario,
                                                obra,
                                                empresa
                                            } : {
                                                name,
                                                email,
                                                password,
                                                telefono,
                                                foto,
                                                usuario,
                                                id_tipo_usuario: tipo_usuario,
                                                obra,
                                                id_perfil,
                                                id_puesto,
                                                id_contrato: props?.contratoId,
                                                orden,
                                                id_landin_page,
                                                empresa
                                            });
                                        }}
                                    >
                                        {intl.formatMessage({ id: 'general_guardar' })}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form.Group>
                    </FormikProvider>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AddUserForm
