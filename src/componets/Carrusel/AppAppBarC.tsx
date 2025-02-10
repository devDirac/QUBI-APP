import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBarC from './AppBarC';
import ToolbarC from './ToolbarC';
import logo from "../../assets/images/logo_dirac_2025.png";

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBarC() {
  return (
    <div>
      <AppBarC position="fixed" style={{ backgroundColor: 'rgb(32 47 80)', height:84 }}>
        <ToolbarC sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1, textAlign:'center' }} >
           
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }} >
            <img width={190} height={85} src={logo} alt="profile-image" style={{position:'relative', top:3}} />
          </Box>
        </ToolbarC>
      </AppBarC>
      <ToolbarC />
    </div>
  );
}

export default AppAppBarC;