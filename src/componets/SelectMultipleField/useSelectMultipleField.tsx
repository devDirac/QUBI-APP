import { useField } from "formik";
import type { SelectMultipleFieldProps } from "./types";
import { useState } from "react";
import { useMaterialUIController } from "context";
import {  useTheme } from '@mui/material/styles';

const useSelectMultipleField = (props: SelectMultipleFieldProps) => {
    const [field, meta] = useField(props);
    const [didFocus, setDidFocus] = useState(false);
    const handleFocus = () => setDidFocus(true);
    const showFeedback = (!!didFocus && !(props?.value || []).length) || meta.touched;
    const isValid = meta.error ? 'invalid' : 'valid';
    const errorMessage = meta.error ? meta.error : '';
    const { formik,btnPlus } = props;
    const esError = formik?.touched && formik?.error;
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const newPros = Object.assign({}, props);
    delete newPros.btnPlus;
    delete newPros.onAdd;
    const theme = useTheme();
    return {
        showFeedback,
        isValid,
        handleFocus,
        field,
        errorMessage,
        formik,
        darkMode,
        esError,
        btnPlus,
        newPros,
        theme
    }
}

export default useSelectMultipleField
