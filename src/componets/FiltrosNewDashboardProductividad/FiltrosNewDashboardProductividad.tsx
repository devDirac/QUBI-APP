import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { Grid } from '@mui/material';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import { useIntl } from 'react-intl';
import { Button, Form } from 'react-bootstrap';
import InputField from '../../componets/InputField';
import SelectField from '../../componets/SelectField';
import { FiltrosNewDashboardProductividadProps } from './types';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#1890ff',
          ...theme.applyStyles('dark', {
            backgroundColor: '#177ddc',
          }),
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
      ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(255,255,255,.35)',
      }),
    },
  }));

const FiltrosNewDashboardBitacoraEstimaciones: React.FC<FiltrosNewDashboardProductividadProps> = (props: FiltrosNewDashboardProductividadProps) => {
    const intl = useIntl();
    const [fechaInicio, setFechaInicio] = useState<string>(props?.fecha_ini ? props?.fecha_ini : '');
    const [fechaFin, setFechaFin] = useState<string>(props?.fecha_fin ? props?.fecha_fin : '');
    const [contratista, setContratista] = useState<string>('');
    const [tipo, setTipo] = useState<boolean>(false);
    const formik = useFormik({
        initialValues: {
            "fechaInicio": props?.fecha_ini ? props?.fecha_ini : '',
            "fechaFin": props?.fecha_fin ? props?.fecha_fin : '',
            "contratista": ''
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            fechaInicio: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            fechaFin: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            concepto: Yup.string(),
            estatus: Yup.string(),
            contratista: Yup.string(),
        }),
    });

    const validate = async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length !== 0) {
            formik.setTouched(
                setNestedObjectValues<FormikTouched<any>>(errors, true)
            );
        }
    };

    useEffect(() => {
        formik.setFieldValue("fechaInicio", props?.fecha_ini ? props?.fecha_ini : '');
        setFechaInicio(props?.fecha_ini ? props?.fecha_ini : '');
        formik.setFieldValue("fechaFin", props?.fecha_fin ? props?.fecha_fin : '');
        setFechaFin(props?.fecha_fin ? props?.fecha_fin : '');
        
        props?.enAccion({
            fechaInicio:props?.fecha_ini ? props?.fecha_ini : '',
            fechaFin:props?.fecha_fin ? props?.fecha_fin : '',
            contratista:'0'
        })

        validate();
    }, []);


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormikProvider value={formik}>
                    <Form.Group className="mb-3 ">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <InputField
                                    required
                                    value={fechaInicio || ""}
                                    name="fechaInicio"
                                    onInput={(e: any) => {
                                        const target = e.target as HTMLTextAreaElement;
                                        formik.setFieldValue("fechaInicio", target?.value || "");
                                        setFechaInicio(target?.value);
                                    }}
                                    label={intl.formatMessage({ id: "input_fecha_inicio" })}
                                    type="date"
                                    id="fechaInicio"
                                    formik={formik?.getFieldMeta("fechaInicio")}
                                />
                                <br />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <InputField
                                    required
                                    value={fechaFin || ""}
                                    name="fechaFin"
                                    onInput={(e: any) => {
                                        const target = e.target as HTMLTextAreaElement;
                                        formik.setFieldValue("fechaFin", target?.value || "");
                                        setFechaFin(target?.value);
                                    }}
                                    label={intl.formatMessage({ id: "input_fecha_final" })}
                                    type="date"
                                    id="fechaFin"
                                    formik={formik?.getFieldMeta("fechaFin")}
                                />
                                <br />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <SelectField
                                    label={intl.formatMessage({ id: 'input_contratista' })}
                                    value={contratista}
                                    options={props?.contratistas.map((r:any)=> {
                                        return {
                                            label : r?.contratista,
                                            value: r?.contratista
                                        }
                                    })}
                                    name="contratista"
                                    id="contratista"
                                    onInput={(e: any) => {
                                        const target = e.target as HTMLTextAreaElement;
                                        formik.setFieldValue("contratista", target?.value || '');
                                        setContratista(target?.value);
                                    }}
                                    formik={formik?.getFieldMeta('contratista')}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div style={{ position: 'relative', top: '30px' }}>
                                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                        <Typography>Consulta de avances</Typography>
                                        {props?.notDisabledOpcion2 ? <AntSwitch value={tipo} defaultChecked inputProps={{ 'aria-label': 'ant design' }} onChange={(event)=>{
                                            props?.enTipo(event.target.checked ? 0 : 1);
                                            setTipo(event.target.checked)
                                            }} />: <AntSwitch  value={tipo} defaultChecked inputProps={{ 'aria-label': 'ant design' }} checked disabled onChange={(event)=>{
                                                setTipo(event.target.checked);
                                                props?.enTipo(event.target.checked ? 0 : 1);
                                                }} />}
                                       {props?.notDisabledOpcion2 ?  <Typography>Proceso de estimaciones</Typography> : null}
                                    </Stack>
                                </div>
                                <br />
                            </Grid>

                            <Grid item xs={12} md={6} >
                                <Button
                                    style={{ position: 'relative', top: '38px' }}
                                    variant="primary"
                                    disabled={
                                        props?.procesando
                                    }
                                    onClick={(e: any) => {
                                        props?.enAccion({
                                            fechaInicio,
                                            fechaFin,
                                            contratista
                                        });
                                    }}
                                >
                                    {intl.formatMessage({ id: "general_buscar" })}
                                </Button>
                            </Grid>
                        </Grid>
                    </Form.Group>
                </FormikProvider>
            </Grid>
        </Grid>
    )
}

export default FiltrosNewDashboardBitacoraEstimaciones
