import { useMaterialUIController } from 'context';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl';
import * as Yup from "yup";
import { EdicionEstatusEstimacionFormProps } from './types';
import _ from 'lodash';
import { Grid } from '@mui/material';
import { Button, Form } from 'react-bootstrap';
import InputField from '../../componets/InputField';
import CampoSwitch from '../../componets/CampoSwitch';

const EdicionEstatusEstimacionForm: React.FC<EdicionEstatusEstimacionFormProps> = (props: EdicionEstatusEstimacionFormProps) => {
    const intl = useIntl();
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    const [fecha_pago, setFecha_pago] = useState('');
    const [contabilizado, setContabilizado] = useState(false);
    const [pagado, setPagado] = useState(false);
    const [pendiente_contabilizar, setPendiente_contabilizar] = useState(false);

    const formik = useFormik({
        initialValues: {
            "fecha_pago": ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            fecha_pago: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(150, intl.formatMessage({ id: 'input_validation_max_150' })).required(intl.formatMessage({ id: 'input_validation_requerido' }))
        }),
    });

    const validate = async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
        } else {
            formik.setTouched(setNestedObjectValues<FormikTouched<any>>(errors, true));
        }
    }

    useEffect(() => {
        if (props?.item && props?.item?.fecha_pago) {
            if(props?.item?.fecha_pago === "0000-00-00"){
                formik.setFieldValue("fecha_pago", (new Date()).toISOString().split('T')[0]);
                setFecha_pago(props?.item?.fecha_pago);
            }else{
                formik.setFieldValue("fecha_pago", (new Date(props?.item?.fecha_pago || "")).toISOString().split('T')[0]);
                setFecha_pago(props?.item?.fecha_pago);
            }
            
        }
        
            setContabilizado(props?.item?.contabilizado === 1 ? true : false);
            setPagado(props?.item?.pagado === 1 ? true : false);
            setPendiente_contabilizar(props?.item?.pendiente_contabilizar === 1 ? true : false);
        if (!_.isEmpty(props?.item)) {
            validate();
        }
    }, [props?.item]);



    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid item xs={12} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '10px' } : { backgroundColor: '#fff', padding: '10px' }}>
                    <FormikProvider value={formik}>
                        <Form.Group className="mb-3 ">
                            <Grid container spacing={2}>

                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={fecha_pago || ''}
                                        name="fecha_pago"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("fecha_pago", target?.value || '');
                                            setFecha_pago(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_fecha_pago' })}
                                        type="date"
                                        id="fecha_pago"
                                        formik={formik?.getFieldMeta('fecha_pago')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={3} >
                                    <CampoSwitch
                                        key={"contabilizado"}
                                        label={intl.formatMessage({ id: 'input_contabilizado' })}
                                        value={contabilizado}
                                        onAction={(v: any) => setContabilizado(v)}
                                    />

                                    <br />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <CampoSwitch
                                        key={"pagado"}
                                        label={intl.formatMessage({ id: 'input_pagado' })}
                                        value={pagado}
                                        onAction={(v: any) => setPagado(v)}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <CampoSwitch
                                        key={"pendiente_contabilizar"}
                                        label={intl.formatMessage({ id: 'input_pendiente_contabilizar' })}
                                        value={pendiente_contabilizar}
                                        onAction={(v: any) => setPendiente_contabilizar(v)}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Button
                                        variant="primary"
                                        disabled={props?.procesando || !formik.dirty || !formik.isValid}
                                        onClick={(e: any) => {
                                            props?.onAction({
                                                fecha_pago,
                                                contabilizado: contabilizado ? 1 : 0,
                                                pagado: pagado ? 1 : 0,
                                                pendiente_contabilizar: pendiente_contabilizar ? 1 : 0
                                            });
                                        }}
                                    >
                                        {intl.formatMessage({ id: 'general_actualizar' })}
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

export default EdicionEstatusEstimacionForm
