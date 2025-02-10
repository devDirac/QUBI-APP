import React, { useEffect, useState } from 'react';
import type { CaratulaEstimacionFormProps } from './types';
import * as Yup from "yup";
import _ from 'lodash';
import { useIntl } from 'react-intl';
import { Alert, AlertTitle, Checkbox, Grid } from '@mui/material';
import { Button, Form } from 'react-bootstrap';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import InputField from '../../componets/InputField';
import moment from 'moment';
import { numericFormatter } from 'react-number-format';
import ModalComponent from '../../componets/Modal';
import { numero2word } from '../../utils/numeros_a_letras';
import './style.scss';
import SelectField from '../SelectField/index';
import { useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';

const CaratulaEstimacionForm: React.FC<CaratulaEstimacionFormProps> = (props: CaratulaEstimacionFormProps) => {

    const intl = useIntl();

    const [showAlert, setShowAlert] = useState(true);
    const [isAlertOpenComentario, setIsAlertOpenComentario] = useState(false);
    const handleisAlertOpenComentario = () => setIsAlertOpenComentario(true);
    const handleisAlerCloseComentario = () => setIsAlertOpenComentario(false);
   const contrato = useSelector((state: any) => state?.app?.contrato || null);
    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    const [numeroEstimacionDefinitiva, setNumeroEstimacionDefinitiva] = useState<string>('');
    const [fechaEstimacionDefinitiva, setFechaEstimacionDefinitiva] = useState<string>(moment(new Date()).format('YYYY-MM-DD'));
    const [ubicacion, setUbicacion] = useState<string>('');
    const [contratoNumero, setContratoNumero] = useState<string>('');
    const [tipoContrato, setTipoContrato] = useState<string>('');
    const [fechaContratoNumOperacion, setFechaContratoNumOperacion] = useState<string>('');
    const [modalidadLiquidacion, setModalidadLiquidacion] = useState<string>('');
    const [clavePresupuestariaCompleta, setClavePresupuestariaCompleta] = useState<string>('');
    const [asignacionIva, setAsignacionIva] = useState<string>('');
    const [origenRecursos, setOrigenRecursos] = useState<string>('');
    const [numero, setNumero] = useState<string>('');
    const [fechaPeriodoInicial, setFechaPeriodoInicial] = useState<string>('');
    const [fechaPeriodoFinal, setFechaPeriodoFinal] = useState<string>('');
    const [estimado, setEstimado] = useState<string>('');
    const [deductivas, setDeductivas] = useState<string>('');
    const [amortizacion, setAmortizacion] = useState<string>('');
    const [devolucionRetencion, setDevolucionRetencion] = useState<string>('');
    const [deduccionesOtrosCargos, setDeduccionesOtrosCargos] = useState<string>('');
    const [subTotal, setSubTotal] = useState<string>('');
    const [iva, setIva] = useState<string>('');
    const [iva_default, setIva_default] = useState<number>(16);
    const [subTotal2, setSubTotal2] = useState<string>('');
    const [retencionesImpuestos] = useState<string>('0');
    const [saldoPagarObraEjecutada, setSaldoPagarObraEjecutada] = useState<string>('');
    const [alcanceLiquido, setAlcanceLiquido] = useState<string>('');
    const [anticipo, setAnticipo] = useState<string>('');
    const [fondeGarantia, setFondeGarantia] = useState<string>('');
    const [impuestoSRenta, setImpuestoSRenta] = useState<string>('');
    const [inspeccionObras, setInspeccionObras] = useState<string>('');
    const [otrosCargos, setOtrosCargos] = useState<string>('');
    const [otrosCargosDescripcion, setOtrosCargosDescripcion] = useState<string>('');
    const [deducciones, setDeducciones] = useState<string>('');
    const [estimacionConFactura, setEstimacionConFactura] = useState<boolean>(true);

    const [pep, setPep] = useState<string>('');

    const catalogoPeps = useSelector(
        (state: StoreType) => {
            return (state?.app?.catalogos?.['apm_pep'] || []).filter((o: any) => o?.id_obra === espacio?.id ).filter((item:any) => (props?.pepsContrato || []).map((r: any) => { return +r?.id_pep }).includes(+item.id));
        }
    );

    const formik = useFormik({
        initialValues: {
            numeroEstimacionDefinitiva: "",
            fechaEstimacionDefinitiva: moment(new Date()).format('YYYY-MM-DD'),
            ubicacion: "",
            contratoNumero: "",
            tipoContrato: "",
            fechaContratoNumOperacion: "",
            modalidadLiquidacion: "",
            clavePresupuestariaCompleta: "",
            asignacionIva: "",
            origenRecursos: "",
            numero: "",
            fechaPeriodoInicial: "",
            fechaPeriodoFinal: "",
            estimado: "",
            deductivas: "",
            amortizacion: "",
            devolucionRetencion: "",
            deduccionesOtrosCargos: "",
            subTotal: "",
            iva: "",
            subTotal2: "",
            saldoPagarObraEjecutada: "",
            alcanceLiquido: "",
            anticipo: "",
            fondeGarantia: "",
            impuestoSRenta: "",
            inspeccionObras: "",
            otrosCargos: "",
            otrosCargosDescripcion: "",
            deducciones: "",
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            /* Primera parte del formulario */
            numeroEstimacionDefinitiva: Yup.string(),
            fechaEstimacionDefinitiva: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            ubicacion: Yup.string()
                .min(2, intl.formatMessage({ id: "input_validation_min_2" }))
                .max(150, intl.formatMessage({ id: "input_validation_max_150" }))
                .required(intl.formatMessage({ id: "input_validation_requerido" })),
            /* Segunda parte del formulario */
            contratoNumero: Yup.string(),
            tipoContrato: Yup.string(),
            fechaContratoNumOperacion: Yup.string(),
            modalidadLiquidacion: Yup.string(),
            /* Tercer parte del formulario */
            clavePresupuestariaCompleta: Yup.string(),
            asignacionIva: Yup.string(),
            origenRecursos: Yup.string(),
            /* Cuarta parte del formulario */
            numero: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            fechaPeriodoInicial: Yup.string(),
            fechaPeriodoFinal: Yup.string(),
            /* quinta parte del formulario, lado izquierdo */
            estimado: Yup.string(),
            deductivas: Yup.string(),
            amortizacion: Yup.string(),
            devolucionRetencion: Yup.string(),
            deduccionesOtrosCargos: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })),
            subTotal: Yup.string(),
            iva: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            subTotal2: Yup.string(),
            saldoPagarObraEjecutada: Yup.string(),
            alcanceLiquido: Yup.string(),
            /* quinta parte del formulario, lado derecho */
            anticipo: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })).test(
                "mayorA100",
                'Este valor no puede ser mayor a 100',
                (value) => {
                    const date1 = 100;
                    const date2 = +value;
                    return date2 < date1
                }
            ),
            fondeGarantia: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })).test(
                "mayorA100",
                'Este valor no puede ser mayor a 100',
                (value) => {
                    const date1 = 100;
                    const date2 = +value;
                    return date2 < date1
                }
            ),
            impuestoSRenta: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })),
            inspeccionObras: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })),
            otrosCargos: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })),
            otrosCargosDescripcion: Yup.string()
                .min(4, intl.formatMessage({ id: "input_validation_min_4" }))
                .max(500, intl.formatMessage({ id: "input_validation_max_500" })),
            deducciones: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' }))
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
        if (props?.infoEstimacion && _.isEmpty(props?.infoEstimacion?.numeroEstimacionDefinitiva + '') === false) {
            formik.setFieldValue("numeroEstimacionDefinitiva", (props?.infoEstimacion?.numeroEstimacionDefinitiva + 1) + '' || "");
            setNumeroEstimacionDefinitiva((props?.infoEstimacion?.numeroEstimacionDefinitiva + 1) + '');
        } else {
            formik.setFieldValue("numeroEstimacionDefinitiva", '1');
            setNumeroEstimacionDefinitiva('1');
        }

        formik.setFieldValue("fechaEstimacionDefinitiva", moment(new Date()).format('YYYY-MM-DD'));
        setFechaEstimacionDefinitiva(moment(new Date()).format('YYYY-MM-DD'));

        if (props?.infoEstimacion && props?.infoEstimacion?.contratoNumero) {
            formik.setFieldValue("contratoNumero", props?.infoEstimacion?.contratoNumero || '');
            setContratoNumero(props?.infoEstimacion?.contratoNumero || '');
        }

        if (props?.infoEstimacion && props?.infoEstimacion?.tipoContrato) {
            formik.setFieldValue("tipoContrato", props?.infoEstimacion?.tipoContrato || "");
            setTipoContrato(props?.infoEstimacion?.tipoContrato);
        }

        if (props?.infoEstimacion && props?.infoEstimacion?.fecha_contrato) {
            formik.setFieldValue("fechaContratoNumOperacion", moment(props?.infoEstimacion?.fecha_contrato || "").format('YYYY-MM-DD'));
            setFechaContratoNumOperacion(moment(props?.infoEstimacion?.fecha_contrato || "").format('YYYY-MM-DD'));
        }

        if (props?.infoEstimacion && props?.infoEstimacion?.modalidad) {
            formik.setFieldValue("modalidadLiquidacion", props?.infoEstimacion?.modalidad || "");
            setModalidadLiquidacion(props?.infoEstimacion?.modalidad || '');
        }

        if (props?.infoEstimacion && props?.infoEstimacion?.clave_presupuestaria) {
            formik.setFieldValue("clavePresupuestariaCompleta", props?.infoEstimacion?.clave_presupuestaria || "");
            setClavePresupuestariaCompleta(props?.infoEstimacion?.clave_presupuestaria || '');
        }

        if (props?.infoEstimacion && props?.infoEstimacion?.asignacion_iva) {
            formik.setFieldValue("asignacionIva", props?.infoEstimacion?.asignacion_iva || "");
            setAsignacionIva(props?.infoEstimacion?.asignacion_iva || '');
        }

        if (props?.infoEstimacion && props?.infoEstimacion?.oficina_pagadora) {
            formik.setFieldValue("origenRecursos", props?.infoEstimacion?.oficina_pagadora || "");
            setOrigenRecursos(props?.infoEstimacion?.oficina_pagadora || '');
        }

        if (props?.infoEstimacion && props?.infoEstimacion?.numero) {
            formik.setFieldValue("numero", (props?.infoEstimacion?.numero + '') || "");
            setNumero((props?.infoEstimacion?.numero + '') || "");
        }

        if (props?.infoEstimacion && props?.infoEstimacion?.fechaPeriodoInicial) {
            formik.setFieldValue("fechaPeriodoInicial", props?.infoEstimacion?.fechaPeriodoInicial || "");
            setFechaPeriodoInicial(props?.infoEstimacion?.fechaPeriodoInicial || '');
        }

        if (props?.infoEstimacion && props?.infoEstimacion?.fechaPeriodoFinal) {
            formik.setFieldValue("fechaPeriodoFinal", props?.infoEstimacion?.fechaPeriodoFinal || "");
            setFechaPeriodoFinal(props?.infoEstimacion?.fechaPeriodoFinal || '');
        }

        formik.setFieldValue("estimado", (props?.elementosPorEstimar || []).reduce((a, c) => a + (+c?.importe), 0,) + '');
        setEstimado((props?.elementosPorEstimar || []).reduce((a, c) => a + (+c?.importe), 0,) + '');

        formik.setFieldValue("devolucionRetencion", "0");
        setDevolucionRetencion("0");

        if (props?.deductivas) {
            formik.setFieldValue("deductivas", props?.deductivas);
            setDeductivas(props?.deductivas);
        }

        if (props?.infoEstimacion && props?.infoEstimacion?.anticipo) {
            formik.setFieldValue("anticipo", props?.infoEstimacion?.anticipo + '' || "");
            setAnticipo(props?.infoEstimacion?.anticipo + '');
        }

        if (props?.infoEstimacion && props?.infoEstimacion?.fondo_gtia) {
            formik.setFieldValue("fondeGarantia", props?.infoEstimacion?.fondo_gtia + '' || "");
            setFondeGarantia(props?.infoEstimacion?.fondo_gtia + '');
        }

        if (!_.isEmpty(props?.item)) {
            validate();
        }

    }, [props?.item, props?.infoEstimacion, props?.deductivas]);

    const handleEstimacionIva = (v: boolean) => {
        setIva_default(0)
    }

    useEffect(() => {
        const res_amor = (estimado === '' ? 0 : isNaN(+estimado) ? 0 : +estimado) * ((+anticipo) / 100);
        formik.setFieldValue("amortizacion", numericFormatter(res_amor + '', { decimalScale: 4, fixedDecimalScale: true }));
        setAmortizacion(numericFormatter(res_amor + '', { decimalScale: 4, fixedDecimalScale: true }));
    }, [anticipo, estimado]);

    useEffect(() => {
        const deduccionesOtrosCargos_ = (+deducciones) + (+(props?.deductivasExternas || 0))
        formik.setFieldValue("deduccionesOtrosCargos", numericFormatter(deduccionesOtrosCargos_ + '', { decimalScale: 4, fixedDecimalScale: true }));
        setDeduccionesOtrosCargos(numericFormatter(deduccionesOtrosCargos_ + '', { decimalScale: 4, fixedDecimalScale: true }));
    }, [deducciones, props?.deductivasExternas]);

    useEffect(() => {
        const valorAplicar = (+estimado) - ((+deductivas) + (+amortizacion) + (+devolucionRetencion) + (+deduccionesOtrosCargos))
        formik.setFieldValue("subTotal", numericFormatter(valorAplicar + '', { decimalScale: 4, fixedDecimalScale: true }));
        setSubTotal(numericFormatter(valorAplicar + '', { decimalScale: 4, fixedDecimalScale: true }));
    }, [estimado, deductivas, amortizacion, devolucionRetencion, deduccionesOtrosCargos]);

    useEffect(() => {
        const res_iva = (+subTotal) * ((+iva_default) / 100)
        formik.setFieldValue("iva", numericFormatter(res_iva + '', { decimalScale: 4, fixedDecimalScale: true }));
        setIva(numericFormatter(res_iva + '', { decimalScale: 4, fixedDecimalScale: true }));
    }, [subTotal, iva_default]);

    useEffect(() => {


        const nuevoValorSubtotal2 = ((+subTotal) + (+iva));
        formik.setFieldValue("subTotal2", numericFormatter(nuevoValorSubtotal2 + '', { decimalScale: 4, fixedDecimalScale: true }));
        setSubTotal2(numericFormatter(nuevoValorSubtotal2 + '', { decimalScale: 4, fixedDecimalScale: true }));
    }, [subTotal, iva]);

    useEffect(() => {
        const nuevoValorSubtotal2 = ((+retencionesImpuestos) + (+subTotal2));
        formik.setFieldValue("saldoPagarObraEjecutada", numericFormatter(nuevoValorSubtotal2 + '', { decimalScale: 4, fixedDecimalScale: true }));
        setSaldoPagarObraEjecutada(numericFormatter(nuevoValorSubtotal2 + '', { decimalScale: 4, fixedDecimalScale: true }));
        formik.setFieldValue("alcanceLiquido", numericFormatter(nuevoValorSubtotal2 + '', { decimalScale: 4, fixedDecimalScale: true }));
        setAlcanceLiquido(numericFormatter(nuevoValorSubtotal2 + '', { decimalScale: 4, fixedDecimalScale: true }));
    }, [retencionesImpuestos, subTotal2]);

    useEffect(() => {
        const estimadoConPorcentajeFondoGarantiaAplicado = (estimado === '' ? 0 : isNaN(+estimado) ? 0 : +estimado) * (+(fondeGarantia) / 100);
        const valorDeducciones = estimadoConPorcentajeFondoGarantiaAplicado + ((impuestoSRenta === '' ? 0 : isNaN(+impuestoSRenta) ? 0 : +impuestoSRenta) + (inspeccionObras === '' ? 0 : isNaN(+inspeccionObras) ? 0 : +inspeccionObras) + (otrosCargos === '' ? 0 : isNaN(+otrosCargos) ? 0 : +otrosCargos));
        formik.setFieldValue("deducciones", numericFormatter(valorDeducciones + '', { decimalScale: 4, fixedDecimalScale: true }));
        setDeducciones(numericFormatter(valorDeducciones + '', { decimalScale: 4, fixedDecimalScale: true }));
    }, [estimado, impuestoSRenta, inspeccionObras, otrosCargos, fondeGarantia])


    const handleChangeIva = () => {
        handleisAlertOpenComentario();
    }

    const formik2 = useFormik({
        initialValues: {
            iva_default: "",
        },
        onSubmit: async (values: any) => { },
        validationSchema: Yup.object({
            iva_default: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })).test(
                "mayorA100",
                'Este valor no puede ser mayor a 100',
                (value) => {
                    const date1 = 100;
                    const date2 = +value;
                    return date2 < date1
                }
            )
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
                                padding: "10px",
                                minHeight: "600px",
                            }
                            : { backgroundColor: "#fff", padding: "10px", minHeight: "600px" }
                    }
                >
                    <FormikProvider value={formik}>
                        <Form.Group className="mb-3 ">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <p style={{ color: '#fb8c00' }}>Número de estimación anterior: {!_.isEmpty(props?.infoEstimacion?.maxEstimacion + '') ? props?.infoEstimacion?.maxEstimacion : 0}</p>
                                </Grid>
                                {/* Primera parte del formulario  */}
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        required
                                        disabled
                                        value={numeroEstimacionDefinitiva || ""}
                                        name="numeroEstimacionDefinitiva"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("numeroEstimacionDefinitiva", target?.value || "");
                                            setNumeroEstimacionDefinitiva(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_numeroEstimacionDefinitiva" })}
                                        placeholder={intl.formatMessage({ id: "input_numeroEstimacionDefinitiva_descripcion" })}
                                        type="text"
                                        id="numeroEstimacionDefinitiva"
                                        formik={formik?.getFieldMeta("numeroEstimacionDefinitiva")}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        required
                                        value={fechaEstimacionDefinitiva || ""}
                                        name="fechaEstimacionDefinitiva"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("fechaEstimacionDefinitiva", target?.value || "");
                                            setFechaEstimacionDefinitiva(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_fechaEstimacionDefinitiva" })}
                                        type="date"
                                        id="fechaEstimacionDefinitiva"
                                        formik={formik?.getFieldMeta("fechaEstimacionDefinitiva")}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    {(catalogoPeps || [])?.length ? <SelectField
                                        label={intl.formatMessage({
                                            id: "input_pep",
                                        })}
                                        value={(catalogoPeps || [])?.length === 1 ? catalogoPeps?.[0]?.id : pep}
                                        options={(catalogoPeps || []).map((e: any) => {
                                            return {
                                                label: (e?.pep || ""),
                                                value: e?.id,
                                            };
                                        })}
                                        name="pep"
                                        id="pep"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("pep", target?.value || "");
                                            setPep(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta("usuario")}
                                    /> : showAlert ? <>
                                        <Alert severity="warning" onClose={() => { setShowAlert(false) }}>
                                            <AlertTitle>Atención</AlertTitle>
                                            Este contrato no cuenta con cuentas contables 
                                        </Alert>

                                    </> : null}
                                </Grid>
                                {/* Fin Primera parte del formulario  */}
                                {/* Segunda  parte del formulario  */}
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        required
                                        disabled
                                        value={contratoNumero || ""}
                                        name="contratoNumero"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("contratoNumero", target?.value || "");
                                            setContratoNumero(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_contrato_numero" })}
                                        placeholder={intl.formatMessage({ id: "input_contrato_numero_descripcion" })}
                                        type="text"
                                        id="contratoNumero"
                                        formik={formik?.getFieldMeta("contratoNumero")}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        required
                                        disabled
                                        value={tipoContrato || ""}
                                        name="tipoContrato"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("tipoContrato", target?.value || "");
                                            setTipoContrato(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_contrato_tipo" })}
                                        placeholder={intl.formatMessage({ id: "input_contrato_tipo_descripcion" })}
                                        type="text"
                                        id="tipoContrato"
                                        formik={formik?.getFieldMeta("tipoContrato")}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        required
                                        disabled
                                        value={fechaContratoNumOperacion || ""}
                                        name="fechaContratoNumOperacion"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("fechaContratoNumOperacion", target?.value || "");
                                            setFechaContratoNumOperacion(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_fechaContratoNumOperacion" })}
                                        type="date"
                                        id="fechaContratoNumOperacion"
                                        formik={formik?.getFieldMeta("fechaContratoNumOperacion")}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        required
                                        disabled
                                        value={modalidadLiquidacion || ""}
                                        name="modalidadLiquidacion"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("modalidadLiquidacion", target?.value || "");
                                            setModalidadLiquidacion(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_modalidadLiquidacion" })}
                                        placeholder={intl.formatMessage({ id: "input_modalidadLiquidacion_descripcion" })}
                                        type="text"
                                        id="modalidadLiquidacion"
                                        formik={formik?.getFieldMeta("modalidadLiquidacion")}
                                    />
                                </Grid>
                                {/* Fin Segunda  parte del formulario  */}
                                {/* Inicio tercera  parte del formulario  */}
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        required
                                        disabled
                                        value={clavePresupuestariaCompleta || ""}
                                        name="clavePresupuestariaCompleta"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("clavePresupuestariaCompleta", target?.value || "");
                                            setClavePresupuestariaCompleta(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_clavePresupuestariaCompleta" })}
                                        placeholder={intl.formatMessage({ id: "input_clavePresupuestariaCompleta_descripcion" })}
                                        type="text"
                                        id="clavePresupuestariaCompleta"
                                        formik={formik?.getFieldMeta("clavePresupuestariaCompleta")}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        required
                                        disabled
                                        value={(asignacionIva || "")}
                                        name="asignacionIva"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("asignacionIva", target?.value || "");
                                            setAsignacionIva(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_asignacionIva" })}
                                        placeholder={intl.formatMessage({ id: "input_asignacionIva_descripcion" })}
                                        type="text"
                                        id="asignacionIva"
                                        formik={formik?.getFieldMeta("asignacionIva")}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        required
                                        disabled
                                        value={origenRecursos || ""}
                                        name="origenRecursos"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("origenRecursos", target?.value || "");
                                            setOrigenRecursos(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_origenRecursos" })}
                                        placeholder={intl.formatMessage({ id: "input_origenRecursos_descripcion" })}
                                        type="text"
                                        id="origenRecursos"
                                        formik={formik?.getFieldMeta("origenRecursos")}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} >
                                    <InputField
                                        required
                                        disabled
                                        value={numero || ""}
                                        name="numero"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("numero", target?.value || "");
                                            setNumero(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_numero" })}
                                        placeholder={intl.formatMessage({ id: "input_numero_descripcion" })}
                                        type="text"
                                        id="numero"
                                        formik={formik?.getFieldMeta("numero")}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        required
                                        value={ubicacion || ""}
                                        name="ubicacion"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("ubicacion", target?.value || "");
                                            setUbicacion(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_ubicacion" })}
                                        placeholder={intl.formatMessage({ id: "input_ubicacion_descripcion" })}
                                        type="text"
                                        id="ubicacion"
                                        formik={formik?.getFieldMeta("ubicacion")}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12} >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} style={{ textAlign: 'center' }}><h4>Periodo</h4></Grid>
                                        <Grid item xs={12} md={6}>
                                            <InputField
                                                required
                                                disabled
                                                value={fechaPeriodoInicial || ""}
                                                name="fechaPeriodoInicial"
                                                onInput={(e: any) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    formik.setFieldValue("fechaPeriodoInicial", target?.value || "");
                                                    setFechaPeriodoInicial(target?.value);
                                                }}
                                                label={intl.formatMessage({ id: "input_fecha_inicio" })}
                                                type="date"
                                                id="fechaPeriodoInicial"
                                                formik={formik?.getFieldMeta("fechaPeriodoInicial")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <InputField
                                                required
                                                disabled
                                                value={fechaPeriodoFinal || ""}
                                                name="fechaPeriodoFinal"
                                                onInput={(e: any) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    formik.setFieldValue("fechaPeriodoFinal", target?.value || "");
                                                    setFechaPeriodoFinal(target?.value);
                                                }}
                                                label={intl.formatMessage({ id: "input_fecha_final" })}
                                                type="date"
                                                id="fechaPeriodoFinal"
                                                formik={formik?.getFieldMeta("fechaPeriodoFinal")}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <h3 style={{ backgroundColor: '#e7e7e7', width: '100%', height: '2px' }}></h3>
                                </Grid>
                                <Grid item xs={12} md={6} style={{ borderRight: 'solid 2px #e7e7e7', paddingRight: '15px' }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} data-html2canvas-ignore>
                                            <label htmlFor="btn">
                                                Estimación con IVA &nbsp;
                                                <Button
                                                    variant="primary"
                                                    onClick={(e: any) => {
                                                        handleEstimacionIva(true)
                                                    }}
                                                >
                                                    Retirar IVA de estimación
                                                </Button>
                                            </label>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputField
                                                disabled
                                                required
                                                value={estimado || ""}
                                                name="estimado"
                                                onInput={(e: any) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    formik.setFieldValue("estimado", target?.value || "");
                                                    setEstimado(target?.value);
                                                }}
                                                label={intl.formatMessage({ id: "input_estimado" })}
                                                type="text"
                                                id="estimado"
                                                formik={formik?.getFieldMeta("estimado")}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputField
                                                disabled
                                                required
                                                value={deductivas || ""}
                                                name="deductivas"
                                                onInput={(e: any) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    formik.setFieldValue("deductivas", target?.value || "");
                                                    setDeductivas(target?.value);
                                                }}
                                                label={intl.formatMessage({ id: "input_deductivas" })}
                                                type="text"
                                                id="deductivas"
                                                formik={formik?.getFieldMeta("deductivas")}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputField
                                                required
                                                disabled
                                                value={amortizacion || ""}
                                                name="amortizacion"
                                                onInput={(e: any) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    formik.setFieldValue("amortizacion", target?.value || "");
                                                    setAmortizacion(target?.value);
                                                }}
                                                label={intl.formatMessage({ id: "input_amortizacion" })}
                                                type="text"
                                                id="amortizacion"
                                                formik={formik?.getFieldMeta("amortizacion")}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputField
                                                required
                                                value={devolucionRetencion || ""}
                                                name="devolucionRetencion"
                                                onInput={(e: any) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    formik.setFieldValue("devolucionRetencion", target?.value || "");
                                                    setDevolucionRetencion(target?.value);
                                                }}
                                                label={intl.formatMessage({ id: "input_devolucionRetencion" })}
                                                type="text"
                                                id="devolucionRetencion"
                                                formik={formik?.getFieldMeta("devolucionRetencion")}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputField
                                                required
                                                disabled
                                                value={deduccionesOtrosCargos || ""}
                                                name="deduccionesOtrosCargos"
                                                onInput={(e: any) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    formik.setFieldValue("deduccionesOtrosCargos", target?.value || "");
                                                    setDeduccionesOtrosCargos(target?.value);
                                                }}
                                                label={intl.formatMessage({ id: "input_deduccionesOtrosCargos" }) + (props?.deductivasExternas && props?.deductivasExternas > 0 ? ' + deductivas adicionales' : '')}
                                                type="text"
                                                id="deduccionesOtrosCargos"
                                                formik={formik?.getFieldMeta("deduccionesOtrosCargos")}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputField
                                                required
                                                disabled
                                                value={subTotal || ""}
                                                name="subTotal"
                                                onInput={(e: any) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    formik.setFieldValue("subTotal", target?.value || "");
                                                    setSubTotal(target?.value);
                                                }}
                                                label={intl.formatMessage({ id: "input_subTotal" })}
                                                type="text"
                                                id="subTotal"
                                                formik={formik?.getFieldMeta("subTotal")}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputField
                                                onChangeExtern={() => {
                                                    handleChangeIva()
                                                }}
                                                disabled
                                                required
                                                value={iva || ""}
                                                name="iva"
                                                onInput={(e: any) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    formik.setFieldValue("iva", target?.value || "");
                                                    setIva(target?.value);
                                                }}
                                                label={'Imp ' + iva_default + '% IVA'}
                                                type="text"
                                                id="iva"
                                                formik={formik?.getFieldMeta("iva")}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputField
                                                disabled
                                                required
                                                value={subTotal2 || ""}
                                                name="subTotal2"
                                                onInput={(e: any) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    formik.setFieldValue("subTotal2", target?.value || "");
                                                    setSubTotal2(target?.value);
                                                }}
                                                label={intl.formatMessage({ id: "input_subTotal" })}
                                                type="text"
                                                id="subTotal2"
                                                formik={formik?.getFieldMeta("subTotal2")}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputField
                                                disabled
                                                required
                                                value={saldoPagarObraEjecutada || ""}
                                                name="saldoPagarObraEjecutada"
                                                onInput={(e: any) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    formik.setFieldValue("saldoPagarObraEjecutada", target?.value || "");
                                                    setSaldoPagarObraEjecutada(target?.value);
                                                }}
                                                label={intl.formatMessage({ id: "input_saldoPagarObraEjecutada" })}
                                                type="text"
                                                id="saldoPagarObraEjecutada"
                                                formik={formik?.getFieldMeta("saldoPagarObraEjecutada")}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputField
                                                disabled
                                                required
                                                value={alcanceLiquido || ""}
                                                name="alcanceLiquido"
                                                onInput={(e: any) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    formik.setFieldValue("alcanceLiquido", target?.value || "");
                                                    setAlcanceLiquido(target?.value);
                                                }}
                                                label={intl.formatMessage({ id: "input_alcanceLiquido" })}
                                                type="text"
                                                id="alcanceLiquido"
                                                formik={formik?.getFieldMeta("alcanceLiquido")}
                                            />
                                            <small>({alcanceLiquido.includes('-') ? 'MENOS' : ''} {numero2word(+(alcanceLiquido).replaceAll('-', '')).toString()} {alcanceLiquido.substring(alcanceLiquido.indexOf('.') + 1, alcanceLiquido.length)}/100 M.N)</small>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} data-html2canvas-ignore>
                                            <label htmlFor="btn">
                                                Deducciones &nbsp;
                                                <Button
                                                    disabled={_.isEmpty(props?.infoEstimacion?.maxEstimacion + '')}
                                                    variant="light"
                                                    onClick={(e: any) => {
                                                        props?.verDeductivas && props?.verDeductivas()
                                                    }}
                                                >
                                                    Deductivas
                                                </Button>
                                            </label>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputField
                                                required
                                                value={anticipo || ""}
                                                name="anticipo"
                                                onInput={(e: any) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    formik.setFieldValue("anticipo", target?.value || "");
                                                    setAnticipo(target?.value);
                                                }}
                                                label={intl.formatMessage({ id: "input_anticipo_porcentaje" })}
                                                type="text"
                                                id="anticipo"
                                                formik={formik?.getFieldMeta("anticipo")}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputField
                                                required
                                                value={fondeGarantia || ""}
                                                name="fondeGarantia"
                                                onInput={(e: any) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    formik.setFieldValue("fondeGarantia", target?.value || "");
                                                    setFondeGarantia(target?.value);
                                                }}
                                                label={intl.formatMessage({ id: "input_fondeGarantia" })}
                                                type="text"
                                                id="fondeGarantia"
                                                formik={formik?.getFieldMeta("fondeGarantia")}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputField
                                                value={impuestoSRenta || ""}
                                                name="impuestoSRenta"
                                                onInput={(e: any) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    formik.setFieldValue("impuestoSRenta", target?.value || "");
                                                    setImpuestoSRenta(target?.value);
                                                }}
                                                label={intl.formatMessage({ id: "input_impuestoSRenta" })}
                                                type="text"
                                                id="impuestoSRenta"
                                                formik={formik?.getFieldMeta("impuestoSRenta")}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputField
                                                value={inspeccionObras || ""}
                                                name="inspeccionObras"
                                                onInput={(e: any) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    formik.setFieldValue("inspeccionObras", target?.value || "");
                                                    setInspeccionObras(target?.value);
                                                }}
                                                label={intl.formatMessage({ id: "input_inspeccionObras" })}
                                                type="text"
                                                id="inspeccionObras"
                                                formik={formik?.getFieldMeta("inspeccionObras")}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputField
                                                value={otrosCargos || ""}
                                                name="otrosCargos"
                                                onInput={(e: any) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    formik.setFieldValue("otrosCargos", target?.value || "");
                                                    setOtrosCargos(target?.value);
                                                }}
                                                label={intl.formatMessage({ id: "input_otrosCargos" })}
                                                type="text"
                                                id="otrosCargos"
                                                formik={formik?.getFieldMeta("otrosCargos")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} data-html2canvas-ignore>
                                            <Button
                                                variant="warning"

                                                onClick={(e: any) => {
                                                    props?.onAddDeductiva && props?.onAddDeductiva()
                                                }}
                                            >
                                                Agregar deductivas externas
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} data-html2canvas-ignore>
                                            <Button
                                                variant="danger"

                                                onClick={(e: any) => {
                                                    props.onSelectDeductivas && props?.onSelectDeductivas()
                                                }}
                                            >
                                                Deductivas adicionales
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputField
                                                required
                                                value={otrosCargosDescripcion || ""}
                                                name="otrosCargosDescripcion"
                                                disabled={((props?.deductivasExternas ?? 0) <= 0)}
                                                onInput={(e: any) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    formik.setFieldValue("otrosCargosDescripcion", target?.value || "");
                                                    setOtrosCargosDescripcion(target?.value);
                                                }}
                                                label={intl.formatMessage({ id: "input_otrosCargosDescripcion" })}
                                                type="textArea"
                                                id="otrosCargosDescripcion"
                                                formik={formik?.getFieldMeta("otrosCargosDescripcion")}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputField
                                                required
                                                value={deducciones || ""}
                                                name="deducciones"
                                                onInput={(e: any) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    formik.setFieldValue("deducciones", target?.value || "");
                                                    setDeducciones(target?.value);
                                                }}
                                                label={intl.formatMessage({ id: "input_deducciones" })}
                                                type="text"
                                                id="deducciones"
                                                formik={formik?.getFieldMeta("deducciones")}
                                            />
                                        </Grid>
                                        <Grid item xs={12}><strong>Retenciones</strong></Grid>
                                        <Grid item xs={12}>
                                            <Checkbox
                                                tabIndex={-1}
                                                disableRipple
                                                defaultChecked
                                                value={estimacionConFactura}
                                                onChange={() => {
                                                    setEstimacionConFactura(!estimacionConFactura)
                                                }}
                                                inputProps={{
                                                    'aria-labelledby': 'sadsada',
                                                }}
                                            />Estimación con factura
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* Fin tercera  parte del formulario  */}
                                <Grid item xs={12} md={12} data-html2canvas-ignore>
                                    <Button
                                        variant="primary"
                                        disabled={
                                            props?.procesando || !formik.dirty || !formik.isValid
                                        }
                                        onClick={(_: any) => {
                                            const tmp = fondeGarantia + '';
                                            const posString = tmp.indexOf('.');
                                            const fondoGarantiaSinDecimales = posString === -1 ? fondeGarantia : fondeGarantia.substring(0, posString);
                                            const fondo_g = (fondoGarantiaSinDecimales + '').length === 1 ? '0' + fondoGarantiaSinDecimales : fondoGarantiaSinDecimales;
                                            const estimadoConPorcentajeFondoGarantiaAplicado = (estimado === '' ? 0 : isNaN(+estimado) ? 0 : +estimado) * (+('0.' + fondo_g));
                                            props?.enAccion({
                                                numero_estimacion: numeroEstimacionDefinitiva,
                                                fecha_est_definitiva: fechaEstimacionDefinitiva,
                                                numero_ramo: ubicacion,
                                                id_tipo_contrato: tipoContrato,
                                                fecha_contrato: fechaContratoNumOperacion,
                                                modalidad_adjudicacion: modalidadLiquidacion,
                                                fecha_inicio: fechaPeriodoInicial,
                                                fecha_fin: fechaPeriodoFinal,
                                                importe: estimado,
                                                deducciones: deductivas,
                                                amortizacion: amortizacion,
                                                devolucion_retencion: devolucionRetencion,
                                                total_deducciones: deduccionesOtrosCargos,
                                                subtotal: subTotal,
                                                beneficio_social: retencionesImpuestos,
                                                impuesto_iva: iva,
                                                saldo_obra_ejecutada: saldoPagarObraEjecutada,
                                                alcance_liquido: alcanceLiquido,
                                                imdt: estimadoConPorcentajeFondoGarantiaAplicado,
                                                impuesto_srenta: impuestoSRenta === '' ? '0' : impuestoSRenta,
                                                inspeccion_obras: inspeccionObras === '' ? '0' : inspeccionObras,
                                                otros: otrosCargos === '' ? '0' : otrosCargos,
                                                descripcion_otros: otrosCargosDescripcion,
                                                retencion: deducciones,
                                                factura: estimacionConFactura,
                                                subTotal2,
                                                anticipo,
                                                fondeGarantia,
                                                iva_default,
                                                pep
                                            });
                                        }}
                                    >
                                        {_.isEmpty(props?.item)
                                            ? intl.formatMessage({ id: "general_guardar_estimacion_definitiva" })
                                            : intl.formatMessage({ id: "general_actualizar" })}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form.Group>
                    </FormikProvider>
                    <ModalComponent handleClose={handleisAlerCloseComentario} isOpen={isAlertOpenComentario} key={'Comentario'}>
                        <Grid container spacing={2} style={{ textAlign: 'center' }}>
                            <Grid item xs={12}>
                                <FormikProvider value={formik2}>
                                    <Form.Group className="mb-3 ">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <InputField
                                                    required
                                                    value={(iva_default + '') || ""}
                                                    name="iva_default"
                                                    onInput={(e: any) => {
                                                        const target = e.target as HTMLTextAreaElement;
                                                        formik2.setFieldValue("iva_default", target?.value || "");
                                                        setIva_default(+target?.value);
                                                    }}
                                                    label={'impuesto IVA'}
                                                    placeholder={'Ingrese el impuesto IVA'}
                                                    type="text"
                                                    id="iva_default"
                                                    formik={formik?.getFieldMeta("iva_default")}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Button
                                                    variant="primary"
                                                    disabled={!formik2.dirty || !formik2.isValid}
                                                    onClick={(e: any) => {
                                                        handleisAlerCloseComentario()
                                                    }}
                                                >
                                                    Aceptar
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Form.Group>
                                </FormikProvider>
                            </Grid>
                        </Grid>
                    </ModalComponent>
                </Grid>
            </Grid>
        </Grid>

    )
}

export default CaratulaEstimacionForm
