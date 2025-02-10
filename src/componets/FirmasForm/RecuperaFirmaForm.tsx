import { Grid } from '@mui/material'
import InputField from '../../componets/InputField';
import { FormikProvider, useFormik } from 'formik'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useIntl } from 'react-intl'
import * as Yup from "yup";
import SendIcon from '@mui/icons-material/Send';

interface RecuperaFirmaFormProps {
    enAccion: (data: any) => void
    darkMode: boolean
    procesando: boolean
}

const RecuperaFirmaForm: React.FC<RecuperaFirmaFormProps> = (props: RecuperaFirmaFormProps) => {
    const intl = useIntl();

    const [contrasena, setContrasena] = useState<string>('');

    const formik = useFormik({
        initialValues: {
            contrasena: ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            contrasena: Yup.string()
                .min(4, intl.formatMessage({ id: "input_validation_min_4" }))
                .max(15, intl.formatMessage({ id: "input_validation_max_15" })),
        }),
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>

                <Grid
                    item
                    xs={12}
                    className="bordersContainers"
                    style={
                        props?.darkMode
                            ? {
                                backgroundColor: "#1f283e",
                                padding: "10px"
                            }
                            : { backgroundColor: "#fff", padding: "10px"}
                    }
                >
                    <FormikProvider value={formik}>
                        <Form.Group className="mb-3 ">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
                                    <h3>¿Olvidaste tu clave?</h3>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        autoComplete="off"
                                        required
                                        value={contrasena || ""}
                                        name="contrasena"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("contrasena", target?.value || "");
                                            setContrasena(target?.value);
                                        }}
                                        label={'Ingresa tu contraseña de acceso al sistema para mostrarte la clave:'}
                                        placeholder={'Ingresa tu contraseña de acceso al sistema'}
                                        type="password"
                                        id="contrasena"
                                        formik={formik?.getFieldMeta("contrasena")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Button
                                        variant="primary"
                                        disabled={
                                            props?.procesando || !formik.dirty || !formik.isValid
                                        }
                                        onClick={(e: any) => {
                                            props?.enAccion({
                                                contrasena
                                            });
                                        }}
                                    >
                                        <SendIcon /> Enviar información
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

export default RecuperaFirmaForm
