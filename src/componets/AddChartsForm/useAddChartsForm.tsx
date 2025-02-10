import { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import type { AddChartsFormProps } from './types';
import { useIntl } from 'react-intl';

export const useAddChartsForm = ( props: AddChartsFormProps ) => {
    const intl = useIntl();
    const [titulo, setTitulo] = useState("");
    const [scriptSQL, setScriptSQL] = useState("");
    const [procesando, setProcesando] = useState(false);
    const [tipoGrafica, setTipoGrafica] = useState<string>("");
    const [tamanoGrafica, setTamanoGrafica] = useState<string>("");
    const [rellenaEspacioEnLineal, setRellenaEspacioEnLineal] = useState<boolean>(false);
    const [esApilado, setEsApilado] = useState<boolean>(false);
    const [esVertical, setEsVertical] = useState<boolean>(false);
    const [rellenaEspacioEnLinealDisabled, setRellenaEspacioEnLinealDisabled] = useState<boolean>(true);
    const [esApiladoDisabled, setEsApiladoDisabled] = useState<boolean>(true);
    const [esVerticalDisabled, setEsVerticalDisabled] = useState<boolean>(true);

    const tiposGraficas = [
        { label: intl.formatMessage({ id: 'add_charts_hook_tipos_graficas_barras' }), value: 'barras' },
        { label: intl.formatMessage({ id: 'add_charts_hook_tipos_graficas_lineas' }), value: 'lineas' },
        { label: intl.formatMessage({ id: 'add_charts_hook_tipos_graficas_pay' }), value: 'pay' },
        { label: intl.formatMessage({ id: 'add_charts_hook_tipos_graficas_dona' }), value: 'dona' },
        { label: intl.formatMessage({ id: 'add_charts_hook_tipos_graficas_polar' }), value: 'polar' },
        { label: intl.formatMessage({ id: 'add_charts_hook_tipos_graficas_radar' }), value: 'radar' },
        { label: intl.formatMessage({ id: 'add_charts_hook_tipos_graficas_tabla' }), value: 'tabla' },
        { label: intl.formatMessage({ id: 'add_charts_hook_tipos_graficas_dato_unico' }), value: 'indicador' },
    ];

    const tamanosGraficas = [
        { label: intl.formatMessage({ id: 'add_charts_hook_tamano_grafica_1' }), value: '12' },
        { label: intl.formatMessage({ id: 'add_charts_hook_tamano_grafica_2' }), value: '6' },
        { label: intl.formatMessage({ id: 'add_charts_hook_tamano_grafica_3' }), value: '3' },
        { label: intl.formatMessage({ id: 'add_charts_hook_tamano_grafica_4' }), value: '4' },
        { label: intl.formatMessage({ id: 'add_charts_hook_tamano_grafica_5' }), value: '2' }
    ];

    const formik = useFormik({
        initialValues: {
            titulo: "",
            scriptSQL: "",
            tipoGrafica: "",
            tamanoGrafica: ""
        },
        onSubmit: async (values) => {
            
        },
        validationSchema: Yup.object({
            titulo: Yup.string()
                .min(4, intl.formatMessage({ id: 'input_validation_min_4' }))
                .max(150, intl.formatMessage({ id: 'input_validation_max_150' }))
                .required(intl.formatMessage({ id: 'input_validation_requerido' })),
            scriptSQL: Yup.string()
                .min(10, intl.formatMessage({ id: 'input_validation_min_10' }))
                .max(250, intl.formatMessage({ id: 'input_validation_max_250' }))
                .required(intl.formatMessage({ id: 'input_validation_requerido' })),
            tipoGrafica: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            tamanoGrafica: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
        }),
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setProcesando(true);
        props.enAccion({
            titulo,
            scriptSQL,
            esVertical: esVertical ? 1 : 0,
            esApilado: esApilado ? 1 : 0,
            rellenaEspacioEnLineal: rellenaEspacioEnLineal ? 1 : 0,
            tipoGrafica: tipoGrafica,
            size: tamanoGrafica,
        });
        setTimeout(() => {
            setProcesando(false);
        }, 3000);
    };

    const [visible, setVisible] = useState<any>(true);

    const onDismiss = () => setVisible(false);

    const [visible_, setVisible_] = useState<any>(true);

    const onDismiss_ = () => setVisible_(false);

    return {
        visible,
        onDismiss,
        visible_,
        onDismiss_,
        formik,
        titulo,
        setTitulo,
        scriptSQL,
        setScriptSQL,
        tipoGrafica,
        tiposGraficas,
        setTipoGrafica,
        setRellenaEspacioEnLineal,
        setRellenaEspacioEnLinealDisabled,
        setEsApilado,
        setEsApiladoDisabled,
        setEsVertical,
        setEsVerticalDisabled,
        esVerticalDisabled,
        esVertical,
        esApiladoDisabled,
        esApilado,
        rellenaEspacioEnLinealDisabled,
        rellenaEspacioEnLineal,
        tamanoGrafica,
        tamanosGraficas,
        setTamanoGrafica,
        procesando,
        handleSubmit

    }
}