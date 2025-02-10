import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useMaterialUIController } from "context";
import { useIntl } from "react-intl";

export const useLoginForm = () => {
  const intl = useIntl();
  const [controller] = useMaterialUIController();
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const {
    darkMode
  } = controller;
  
  const navigate = useNavigate();
  const [valueCaptcha, setValueCaptcha] = useState<any>(null);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const formik = useFormik({
    initialValues: {
      user: "",
      password: "",
    },
    onSubmit: async (values) => { },
    validationSchema: Yup.object({
      user: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
      password: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(50, intl.formatMessage({ id: 'input_validation_max_50' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
    }),
  });

  const onChange = (value: any) => {
    setValueCaptcha(value)
    setRecaptchaToken(value);
  }

  return {
    formik,
    user,
    setUser,
    password,
    setPassword,
    navigate,
    darkMode,
    intl,
    onChange,
    valueCaptcha,
    setRecaptchaToken
  }
}