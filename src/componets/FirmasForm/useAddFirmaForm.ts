import { useEffect, useState } from 'react'
import { FormikTouched, setNestedObjectValues, useFormik } from 'formik'
import * as Yup from "yup";
import { useIntl } from 'react-intl'
import _ from 'lodash'
import type { AddFirmaFormProps } from './types';

const useAddFirmaForm = (props: AddFirmaFormProps) => {
    const intl = useIntl();

    const [firma, setFirma] = useState<string>('');
    const [foto, setFoto] = useState('');
    const formik = useFormik({
        initialValues: {
            firma: ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            firma: Yup.string()
                .min(4, intl.formatMessage({ id: "input_validation_min_4" }))
                .max(15, intl.formatMessage({ id: "input_validation_max_15" })),
        }),
    });

    const setImagen = (data: any) => {
        setFoto(data);
    }

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

        if (props?.item && props?.item?.clave) {
            formik.setFieldValue("firma", props?.item?.clave || "");
            setFirma(props?.item?.clave);
        }

        if (props?.item && props?.item?.imagen) {
            setFoto(props?.item?.imagen);
        }

        if (!_.isEmpty(props?.item)) {
            validate();
        }

    }, [props?.item]);



    return {
        intl,
        formik,
        firma,
        setFirma,
        foto,
        setImagen
    }
}

export default useAddFirmaForm
