import { Grid } from '@mui/material'
import { useMaterialUIController } from 'context';
import * as Yup from "yup";
import { FormikProvider, useFormik } from 'formik'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import type { StoreType } from '../../types/geericTypes';
import _ from 'lodash';
import { useIntl } from 'react-intl';
import { Button, Form } from 'react-bootstrap';
import SelectField from '../SelectField';
import InputField from '../InputField';

interface FormularioPerfilUsuarioContratoProps {
    procesando: boolean
    enAccion: (data: any) => void
}

const FormularioPerfilUsuarioContrato: React.FC<FormularioPerfilUsuarioContratoProps> = (props: FormularioPerfilUsuarioContratoProps) => {
    const intl = useIntl();
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    const [id_perfil, setId_perfil] = useState<string>('');
    const [id_puesto, setId_puesto] = useState<string>('');
    const [id_landin_page, setId_landin_page] = useState<string>('');
    const [esRegistroPorBoton, setEsRegistroPorBoton] = useState<boolean>(false);
    const [orden, setOrden] = useState<string>('');

    const catalogoPerfiles = useSelector(
        (state: StoreType) => {
            const objects = state?.app?.catalogos?.['apm_cat_perfiles_cliente'] || [];
            return _.uniqBy(objects, 'nombre');
        }
    );

    const catalogoPuestos = useSelector(
        (state: StoreType) => {
            return (state?.app?.catalogos?.['apm_cat_puestos'] || []);
        }
    );

    const catalogoPaginasInicio = useSelector(
        (state: StoreType) => {
            return (state?.app?.catalogos?.['apm_cat_pagina_inicio'] || []);
        }
    );

    const formik = useFormik({
        initialValues: {
            id_perfil: "",
            id_puesto: "",
            id_landin_page: "",
            orden: ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            id_perfil: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_puesto: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_landin_page: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            orden: Yup.string().matches(/^[0-9]+$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })),
        }),
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Grid item xs={12} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '25px', minHeight: '370px' } : { backgroundColor: '#fff', padding: '25px', minHeight: '370px' }}>
                    <FormikProvider value={formik}>
                        <Form.Group className="mb-3 " >
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12} style={{ borderLeft: darkMode ? 'solid 1px #d2d2d2' : 'solid 1px #d2d2d2' }} >
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_perfil' })}
                                        value={id_perfil}
                                        options={catalogoPerfiles.map((e: any) => {
                                            return {
                                                label: e?.nombre,
                                                value: e?.id
                                            }
                                        })}
                                        name="id_perfil"
                                        id="id_perfil"
                                        required
                                        disabled={esRegistroPorBoton}
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("id_perfil", target?.value || '');
                                            setId_perfil(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('id_perfil')}
                                    />

                                    <SelectField
                                        disabled={esRegistroPorBoton}
                                        label={intl.formatMessage({ id: 'general_puesto' })}
                                        value={id_puesto}
                                        options={catalogoPuestos.map((e: any) => {
                                            return {
                                                label: e?.nombre,
                                                value: e?.id
                                            }
                                        })}
                                        name="id_puesto"
                                        id="id_puesto"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("id_puesto", target?.value || '');
                                            setId_puesto(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('id_puesto')}
                                    />
                                    <SelectField
                                        disabled={esRegistroPorBoton}
                                        label={intl.formatMessage({ id: 'input_pagina_inicio' })}
                                        value={id_landin_page}
                                        options={catalogoPaginasInicio.map((e: any) => {
                                            return {
                                                label: e?.nombre,
                                                value: e?.id
                                            }
                                        })}
                                        name="id_landin_page"
                                        id="id_landin_page"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("id_landin_page", target?.value || '');
                                            setId_landin_page(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('id_landin_page')}
                                    />
                                    {id_perfil === '2' || id_perfil === '8' ? <InputField
                                        value={orden || ''}
                                        name="orden"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("orden", target?.value || '');
                                            setOrden(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_orden' })}
                                        placeholder={intl.formatMessage({ id: 'input_orden_descripcion' })}
                                        type="text"
                                        id="orden"
                                        formik={formik?.getFieldMeta('orden')}
                                    /> : null}

                                </Grid>
                                <Grid item xs={12} md={12} style={{ textAlign: 'right' }}>
                                    <Button
                                        variant="primary"
                                        disabled={props?.procesando || !formik.dirty || !formik.isValid}
                                        onClick={(e: any) => {
                                            setEsRegistroPorBoton(true);
                                            props?.enAccion({
                                                id_perfil,
                                                id_puesto,
                                                orden,
                                                id_landin_page
                                            });
                                        }}
                                    >
                                        {intl.formatMessage({ id: 'general_asignar' })}
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

export default FormularioPerfilUsuarioContrato
