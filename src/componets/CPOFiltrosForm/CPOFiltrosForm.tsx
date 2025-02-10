import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { Grid } from '@mui/material';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import { useIntl } from 'react-intl';
import { Button, Form } from 'react-bootstrap';
import InputField from '../../componets/InputField';
import './style.scss';
import { CPOFiltrosFormProps } from './types';
import SelectField from '../../componets/SelectField';
import moment from 'moment';

const CPOFiltrosForm: React.FC<CPOFiltrosFormProps> = (props: CPOFiltrosFormProps) => {
    const intl = useIntl();
    const [fecha, setFecha] = useState<string>('');
    const [anio, setAnio] = useState<any>([
        { label: moment().subtract(2, 'years').year() + '', value: moment().subtract(2, 'years').year() + '' },
        { label: moment().subtract(1, 'years').year() + '', value: moment().subtract(1, 'years').year() + '' },
        { label: moment().year() + '', value: moment().year() + '' },
        { label: moment().add(1, 'years').year() + '', value: moment().add(1, 'years').year() + '' }
    ]);
    const formik = useFormik({
        initialValues: {
            "fecha": ''
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            fecha: Yup.string(),
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
        formik.setFieldValue("fecha", moment().year() + '' || '');
        setFecha(moment().year() + '');
        validate();
    }, []);


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormikProvider value={formik}>
                    <Form.Group className="mb-3 ">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <SelectField
                                    label={intl.formatMessage({ id: 'input_ano_seleccion' })}
                                    value={fecha}
                                    options={anio}
                                    name="fecha"
                                    id="fecha"
                                    onInput={(e: any) => {
                                        const target = e.target as HTMLTextAreaElement;
                                        formik.setFieldValue("fecha", target?.value || '');
                                        setFecha(target?.value);
                                    }}
                                    formik={formik?.getFieldMeta('fecha')}
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
                                            fecha
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

export default CPOFiltrosForm
