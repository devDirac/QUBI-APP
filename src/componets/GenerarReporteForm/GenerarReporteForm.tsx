import React, { useEffect, useState } from 'react'
import { GenerarReporteFormProps } from './types'
import * as Yup from "yup";
import { Chip, Grid } from '@mui/material';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import { useIntl } from 'react-intl';
import { Button, Form } from 'react-bootstrap';
import InputField from '../../componets/InputField';
import moment from 'moment';
import SelectField from '../SelectField/index';
import { getParameterValues } from '../../utils/index';
import { useSelector } from 'react-redux';

const GenerarReporteForm: React.FC<GenerarReporteFormProps> = (props: GenerarReporteFormProps) => {
    const intl = useIntl();
    const [tipoReporte, setTipoReporte] = useState('');
    const [fechaInicio, setFechaInicio] = useState<string>(moment(new Date()).subtract(1, 'months').format('YYYY-MM-DD'));
    const [fechaFin, setFechaFin] = useState<string>(moment(new Date()).format('YYYY-MM-DD'));
    const [palabrasClave, setPalabrasClave] = useState<string>('');
    const [items, setItems] = useState<any>([]);
    const user: any = useSelector((state: any) => state?.app?.user?.data?.id || false);

    const formik = useFormik({
        initialValues: {
            "palabrasClave": '',
            "tipoReporte": '',
            "fechaInicio": moment(new Date()).subtract(1, 'months').format('YYYY-MM-DD'),
            "fechaFin": moment(new Date()).format('YYYY-MM-DD')
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            palabrasClave: Yup.string(),
            tipoReporte: Yup.string(),
            fechaInicio: Yup.string(),
            fechaFin: Yup.string(),
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
        formik.setFieldValue("fechaInicio", moment(new Date()).format('YYYY-MM-DD'));
        setFechaInicio(moment(new Date()).format('YYYY-MM-DD'));
        formik.setFieldValue("fechaFin", moment(new Date()).format('YYYY-MM-DD'));
        setFechaFin(moment(new Date()).format('YYYY-MM-DD'));
        validate();
    }, []);

    const handleKeyPress = (event: any) => {
        try {
            if (event.key === 'Enter' && palabrasClave.trim() !== '') {
                const existe = items.find((d: any) => d === palabrasClave)
                if (existe) {
                    return false;
                }
                setItems([...items, palabrasClave]);
                formik.setFieldValue("palabrasClave", "");
                setPalabrasClave("");
            }
        } catch (error) {
            console.error('Error al agregar el elemento al arreglo:', error);
        }
    };

    const handleDelete = (indexToDelete: any) => {
        const updatedItems = items.filter((_: any, index: any) => index !== indexToDelete);
        setItems(updatedItems);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormikProvider value={formik}>
                    <Form.Group className="mb-3 ">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4} style={{ textAlign: 'left' }}>
                                <SelectField
                                    label={intl.formatMessage({
                                        id: "input_tipoReporte",
                                    })}
                                    value={tipoReporte}
                                    options={[{ label: 'Voz', value: 'Voz' }, { label: 'Imagen', value: 'Imagen' }]}
                                    name="tipoReporte"
                                    id="tipoReporte"
                                    required
                                    onInput={(e: any) => {
                                        const target = e.target as HTMLTextAreaElement;
                                        formik.setFieldValue("tipoReporte", target?.value || "");
                                        setTipoReporte(target?.value);
                                    }}
                                    formik={formik?.getFieldMeta("tipoReporte")}
                                />
                                <br />
                            </Grid>
                            <Grid item xs={12} md={4} style={{ textAlign: 'left' }}>
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
                            <Grid item xs={12} md={4} style={{ textAlign: 'left' }}>
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


                            <Grid item xs={12} md={12} style={{ textAlign: 'left' }}>
                                <InputField
                                    required
                                    value={palabrasClave || ""}
                                    name="palabrasClave"
                                    onInput={(e: any) => {
                                        const target = e.target as HTMLTextAreaElement;
                                        formik.setFieldValue("palabrasClave", target?.value || "");
                                        setPalabrasClave(target?.value);
                                    }}
                                    onKeyPress={handleKeyPress}
                                    label={intl.formatMessage({ id: "input_palabras_clave" })}
                                    placeholder={intl.formatMessage({ id: "input_palabras_clave_descripcion" })}
                                    type="text"
                                    id="palabrasClave"
                                    formik={formik?.getFieldMeta("palabrasClave")}
                                />
                                <br />
                            </Grid>

                            <Grid item xs={12} md={12}>
                                {items.map((item: any, index: any) => (
                                    <Chip key={index} label={item} onDelete={() => handleDelete(index)} style={{ margin: 5 }} />
                                ))}
                            </Grid>

                            <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
                                <Button
                                    variant="primary"
                                    disabled={
                                        props?.procesando
                                    }
                                    onClick={(e: any) => {
                                        props?.enAccion({
                                            tipoReporte,
                                            fechaInicio,
                                            fechaFin,
                                            items,
                                            user
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

export default GenerarReporteForm
