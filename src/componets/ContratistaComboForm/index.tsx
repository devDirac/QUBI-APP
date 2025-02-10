import { Grid } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react'
import { useIntl } from 'react-intl';
import * as Yup from "yup";
import { ContratistaComboFormProps } from './types';
import { Button, Form } from 'react-bootstrap';
import SelectField from '../../componets/SelectField';

const ContratistaComboForm: React.FC<ContratistaComboFormProps> = (props: ContratistaComboFormProps) => {

    const intl = useIntl();

    const [contratista, setContratista] = useState<string>('');
    const formik = useFormik({
        initialValues: {
            contratista: ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            firma: Yup.string()
        }),
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>

                <Grid
                    item
                    xs={12}
                    className="bordersContainers"
                    style={
                        props?.darkMode
                            ? {
                                backgroundColor: "#1f283e",
                                padding: "10px"
                            }
                            : { backgroundColor: "#fff", padding: "10px" }
                    }
                >
                    <FormikProvider value={formik}>
                        <Form.Group className="mb-3 ">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_contratista' })}
                                        value={contratista}
                                        options={props?.contratista.map((as: any) => {
                                            return {
                                                label: as?.contratista,
                                                value: as?.id
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

                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <Button
                                        variant="primary"
                                        disabled={
                                            props?.procesando || !formik.dirty || !formik.isValid
                                        }
                                        onClick={(e: any) => {
                                            props?.enAccion({ contratista });
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
        </Grid>
    )
}

export default ContratistaComboForm
