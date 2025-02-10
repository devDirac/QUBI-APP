import { styled } from '@mui/material/styles';
import MuiToolbar from '@mui/material/Toolbar';

const ToolbarC = styled(MuiToolbar)(({ theme }) => ({
  height: 64,
  [theme.breakpoints.up('sm')]: {
    height: 70,
  },
}));

export default ToolbarC;