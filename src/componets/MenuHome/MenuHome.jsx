import React from 'react'
import DefaultInfoCard from "../../examples/Cards/InfoCards/DefaultInfoCard";
import HomeIcon from '@mui/icons-material/Home';
import { Grid } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';
import { setMenuRoutes } from '../../actions/menu';
import ModalComponent from '../../componets/Modal'
import useMenuHome from './useMenuHome'
import './style.scss';
import _ from 'lodash';

const MenuHome = (props) => {

  const {
    navigate,
    intl,
    newRoutes,
    espacio,
    contrato,
    superAdministrador,
    handleNavegarSinEspacio,
    dispatch,
    mensajeAlert,
    handleisAlerClose,
    isAlertOpen,
    darkMode
  } = useMenuHome(props);

  return (
    <Grid container spacing={2} style={{ textAlign: 'center' }}>
      <Grid item xs={12} md={12}>
        <h1 style={{ color: darkMode ? 'white' : '#344767' }}>{intl.formatMessage({ id: 'menu_home_titulo' })}</h1>
      </Grid>
      
      {<Grid item xs={12} md={3}>
        <DefaultInfoCard
          icon={<HomeIcon />}
          title={intl.formatMessage({ id: 'menu_regresar_inicio' })}
          elemento={{}}
          onSelec={(_) => {
            props?.onSeleccion();
            navigate('/inicio');
            
          }}
        />
      </Grid>}
      {
        newRoutes?.filter(w => w?.name).map((e, key) => {
          return (<Grid item xs={12} md={3} key={key} >
            <DefaultInfoCard
              icon={e?.icon}
              title={e?.name}
              elemento={e}
              onSelec={(e) => {
                if (!espacio && !superAdministrador) {
                  handleNavegarSinEspacio();
                  return;
                }
                dispatch(setMenuRoutes(e));
                props?.onSeleccion();
                navigate('/navegacion');
              }}
            />
          </Grid>)
        })
      }
      {<Grid item xs={12} md={3}>
        <DefaultInfoCard
          icon={<LoginIcon />}
          title={intl.formatMessage({ id: 'menu_cerrar_sesion' })}
          elemento={{}}
          onSelec={(_) => {
            props?.onSeleccion();
            navigate('/logoutPage');
            
          }}
        />
      </Grid>}
      <ModalComponent handleClose={handleisAlerClose} isOpen={isAlertOpen} key={'alerta'}>
        <Grid container spacing={2} style={{ textAlign: 'center' }}>
          <Grid item xs={12}>
            <br />
            <br />
            <p>{mensajeAlert}</p>
          </Grid>
        </Grid>
      </ModalComponent>
    </Grid>
  )
}

export default MenuHome
