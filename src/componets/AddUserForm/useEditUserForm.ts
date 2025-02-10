import { useMaterialUIController } from "context";
import { useEffect, useState } from 'react';
import { FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { StoreType } from "../../types/geericTypes";
import type { EditUserFormProps } from "./editUserForm";
import { useIntl } from "react-intl";

export const useEditUserForm = (props: EditUserFormProps) => {
    const intl = useIntl();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [foto, setFoto] = useState('');
    const [usuario, setUsuario] = useState('');
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [tipo_usuario, setTipo_Usuario] = useState<string>('');

    const tipoUsuarios = useSelector(
        (state: StoreType) => state?.app?.catalogos?.['apm_tipo_usuarios']
    );

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            telefono: "",
            usuario: ""
        },
        onSubmit: async (values) => {},
        validationSchema: Yup.object({
            name: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(150, intl.formatMessage({ id: 'input_validation_max_150' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            email: Yup.string().email(intl.formatMessage({ id: 'input_validation_formato_invalido' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            telefono: Yup.string().matches(/^[0-9]+$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            usuario: Yup.string().min(5, intl.formatMessage({ id: 'input_validation_min_4' })).max(25, intl.formatMessage({ id: 'input_validation_max_25' })).required(intl.formatMessage({ id: 'input_validation_requerido' }))
        }),
    });

    const setImagen = (data: any) => {
        setFoto(data);
    }

    const validate = async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
        } else {
            formik.setTouched(setNestedObjectValues<FormikTouched<any>>(errors, true));
        }
    }
    useEffect(() => {
        if (props?.item && props?.item?.usuario) {
            formik.setFieldValue("usuario", props?.item?.usuario || '');
            setUsuario(props?.item?.usuario || '');
        }
        if (props?.item && props?.item?.nombre) {
            formik.setFieldValue("name", props?.item?.nombre || '');
            setName(props?.item?.nombre || '');
        }
        if (props?.item && props?.item?.correo) {
            formik.setFieldValue("email", props?.item?.correo || '');
            setEmail(props?.item?.correo || '');
        }
        if (props?.item && props?.item?.['Teléfono']) {
            formik.setFieldValue("telefono", props?.item?.['Teléfono'] || '');
            setTelefono(props?.item?.['Teléfono'] || '');
        }
        if (props?.item && props?.item?.foto) {
            setImagen(props?.item?.foto || '');
        }
        if (props?.item && props?.item?.id_tipo_usuario) {
            formik.setFieldValue("tipo_usuario", props?.item?.id_tipo_usuario || '');
            setTipo_Usuario(props?.item?.id_tipo_usuario || '');
        }
        validate();
    }, [props?.item]);

    return {
        formik,
        darkMode,
        usuario,
        setUsuario,
        name,
        setName,
        email,
        setEmail,
        telefono,
        setTelefono,
        foto,
        setImagen,
        tipoUsuarios,
        tipo_usuario,
        setTipo_Usuario
    }
}