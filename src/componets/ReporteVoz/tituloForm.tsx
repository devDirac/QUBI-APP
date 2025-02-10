import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import React from 'react'
import { Form } from 'react-bootstrap';
import { FormikTouched, setNestedObjectValues, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import * as Yup from "yup";
import _ from "lodash";
import { useSelector } from "react-redux";
import { StoreType } from "../../types/geericTypes";
import SelectField from '../SelectField/index';
import { tituloFormProps } from './types';
import InputField from '../InputField/index';



const TituloForm: React.FC<tituloFormProps> = (props: tituloFormProps) => {

    const intl = useIntl();

    const [titulo, setTitulo] = useState<string>('');


    const formik = useFormik({
        initialValues: {
            titulo: ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            titulo: Yup.string()
        }),
    });

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid
                    item
                    xs={12}
                    className="bordersContainers"
                    style={
                        props?.darkMode
                            ? {
                                backgroundColor: "#1f283e",
                            }
                            : { backgroundColor: "#fff" }
                    }
                >
                    <FormikProvider value={formik}>
                        <Form.Group >
                            <Grid container >
                                <Grid item xs={12} md={12} style={{textAlign:'left'}}>
                                    <InputField
                                        required
                                        value={titulo || ""}
                                        name="titulo"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("titulo", target?.value || "");
                                            setTitulo(target?.value);
                                            props?.enAccion(target?.value)
                                        }}
                                        label={intl.formatMessage({ id: "input_titulo" })}
                                        type="text"
                                        id="titulo"
                                        formik={formik?.getFieldMeta("titulo")}
                                    />
                                    <br />
                                </Grid>
                            </Grid>
                        </Form.Group>
                    </FormikProvider>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default TituloForm
