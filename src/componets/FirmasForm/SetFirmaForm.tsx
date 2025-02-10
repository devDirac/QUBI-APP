import React, { useState } from 'react'
import type { SetFirmaFormProps } from './types';
import './style.scss'
import { Grid } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import { useIntl } from 'react-intl';
import { Button, Form } from 'react-bootstrap';
import InputField from '../InputField/index';
import DrawIcon from '@mui/icons-material/Draw';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
const SetFirmaForm: React.FC<SetFirmaFormProps> = (props: SetFirmaFormProps) => {
    const intl = useIntl();
    const navigate = useNavigate();
    const [firma, setFirma] = useState<string>('');

    const formik = useFormik({
        initialValues: {
            firma: ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            firma: Yup.string()
                .min(4, intl.formatMessage({ id: "input_validation_min_4" }))
                .max(25, intl.formatMessage({ id: "input_validation_max_25" })),
        })
    });
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid
                    item
                    xs={12}
                    className="bordersContainers"
                    style={props?.darkMode
                        ? {
                            backgroundColor: "#1f283e",
                            padding: "10px",
                        }
                        : { backgroundColor: "#fff", padding: "10px"}}
                >
                    <FormikProvider value={formik}>
                        <Form.Group className="mb-3 ">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={firma || ""}
                                        name="firma"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("firma", target?.value || "");
                                            setFirma(target?.value);
                                        }}
                                        label={'Clave'}
                                        autoComplete='off'
                                        placeholder={'Ingresa tu clave actual'}
                                        type="password"
                                        id="firma"
                                        formik={formik?.getFieldMeta("firma")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12} style={{textAlign:'center'}}>
                                    <Button
                                        variant="primary"
                                        disabled={
                                            props?.procesando || !formik.dirty || !formik.isValid
                                        }
                                        onClick={(e: any) => {
                                            props?.enAccion({
                                                firma
                                            });
                                        }}
                                    >
                                        <DrawIcon/> {intl.formatMessage({ id: "btn_firmar_documento" })}
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={12} style={{textAlign:'center'}}>
                                    <p style={{color:'#344767'}}>
                                      ¿Aun no cuentas con tu clave o se te olvido?, ingresa en este <strong style={{color:'rgb(251, 140, 0)', cursor:'pointer'}} onClick={()=>{
                                        navigate('/firma-digital')
                                      }}>enlace</strong> para crear una clave o recuperar la anterior
                                    </p>
                                </Grid>
                                <Grid item xs={12} md={12} style={{textAlign:'center'}}>
                                    <Button
                                        variant="outline-primary"
                                        onClick={(e: any) => {
                                            navigate('/')
                                        }}
                                    >
                                       Regresar al inicio <HomeIcon/> 
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

export default SetFirmaForm
