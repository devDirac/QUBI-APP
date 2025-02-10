import { FormikProvider } from "formik";
import React, { useState, useRef, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import InputField from "../InputField";
import type { LoginFormProps } from "./types";
import { useLoginForm } from "./useLoginForm";
import { Backdrop, CircularProgress, Grid } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import env from "react-dotenv";
import "./index.scss";

const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {


  const {
    formik,
    user,
    setUser,
    password,
    setPassword,
    intl,
    onChange,
    valueCaptcha,
    setRecaptchaToken
  } = useLoginForm()
 
  const recaptchaRef:any = useRef(null);

  useEffect(()=>{
    if(props?.captchaRecet){
      recaptchaRef.current.reset();
    }
  },[props?.captchaRecet])


  return (
    <div style={{ width: "100%" }}>
      <FormikProvider value={formik}>
        <Form.Group className="mb-3">
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
            formik={formik?.getFieldMeta('user')}
          />
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
            formik={formik?.getFieldMeta('password')}
          />
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} className="form_group_recaptcha">
              <ReCAPTCHA
                style={{ width: '100%', flex: '1', justifyContent: 'center', textAlign: 'center' }}
                sitekey={env.CAPTCHA_KEY}
                onChange={onChange}
                ref={recaptchaRef}
                onExpired={() => setRecaptchaToken(null)}
              />
              <p style={{cursor:'pointer', color:'#7b809a', opacity:'1', fontSize: '1rem'}} onClick={() => {
                recaptchaRef.current.reset();
              }}>
                Reiniciar captcha
              </p>
            </Grid>

            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Button
                variant="primary"
                disabled={props?.procesando || !formik.dirty || !formik.isValid || !valueCaptcha}
                onClick={() => {
                  props?.enAccion({ usuario: user, password, valueCaptcha });
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
    </div>
  );
};

export default LoginForm;
