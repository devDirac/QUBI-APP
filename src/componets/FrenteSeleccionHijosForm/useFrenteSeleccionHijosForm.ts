import { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useIntl } from 'react-intl';
import _ from 'lodash';
import type { FrenteSeleccionHijosFormProps } from './types';


const useFrenteSeleccionHijosForm = (props: FrenteSeleccionHijosFormProps) => {
    const intl = useIntl();
    const [id_frente, setId_frente] = useState('');
    const [isOpenHistorial, setOpenHistorial] = useState(false);
    const handleOpenHistorial = () => setOpenHistorial(true);
    const handleCloseHistorial = () => setOpenHistorial(false);
    
    const formik = useFormik({
        initialValues: {
            "id_frente": "",
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            id_frente: Yup.string().required(intl.formatMessage({ id: "input_validation_requerido" })),
        }),
    });
    
    return {
        formik,
        intl,
        id_frente,
        setId_frente,
        handleOpenHistorial,
        handleCloseHistorial,
        isOpenHistorial
    }
}

export default useFrenteSeleccionHijosForm
