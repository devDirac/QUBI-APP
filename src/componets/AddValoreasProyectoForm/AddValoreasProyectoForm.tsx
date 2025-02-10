import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { Grid } from '@mui/material';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../InputField';
import SelectField from '../SelectField';
import { useIntl } from 'react-intl';
import { AddValoreasProyectoFormProps } from './types'
import { useMaterialUIController } from 'context';

const AddValoreasProyectoForm: React.FC<AddValoreasProyectoFormProps> = (props: AddValoreasProyectoFormProps) => {

    const intl = useIntl();
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [catValor, setCatValor] = useState('');
    const [id_contratista, setId_contratista] = useState('');
    const [pedido, setPedido] = useState('');
    const [importe, setImporte] = useState('');

    const formik = useFormik({
        initialValues: {
            catValor: "",
            id_contratista: "",
            pedido: "",
            importe: "",
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            catValor: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_contratista: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            pedido: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(150, intl.formatMessage({ id: 'input_validation_max_150' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            importe: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' }))
        }),
    });


    const validate = async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
        } else {
            formik.setTouched(setNestedObjectValues<FormikTouched<any>>(errors, true));
        }
    }
    useEffect(() => {
        if (props?.item && props?.item?.id_cat_valor) {
            formik.setFieldValue("catValor", props?.item?.id_cat_valor+'' || '');
            setCatValor(props?.item?.id_cat_valor+'' || '');
        }

        if (props?.item && props?.item?.id_contratista) {
            formik.setFieldValue("id_contratista", props?.item?.id_contratista+'' || '');
            setId_contratista(props?.item?.id_contratista+'' || '');
        }

        if (props?.item && props?.item?.pedido) {
            formik.setFieldValue("pedido", props?.item?.pedido+'' || '');
            setPedido(props?.item?.pedido+'' || '');
        }

        if (props?.item && props?.item?.importe_valor) {
            formik.setFieldValue("importe", props?.item?.importe_valor+'' || '');
            setImporte(props?.item?.importe_valor+'' || '');
        }
        validate();
    }, [props?.item]);


    return (
        <div>
            <FormikProvider value={formik}>
                <Form.Group className="mb-3" style={darkMode ? { backgroundColor: 'transparent' } : {}}>
                    <Grid container spacing={2} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '10px', minHeight: '400px' } : { backgroundColor: '#fff', padding: '10px', minHeight: '400px' }}>
                        <Grid item xs={12} md={6}>
                            <SelectField
                                label={intl.formatMessage({ id: 'input_catValor' })}
                                value={catValor}
                                options={props?.tipoValor || []}
                                name="catValor"
                                id="catValor"
                                required
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("catValor", target?.value || '');
                                    setCatValor(target?.value);
                                }}
                                formik={formik?.getFieldMeta('catValor')}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SelectField
                                label={intl.formatMessage({ id: 'input_contratista' })}
                                value={id_contratista}
                                options={props?.contratista || []}
                                name="id_contratista"
                                id="id_contratista"
                                required
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("id_contratista", target?.value || '');
                                    setId_contratista(target?.value);
                                }}
                                formik={formik?.getFieldMeta('id_contratista')}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputField
                                required
                                value={pedido || ''}
                                name="pedido"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("pedido", target?.value || '');
                                    setPedido(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'general_pedido' })}
                                placeholder={intl.formatMessage({ id: 'input_pedido_descripcion' })}
                                type="text"
                                id="pedido"
                                formik={formik?.getFieldMeta('pedido')}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputField
                                required
                                value={importe || ''}
                                name="importe"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("importe", target?.value + "" || '');
                                    setImporte(target?.value + "");
                                }}
                                label={intl.formatMessage({ id: 'input_importe' })}
                                placeholder={intl.formatMessage({ id: 'input_importe_descripcion' })}
                                type="text"
                                id="importe"
                                formik={formik?.getFieldMeta('importe')}
                            />
                            <br />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            style={{ padding: "5px", paddingTop: "0", paddingBottom: "0", textAlign: 'right' }}
                        >
                            <Button
                                variant="primary"
                                disabled={props?.procesando || !formik.dirty || !formik.isValid}
                                onClick={(e: any) => {
                                    props?.enAccion({
                                        ...{
                                            id_cat_valor: catValor,
                                            id_contratista,
                                            pedido,
                                            importe
                                        }, ...props?.item?.id ? { id: props?.item?.id } : {}
                                    });
                                }}
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

export default AddValoreasProyectoForm
