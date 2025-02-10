import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { Grid } from '@mui/material';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import { useIntl } from 'react-intl';
import { Button, Form } from 'react-bootstrap';
import InputField from '../../componets/InputField';
import SelectField from '../../componets/SelectField';
import { FiltrosNewDashboardBitacoraEstimacionesProps } from './types';

const FiltrosNewDashboardBitacoraEstimaciones: React.FC<FiltrosNewDashboardBitacoraEstimacionesProps> = (props: FiltrosNewDashboardBitacoraEstimacionesProps) => {
    const intl = useIntl();
    const [fechaInicio, setFechaInicio] = useState<string>(props?.fecha_ini ? props?.fecha_ini : '');
    const [fechaFin, setFechaFin] = useState<string>(props?.fecha_fin ? props?.fecha_fin : '');
    const [concepto, setConcepto] = useState<string>('2');
    const [estatus, setEstatus] = useState<string>('3');
    const [contratista, setContratista] = useState<string>('');
    const formik = useFormik({
        initialValues: {
            "fechaInicio": props?.fecha_ini ? props?.fecha_ini : '',
            "fechaFin": props?.fecha_fin ? props?.fecha_fin : '',
            "concepto": '2',
            "estatus": '3',
            "contratista": ''
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            fechaInicio: Yup.string(),
            fechaFin: Yup.string(),
            concepto: Yup.string(),
            estatus: Yup.string(),
            contratista: Yup.string(),
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
        formik.setFieldValue("fechaInicio", props?.fecha_ini ? props?.fecha_ini : '');
        setFechaInicio(props?.fecha_ini ? props?.fecha_ini : '');
        formik.setFieldValue("fechaFin", props?.fecha_fin ? props?.fecha_fin : '');
        setFechaFin(props?.fecha_fin ? props?.fecha_fin : '');
        formik.setFieldValue("concepto", props?.esConsultaEstimaciones ? '1' : '2');
        setConcepto(props?.esConsultaEstimaciones ? '1' : '2');
        formik.setFieldValue("estatus", '3');
        setEstatus('3');
        props?.enAccion({
            fechaInicio:props?.fecha_ini ? props?.fecha_ini : '',
            fechaFin:props?.fecha_fin ? props?.fecha_fin : '',
            concepto:'2',
            estatus:'3',
            contratista:'0'
        })
        validate();
    }, []);


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormikProvider value={formik}>
                    <Form.Group className="mb-3 ">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={props?.esConsultaEstimaciones ? 3 : 4}>
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
                            <Grid item xs={12} md={props?.esConsultaEstimaciones ? 3 : 4}>
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
                            <Grid item xs={12} md={props?.esConsultaEstimaciones ? 3 : 4}>
                                <SelectField
                                    label={intl.formatMessage({ id: 'input_consulta_estimaciones_por' })}
                                    value={concepto}
                                    options={props?.esConsultaEstimaciones ? [{ label: 'Fecha de elaboración', value: '1' }, { label: 'Periodo de estimación', value: '2' }] : [{ label: 'Fecha de pago', value: '1' }, { label: 'Fecha de elaboración', value: '2' }, { label: 'Fecha de contabilización', value: '4' }]}
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
                            {!props?.esConsultaEstimaciones ? <Grid item xs={12} md={4}>
                                <SelectField
                                    label={intl.formatMessage({ id: 'input_estatus_estimacion' })}
                                    value={estatus}
                                    options={[{ label: 'Pagadas', value: '0' }, { label: 'En proceso', value: '1' }, { label: 'Contabilizadas', value: '2' }, { label: 'Todas', value: '3' },]}
                                    name="estatus"
                                    id="estatus"
                                    onInput={(e: any) => {
                                        const target = e.target as HTMLTextAreaElement;
                                        formik.setFieldValue("estatus", target?.value || '');
                                        setEstatus(target?.value);
                                    }}
                                    formik={formik?.getFieldMeta('estatus')}
                                />
                            </Grid> : null}
                            {!props?.esConsultaEstimaciones ? <Grid item xs={12} md={4}>
                                <SelectField
                                    label={intl.formatMessage({ id: 'input_contratista' })}
                                    value={contratista}
                                    options={(props?.contratistas || []).map((r: any) => {
                                        return {
                                            label: r?.contratista,
                                            value: r?.contratista
                                        }
                                    })}
                                    name="contratista"
                                    id="contratista"
                                    onInput={(e: any) => {
                                        const target = e.target as HTMLTextAreaElement;
                                        formik.setFieldValue("contratista", target?.value || '');
                                        setContratista(target?.value);
                                    }}
                                    formik={formik?.getFieldMeta('contratista')}
                                />
                            </Grid> : null}
                            <Grid item xs={12} md={props?.esConsultaEstimaciones ? 3 : 4} >
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
                                            concepto,
                                            estatus,
                                            contratista
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

export default FiltrosNewDashboardBitacoraEstimaciones
