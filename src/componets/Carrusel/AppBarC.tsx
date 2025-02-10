import * as React from 'react';
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar';

function AppBarC(props: AppBarProps) {
  return <MuiAppBar elevation={0} position="fixed" {...props} />;
}

export default AppBarC;