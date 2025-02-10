import { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useIntl } from 'react-intl';


const usePasswordResetForm = () => {
  const intl = useIntl();
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    onSubmit: async (values) => { },
    validationSchema: Yup.object({
      password: Yup.string()
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, 'La contraseña debe contener un dígito del 1 al 9, una letra minúscula, una letra mayúscula, un carácter especial, sin espacios y debe tener entre 8 y 16 caracteres.')
        .min(
          4,
          intl.formatMessage({ id: 'input_validation_min_4' })
        )
        .max(
          15,
          intl.formatMessage({ id: 'input_validation_max_15' })
        )
        .required(intl.formatMessage({ id: 'input_validation_requerido' })),
      passwordConfirm: Yup.string().oneOf([Yup.ref('password')], intl.formatMessage({ id: 'input_validation_password_coincidir' }))
        .min(
          4,
          intl.formatMessage({ id: 'input_validation_min_4' })
        )
        .max(
          15,
          intl.formatMessage({ id: 'input_validation_max_15' })
        )
        .required(intl.formatMessage({ id: 'input_validation_requerido' }))
    }),
  });

  return {
    formik,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    intl
  }
}

export default usePasswordResetForm;
