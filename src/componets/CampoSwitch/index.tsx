import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import './style.scss';

interface CampoSwitchProps {
  value: boolean
  label?: string
  disabled?: boolean
  onAction?: (valor: boolean) => void
}
const CampoSwitch: React.FC<CampoSwitchProps> = (props: CampoSwitchProps) => {

  return (
    <FormControl component="fieldset">
      <FormGroup >
        <FormControlLabel
          checked={props?.value}
          control={<Switch color="primary" />}
          disabled={props?.disabled || false}
          onChange={(event: any) => {
            props?.onAction && props?.onAction(event.target.checked);
          }}
          label={props?.label || ''}
          labelPlacement="end"
        />
      </FormGroup>
    </FormControl>
  );
}
export default CampoSwitch;