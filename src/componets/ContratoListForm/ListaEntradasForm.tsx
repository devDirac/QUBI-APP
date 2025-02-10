import { Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material'
import env from "react-dotenv";
import InputField from '../../componets/InputField';
import { FormikProvider, useFormik } from 'formik'
import React, { useState } from 'react'
import { useIntl } from 'react-intl';
import * as Yup from "yup";

interface ListaEntradasFormProps {
    entradas: any
    enAccion: (data: any) => void
}

const ListaEntradasForm: React.FC<ListaEntradasFormProps> = (props: ListaEntradasFormProps) => {
    const intl = useIntl();
    const [cantidad, setCantidad] = useState<string>('');
    const [precio, setPrecio] = useState<string>('');
    const [isChecked, setChecked] = useState<boolean>(false);
    const formik = useFormik({
        initialValues: {
            "entrada": ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            cantidad: Yup.string()
                .max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' }))
                .matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' }))
                .required(intl.formatMessage({ id: 'input_validation_requerido' })).test("GratherThanFin1", 'la cantidad a suministrar no puede ser mayor a la cantidad disponible', (value) => {
                    const date2 = +value;
                    return value === '' ? true : date2 <= +props?.entradas?.cantidad;
                }),
            precio: Yup.string()
                .max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' }))
                .matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' }))
                .required(intl.formatMessage({ id: 'input_validation_requerido' })),
        }),
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        //props?.onCheck(event.target.checked, { id_usuario: props?.usuario?.id, id_perfil, id_puesto, id_contrato: props?.contratoId, orden, id_landin_page });
        props?.enAccion(
            {
                checked: event.target.checked,
                cantidad,
                precio,
                id: props?.entradas?.id
            }
        );
    };

    return (
        <Grid container style={{ width: '100%', border: 'solid 1px rgb(123, 128, 154)', padding: '28px', borderRadius: 5 }}>
            <Grid item xs={12} md={12}>
                <p>fecha entrada: {props?.entradas?.fecha_entrada}</p>
                <p>cantidad disponible capturada en esta entrada: {props?.entradas?.cantidad}</p>
                <p>Documento de la entrada:
                    <a
                        target="_blank"
                        href={`${env.API_URL_DOCUMENTOS}/storage/app/${props?.entradas?.path || ""}`}>
                        ver documento
                    </a>
                </p>
            </Grid>
            <Grid item xs={12} md={12}>
                <FormikProvider value={formik}>
                    <Grid container >

                        <Grid item xs={12} md={12}>
                            <InputField
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
                            <FormGroup>
                                <FormControlLabel control={<Checkbox checked={isChecked} disabled={
                                    !formik.dirty || !formik.isValid
                                } onChange={(v) => {
                                    handleChange(v)

                                }} />} label="Guardar" />
                            </FormGroup>
                            {/* <Button
                                variant="primary"
                                disabled={
                                    !formik.dirty || !formik.isValid
                                }
                                onClick={(e: any) => {
                                    props?.enAccion(
                                        {

                                            cantidad,
                                            precio
                                        }
                                    );
                                }}
                            >
                                {intl.formatMessage({ id: "general_guardar" })}
                            </Button> */}
                        </Grid>
                    </Grid>
                </FormikProvider>




            </Grid>
        </Grid>
    )
}

export default ListaEntradasForm
