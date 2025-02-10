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
import * as Yup from "yup";

interface AddPisoFormProps {
    item?: any
    procesando: boolean
    enAccion: (dta: any) => void
}

const AddPisoForm: React.FC<AddPisoFormProps> = (
    props: AddPisoFormProps
) => {

    const intl = useIntl();
    const [piso, setPiso] = useState<any>('');


    const formik = useFormik({
        initialValues: {
            piso: ''
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            piso: Yup.string()
                .min(4, intl.formatMessage({ id: "input_validation_min_4" }))
                .max(150, intl.formatMessage({ id: "input_validation_max_150" })),
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
            formik.setFieldValue("piso", props?.item?.piso ? props?.item?.piso + "" : "");
            setPiso(props?.item?.piso ? props?.item?.piso + "" : "");
            formik.setFieldTouched('piso', true)
        }

        if (!_.isEmpty(props?.item)) {
            validate();
        }
    }, [props?.item]);



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
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={piso || ""}
                                        name="piso"
                                        autoFocus={!_.isEmpty(props?.item)}
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("piso", target?.value || "");
                                            setPiso(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_play_list" })}
                                        placeholder={'Ingrese el nombre de la lista de reproducción'}
                                        type="text"
                                        id="piso"
                                        formik={formik?.getFieldMeta("piso")}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12} style={{ textAlign: 'right' }}>
                                    <Button
                                        variant="primary"
                                        disabled={
                                            props?.procesando || !formik.dirty || !formik.isValid
                                        }
                                        onClick={(e: any) => {
                                            props?.enAccion({ piso });
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
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AddPisoForm;
