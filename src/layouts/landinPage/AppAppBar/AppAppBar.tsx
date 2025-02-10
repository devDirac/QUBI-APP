import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from './AppBar';
import Toolbar from './Toolbar';

import brandWhite2 from "../../../assets/images/Iconos_APM/fondo_transparente/logoPrincipal2.png";
const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar() {
  return (
    <div>
      <AppBar position="fixed" style={{ backgroundColor: 'rgb(34 53 71)' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1, textAlign:'center' }} >
           
          </Box>
          <Box sx={{ flex: 1, textAlign:'center' }} >
            <img width={250} height={70} src={brandWhite2} alt="profile-image" />
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/"
              sx={rightLink}
            >
              {'Acceder'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="#contacto"
              sx={{ ...rightLink, color: 'secondary.main' }}
            >
              {'Contacto'}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;