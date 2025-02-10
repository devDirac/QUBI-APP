import React, { useState } from 'react'
import { Grid } from '@mui/material';
import { Button} from 'react-bootstrap';
import { FiltroContratoFormProps } from './types';
import CampoSelectMultipleConSelectAll from '../CampoSelectMultipleConSelectAll/CampoSelectMultipleConSelectAll';


const FiltroContratoForm: React.FC<FiltroContratoFormProps> = (props: FiltroContratoFormProps) => {

    const [contrato, setContrato] = useState<any>([]);

    return (
        < Grid container spacing={2} style={{ width: '800px' }}>
            <Grid item xs={12}>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} style={{ textAlign: 'left' }}>
                        <p>Filtra la información por el contrato de la lista<br></br> si no seleccionas ningún contrato se mostrara la información de todos los contratos del proyecto</p>
                    </Grid>
                    <Grid item xs={12} md={12} style={{ textAlign: 'left' }}>
                        <CampoSelectMultipleConSelectAll
                            value={props?.default}
                            options={[
                                {
                                    key: 'contratos_en_curso',
                                    label: 'Contratos en curso',
                                    children: props?.contratos.filter((r: any) => r?.terminado + '' === 0 + '' && r?.estatus === 1).map((e: any) => {
                                        return {
                                            label: e?.id_contrato,
                                            value: e?.id + '',
                                            key: e?.id + ''
                                        }
                                    })
                                },
                                {
                                    key: 'contratos_terminados',
                                    label: 'Contratos terminados',
                                    children: props?.contratos.filter((r: any) => r?.terminado + '' === 1 + '' && r?.estatus === 1).map((e: any) => {
                                        return {
                                            label: e?.id_contrato,
                                            value: e?.id + '',
                                            key: e?.id + ''
                                        }
                                    })
                                },
                                {
                                    key: 'contratos_rescindido',
                                    label: 'Contratos rescindido',
                                    children: props?.contratos.filter((r: any) => r?.terminado + '' === 2 + '' && r?.estatus === 1).map((e: any) => {
                                        return {
                                            label: e?.id_contrato,
                                            value: e?.id + '',
                                            key: e?.id + ''
                                        }
                                    })
                                },
                                {
                                    key: 'contratos_con_cierre_administrativo',
                                    label: 'Contratos con cierre administrativo',
                                    children: props?.contratos.filter((r: any) => r?.terminado + '' === 3 + '').map((e: any) => {
                                        return {
                                            label: e?.id_contrato,
                                            value: e?.id + '',
                                            key: e?.id + ''
                                        }
                                    })
                                }

                            ]}
                            onInput={(e) => {
                                setContrato(e);
                            }}
                            label="Selecciona los contratos disponibles" />
                    </Grid>
                    <Grid item xs={12} md={12} >
                        <Button
                            variant="primary"
                            onClick={(e: any) => {
                                props?.enAccion({
                                    contrato
                                });
                            }}
                        >
                            Aplicar filtros
                        </Button>
                    </Grid>
                </Grid>

            </Grid>
        </Grid>
    )
}

export default FiltroContratoForm
