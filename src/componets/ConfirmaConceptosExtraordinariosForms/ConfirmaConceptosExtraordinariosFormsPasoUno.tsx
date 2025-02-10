import './style.scss'
import { ConfirmaConceptosExtraordinariosFormsPasoUnoProps } from './types'
import { Grid } from '@mui/material';
import React, { useState } from 'react'
import { useMaterialUIController } from 'context';
import { Button, Form } from 'react-bootstrap';
import DragAndDropField from '../DragAndDropField';
import { useIntl } from 'react-intl';
import _ from 'lodash';

const ConfirmaConceptosExtraordinariosFormsPasoUno: React.FC<ConfirmaConceptosExtraordinariosFormsPasoUnoProps> = (props: ConfirmaConceptosExtraordinariosFormsPasoUnoProps) => {
    const intl = useIntl();
    const [controller] = useMaterialUIController();
    const {
        darkMode
    } = controller;
    const [file, setFile] = useState<File[]>();
    const saveImages = async (file_: any) => {
        setFile(file_?.[0]);
    };
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '20px' } : { backgroundColor: '#fff', padding: '20px' }}>
                <Form.Group className="mb-3 " >
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{textAlign:'center'}}>
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
                        disabled={props?.procesando || _.isEmpty(file)}
                        onClick={() => {
                            props?.enAccion({ file });
                        }}
                    >
                        {intl.formatMessage({ id: 'general_guardar' })}
                    </Button>
                </Form.Group>
            </Grid>
        </Grid>
    )
}

export default ConfirmaConceptosExtraordinariosFormsPasoUno
