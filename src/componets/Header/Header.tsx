import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Paper,
  Typography,
  Menu,
  MenuItem,
  IconButton
} from "@mui/material";
import bgImage from "assets/logo.png";
import bgImageJuno from "assets/servicios/juno.png";
import { StoreType } from '../../types/geericTypes';
import { useSelector } from 'react-redux';
import { HeaderPros } from './types';
import DehazeIcon from '@mui/icons-material/Dehaze';
import HomeIcon from '@mui/icons-material/Home';
import ClassIcon from '@mui/icons-material/Class';
import GroupIcon from '@mui/icons-material/Group';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Header: React.FC<HeaderPros> = (props: HeaderPros) => {

  const navigate = useNavigate();
  const inSession = useSelector((state: StoreType) => state?.app?.user?.token || false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const id_usuario = useSelector((state: StoreType) => state?.app?.user?.data?.id || '0');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary" style={{ backgroundColor: inSession ? 'rgb(23 ,130 ,130)' : "rgb(40, 51, 74)", color: "white", }}>
      <Toolbar>
        {inSession ? <Paper variant="outlined">
          <img src={bgImageJuno} width={80} />
        </Paper> : null}
        {!inSession ? <Paper variant="outlined">
          <img src={bgImage} width={80} />
        </Paper> : null}
        {inSession ? <div style={{ width: '100%', textAlign: 'right' }}>
          <Button
            size="small"
            type="button"
            variant="contained"
            onClick={handleClick}
            style={{ color: 'rgb(40, 51, 74)', backgroundColor: '#ffffff' }}
          >
            <DehazeIcon />
          </Button>
          <Menu
            id="simple-menu-user-options"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => handleClose()}
          >
            <MenuItem onClick={() => navigate('/inicio')}>
              <IconButton aria-label={'Inicio'} size="small" style={{ color: 'rgb(31, 40, 62)' }}>
                <HomeIcon /><small>Inicio</small>
              </IconButton>
            </MenuItem>
            <MenuItem onClick={() => navigate('/gestion-proyectos')}>
              <IconButton aria-label={'gestion_de_proyectos'} size="small" style={{ color: 'rgb(31, 40, 62)' }}>
                <ClassIcon /><small>Gestion de proyectos</small>
              </IconButton>
            </MenuItem>
            {id_usuario === 1 ? <MenuItem onClick={() => navigate('/gestion-usuarios')}>
              <IconButton aria-label={'gestion_de_usuarios'} size="small" style={{ color: 'rgb(31, 40, 62)' }}>
                <GroupIcon /><small>Gestion de usuarios</small>
              </IconButton>
            </MenuItem> : null}
            {id_usuario === 1 ? <MenuItem onClick={() => navigate('/perfil')}>
              <IconButton aria-label={'perfil'} size="small" style={{ color: 'rgb(31, 40, 62)' }}>
                <AccountBoxIcon /><small>Perfil</small>
              </IconButton>
            </MenuItem> : null}
            <MenuItem onClick={() => navigate('/logoutPage')}>
              <IconButton aria-label={'cerrar_sesion'} size="small" style={{ color: 'rgb(31, 40, 62)' }}>
                <LogoutIcon /><small>Cerrar sesión</small>
              </IconButton>
            </MenuItem>

          </Menu>
        </div> : null}
        {!inSession && !props?.soloLogo ? <div style={{ width: '100%', textAlign: 'right' }}>
          <Button style={{ color: "white", height: '100%' }}><a href='#Bienvenido' style={{ textDecoration: 'none !important', color: 'white' }}>Nosotros</a></Button>
          <Button style={{ color: "white" }}><a href='#Servicios' style={{ textDecoration: 'none !important', color: 'white' }}>Servicios</a></Button>
          <Button style={{ color: "white" }}><a href='#Contacto' style={{ textDecoration: 'none !important', color: 'white' }}>Contacto</a></Button>
        </div> : null}
      </Toolbar>
    </AppBar>
  );
}

export default Header;