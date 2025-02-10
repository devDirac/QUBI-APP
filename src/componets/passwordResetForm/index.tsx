import React from 'react'
import { Backdrop, CircularProgress, Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../InputField';
import type { passwordResetFormProps } from './types';
import "./index.scss";
import usePasswordResetForm from './usepasswordResetForm';

const PasswordResetForm:React.FC<passwordResetFormProps> = (props: passwordResetFormProps) => {
 
  const {
    formik,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    intl
  } = usePasswordResetForm();
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormikProvider value={formik}>
          <Form.Group className="mb-3 form-control ">
            <InputField
              required
              value={password}
              name="password"
              onInput={(e: any) => {
                const target = e.target as HTMLTextAreaElement;
                formik.setFieldValue("password", target?.value);
                setPassword(target?.value);
              }}
              label={intl.formatMessage({ id: 'input_contrasena' })}
              placeholder={intl.formatMessage({ id: 'input_contrasena_descripcion' })}
              type="password"
              id="password"
            />
            <InputField
              required
              value={passwordConfirm}
              name="passwordConfirm"
              onInput={(e: any) => {
                const target = e.target as HTMLTextAreaElement;
                formik.setFieldValue("passwordConfirm", target?.value);
                setPasswordConfirm(target?.value);
              }}
              label={intl.formatMessage({ id: 'input_contrasena_confirmacion' })}
              placeholder={intl.formatMessage({ id: 'input_contrasena_confirmacion_descripcion' })}
              type="password"
              id="passwordConfirm"
            />
            <br />
            <Button
              variant="primary"
              disabled={props?.procesando || !formik.dirty || !formik.isValid}
              onClick={() => {
                props?.enAccion({ password, passwordConfirm });
              }}
            >
              {intl.formatMessage({ id: 'general_actualizar' })}
            </Button>
            <Backdrop style={{ zIndex: 1000, color: "#fff" }} open={props?.procesando}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </Form.Group>
        </FormikProvider>
      </Grid>
    </Grid>
  )
}

export default PasswordResetForm;
