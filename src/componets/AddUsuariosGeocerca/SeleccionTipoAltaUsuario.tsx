import { Grid } from '@mui/material';
import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap';

interface SeleccionTipoAltaUsuarioProps {
    onSeleccion: (opt: number) => void
}

const SeleccionTipoAltaUsuario: React.FC<SeleccionTipoAltaUsuarioProps> = (props: SeleccionTipoAltaUsuarioProps) => {
    return (
        <Grid container style={{ minHeight: 150, padding: 15 }}>
            <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
                <ButtonGroup>
                    <Button
                        variant="outline-primary"
                        onClick={(e: any) => {
                            props?.onSeleccion(1);
                        }}
                    >
                        Usuario nuevo <small>Registre un usuario que no pertenece a los usuarios del sistema APM</small>
                    </Button>
                    <Button
                        variant="outline-warning"
                        onClick={(e: any) => {
                            props?.onSeleccion(2);
                        }}
                    >
                        Usuario existente <small>De su lista de usuarios de APM, seleccione los usuarios</small>
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}

export default SeleccionTipoAltaUsuario
