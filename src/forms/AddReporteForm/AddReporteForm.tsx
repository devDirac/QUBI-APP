import React, { useCallback, useContext, useEffect, useState } from 'react';
import env from "react-dotenv";
import { Backdrop, Button, CircularProgress, Divider, Grid, styled } from '@mui/material';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import InputField from '../../componets/InputField';
import SelectField from '../../componets/SelectField';
import CampoAvatar from '../../componets/CampoAvatar/CampoAvatar';
import _ from 'lodash';
import ModalComponent from '../../componets/Modal';
import CampoAutoCompleteCoordenadas from '../../componets/CampoAutoCompleteCoordenadas';
import { GoogleMap, Marker } from '@react-google-maps/api';
import * as Yup from "yup";
import { useIntl } from 'react-intl';
import DragAndDropField from '../../componets/DragAndDropField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import moment from 'moment';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});



const AddReporteForm: React.FC<any> = (props: any) => {

    const intl = useIntl();
    const [fecha_ejecucion, setFecha_ejecucion] = useState<string>(moment(new Date()).format('DD/MM/YYYY'));
    const [titulo, setTitulo] = useState('');
    const [file, setFile] = useState('');
    const [filex, setFilex] = useState('');

    const formik = useFormik({
        initialValues: {
            "fecha_ejecucion": (new Date()).toISOString().split('T')[0],
            titulo: ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            fecha_ejecucion: Yup.string().required(intl.formatMessage({ id: "input_validation_requerido" })).test(
                "olderThanToday",
                'La fecha de ejecución no puede ser mayor a la fecha de hoy',
                (value) => {
                    const date1 = moment().startOf("day");
                    const date2 = moment(value);
                    return !date1?.isValid || fecha_ejecucion === ""
                        ? true
                        : !date2.isAfter(date1);
                }
            ),
            titulo: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' }))
        }),
    });

    const saveImages = async (file_: any) => {
        console.log(file_?.[0])
        setFile(file_?.[0]);
        setFilex(file_?.[0]?.name)
    };

    return (
        <div>
            <FormikProvider value={formik}>
                <Form.Group style={{ width: '100%' }}>
                    <Grid container spacing={2} mt={5}>
                        <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
                            <h5 style={{ color: 'rgb(40, 51, 74)' }}>Carga de información de la misión</h5>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <InputField
                                required
                                value={fecha_ejecucion || ""}
                                name="fecha_ejecucion"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("fecha_ejecucion", target?.value || "");
                                    setFecha_ejecucion(target?.value);
                                }}
                                label={intl.formatMessage({ id: "input_fecha_ejecucion" })}
                                placeholder={intl.formatMessage({ id: "input_fecha_ejecucion_descripcion" })}
                                type="date"
                                id="fecha_ejecucion"
                                formik={formik?.getFieldMeta("fecha_ejecucion")}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <InputField
                                required
                                value={titulo || ''}
                                name="titulo"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("obra", target?.value || '');
                                    setTitulo(target?.value);
                                }}
                                label={'Descripción de la misión'}
                                placeholder={'Ingrese una pequeña descripción de la misión'}
                                type="text"
                                id="titulo"
                                formik={formik?.getFieldMeta('titulo')}
                            />
                            <br />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            {/* <DragAndDropField multiple={false} muestraBoton={false} onAction={(files) => saveImages(files)} acepted={{ "zip": [], "rar": [] }} /> */}
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                style={{ color: '#fff', width: '100%' }}
                            >
                                Selecciona el archivo zip
                                <VisuallyHiddenInput
                                    type="file"
                                    accept=".zip,.rar"
                                    onChange={(event) => saveImages(event.target.files)}
                                />
                            </Button>
                        </Grid>
                        <br></br>
                        <br></br>
                        <Grid
                            item
                            xs={12}
                            style={{ padding: "5px", marginTop: 15, paddingTop: "0", paddingBottom: "0", textAlign: 'right' }}
                        >
                            <Button
                                variant="contained"
                                style={{ color: '#fff' }}
                                disabled={!formik.dirty || !formik.isValid || _.isEmpty(filex)}
                                onClick={(e) => { props?.action({ fecha_ejecucion, titulo, file }); }}
                            >
                                {intl.formatMessage({ id: 'general_guardar' })}
                            </Button>
                        </Grid>
                    </Grid>
                </Form.Group>
            </FormikProvider>
        </div>
    )
}

export default AddReporteForm
