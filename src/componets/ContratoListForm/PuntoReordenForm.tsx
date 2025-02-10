import { Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material'
import env from "react-dotenv";
import InputField from '../../componets/InputField';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl';
import * as Yup from "yup";
import { Button } from 'react-bootstrap';

interface PuntoReordenFormProps {
    enAccion: (data: any) => void
    reorden:any
}

const PuntoReordenForm: React.FC<PuntoReordenFormProps> = (props: PuntoReordenFormProps) => {
    const intl = useIntl();
    const [punto, setPunto] = useState<string>('');
    const formik = useFormik({
        initialValues: {
            "punto": ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            punto: Yup.string()
                .max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' }))
                .matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' }))
                .required(intl.formatMessage({ id: 'input_validation_requerido' })),
        }),
    });

    const validate = async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
        } else {
            formik.setTouched(setNestedObjectValues<FormikTouched<any>>(errors, true));
        }
    }

    useEffect(()=>{
        formik.setFieldValue("punto", props?.reorden+'');
        setPunto(props?.reorden+'');
        validate(); 
    },[])
    
    return (
        <Grid container style={{ width: '100%', padding: '28px', borderRadius: 5 }}>
            <Grid item xs={12} md={12}>
                <FormikProvider value={formik}>
                    <Grid container >

                        <Grid item xs={12} md={11}>
                            <InputField
                                required
                                value={punto || ""}
                                name="punto"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("punto", target?.value || "");
                                    setPunto(target?.value);
                                }}
                                label={intl.formatMessage({ id: "input_punto_reorden" })}
                                placeholder={intl.formatMessage({ id: "input_punto_reorden_descripcion" })}
                                type="text"
                                id="punto"
                                formik={formik?.getFieldMeta("punto")}
                            />
                            <br />
                        </Grid>

                        <Grid item xs={12} md={1}>

                            <Button
                                style={{position:'relative', top:35}}
                                variant="primary"
                                disabled={
                                    !formik.dirty || !formik.isValid
                                }
                                onClick={(e: any) => {
                                    props?.enAccion(
                                        {

                                            punto
                                        }
                                    );
                                }}
                            >
                                {intl.formatMessage({ id: "general_guardar" })}
                            </Button>
                        </Grid>
                    </Grid>
                </FormikProvider>




            </Grid>
        </Grid>
    )
}

export default PuntoReordenForm
