import React, { useState } from 'react'
import { Backdrop, CircularProgress, Grid } from '@mui/material';
import './styles.scss';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import { useIntl } from 'react-intl';
import { Button, Form } from 'react-bootstrap';
import InputField from '../../componets/InputField';
import { WhatsAppContactoFormProps } from './types';

const WhatsAppContactoForm: React.FC<WhatsAppContactoFormProps> = (props: WhatsAppContactoFormProps) => {
    const intl = useIntl();
    const [nombre, setNombre] = useState<string>('');
    const [apellido, setApellido] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('');
    const [datosContactoTelefono, setDatosContactoTelefono] = useState<string>('');
    const [datosContactoCorreo, setdatosContactoCorreo] = useState<string>('');

    const formik = useFormik({
        initialValues: {
            nombre: "",
            apellido: "",
            mensaje: "",
            datosContactoTelefono: "",
            datosContactoCorreo: ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .min(4, intl.formatMessage({ id: "input_validation_min_4" }))
                .max(500, intl.formatMessage({ id: "input_validation_max_500" }))
                .required(intl.formatMessage({ id: 'input_validation_requerido' })),
            apellido: Yup.string()
                .min(4, intl.formatMessage({ id: "input_validation_min_4" }))
                .max(500, intl.formatMessage({ id: "input_validation_max_500" }))
                .required(intl.formatMessage({ id: 'input_validation_requerido' })),
            mensaje: Yup.string()
                .min(4, intl.formatMessage({ id: "input_validation_min_4" }))
                .max(500, intl.formatMessage({ id: "input_validation_max_500" }))
                .required(intl.formatMessage({ id: 'input_validation_requerido' })),
            datosContactoCorreo: Yup.string().email(intl.formatMessage({ id: 'input_validation_formato_invalido' })),
            datosContactoTelefono: Yup.string().matches(/^[0-9]{7,12}$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
        }),
    });

    return (
        <Grid container spacing={2} style={{ width: '100%' }}>
            <Grid item xs={12}>
                <FormikProvider value={formik}>
                    <Form.Group className="mb-3 form-control " style={{ textAlign: 'left' }}>
                        <InputField
                            required
                            value={nombre}
                            name="nombre"
                            onInput={(e: any) => {
                                const target = e.target as HTMLTextAreaElement;
                                formik.setFieldValue("nombre", target?.value);
                                setNombre(target?.value);
                            }}
                            label={intl.formatMessage({ id: 'input_nombre' })}
                            placeholder={intl.formatMessage({ id: 'input_nombre_descripcion' })}
                            type="text"
                            id="nombre"
                            formik={formik?.getFieldMeta("nombre")}
                        />
                        <InputField
                            required
                            value={apellido}
                            name="apellido"
                            onInput={(e: any) => {
                                const target = e.target as HTMLTextAreaElement;
                                formik.setFieldValue("apellido", target?.value);
                                setApellido(target?.value);
                            }}
                            label={intl.formatMessage({ id: 'input_apellido' })}
                            placeholder={intl.formatMessage({ id: 'input_apellido_descripcion' })}
                            type="textArea"
                            id="apellido"
                            formik={formik?.getFieldMeta("apellido")}
                        />
                       
                        <InputField
                            required
                            value={datosContactoTelefono}
                            name="datosContactoTelefono"
                            onInput={(e: any) => {
                                const target = e.target as HTMLTextAreaElement;
                                formik.setFieldValue("datosContactoTelefono", target?.value);
                                setDatosContactoTelefono(target?.value);
                            }}
                            label={intl.formatMessage({ id: 'input_telefono_contacto' })}
                            placeholder={intl.formatMessage({ id: 'input_telefono_contacto_descripcion' })}
                            type="text"
                            id="datosContactoTelefono"
                            formik={formik?.getFieldMeta("datosContactoTelefono")}
                        />
                        <InputField
                            required
                            value={datosContactoCorreo}
                            name="datosContactoCorreo"
                            onInput={(e: any) => {
                                const target = e.target as HTMLTextAreaElement;
                                formik.setFieldValue("datosContactoCorreo", target?.value);
                                setdatosContactoCorreo(target?.value);
                            }}
                            label={intl.formatMessage({ id: 'input_correo_contacto' })}
                            placeholder={intl.formatMessage({ id: 'input_correo_contacto_descripcion' })}
                            type="text"
                            id="datosContactoCorreo"
                            formik={formik?.getFieldMeta("datosContactoCorreo")}
                        />
                         <InputField
                            required
                            value={mensaje}
                            name="mensaje"
                            onInput={(e: any) => {
                                const target = e.target as HTMLTextAreaElement;
                                formik.setFieldValue("mensaje", target?.value);
                                setMensaje(target?.value);
                            }}
                            label={intl.formatMessage({ id: 'input_mensaje' })}
                            placeholder={intl.formatMessage({ id: 'input_mensaje_descripcion' })}
                            type="textArea"
                            id="mensaje"
                            formik={formik?.getFieldMeta("mensaje")}
                        />
                        <br />
                        <Button
                            variant="success"
                            disabled={props?.procesando || !formik.dirty || !formik.isValid}
                            onClick={() => {
                                props?.enAccion({ mensaje, correo: datosContactoCorreo, telefono: datosContactoTelefono });
                            }}
                        >
                            {intl.formatMessage({ id: 'general_enviar' })}
                        </Button>
                        <Backdrop style={{ zIndex: 1000, color: "#fff" }} open={props?.procesando}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </Form.Group>
                </FormikProvider>
            </Grid>
        </Grid>
    )
}

export default WhatsAppContactoForm
