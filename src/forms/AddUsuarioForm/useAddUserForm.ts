import { useMaterialUIController } from "context";
import env from "react-dotenv";
import { useEffect, useState } from 'react';
import { FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import * as Yup from "yup";
import _ from "lodash";
import { useIntl } from "react-intl";
import { AddUserFormProps } from "./AddUsuarioForm";

export const useAddUserForm = (props: AddUserFormProps) => {
    const intl = useIntl();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPasword] = useState('');
    const [password_confirm, setPasword_confirm] = useState('');
    const [telefono, setTelefono] = useState('');
    const [foto, setFoto] = useState('');
    const [empresa, setEmpresa] = useState<string>('');
    const [usuario, setUsuario] = useState('');
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;



    const formik = useFormik({
        initialValues: props?.item ? {
            name: "",
            email: "",
            //password: "",
            //password_confirm: "",
            telefono: "",
            empresa: "",
            usuario: "",
        } : {
            name: "",
            email: "",
            password: "",
            password_confirm: "",
            telefono: "",
            empresa: "",
            usuario: "",
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object(
            props?.item ? {
                name: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(150, intl.formatMessage({ id: 'input_validation_max_150' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
                email: Yup.string().email(intl.formatMessage({ id: 'input_validation_formato_invalido' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
                //password: Yup.string().matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, 'La contraseña debe contener un dígito del 1 al 9, una letra minúscula, una letra mayúscula, un carácter especial, sin espacios y debe tener entre 8 y 16 caracteres.').min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(50, intl.formatMessage({ id: 'input_validation_max_50' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
                //password_confirm: Yup.string().oneOf([Yup.ref('password')], intl.formatMessage({ id: 'input_validation_password_coincidir' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
                telefono: Yup.string().min(10, intl.formatMessage({ id: 'input_validation_min_10_digitos' })).max(10, intl.formatMessage({ id: 'input_validation_max_10_digitos' })).matches(/^[0-9]+$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
                empresa: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(150, intl.formatMessage({ id: 'input_validation_max_150' })),
                usuario: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(25, intl.formatMessage({ id: 'input_validation_max_25' })).required(intl.formatMessage({ id: 'input_validation_requerido' }))
            } : {
                name: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(150, intl.formatMessage({ id: 'input_validation_max_150' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
                email: Yup.string().email(intl.formatMessage({ id: 'input_validation_formato_invalido' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
                password: Yup.string().matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, 'La contraseña debe contener un dígito del 1 al 9, una letra minúscula, una letra mayúscula, un carácter especial, sin espacios y debe tener entre 8 y 16 caracteres.').min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(50, intl.formatMessage({ id: 'input_validation_max_50' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
                password_confirm: Yup.string().oneOf([Yup.ref('password')], intl.formatMessage({ id: 'input_validation_password_coincidir' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
                telefono: Yup.string().min(10, intl.formatMessage({ id: 'input_validation_min_10_digitos' })).max(10, intl.formatMessage({ id: 'input_validation_max_10_digitos' })).matches(/^[0-9]+$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
                empresa: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(150, intl.formatMessage({ id: 'input_validation_max_150' })),
                usuario: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(25, intl.formatMessage({ id: 'input_validation_max_25' })).required(intl.formatMessage({ id: 'input_validation_requerido' }))
            }
        ),
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

        if (props?.item && props?.item?.name) {
            formik.setFieldValue("name", props?.item?.name || '');
            setName(props?.item?.name || '');
        }

        if (props?.item && props?.item?.email) {
            formik.setFieldValue("email", props?.item?.email || '');
            setEmail(props?.item?.email || '');
        }

        if (props?.item && props?.item?.telefono) {
            formik.setFieldValue("telefono", props?.item?.telefono || '');
            setTelefono(props?.item?.telefono || '');
        }

        if (props?.item && props?.item?.empresa) {
            formik.setFieldValue("empresa", props?.item?.empresa || '');
            setEmpresa(props?.item?.empresa || '');
        }

        if (props?.item && props?.item?.usuario) {
            formik.setFieldValue("usuario", props?.item?.usuario || '');
            setUsuario(props?.item?.usuario || '');
        }

        if (props?.item && props?.item?.foto) {
            setFoto(`${props?.item?.foto}`)
        }

        if (props?.item) {
            validate();
        }


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
        password,
        setPasword,
        password_confirm,
        setPasword_confirm,
        telefono,
        setTelefono,
        foto,
        setImagen,
        empresa,
        setEmpresa
    }
}