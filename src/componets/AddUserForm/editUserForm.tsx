import React from 'react';
import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../InputField';
import CampoAvatar from '../CampoAvatar/CampoAvatar';
import { useEditUserForm } from './useEditUserForm'
import SelectField from '../SelectField';
import { useIntl } from 'react-intl';
import './style.scss';

export interface EditUserFormProps {
    action: (data: any) => void
    procesando: boolean
    item?: any
}

const EditUserForm: React.FC<EditUserFormProps> = (props: EditUserFormProps) => {
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
        telefono,
        setTelefono,
        foto,
        setImagen,
        tipoUsuarios,
        tipo_usuario,
        setTipo_Usuario
    } = useEditUserForm(props);

    return (
        <div>
            <FormikProvider value={formik}>
                <Form.Group className="mb-3" style={darkMode ? { backgroundColor: 'transparent' } : {}}>
                    <Grid container spacing={2} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '10px', minHeight: '400px' } : { backgroundColor: '#fff', padding: '10px', minHeight: '400px' }}>

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
                                disabled
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
                        <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
                            <h5>Avatar</h5>
                            <CampoAvatar foto={foto} alt={usuario} onChangeImage={setImagen} />
                            <br />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SelectField
                                label={intl.formatMessage({ id: 'input_tipo_usuario' })}
                                value={tipo_usuario}
                                options={tipoUsuarios.map((e: any) => {
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
                        <Grid
                            item
                            xs={12}
                            style={{ padding: "5px", paddingTop: "0", paddingBottom: "0", textAlign: 'right' }}
                        >
                            <Button
                                variant="primary"
                                disabled={props?.procesando || !formik.dirty || !formik.isValid}
                                onClick={(e: any) => {
                                    props?.action({
                                        name,
                                        email,
                                        telefono,
                                        foto,
                                        usuario,
                                        id: props?.item?.id,
                                        id_tipo_usuario: tipo_usuario
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

export default EditUserForm
