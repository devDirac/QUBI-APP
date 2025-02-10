import React from 'react'
import type { AddFirmaFormProps } from './types'
import './style.scss'
import { Grid } from '@mui/material'
import { FormikProvider } from 'formik'
import { Button, Form } from 'react-bootstrap'
import InputField from '../../componets/InputField'
import CampoAvatar from '../../componets/CampoAvatar/CampoAvatar'
import _ from 'lodash'
import useAddFirmaForm from './useAddFirmaForm'

const AddFirmaForm: React.FC<AddFirmaFormProps> = (props: AddFirmaFormProps) => {
    const {
        intl,
        formik,
        firma,
        setFirma,
        foto,
        setImagen
    } = useAddFirmaForm(props);
    
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
                                    <InputField
                                        required
                                        value={firma || ""}
                                        name="firma"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("firma", target?.value || "");
                                            setFirma(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_firma" })}
                                        placeholder={intl.formatMessage({
                                            id: "input_firma_descripcion",
                                        })}
                                        type="password"
                                        id="firma"
                                        formik={formik?.getFieldMeta("firma")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12} style={{ textAlign: 'left' }}>
                                    <h5>Imagen</h5>
                                    <CampoAvatar foto={foto} alt={''} onChangeImage={setImagen} />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Button
                                        variant="primary"
                                        disabled={
                                            props?.procesando || !formik.dirty || !formik.isValid || _.isEmpty(foto)
                                        }
                                        onClick={(e: any) => {
                                            props?.enAccion({
                                                ...{
                                                    clave: firma,
                                                    imagen: foto
                                                }, ...props?.item?.id ? { id: props?.item?.id } : {}
                                            });
                                        }}
                                    >
                                        {props?.item?.id ? intl.formatMessage({ id: "general_actualizar" }) : intl.formatMessage({ id: "general_guardar" })}
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

export default AddFirmaForm