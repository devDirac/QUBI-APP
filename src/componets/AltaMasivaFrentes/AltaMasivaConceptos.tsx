import React from 'react'
import type { AltaMasivaFrentesProps } from './types'
import './style.scss'
import { Grid } from '@mui/material'
import { Form } from 'react-bootstrap'
import useAltaMasivaConceptos from './useAltaMasivaConceptos'

const AltaMasivaConceptos: React.FC<AltaMasivaFrentesProps> = (props: AltaMasivaFrentesProps) => {

    const {
        darkMode,
        handleArchivo,
        reference
    } = useAltaMasivaConceptos(props);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <Grid item xs={12} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '10px', minHeight: '30px' } : { backgroundColor: '#fff', padding: '10px', minHeight: '30px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>{props?.titulo || ''}</Form.Label>
                                    <Form.Control type="file" accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' onChange={(e) => {
                                        handleArchivo(e);
                                    }} onClick={(event: any) => {
                                        event.target.value = null;
                                    }}
                                        ref={reference} />
                                </Form.Group>
                            </Form>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AltaMasivaConceptos
