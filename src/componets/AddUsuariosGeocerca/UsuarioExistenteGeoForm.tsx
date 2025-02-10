import { Grid } from '@mui/material'
import * as Yup from "yup";
import { FormikProvider, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useIntl } from 'react-intl';
import { useMaterialUIController } from 'context';
import SelectMultipleAutoCompleteField from '../SelectMultipleAutoCompleteField/SelectMultipleAutoCompleteField';
import _ from 'lodash';
import './style.scss'
import { DatePicker, InputGroup } from 'rsuite';
import { Stack } from 'rsuite';
import { FaCalendar } from 'react-icons/fa';
import moment from 'moment';

interface UsuarioExistenteGeoFormProps {
    proyecto: string
    contrato: any[]
    usuarios: any[]
    onContrato: (data: any[]) => void
    procesando: boolean
    onAccion: (data: any) => void
    esBusqueda?: boolean
}

const UsuarioExistenteGeoForm: React.FC<UsuarioExistenteGeoFormProps> = (props: UsuarioExistenteGeoFormProps) => {
    const intl = useIntl();
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [contrato, setContrato] = useState<any>([]);
    const [usuarios, setUsuarios] = useState<any>([]);

    const [fecha_periodo_1, setFecha_periodo_1] = useState<any>(new Date(moment(new Date()).set({
        hour: 8,
        minute: 0
    }).format('DD-MM-YYYY HH:mm:ss')));

    const [fecha_periodo_2, setFecha_periodo_2] = useState<any>(new Date(moment(new Date()).set({
        hour: 20,
        minute: 0
    }).format('DD-MM-YYYY HH:mm:ss')));

    const formik = useFormik({
        initialValues: {
            "contrato": [],
            "usuarios": [],
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            contrato: props?.esBusqueda ? Yup.array() : Yup.array().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            usuarios: props?.esBusqueda ? Yup.array() : Yup.array().required(intl.formatMessage({ id: 'input_validation_requerido' }))
        }),
    });

    useEffect(() => {
        props?.onContrato(contrato);
    }, [contrato])

    return (
        <Grid container >
            <Grid item xs={12} >
                <Grid item xs={12} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '10px' } : { backgroundColor: '#fff', padding: '10px' }}>
                    <FormikProvider value={formik}>
                        <Form.Group className="mb-3 " >
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <h5>Proyecto: {props?.proyecto} </h5>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <SelectMultipleAutoCompleteField
                                        placeholder='Seleccione los contratos'
                                        label={intl.formatMessage({
                                            id: "input_contratos",
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
                                        onInput={(e: any) => {
                                            formik.setFieldValue("contrato", e);
                                            setContrato(e);

                                            formik.setFieldValue("usuarios", []);
                                            setUsuarios([]);

                                        }}
                                        formik={formik?.getFieldMeta("contrato")}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <SelectMultipleAutoCompleteField
                                        placeholder='Seleccione los usuarios'
                                        label={intl.formatMessage({
                                            id: "input_usuarios",
                                        })}
                                        defaultValue={usuarios}
                                        options={props?.usuarios.map((e: any) => {
                                            return props?.esBusqueda ? {
                                                label: e?.usuario_geocerca + '- Contrato: ' + (e?.contrato || 'Sin contrato'),
                                                value: e?.id
                                            } : {
                                                label: e?.nombre,
                                                value: e?.id,
                                                id_contratos: e?.id_contratos,
                                                correo: e?.email,
                                            }
                                        })}
                                        name="usuarios"
                                        id="usuarios"
                                        onInput={(e: any) => {
                                            formik.setFieldValue("usuarios", e);
                                            setUsuarios(e);
                                        }}
                                        formik={formik?.getFieldMeta("usuarios")}
                                    />
                                </Grid>
                                {props?.esBusqueda ? <Grid item xs={12} md={6}>

                                    <label style={{ fontSize: '14px' }}>
                                        Periodo
                                        <InputGroup style={{ width: 428 }}>
                                            <DatePicker
                                                format="yyyy-MM-dd HH:mm aa"
                                                block
                                                appearance="subtle"
                                                style={{ width: 230 }}
                                                defaultValue={new Date(moment(new Date()).set({
                                                    hour: 8,
                                                    minute: 0
                                                }).format('DD-MM-YYYY HH:mm:ss'))}
                                                onChange={(d) => {
                                                    const fecha_1 = moment(d).isValid();
                                                    setFecha_periodo_1(fecha_1 ? moment(d).format('DD-MM-YYYY HH:mm') : '')
                                                }}
                                            />
                                            <InputGroup.Addon>Al</InputGroup.Addon>
                                            <DatePicker
                                                format="yyyy-MM-dd HH:mm aa"
                                                block
                                                defaultValue={new Date(moment(new Date()).set({
                                                    hour: 20,
                                                    minute: 0
                                                }).format('DD-MM-YYYY HH:mm:ss'))}
                                                appearance="subtle"
                                                style={{ width: 230 }}
                                                onChange={(d) => {
                                                    const fecha_2 = moment(d).isValid();
                                                    setFecha_periodo_2(fecha_2 ? moment(d).format('DD-MM-YYYY HH:mm') : '')
                                                }}
                                            />
                                        </InputGroup>
                                    </label>
                                </Grid> : null}
                                <Grid item xs={12} md={12}>
                                    <Button
                                        variant="primary"
                                        disabled={
                                            props?.esBusqueda ? (props?.procesando || fecha_periodo_1 === '' || fecha_periodo_2 === '') : (props?.procesando || !formik.dirty || !formik.isValid || _.isEmpty(usuarios))
                                        }
                                        onClick={(e: any) => {
                                            props?.onAccion({
                                                contrato,
                                                usuarios,
                                                fecha_periodo_1,
                                                fecha_periodo_2
                                            });
                                        }}
                                    >
                                        {intl.formatMessage({ id: "general_continuar" })}
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

export default UsuarioExistenteGeoForm
