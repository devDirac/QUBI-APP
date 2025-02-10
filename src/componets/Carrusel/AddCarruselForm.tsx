import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Grid } from "@mui/material";
import {
    FormikProvider,
    FormikTouched,
    setNestedObjectValues,
    useFormik
} from "formik";
import _ from "lodash";
import InputField from "../../componets/InputField";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import SelectMultipleAutoCompleteField from "../../componets/SelectMultipleAutoCompleteField/SelectMultipleAutoCompleteField";
import ModalComponent from "../../componets/Modal";
import DragAndDropField from "../../componets/DragAndDropField";
import AddPisoForm from "./AddPisoForm";

interface AddCarruselFormProps {
    item?: any
    procesando: boolean
    enAccion: (dta: any) => void
    pisos: any[]
    addLista: (dta: any) => void

}

const AddCarruselForm: React.FC<AddCarruselFormProps> = (
    props: AddCarruselFormProps
) => {

    const intl = useIntl();
    const [piso, setPiso] = useState<any[]>([]);
    const [isAlertOpenPiso, setIsAlertOpenPiso] = useState(false);
    const handleisAlertOpenPiso = () => setIsAlertOpenPiso(true);
    const handleisAlerClosePiso = () => setIsAlertOpenPiso(false);
    const [file, setFile] = useState<File[]>();

    const formik = useFormik({
        initialValues: {
            //  piso: []
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            //piso: Yup.array().min(1, intl.formatMessage({ id: "input_validation_requerido" })).required(intl.formatMessage({ id: "input_validation_requerido" }))
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
        if (props?.item && props?.item?.piso) {
            formik.setFieldValue("piso", props?.pisos.filter((obj: any) => (props?.item?.piso || []).includes(obj.id + '')).map((e: any) => {
                return {
                    label: e?.nombre,
                    value: e?.id
                }
            }));
            setPiso(props?.pisos.filter((obj: any) => (props?.item?.piso || []).includes(obj.id + '')).map((e: any) => {
                return {
                    label: e?.nombre,
                    value: e?.id
                }
            }))
        }
        if (!_.isEmpty(props?.item)) {
            validate();
        }
    }, [props?.item]);

    const saveImages = async (file_: any) => {
        setFile(file_?.[0]);
    };

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <Grid
                    item
                    xs={12}
                    className="bordersContainers"
                    style={{ backgroundColor: "#fff" }}
                >
                    <FormikProvider value={formik}>
                        <Form.Group className="mb-3 ">
                            <Grid container spacing={2}>
                                {_.isEmpty(props?.item) ? <Grid item xs={12} md={12}>
                                    <SelectMultipleAutoCompleteField
                                        label={intl.formatMessage({
                                            id: "input_play_list",
                                        })}
                                        placeholder={intl.formatMessage({
                                            id: "input_play_list_descripcion",
                                        })}
                                        defaultValue={piso}
                                        options={props?.pisos.map((e: any) => {
                                            return {
                                                label: e?.nombre,
                                                value: e?.id
                                            }
                                        })}
                                        btnPlus
                                        onAdd={() => {
                                            handleisAlertOpenPiso();
                                        }}
                                        name="piso"
                                        id="piso"
                                        required
                                        onInput={(e: any) => {
                                            formik.setFieldValue("piso", e);
                                            setPiso(e);
                                        }}
                                        formik={formik?.getFieldMeta("piso")}
                                    />
                                    <br />
                                </Grid> : null}
                                <Grid xs={12}>
                                    <DragAndDropField acepted={{
                                        "image/jpeg": [],
                                        "image/jpg": [],
                                        "image/png": [],
                                        "video/*": [],
                                    }} multiple={false} muestraBoton={false} onAction={(files: any) => saveImages(files)} />
                                </Grid>
                                <Grid item xs={12} md={12} style={{ textAlign: 'right' }}>
                                    <Button
                                        variant="primary"
                                        disabled={
                                            props?.procesando || (_.isEmpty(props?.item) ? _.isEmpty(file) : false)
                                        }
                                        onClick={(e: any) => {
                                            props?.enAccion({ piso, file });
                                        }}
                                    >
                                        {_.isEmpty(props?.item)
                                            ? intl.formatMessage({ id: "general_guardar" })
                                            : intl.formatMessage({ id: "general_actualizar" })}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form.Group>
                    </FormikProvider>
                    <ModalComponent handleClose={handleisAlerClosePiso} isOpen={isAlertOpenPiso} key={'formPiso'}>
                        <AddPisoForm procesando={props?.procesando} enAccion={(d) => {
                            handleisAlerClosePiso();
                            props?.addLista(d)
                        }} />
                    </ModalComponent>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AddCarruselForm;
