import React from "react";
import { FormikProvider } from "formik";
import { Grid } from "@mui/material";
import InputField from "../InputField";
import { Alert, Button, Form } from "react-bootstrap";
import CampoSwitch from "../CampoSwitch";
import type { AddChartsFormProps } from "./types";
import { useAddChartsForm } from "./useAddChartsForm";
import SelectField from "../SelectField";
import { useIntl } from "react-intl";
import './style.scss';
const AddChartsForm: React.FC<AddChartsFormProps> = (
    props: AddChartsFormProps
) => {
    const intl = useIntl();
    const { 
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
     } = useAddChartsForm(props);

    return (
        <div>
            <Alert color="info" dismissible show={visible} onClose={onDismiss}>
                {intl.formatMessage({ id: 'add_charts_component_info_1' })} <br></br>
                {intl.formatMessage({ id: 'add_charts_component_info_2' })} <br></br>
                {intl.formatMessage({ id: 'add_charts_component_info_3' })} <br></br>
                {intl.formatMessage({ id: 'add_charts_component_info_4' })} <br></br>
                {intl.formatMessage({ id: 'add_charts_component_info_5' })} {'[ { "total": 200 } ]'}
            </Alert>
            <Alert color="warning" dismissible show={visible_} onClose={onDismiss_}>
                {intl.formatMessage({ id: 'add_charts_component_recomienda' })}
            </Alert>
            <FormikProvider value={formik}>
                <Form.Group className="mb-3 form-control ">
                    <Grid
                        container
                        direction={"row"}
                        style={{
                            paddingTop: "20px",
                            paddingLeft: "50px",
                            paddingRight: "50px",
                        }}
                    >
                        <Grid item xs={12}>
                            <InputField
                                required
                                value={titulo || ''}
                                name="titulo"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("titulo", target?.value || '');
                                    setTitulo(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_titulo' })}
                                placeholder={intl.formatMessage({ id: 'input_titulo_descripcion' })}
                                type="text"
                                id="titulo"
                                formik={formik?.getFieldMeta('titulo')}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12}>
                            <InputField
                                required
                                value={scriptSQL || ''}
                                name="scriptSQL"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("scriptSQL", target?.value);
                                    setScriptSQL(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_query' })}
                                placeholder={intl.formatMessage({ id: 'input_query_descripcion' })}
                                type="text"
                                id="scriptSQL"
                                formik={formik?.getFieldMeta('scriptSQL')}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12}>
                            <SelectField
                                label={intl.formatMessage({ id: 'input_tipo_grafica' })}
                                value={tipoGrafica}
                                options={tiposGraficas}
                                name="tipoGrafica"
                                id="tipoGrafica"
                                required
                                formik={formik?.getFieldMeta('tipoGrafica')}
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("tipoGrafica", target?.value || '');
                                    setTipoGrafica(target?.value);
                                    const temp = target?.value;
                                    if (temp === 'barras') {
                                        setRellenaEspacioEnLineal(false);
                                        setRellenaEspacioEnLinealDisabled(true);
                                        setEsApilado(false);
                                        setEsApiladoDisabled(false);
                                        setEsVertical(false);
                                        setEsVerticalDisabled(false);
                                    }
                                    if (temp === 'lineas') {
                                        setRellenaEspacioEnLineal(false);
                                        setRellenaEspacioEnLinealDisabled(false);
                                        setEsApilado(false);
                                        setEsApiladoDisabled(false);
                                        setEsVertical(false);
                                        setEsVerticalDisabled(false);
                                    }
                                    if (temp === 'pay') {
                                        setRellenaEspacioEnLineal(false);
                                        setRellenaEspacioEnLinealDisabled(true);
                                        setEsApilado(false);
                                        setEsApiladoDisabled(true);
                                        setEsVertical(false);
                                        setEsVerticalDisabled(true);
                                    }
                                    if (temp === 'dona') {
                                        setRellenaEspacioEnLineal(false);
                                        setRellenaEspacioEnLinealDisabled(true);
                                        setEsApilado(false);
                                        setEsApiladoDisabled(true);
                                        setEsVertical(false);
                                        setEsVerticalDisabled(true);
                                    }
                                    if (temp === 'polar') {
                                        setRellenaEspacioEnLineal(false);
                                        setRellenaEspacioEnLinealDisabled(true);
                                        setEsApilado(false);
                                        setEsApiladoDisabled(true);
                                        setEsVertical(false);
                                        setEsVerticalDisabled(true);
                                    }
                                    if (temp === 'radar') {
                                        setRellenaEspacioEnLineal(false);
                                        setRellenaEspacioEnLinealDisabled(true);
                                        setEsApilado(false);
                                        setEsApiladoDisabled(true);
                                        setEsVertical(false);
                                        setEsVerticalDisabled(true);
                                    }
                                    if (temp === 'tabla') {
                                        setRellenaEspacioEnLineal(false);
                                        setRellenaEspacioEnLinealDisabled(true);
                                        setEsApilado(false);
                                        setEsApiladoDisabled(true);
                                        setEsVertical(false);
                                        setEsVerticalDisabled(true);
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ padding: "12px", textAlign: "center" }}>
                            <CampoSwitch
                                key={"switch1"}
                                disabled={esVerticalDisabled}
                                label={intl.formatMessage({ id: 'input_es_vertical_pregunta' })}
                                value={esVertical}
                                onAction={(v) => setEsVertical(v)}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12} style={{ padding: "12px", textAlign: "center" }}>
                            <CampoSwitch
                                key={"switch2"}
                                disabled={esApiladoDisabled}
                                label={intl.formatMessage({ id: 'input_es_apilada_pregunta' })}
                                value={esApilado}
                                onAction={(v) => setEsApilado(v)}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12} style={{ padding: "12px", textAlign: "center" }}>
                            <CampoSwitch
                                key={"switch3"}
                                disabled={rellenaEspacioEnLinealDisabled}
                                label={intl.formatMessage({ id: 'input_rellena_espacios_pregunta' })}
                                value={rellenaEspacioEnLineal}
                                onAction={(v) => setRellenaEspacioEnLineal(v)}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12}>
                            <SelectField
                                label={intl.formatMessage({ id: 'input_tamano_grafica' })}
                                value={tamanoGrafica}
                                options={tamanosGraficas}
                                name="tamanoGrafica"
                                id="tamanoGrafica"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("tamanoGrafica", target?.value || '');
                                    setTamanoGrafica(target?.value);
                                }}
                                formik={formik?.getFieldMeta('tamanoGrafica')}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            style={{ padding: "5px", paddingTop: "0", paddingBottom: "0" }}
                        >
                            <Button
                                variant="primary"
                                disabled={procesando || !formik.dirty || !formik.isValid}
                                onClick={(e) => {
                                    handleSubmit(e);
                                }}
                            >
                                {intl.formatMessage({ id: 'general_alta' })}
                            </Button>
                        </Grid>
                    </Grid>
                </Form.Group>
            </FormikProvider>
        </div>
    );
};

export default AddChartsForm;
