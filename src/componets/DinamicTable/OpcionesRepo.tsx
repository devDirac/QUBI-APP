import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, Tooltip } from '@mui/material';
import './style.scss';

interface OpcionesRepoProps {
    enAccion: (accion: any) => void;
}

const OpcionesRepo: React.FC<OpcionesRepoProps> = (props:OpcionesRepoProps) => {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={6} sm={6} lg={6} xl={6} md={6} style={{ textAlign: 'center', alignItems: 'center' }} >
                    <Tooltip title="Eliminar">
                        <DeleteIcon onClick={() => props?.enAccion("eliminarDocumento")} style={{ cursor: 'pointer' }} color='error' />
                    </Tooltip>
                </Grid>
            </Grid>
        </div>
    )
}

export default OpcionesRepo
