import { Grid, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react'
import VideoStableIcon from '@mui/icons-material/VideoStable';
import { Button } from 'react-bootstrap';
import DehazeIcon from '@mui/icons-material/Dehaze';
import Container from '@mui/material/Container';


const MenuOpcionesTabla = (props: any) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div>
            <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleClick}
            >
                <VideoStableIcon fontSize='large' />Ver las propiedades y sus tipos 
            </Button>
            <Menu
                id="simple-menu-user-options"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => handleClose()}
            >
                {
                    (props?.r?.columnas || []).map((w: any) => {
                        return (
                            <MenuItem style={{padding:10, marginBottom:10}}>
                                <Grid container spacing={1}>
                                    <Grid xs={12}>
                                        <p style={{ width: '100%' }}>Dato : {w?.columna.replaceAll('_', ' ').toUpperCase()}</p>
                                    </Grid>
                                    <Grid xs={12}>
                                        <p style={{ width: '100%' }}>Tipo : {(w?.tipo || '').split("(")[0]}</p>
                                    </Grid>
                                </Grid>
                            </MenuItem>
                        );
                    })
                }

            </Menu>
        </div>
    )
}

export default MenuOpcionesTabla
