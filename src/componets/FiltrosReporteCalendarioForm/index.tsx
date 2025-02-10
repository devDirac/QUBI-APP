import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { Grid } from '@mui/material';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import { useIntl } from 'react-intl';
import { Button, Form } from 'react-bootstrap';
import './style.scss';
import { FiltrosReporteCalendarioFormProps } from './types';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SelectMultipleAutoCompleteField from '../SelectMultipleAutoCompleteField/SelectMultipleAutoCompleteField';

const FiltrosReporteCalendarioForm: React.FC<FiltrosReporteCalendarioFormProps> = (props: FiltrosReporteCalendarioFormProps) => {
    const intl = useIntl();

    const [avances_fecha_ejecucion, setAvances_fecha_ejecucion] = useState(true);
    const [avances_fecha_captura, setAvances_fecha_captura] = useState(true);
    const [estimaciones, setEstimaciones] = useState(true);
    const [actividadesProgramadas, setActividadesProgramadas] = useState(true);

    const [contrato, setContrato] = useState<any>([]);
    const formik = useFormik({
        initialValues: {
            "contrato": []
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            //contrato: Yup.array()//.min(1, intl.formatMessage({ id: "input_validation_requerido" })).required(intl.formatMessage({ id: "input_validation_requerido" }))
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
        if (props?.contratoActual && props?.contratoActual !== 0) {
            formik.setFieldValue("contrato", (props?.contrato || []).filter((r: any) => r?.id === props?.contratoActual).map((e: any) => {
                return {
                    label: e?.contrato,
                    value: e?.id
                }
            }));
            setContrato((props?.contrato || []).filter((r: any) => r?.id === props?.contratoActual).map((e: any) => {
                return {
                    label: e?.contrato,
                    value: e?.id
                }
            }));
            validate();
        }
    }, [props?.contratoActual, props?.contrato]);

    useEffect(() => {
         if(props?.contratoActual  && contrato.length){
             props?.enAccion({
                contrato: contrato.map((r: any) => r?.value),
                 avances_fecha_ejecucion,
                 avances_fecha_captura,
                 estimaciones,
                 actividadesProgramadas
             });
         }
    }, [contrato])
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormikProvider value={formik}>
                    <Form.Group className="mb-3 ">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} style={{ textAlign: 'left' }}>
                                <SelectMultipleAutoCompleteField
                                    label={intl.formatMessage({
                                        id: "input_contrato",
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
                                    required
                                    placeholder='Seleccione los contratos'
                                    onInput={(e: any) => {
                                        formik.setFieldValue("contrato", e);
                                        setContrato(e);
                                    }}
                                    formik={formik?.getFieldMeta("contrato")}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid container spacing={2} >
                                    <Grid item xs={12} md={6} >
                                        <FormGroup style={{ width: '100%', border: 'solid 3px #7d9bff', borderRadius: 5, textAlign: 'left', paddingLeft: 10, }}>
                                            <FormControlLabel key={'avances_fecha_ejecucion'} control={
                                                <Checkbox
                                                    key={'avances_fecha_ejecucion_'}
                                                    defaultChecked={avances_fecha_ejecucion}
                                                    value={avances_fecha_ejecucion} onChange={() => {
                                                        setAvances_fecha_ejecucion(!avances_fecha_ejecucion)
                                                    }} />} label="Avances por fecha de ejecución" />
                                        </FormGroup>
                                    </Grid>
                                    <Grid item xs={12} md={6} >
                                        <FormGroup style={{ width: '100%', border: 'solid 3px #6eb0e6', borderRadius: 5, textAlign: 'left', paddingLeft: 10 }}>
                                            <FormControlLabel key={'avances_fecha_captura'} control={
                                                <Checkbox key={'avances_fecha_captura_'}
                                                    defaultChecked={avances_fecha_captura}
                                                    value={avances_fecha_captura} onChange={() => {
                                                        setAvances_fecha_captura(!avances_fecha_captura)
                                                    }} />} label="Avances por fecha de captura" />
                                        </FormGroup>
                                    </Grid>
                                    <Grid item xs={12} md={6} >
                                        <FormGroup style={{ width: '100%', border: 'solid 3px #6bc7bc', borderRadius: 5, textAlign: 'left', paddingLeft: 10 }}>
                                            <FormControlLabel key={'Estimaciones'} control={
                                                <Checkbox key={'Estimaciones_'}
                                                    defaultChecked={estimaciones}
                                                    value={estimaciones} onChange={() => {
                                                        setEstimaciones(!estimaciones)
                                                    }}
                                                />} label="Estimaciones" />
                                        </FormGroup>
                                    </Grid>
                                    <Grid item xs={12} md={6} >
                                        <FormGroup style={{ width: '100%', border: 'solid 3px #e3b766', borderRadius: 5, textAlign: 'left', paddingLeft: 10 }}>
                                            <FormControlLabel key={'Actividades_programadas'} control={
                                                <Checkbox key={'Actividades_programadas_'} defaultChecked={actividadesProgramadas}
                                                    value={actividadesProgramadas} onChange={() => {
                                                        setActividadesProgramadas(!actividadesProgramadas)
                                                    }}
                                                />} label="Actividades programadas" />
                                        </FormGroup>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} >
                                <br></br>
                                <br></br>
                                <Button
                                    variant="primary"
                                    onClick={(e: any) => {
                                        props?.enAccion({
                                            contrato: contrato.map((r: any) => r?.value),
                                            avances_fecha_ejecucion,
                                            avances_fecha_captura,
                                            estimaciones,
                                            actividadesProgramadas
                                        });
                                    }}
                                >
                                    {intl.formatMessage({ id: "general_mostrar" })}
                                </Button>
                            </Grid>
                        </Grid>
                    </Form.Group>
                </FormikProvider>
            </Grid>
        </Grid>
    )
}

export default FiltrosReporteCalendarioForm
