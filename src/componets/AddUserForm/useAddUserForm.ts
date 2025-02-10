import { useMaterialUIController } from "context";
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { StoreType } from "../../types/geericTypes";
import _ from "lodash";
import type { AddUserFormProps } from ".";
import { useIntl } from "react-intl";

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
    const [tipo_usuario, setTipo_Usuario] = useState<string>('');
    const [obra, setTObra] = useState<string>('');
    const [id_perfil, setId_perfil] = useState<string>('');
    const [id_puesto, setId_puesto] = useState<string>('');
    const [id_landin_page, setId_landin_page] = useState<string>('');
    const [orden, setOrden] = useState<string>('');
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    const espacio = useSelector(
        (state: StoreType) => state?.app?.espacio || null
    );

    const tipoUsuarios = useSelector(
        (state: StoreType) => state?.app?.catalogos?.['apm_tipo_usuarios']
    );

    const catalogoPerfiles = useSelector(
        (state: StoreType) => {
            const objects = state?.app?.catalogos?.['apm_cat_perfiles_cliente'] || [];
            return _.uniqBy(objects, 'nombre');
        }
    );

    const catalogoPuestos = useSelector(
        (state: StoreType) => {
            return (state?.app?.catalogos?.['apm_cat_puestos'] || []);
        }
    );

    const catalogoPaginasInicio = useSelector(
        (state: StoreType) => {
            return (state?.app?.catalogos?.['apm_cat_pagina_inicio'] || []);
        }
    );

    const catalogoProyectos = useSelector(
        (state: StoreType) => {
            if (!espacio) {
                return (state?.app?.catalogos?.['apm_obras'] || []).filter((e: any) => props?.obra ? e?.id === +props?.obra : true);
            }
            return (state?.app?.catalogos?.['apm_obras'] || []).filter((e: any) => e?.id === espacio?.id || (props?.obra && (e?.id === +props?.obra)));
        }
    );

    const formik = useFormik({
        initialValues: !props?.moduloContrato ? {
            name: "",
            email: "",
            password: "",
            password_confirm: "",
            telefono: "",
            empresa: "",
            usuario: "",
            tipo_usuario: "",
            obra: "",
        } : {
            name: "",
            email: "",
            password: "",
            password_confirm: "",
            telefono: "",
            empresa: "",
            usuario: "",
            tipo_usuario: "",
            obra: "",
            id_perfil: "",
            id_puesto: "",
            id_landin_page: "",
            orden: ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object(!props?.moduloContrato ? {
            name: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(150, intl.formatMessage({ id: 'input_validation_max_150' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            email: Yup.string().email(intl.formatMessage({ id: 'input_validation_formato_invalido' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            password: Yup.string().matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, 'La contraseña debe contener un dígito del 1 al 9, una letra minúscula, una letra mayúscula, un carácter especial, sin espacios y debe tener entre 8 y 16 caracteres.').min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(50, intl.formatMessage({ id: 'input_validation_max_50' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            password_confirm: Yup.string().oneOf([Yup.ref('password')], intl.formatMessage({ id: 'input_validation_password_coincidir' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            telefono: Yup.string().min(10, intl.formatMessage({ id: 'input_validation_min_10_digitos' })).max(10, intl.formatMessage({ id: 'input_validation_max_10_digitos' })).matches(/^[0-9]+$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            empresa: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(150, intl.formatMessage({ id: 'input_validation_max_150' })),
            usuario: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(25, intl.formatMessage({ id: 'input_validation_max_25' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            tipo_usuario: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            obra: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' }))
        } : {
            name: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(150, intl.formatMessage({ id: 'input_validation_max_150' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            email: Yup.string().email(intl.formatMessage({ id: 'input_validation_formato_invalido' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            password: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(50, intl.formatMessage({ id: 'input_validation_max_50' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            password_confirm: Yup.string().oneOf([Yup.ref('password')], intl.formatMessage({ id: 'input_validation_password_coincidir' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            telefono: Yup.string().min(10, intl.formatMessage({ id: 'input_validation_min_10_digitos' })).max(10, intl.formatMessage({ id: 'input_validation_max_10_digitos' })).matches(/^[0-9]+$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            empresa: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(150, intl.formatMessage({ id: 'input_validation_max_150' })),
            usuario: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(25, intl.formatMessage({ id: 'input_validation_max_25' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            tipo_usuario: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            obra: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_perfil: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_puesto: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_landin_page: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            orden: Yup.string().matches(/^[0-9]+$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
        }),
    });

    const setImagen = (data: any) => {
        setFoto(data);
    }

    useEffect(() => {
        if (props?.resetForm) {
            setUsuario('');
            setName('');
            setEmail('');
            setPasword('');
            setPasword_confirm('');
            setTelefono('');
            setTipo_Usuario('');
            setTObra('');
            setId_perfil('');
            setId_puesto('');
            setId_landin_page('');
            setOrden('');
            setFoto('');
            setEmpresa('')
            formik.resetForm();
        }
    }, [props?.resetForm]);


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
        tipoUsuarios,
        tipo_usuario,
        setTipo_Usuario,
        catalogoPerfiles,
        catalogoPuestos,
        catalogoPaginasInicio,
        id_perfil,
        id_puesto,
        id_landin_page,
        orden,
        setId_perfil,
        setId_puesto,
        setId_landin_page,
        setOrden,
        catalogoProyectos,
        obra,
        setTObra,
        empresa,
        setEmpresa
    }
}