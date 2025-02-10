import React from 'react'
import type { FrenteSeleccionHijosFormProps } from './types';
import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import { Form } from "react-bootstrap";
import _ from 'lodash';
import SelectField from '../../componets/SelectField';
import ModalComponent from '../../componets/Modal';
import FrentesHereditary from '../../componets/FrentesHereditary/FrentesHereditary';
import useFrenteSeleccionHijosForm from './useFrenteSeleccionHijosForm';
import "./style.scss";

const FrenteSeleccionHijosForm: React.FC<FrenteSeleccionHijosFormProps> = (props: FrenteSeleccionHijosFormProps) => {

  const {
    formik,
    intl,
    id_frente,
    setId_frente,
    handleOpenHistorial,
    handleCloseHistorial,
    isOpenHistorial
  } = useFrenteSeleccionHijosForm(props);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          className="bordersContainers"
          style={
            props?.darkMode
              ? {
                backgroundColor: "#1f283e",
                padding: "10px"
              }
              : {
                backgroundColor: "#fff",
                padding: "10px"
              }
          }
        >
          <FormikProvider value={formik}>
            <Form.Group className="mb-3 ">
              <Grid container spacing={2}>

                <Grid item xs={12} md={12}>
                  <SelectField
                    label={intl.formatMessage({
                      id: "input_frente",
                    })}
                    disabled={((props?.frentes || []))?.length === 1}
                    value={id_frente}
                    options={(props?.frentes || []).map((a) => {
                      return {
                        label: a?.frente,
                        value: a?.id,
                      };
                    })}
                    name="id_frente"
                    id="id_frente"
                    required
                    onInput={(e: any) => {
                      const target = e.target as HTMLTextAreaElement;
                      formik.setFieldValue("id_frente", target?.value || "");
                      setId_frente(target?.value);
                      target?.value && handleOpenHistorial();
                      props?.enAccion({ id_frente: target?.value });
                    }}
                    formik={formik?.getFieldMeta("id_frente")}
                  />
                  <br />
                </Grid>


              </Grid>
            </Form.Group>
          </FormikProvider>
          <ModalComponent
            handleClose={handleCloseHistorial}
            isOpen={isOpenHistorial}
          >
            <FrentesHereditary frentes={props?.frentes} frente={id_frente} />
          </ModalComponent>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default FrenteSeleccionHijosForm
