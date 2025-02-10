import React from 'react';
import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import { Button, Form } from 'react-bootstrap';
import _ from 'lodash';
import { useAddUserForm } from './useAddUserForm';
import { useIntl } from 'react-intl';
import InputField from '../../componets/InputField';
import SelectField from '../../componets/SelectField';
import CampoAvatar from '../../componets/CampoAvatar/CampoAvatar';

export interface AddUserFormProps {
    action: (data: any) => void
    procesando: boolean
    item?: any
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
        empresa,
        setEmpresa
    } = useAddUserForm(props);

    return (
        <div>
            <FormikProvider value={formik}>
                <Form.Group style={{ width: '100%' }}>
                    <Grid container spacing={2} mt={5}>
                        <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
                            <h5 style={{ color: 'rgb(40, 51, 74)' }}>Alta de usuario</h5>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputField
                                required
                                disabled={props?.item}
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
                                label={intl.formatMessage({ id: 'input_nombre_apellidos' })}
                                placeholder={intl.formatMessage({ id: 'input_nombre_apellidos_descripcion' })}
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
                                disabled={props?.item}
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
                        {!props?.item ? <Grid item xs={12} md={6}>
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
                        </Grid> : null}
                        {!props?.item ? <Grid item xs={12} md={6}>
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
                        </Grid> : null}
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
                            <p>foto de usuario</p>
                            <CampoAvatar foto={foto} alt={usuario} onChangeImage={setImagen} />
                            <br />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <Button
                                variant="primary"
                                disabled={props?.procesando || !formik.dirty || !formik.isValid || _.isEmpty(foto)}
                                onClick={(e: any) => {
                                    props?.action({
                                        name,
                                        email,
                                        password,
                                        telefono,
                                        foto,
                                        usuario,
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
        </div>
    )
}

export default AddUserForm
