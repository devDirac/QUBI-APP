import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import * as Yup from "yup";
import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material';
import { Button, Form } from 'react-bootstrap';
import SelectMultipleField from '../SelectMultipleField/SelectMultipleField';
import { useIntl } from 'react-intl';
import SelectMultipleAutoCompleteField from '../SelectMultipleAutoCompleteField/SelectMultipleAutoCompleteField';

export interface InfoWindowMarkProps {
    procesando: boolean
    enAccion: (data: any) => void
    contrato: any[]
    contratoActual?: number
    selectedGeofence: number
    area:any
    item:any
}


const InfoWindowMark = (props: InfoWindowMarkProps) => {
    const intl = useIntl();

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
            formik.setFieldValue("contrato", [props?.contratoActual]);
            setContrato([props?.contratoActual]);
            validate();
        }
    }, [props?.contratoActual]);

    useEffect(() => {
        if (props?.contratoActual && contrato.length) {
            props?.enAccion({
                contrato
            });
        }
    }, [contrato])


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormikProvider value={formik}>
                    <Form.Group className="mb-3 ">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} style={{ textAlign: 'left' }}>
                                <h4>Geocerca # {props?.selectedGeofence}</h4>
                                <p>Área: {props?.area} km²</p>
                            </Grid>
                            <Grid item xs={12} md={12} style={{ textAlign: 'left' }}>
                                <SelectMultipleAutoCompleteField
                                    label={intl.formatMessage({
                                        id: "input_contrato",
                                    })}
                                    defaultValue={[]}
                                    options={props?.contrato.map((e: any) => {
                                        return {
                                            label: e?.contrato,
                                            value: e?.id
                                        }
                                    })}
                                    name="contrato"
                                    id="contrato"
                                    required
                                    onInput={(e: any) => {
                                        /* const target: any = e.target as HTMLTextAreaElement; */
                                        formik.setFieldValue("contrato", /* target?.value || [] */e);
                                        setContrato(/* target?.value */e);
                                    }}
                                    formik={formik?.getFieldMeta("contrato")}
                                />
                            </Grid>

                            <Grid item xs={12} md={12} >
                                <br></br>
                                <br></br>
                                <Button
                                    variant="primary"
                                    onClick={(e: any) => {
                                        props?.enAccion({
                                            contrato:contrato.map((r: any) => r?.value),
                                            item:props?.item
                                        });
                                    }}
                                >
                                    {intl.formatMessage({ id: "general_guardar" })}
                                </Button>
                            </Grid>
                        </Grid>
                    </Form.Group>
                </FormikProvider>
            </Grid>
        </Grid>
    )
}

export default InfoWindowMark
