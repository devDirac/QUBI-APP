import React, { useState } from 'react'
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { Backdrop, CircularProgress, Grid, Link } from '@mui/material';
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
import './styles.scss';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import { useIntl } from 'react-intl';
import { Button, Form } from 'react-bootstrap';
import InputField from '../../componets/InputField';
import { AsistenteFormFormProps } from './types';

const AsistenteForm: React.FC<AsistenteFormFormProps> = (props: AsistenteFormFormProps) => {
    const intl = useIntl();
    const [mensaje, setMensaje] = useState<string>('');

    const formik = useFormik({
        initialValues: {
            mensaje: ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            mensaje: Yup.string()
                .min(4, intl.formatMessage({ id: "input_validation_min_4" }))
                .max(500, intl.formatMessage({ id: "input_validation_max_500" }))
                .required(intl.formatMessage({ id: 'input_validation_requerido' }))
        }),
    });

    return (
        <Grid container spacing={2} style={{ width: '100%' }}>
            {props?.mensajeBienvenida !== '' ? <Grid item xs={12}>
                <p><SmartToyTwoToneIcon fontSize="medium" /> {props?.mensajeBienvenida || ''}</p>
            </Grid> : null}
            <Grid item xs={12}>
                <FormikProvider value={formik}>
                    <Form.Group className="mb-3 form-control " style={{ textAlign: 'left' }}>
                        <InputField
                            required
                            value={mensaje}
                            name="mensaje"
                            onInput={(e: any) => {
                                const target = e.target as HTMLTextAreaElement;
                                formik.setFieldValue("mensaje", target?.value);
                                setMensaje(target?.value);
                            }}
                            label={intl.formatMessage({ id: 'input_pregunta_asistente' })}
                            placeholder={intl.formatMessage({ id: 'input_pregunta_asistente_descripcion' })}
                            type="textArea"
                            id="mensaje"
                            formik={formik?.getFieldMeta("mensaje")}
                        />
                        <br />
                        <Button
                            variant="success"
                            type='submit'
                            disabled={props?.procesando || !formik.dirty || !formik.isValid}
                            onClick={() => {
                                props?.enAccion({ mensaje });
                            }}
                        >
                            {intl.formatMessage({ id: 'general_enviar' })}
                        </Button>
                        {props?.superAdministrador && props?.respuestaId && !props?.respuestaId?.existente_similitud_pregunta && !props?.respuestaId?.existente_pregunta  && 
                        
                            props?.respuesta !== 'Lo siento, no pude encontrar información relevante. Investigaré un poco más al respecto y cuando tenga una respuesta te la haré saber.' ?
                            <Button
                                variant="info"
                                type='submit'
                                disabled={props?.procesando || !formik.dirty || !formik.isValid}
                                onClick={() => {
                                    props?.enAccionCorrecta && props?.enAccionCorrecta(props?.respuestaId);
                                }}
                            >
                                Marcar como respuesta correcta
                            </Button>
                            : null}
                        <Backdrop style={{ zIndex: 1000, color: "#fff" }} open={props?.procesando}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </Form.Group>
                </FormikProvider>
            </Grid>
            {
                props?.procesando ? <Grid item xs={12}>  <p><SmartToyTwoToneIcon fontSize="medium" /> Dame un momento por favor...</p> </Grid> : null
            }
            {props?.respuesta !== '' && !props?.procesando ? <Grid item xs={12}>
                <p><SmartToyTwoToneIcon fontSize="medium" /> {props?.respuesta || ''}</p>
            </Grid> : null}

            {props?.urlInteligente !== '' && !props?.procesando ? <Grid item xs={12}>
                <p>Aqui tienes un enlace que te ayudara en tu solicitud <Link style={{ color: '#2196f3' }}
                    href={`${props?.urlInteligente}`}
                >
                    <InsertLinkIcon fontSize='large' />
                </Link></p>
            </Grid> : null}
        </Grid>
    )
}

export default AsistenteForm
