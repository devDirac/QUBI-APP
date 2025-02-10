import { useFormik } from "formik";
import { useState } from "react";
import { useIntl } from "react-intl";
import * as Yup from "yup";

export const usePasswordRecover = () => {
    const intl = useIntl();
    const [user, setUser] = useState<string>("");
    const formik = useFormik({
        initialValues: {
            user: ""
        },
        onSubmit: async (values) => {},
        validationSchema: Yup.object({
            user: Yup.string()
                .min(
                    4,
                    intl.formatMessage({ id: 'input_validation_min_4' })
                )
                .max(
                    50,
                    intl.formatMessage({ id: 'input_validation_max_50' })
                )
                .required("Requerido")
        }),
    });

    return {
        user,
        setUser,
        formik,
        intl
    }
}