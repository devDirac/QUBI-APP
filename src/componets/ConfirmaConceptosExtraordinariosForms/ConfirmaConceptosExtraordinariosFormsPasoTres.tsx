import './style.scss'
import { ConfirmaConceptosExtraordinariosFormsPasoTresProps } from './types'
import { Grid } from '@mui/material';
import React, { useState } from 'react'
import { useMaterialUIController } from 'context';
import { Button, Form } from 'react-bootstrap';
import DragAndDropField from '../DragAndDropField';
import { useIntl } from 'react-intl';
import _ from 'lodash';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import InputField from '../../componets/InputField';


const ConfirmaConceptosExtraordinariosFormsPasoTres: React.FC<ConfirmaConceptosExtraordinariosFormsPasoTresProps> = (props: ConfirmaConceptosExtraordinariosFormsPasoTresProps) => {


  const intl = useIntl();
  const [controller] = useMaterialUIController();
  const {
    darkMode
  } = controller;
  const [file, setFile] = useState<File[]>();
  const [num_convenio, setNum_convenio] = useState<string>('');

  const formik = useFormik({
    initialValues: {
      num_convenio: ""
    },
    onSubmit: async (values) => { },
    validationSchema: Yup.object({
      num_convenio: Yup.string()
        .max(
          150,
          intl.formatMessage({ id: 'input_validation_max_150' })
        ).required(intl.formatMessage({ id: 'input_validation_requerido' }))
    }),
  });


  const saveImages = async (file_: any) => {
    setFile(file_?.[0]);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '20px' } : { backgroundColor: '#fff', padding: '20px' }}>
        <FormikProvider value={formik}>
          <Form.Group className="mb-3 " >
            <InputField
              required
              value={num_convenio}
              name="num_convenio"
              onInput={(e: any) => {
                const target = e.target as HTMLTextAreaElement;
                formik.setFieldValue("num_convenio", target?.value);
                setNum_convenio(target?.value);
              }}
              label={intl.formatMessage({ id: 'input_num_convenio' })}
              placeholder={intl.formatMessage({ id: 'input_num_convenio_descripcion' })}
              type="text"
              id="num_convenio"
              formik={formik?.getFieldMeta('num_convenio')}
            />
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <h4>Carga de documento</h4>
              </Grid>
              <Grid item xs={12}>
                <p>Tipo de archivo PU</p>
              </Grid>
            </Grid>
            <DragAndDropField multiple={false} muestraBoton={false} onAction={(files) => saveImages(files)} />
            <br />
            <Button
              variant="primary"
              disabled={props?.procesando || !formik.dirty || !formik.isValid || props?.procesando || _.isEmpty(file)}
              onClick={() => {
                props?.enAccion({ file, num_convenio });
              }}
            >
              {intl.formatMessage({ id: 'general_guardar' })}
            </Button>
          </Form.Group>
        </FormikProvider>
      </Grid>
    </Grid>
  )
}

export default ConfirmaConceptosExtraordinariosFormsPasoTres
