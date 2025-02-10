import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import type { FiltrosFechasProps } from './types'
import { Grid } from '@mui/material';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import { useIntl } from 'react-intl';
import { Button, Form } from 'react-bootstrap';
import InputField from '../../componets/InputField';
import moment from 'moment';

const FiltrosFechasForm: React.FC<FiltrosFechasProps> = (props: FiltrosFechasProps) => {
    const intl = useIntl();
    const [fechaInicio, setFechaInicio] = useState<string>(props?.fecha_ini ? props?.fecha_ini : moment(new Date()).subtract(1, 'months').format('YYYY-MM-DD'));
    const [fechaFin, setFechaFin] = useState<string>(props?.fecha_fin ? props?.fecha_fin :  moment(new Date()).format('YYYY-MM-DD'));
    const formik = useFormik({
        initialValues: {
            "fechaInicio": props?.fecha_ini ? props?.fecha_ini : moment(new Date()).subtract(1, 'months').format('YYYY-MM-DD'),
            "fechaFin": props?.fecha_fin ? props?.fecha_fin : moment(new Date()).format('YYYY-MM-DD')
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            fechaInicio: Yup.string().required(intl.formatMessage({ id: "input_validation_requerido" })),
            fechaFin: Yup.string().required(intl.formatMessage({ id: "input_validation_requerido" })),
        }),
    });

    const validate = async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
        } else {
            formik.setTouched(
                setNestedObjectValues<FormikTouched<any>>(errors, true)
            );
        }
    };

    useEffect(() => {
        formik.setFieldValue("fechaInicio", props?.fecha_ini ? props?.fecha_ini :  moment(new Date()).subtract(1, 'months').format('YYYY-MM-DD'));
        setFechaInicio(props?.fecha_ini ? props?.fecha_ini :  moment(new Date()).subtract(1, 'months').format('YYYY-MM-DD'));
        formik.setFieldValue("fechaFin", props?.fecha_fin ? props?.fecha_fin :   moment(new Date()).format('YYYY-MM-DD'));
        setFechaFin(props?.fecha_fin ? props?.fecha_fin :   moment(new Date()).format('YYYY-MM-DD'));
        validate();
    }, []);


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormikProvider value={formik}>
                    <Form.Group className="mb-3 ">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={5}>
                                <InputField
                                    required
                                    value={fechaInicio || ""}
                                    name="fechaInicio"
                                    onInput={(e: any) => {
                                        const target = e.target as HTMLTextAreaElement;
                                        formik.setFieldValue("fechaInicio", target?.value || "");
                                        setFechaInicio(target?.value);
                                    }}
                                    label={intl.formatMessage({ id: "input_fecha_inicio" })}
                                    type="date"
                                    id="fechaInicio"
                                    formik={formik?.getFieldMeta("fechaInicio")}
                                />
                                <br />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <InputField
                                    required
                                    value={fechaFin || ""}
                                    name="fechaFin"
                                    onInput={(e: any) => {
                                        const target = e.target as HTMLTextAreaElement;
                                        formik.setFieldValue("fechaFin", target?.value || "");
                                        setFechaFin(target?.value);
                                    }}
                                    label={intl.formatMessage({ id: "input_fecha_final" })}
                                    type="date"
                                    id="fechaFin"
                                    formik={formik?.getFieldMeta("fechaFin")}
                                />
                                <br />
                            </Grid>

                            <Grid item xs={12} md={2} style={{ textAlign: 'left' }}>
                                <Button
                                    variant="primary"
                                    size='sm'
                                    style={{position:'relative', top:35, width:'100%'}}
                                    disabled={
                                        props?.procesando 
                                    }
                                    onClick={(e: any) => {
                                        props?.enAccion({
                                            fechaInicio,
                                            fechaFin
                                        });
                                    }}
                                >
                                    {intl.formatMessage({ id: "general_buscar" })}
                                </Button>
                            </Grid>
                        </Grid>
                    </Form.Group>
                </FormikProvider>
            </Grid>
        </Grid>
    )
}

export default FiltrosFechasForm
