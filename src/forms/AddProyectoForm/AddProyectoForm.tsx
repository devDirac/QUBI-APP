import React, { useCallback, useContext, useEffect, useState } from 'react';
import env from "react-dotenv";
import { Backdrop, CircularProgress, Grid } from '@mui/material';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../../componets/InputField';
import SelectField from '../../componets/SelectField';
import CampoAvatar from '../../componets/CampoAvatar/CampoAvatar';
import _ from 'lodash';
import ModalComponent from '../../componets/Modal';
import CampoAutoCompleteCoordenadas from '../../componets/CampoAutoCompleteCoordenadas';
import { GoogleMap, Marker } from '@react-google-maps/api';
import * as Yup from "yup";
import { useIntl } from 'react-intl';

const AddProyectoForm: React.FC<any> = (props: any) => {

    const intl = useIntl();

    const [test1, setTest1] = useState('');
    const [obra, setObra] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [info, setInfo] = useState('');
    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');
    const [foto, setFoto] = useState('');
    const [file, setFile] = useState('');

    const [isAlertOpen_, setIsAlertOpen_] = useState(false);
    const [mensajeAlert_, setMensajeAlert_] = useState('');
    const handleisAlertOpen_ = () => setIsAlertOpen_(true);
    const handleisAlerClose_ = () => {
        setIsAlertOpen_(false);
    };


    const [procesando, setProcesando] = useState(false);
    const [location, setLocation] = useState<any>(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => {
        setIsAlertOpen(false);

    };
    const defaultProps = {
        center: {
            lat: 19.42847,
            lng: -99.12766
        },
        zoom: 10
    };
    const handleMarkerClick = (s: any) => {
        setProcesando(true);
        setTimeout(() => {
            handleisAlerClose();
            setProcesando(false);
            setMensajeAlert_('Se establecio la direccion ' + location?.direccion);
            handleisAlertOpen_();
        }, 500);
    }
    const containerStyle = {
        width: '100%',
        height: '100%'
    };

    const formik = useFormik({
        initialValues: {
            test1: "",
            obra: "",
            info: "",
            descripcion: ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            test1: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            obra: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            info: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            descripcion: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' }))
        }),
    });

    const setImagen = (data: any, file: any) => {
        setFoto(data)
        setFile(file)
    };

    const validate = async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
        } else {
            formik.setTouched(setNestedObjectValues<FormikTouched<any>>(errors, true));
        }
    }

    useEffect(() => {

        if (props?.item && props?.item?.titulo) {
            formik.setFieldValue("obra", props?.item?.titulo || '');
            setObra(props?.item?.titulo || '');
        }

        if (props?.item && props?.item?.description) {
            formik.setFieldValue("descripcion", props?.item?.description || '');
            setDescripcion(props?.item?.description || '');
        }



        if (props?.item && props?.item?.ubicacion) {
            formik.setFieldValue("test1", props?.item?.ubicacion || '');
            setTest1(props?.item?.ubicacion || '');
        }

        if (props?.item && props?.item?.latitud) {
            setLatitud(props?.item?.latitud || '');
        }

        if (props?.item && props?.item?.longitud) {
            setLongitud(props?.item?.longitud || '');
        }
        if (props?.item && props?.item?.info) {
            formik.setFieldValue("info", props?.item?.info || '');
            setInfo(props?.item?.info || '');
        }

        if (props?.item && props?.item?.imagen) {
            setFoto(`${env.API_URL_DOCUMENTOS + 'storage/app/'+ props?.item?.imagen } ?v=${Math.random()+''} `)
        }
        if (props?.item) {
            validate();
        }


    }, [props?.item]);

    useEffect(() => {
        if (props?.resetForm) {
            setObra('');
            setDescripcion('');
            setLatitud('');
            setLongitud('');
            setInfo('');
            setImagen(props?.item?.foto || '', null);
            formik.resetForm();
        }
    }, [props?.resetForm]);

    return (
        <div>
            <FormikProvider value={formik}>
                <Form.Group style={{ width: '100%' }}>
                    <Grid container spacing={2} mt={5}>
                        <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
                            <h5 style={{color:'rgb(40, 51, 74)'}}>Alta de proyecto</h5>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputField
                                required
                                value={obra || ''}
                                name="obra"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("obra", target?.value || '');
                                    setObra(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_proyecto' })}
                                placeholder={intl.formatMessage({ id: 'input_proyecto_descripcion' })}
                                type="text"
                                id="obra"
                                formik={formik?.getFieldMeta('obra')}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputField
                                required
                                value={descripcion || ''}
                                name="descripcion"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("descripcion", target?.value || '');
                                    setDescripcion(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_descripcion' })}
                                placeholder={intl.formatMessage({ id: 'input_descripcion_descripcion' })}
                                type="textArea"
                                id="descripcion"
                                formik={formik?.getFieldMeta('descripcion')}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputField
                                required
                                value={info || ''}
                                name="info"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("info", target?.value || '');
                                    setInfo(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_info' })}
                                placeholder={intl.formatMessage({ id: 'input_info_descripcion' })}
                                type="text"
                                id="info"
                                formik={formik?.getFieldMeta('info')}
                            />
                            <br />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <CampoAutoCompleteCoordenadas
                                required
                                value={test1 || ''}
                                place='locality'
                                name="test1"
                                onPlaceSelect={(e: any) => {
                                    formik.setFieldValue("test1", e?.formatted_address || '');
                                    setTest1(e?.formatted_address);
                                    setLatitud(e?.geometry?.location?.lat());
                                    setLongitud(e?.geometry?.location?.lng());
                                    setLocation({ direccion: e?.formatted_address || '', lat: e?.geometry?.location?.lat(), lng: e?.geometry?.location?.lng() });
                                    handleisAlertOpen();
                                }}
                                label={'Dirección'}
                                placeholder={'Ingrese y seleccione una dirección'}
                                id="test1"
                                formik={formik?.getFieldMeta('test1')}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12} >
                            <h5>Imagen del proyecto</h5>
                            <CampoAvatar foto={foto} alt={obra} onChangeImage={setImagen} />
                            <br />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            style={{ padding: "5px", paddingTop: "0", paddingBottom: "0", textAlign: 'right' }}
                        >
                            <Button
                                variant="primary"
                                disabled={props?.procesando || !formik.dirty || !formik.isValid || _.isEmpty(foto)}
                                onClick={(e) => {
                                    props?.action({
                                        titulo: obra,
                                        descripcion,
                                        info,
                                        lat: latitud,
                                        lon: longitud,
                                        ubicacion: test1,
                                        foto,
                                        file
                                    });
                                }}
                            >
                                {intl.formatMessage({ id: 'general_guardar' })}
                            </Button>
                        </Grid>
                        <ModalComponent handleClose={handleisAlerClose_} isOpen={isAlertOpen_} key={'alertassss'}>
                            <Grid container spacing={2} style={{ textAlign: 'center' }}>
                                <Grid item xs={12}>
                                    <br />
                                    <br />
                                    <p>{mensajeAlert_}</p>
                                </Grid>
                            </Grid>
                        </ModalComponent>
                        <ModalComponent handleClose={handleisAlerClose} isOpen={isAlertOpen} key={'alerta'}>
                            <Grid container spacing={2} style={{ textAlign: 'center', minHeight: '600px' }}>
                                <Grid item xs={12} style={{ height: '20px', paddingBottom: '10px' }}><p>Seleccione la marca en rojo para continuar o introduzca una nueva dirección</p></Grid>
                                <Grid item xs={12} style={{ height: '570px' }}>
                                    <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={location ? {
                                            lat: location.lat,
                                            lng: location.lng
                                        } : defaultProps.center}
                                        zoom={10}
                                    >
                                        {location ? <Marker onClick={(s) => { handleMarkerClick({ lat: s?.latLng?.lat(), lng: s?.latLng?.lng() }) }} position={{
                                            lat: location.lat,
                                            lng: location.lng,
                                        }}
                                        /> : null}
                                        <></>
                                    </GoogleMap>
                                </Grid>
                            </Grid>
                        </ModalComponent>
                        <Backdrop style={{ zIndex: 1000, color: "#fff" }} open={procesando}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </Grid>
                </Form.Group>
            </FormikProvider>
        </div>
    )
}

export default AddProyectoForm
