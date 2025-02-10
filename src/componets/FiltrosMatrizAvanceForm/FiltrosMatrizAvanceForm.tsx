import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { Grid } from '@mui/material';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import { useIntl } from 'react-intl';
import { Button, Form } from 'react-bootstrap';
import InputField from '../../componets/InputField';
import './style.scss';
import { FiltrosMatrizAvanceFormProps } from './types';
import SelectField from '../../componets/SelectField';

const FiltrosMatrizAvanceForm: React.FC<FiltrosMatrizAvanceFormProps> = (props: FiltrosMatrizAvanceFormProps) => {
    const intl = useIntl();
    const [fechaInicio, setFechaInicio] = useState<string>('');
    const [fechaFin, setFechaFin] = useState<string>('');
    const [concepto, setConcepto] = useState<string>('');
    const formik = useFormik({
        initialValues: {
            "fechaInicio": '',
            "fechaFin": '',
            "concepto": ''
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            fechaInicio: Yup.string(),
            fechaFin: Yup.string(),
            concepto: Yup.string(),
        }),
    });

    const validate = async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length !== 0) {
            formik.setTouched(
                setNestedObjectValues<FormikTouched<any>>(errors, true)
            );
        }
    };

    useEffect(() => {
        validate();
    }, []);


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormikProvider value={formik}>
                    <Form.Group className="mb-3 ">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
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
                            <Grid item xs={12} md={6}>
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
                            <Grid item xs={12} md={6}>
                                <SelectField
                                    label={intl.formatMessage({ id: 'input_concepto' })}
                                    value={concepto}
                                    options={props?.conceptos.map((e: any) => {
                                        return {
                                            label: (e?.concepto || '') + ' - ' + (e?.descripcion || '').substring(0, 100) + '...',
                                            value: e?.id
                                        }
                                    })}
                                    name="concepto"
                                    id="concepto"
                                    onInput={(e: any) => {
                                        const target = e.target as HTMLTextAreaElement;
                                        formik.setFieldValue("concepto", target?.value || '');
                                        setConcepto(target?.value);
                                    }}
                                    formik={formik?.getFieldMeta('concepto')}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <Button
                                    style={{ position: 'relative', top: '38px' }}
                                    variant="primary"
                                    disabled={
                                        props?.procesando
                                    }
                                    onClick={(e: any) => {
                                        props?.enAccion({
                                            fechaInicio,
                                            fechaFin,
                                            concepto
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

export default FiltrosMatrizAvanceForm
