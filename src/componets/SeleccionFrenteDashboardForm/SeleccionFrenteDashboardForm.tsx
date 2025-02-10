import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import SelectField from '../../componets/SelectField';
import * as Yup from "yup";
import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material';
import { Button, Form } from 'react-bootstrap';
import { useIntl } from 'react-intl';

interface SeleccionFrenteDashboardFormProps {
    enAccion:(data:any)=>void
    frentes:any
}

const SeleccionFrenteDashboardForm:React.FC<SeleccionFrenteDashboardFormProps> = (props:SeleccionFrenteDashboardFormProps) => {
    const intl = useIntl();
    const [frente, setFrente] = useState<any>('');
    const formik = useFormik({
        initialValues: {
            "frente": ''
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            frente: Yup.string(),
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
        /* formik.setFieldValue("frente", moment().year() + '' || '');
        setFecha(moment().year() + '');
        validate(); */
    }, []);
    
  return (
    <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormikProvider value={formik}>
                    <Form.Group className="mb-3 ">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <SelectField
                                    label={intl.formatMessage({ id: 'input_frente' })}
                                    value={frente}
                                    options={props?.frentes}
                                    name="frentes"
                                    id="frentes"
                                    onInput={(e: any) => {
                                        const target = e.target as HTMLTextAreaElement;
                                        formik.setFieldValue("frentes", target?.value || '');
                                        setFrente(target?.value);
                                        props?.enAccion({
                                            frente:target?.value
                                        });
                                    }}
                                    formik={formik?.getFieldMeta('frentes')}
                                />
                            </Grid>
                        </Grid>
                    </Form.Group>
                </FormikProvider>
            </Grid>
        </Grid>
  )
}

export default SeleccionFrenteDashboardForm
