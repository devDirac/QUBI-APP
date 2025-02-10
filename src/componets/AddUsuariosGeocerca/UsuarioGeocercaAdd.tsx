import { Grid } from '@mui/material'
import * as Yup from "yup";
import { useMaterialUIController } from 'context'
import { FormikProvider, useFormik } from 'formik'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import InputField from '../InputField/index';
import { useIntl } from 'react-intl';
import CampoAvatar from '../CampoAvatar/CampoAvatar';
import _ from 'lodash';
import SelectMultipleAutoCompleteField from '../SelectMultipleAutoCompleteField/SelectMultipleAutoCompleteField';


export interface AddUserFormProps {
    action: (data: any) => void
    contrato: any[]
    procesando: boolean
    item?: any
    moduloContrato?: boolean
    contratoId?: number
    obra?: number
    resetForm: boolean
    onReset: () => void
    onSelectObra?: (obra: any) => void
}


const UsuarioGeocercaAdd: React.FC<AddUserFormProps> = (props: AddUserFormProps) => {

    const intl = useIntl();
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [usuario, setUsuario] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [foto, setFoto] = useState('');
    const [contrato, setContrato] = useState<any>([]);

    const formik = useFormik({
        initialValues: {
            contrato: [],
            name: "",
            email: "",
            telefono: "",
            usuario: ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            contrato: Yup.array().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            name: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(150, intl.formatMessage({ id: 'input_validation_max_150' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            email: Yup.string().email(intl.formatMessage({ id: 'input_validation_formato_invalido' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            telefono: Yup.string().min(10, intl.formatMessage({ id: 'input_validation_min_10_digitos' })).max(10, intl.formatMessage({ id: 'input_validation_max_10_digitos' })).matches(/^[0-9]+$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            usuario: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(25, intl.formatMessage({ id: 'input_validation_max_25' })).required(intl.formatMessage({ id: 'input_validation_requerido' }))
        }),
    });


    const setImagen = (data: any) => {
        setFoto(data);
    }


    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Grid item xs={12} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '10px' } : { backgroundColor: '#fff', padding: '10px' }}>
                    <FormikProvider value={formik}>
                        <Form.Group className="mb-3 " >
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <SelectMultipleAutoCompleteField
                                        placeholder='Seleccione los contratos'
                                        label={intl.formatMessage({
                                            id: "input_contratos",
                                        })}
                                        defaultValue={contrato}
                                        options={props?.contrato.map((e: any) => {
                                            return {
                                                label: e?.contrato,
                                                value: e?.id
                                            }
                                        })}
                                        name="contrato"
                                        id="contrato"
                                        onInput={(e: any) => {
                                            formik.setFieldValue("contrato", e);
                                            setContrato(e);
                                        }}
                                        formik={formik?.getFieldMeta("contrato")}
                                    />
                                </Grid>
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
                                    <h5>Avatar</h5>
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
                                                telefono,
                                                foto,
                                                usuario,
                                                contrato
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

export default UsuarioGeocercaAdd
