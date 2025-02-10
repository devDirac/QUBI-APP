import { Divider, Grid, List, ListItem } from '@mui/material'
import SelectField from '../../componets/SelectField';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import * as Yup from "yup";
import InputField from '../../componets/InputField';
import ListaEntradasForm from './ListaEntradasForm';
import _ from 'lodash';


interface ContratoListProps {
    procesando: boolean
    onAccion: (data: any) => void
    darkMode: boolean
    contratos: any[]
    origenDestino: any
    addOrigen: () => void
    maxCantidad: any
    entradas: any[]
}

const ContratoList: React.FC<ContratoListProps> = (props: ContratoListProps) => {

    const intl = useIntl();
    const [contrato, setContrato] = useState<string>('');
    const [frente, setFrente] = useState<string>('');
    const [concepto, setConcepto] = useState<string>('');
    const [cantidad, setCantidad] = useState<string>('');
    const [precio, setPrecio] = useState<string>('');
    const [origen, setOrigen] = useState<string>('');
    const [fecha, setFecha] = useState<string>('');
    const [cantidades, setCantidades] = useState<any[]>([]);

    const [frentes, setFrentes] = useState<any[]>([]);
    const [conceptos, setConceptos] = useState<any[]>([]);


    useEffect(() => {
        const frentesNew = props?.contratos.find(e => e?.id === +contrato);
        setFrentes(frentesNew?.frentes || []);
    }, [contrato])

    useEffect(() => {
        const conceptosNew = frentes.find(e => e?.id === +frente);
        setConceptos(conceptosNew?.conceptos || []);
    }, [frente])


    const formik = useFormik({
        initialValues: {
            "contrato": "",
            "frente": "",
            "concepto": "",
            "cantidad": "",
            "precio": "",
            "origen": "",
            "fecha": ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            contrato: Yup.string(),
            frente: Yup.string(),
            concepto: Yup.string(),
            cantidad: Yup.string()
                .max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' }))
                .matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' }))
                .required(intl.formatMessage({ id: 'input_validation_requerido' })).test("GratherThanFin1", 'la cantidad a suministrar no puede ser mayor a la cantidad disponible', (value) => {
                    const date2 = +value;
                    return value === '' ? true : date2 <= +props?.maxCantidad;
                }),
            precio: Yup.string()
                .max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' }))
                .matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' }))
                .required(intl.formatMessage({ id: 'input_validation_requerido' })),
            origen: Yup.string().required(intl.formatMessage({ id: "input_validation_requerido" })),
            fecha: Yup.string()
                .required(intl.formatMessage({ id: "input_validation_requerido" })),
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
        const elementos = cantidades.filter((sd: any) => sd?.checked);
        const cantidadAsigna = cantidades.filter((sd: any) => sd?.checked).reduce((a, c) => a + (+c?.cantidad), 0,);
        const precioAsigna = cantidades.filter((sd: any) => sd?.checked).reduce((a, c) => a + (+c?.precio), 0,);
        formik.setFieldValue("cantidad", cantidadAsigna + '');
        setCantidad(cantidadAsigna + '');
        formik.setFieldValue("precio", isNaN((precioAsigna / elementos?.length)) ? '0' : (precioAsigna / elementos?.length) + '');
        setPrecio(isNaN((precioAsigna / elementos?.length)) ? '0' : (precioAsigna / elementos?.length) + '');
        if (cantidades?.length) {
            validate();
        }
    }, [cantidades])

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
                                padding: "10px",
                            }
                            : { backgroundColor: "#fff", padding: "10px" }
                    }
                >
                    <FormikProvider value={formik}>
                        <Form.Group className="mb-3 ">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12} style={{ textAlign: 'left' }}>
                                    <SelectField
                                        label={intl.formatMessage({
                                            id: "input_contrato",
                                        })}
                                        value={contrato}
                                        options={props?.contratos.map((c: any) => {
                                            return {
                                                label: c?.contrato,
                                                value: c?.id + ''
                                            }
                                        })}
                                        name="contrato"
                                        id="contrato"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("contrato", target?.value || "");
                                            setContrato(target?.value);
                                            if (target?.value === '') {
                                                formik.setFieldValue("frente", "");
                                                setFrente('');
                                                setFrentes([]);
                                                formik.setFieldValue("concepto", "");
                                                setConcepto('');
                                                setConceptos([]);
                                            }
                                        }}
                                        formik={formik?.getFieldMeta("contrato")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12} style={{ textAlign: 'left' }}>
                                    <SelectField
                                        label={intl.formatMessage({
                                            id: "input_frente",
                                        })}
                                        value={frente}
                                        options={frentes.map((c: any) => {
                                            return {
                                                label: c?.frente,
                                                value: c?.id + ''
                                            }
                                        })}
                                        name="frente"
                                        id="frente"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("frente", target?.value || "");
                                            setFrente(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta("frente")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12} style={{ textAlign: 'left' }}>
                                    <SelectField
                                        label={intl.formatMessage({
                                            id: "input_concepto",
                                        })}
                                        value={concepto}
                                        options={conceptos.map((c: any) => {
                                            return {
                                                label: c?.inciso,
                                                value: c?.id + ''
                                            }
                                        })}
                                        name="concepto"
                                        id="concepto"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("concepto", target?.value || "");
                                            setConcepto(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta("concepto")}
                                    />
                                    <br />
                                </Grid>
                                {
                                    props?.entradas.filter((s:any)=> +s?.cantidad > 0).map((r: any, key: number) => {
                                        return (
                                            <Grid key={key} item xs={12} md={3}> <ListaEntradasForm entradas={r} enAccion={(data: any) => {
                                                const c = Object.assign([], cantidades);
                                                const w: any = c.filter((w: any) => w?.id !== data?.id);
                                                w.push(data);
                                                setCantidades(w);
                                            }} /></Grid>
                                        )
                                    })
                                }
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        disabled
                                        required
                                        value={cantidad || ""}
                                        name="cantidad"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("cantidad", target?.value || "");
                                            setCantidad(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_cantidad" })}
                                        placeholder={intl.formatMessage({ id: "input_cantidad_descripcion" })}
                                        type="text"
                                        id="cantidad"
                                        formik={formik?.getFieldMeta("cantidad")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        disabled
                                        required
                                        value={precio || ""}
                                        name="precio"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("precio", target?.value || "");
                                            setPrecio(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_precio" })}
                                        placeholder={intl.formatMessage({ id: "input_precio_descripcion" })}
                                        type="text"
                                        id="precio"
                                        formik={formik?.getFieldMeta("precio")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <SelectField
                                        label={intl.formatMessage({
                                            id: "input_destino",
                                        })}
                                        value={origen}
                                        options={(props?.origenDestino || []).map((s: any) => {

                                            return { label: s?.nombre, value: s?.id + '' }
                                        })}
                                        btnPlus
                                        onAdd={() => props.addOrigen()}
                                        name="origen"
                                        id="origen"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("origen", target?.value || "");
                                            setOrigen(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta("origen")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={fecha || ""}
                                        name="fecha"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("fecha", target?.value || "");
                                            setFecha(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_fecha_salida" })}
                                        placeholder={intl.formatMessage({ id: "input_fecha_salida_descripcion" })}
                                        type="date"
                                        id="fecha"
                                        formik={formik?.getFieldMeta("fecha")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Button
                                        variant="primary"
                                        disabled={
                                            props?.procesando || !formik.dirty || !formik.isValid || _.isEmpty(cantidades.filter((d: any) => d?.checked))
                                        }
                                        onClick={(e: any) => {
                                            props?.onAccion(
                                                {
                                                    contrato,
                                                    frente,
                                                    concepto,
                                                    cantidad,
                                                    precio,
                                                    origen,
                                                    fecha,
                                                    cantidades
                                                }
                                            );
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
        </Grid>
    )
}

export default ContratoList
