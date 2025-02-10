import React from 'react'
import { Backdrop, CircularProgress, Grid } from '@mui/material';
import { FormikProvider } from "formik";
import { Button, Form } from "react-bootstrap";
import InputField from '../InputField';
import type { usePasswordRecoverProps } from './types';
import { usePasswordRecover } from './usePasswordRecover';
import "./index.scss";

const PasswordRecover: React.FC<usePasswordRecoverProps> = (props: usePasswordRecoverProps) => {
    const {
        user,
        setUser,
        formik,
        intl
    } = usePasswordRecover();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormikProvider value={formik}>
                    <Form.Group className=" ">
                        <InputField
                            required
                            value={user}
                            name="user"
                            onInput={(e: any) => {
                                const target = e.target as HTMLTextAreaElement;
                                formik.setFieldValue("user", target?.value);
                                setUser(target?.value);
                            }}
                            label={intl.formatMessage({ id: 'input_usuario' })}
                            placeholder={intl.formatMessage({ id: 'input_usuario_descripcion' })}
                            type="text"
                            id="user"
                        />
                        <br />
                        <Grid container spacing={2}>
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Button
                                    variant="primary"
                                    disabled={props?.procesando || !formik.dirty || !formik.isValid}
                                    onClick={() => {
                                        props?.enAccion({ user });
                                    }}
                                >
                                    {intl.formatMessage({ id: 'login_form_component_acceder' })}
                                </Button>
                            </Grid>
                        </Grid>
                        <Backdrop style={{ zIndex: 1000, color: "#fff" }} open={props?.procesando}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </Form.Group>
                </FormikProvider>
            </Grid>
        </Grid>
    )
}

export default PasswordRecover;
