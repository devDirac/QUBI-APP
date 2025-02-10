import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import type { AccionesTableProps } from "./types";
import { useAccionesTable } from './useAccionesTable'
import DehazeIcon from '@mui/icons-material/Dehaze';
import { useIntl } from "react-intl";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './style.scss';
import { useMaterialUIController } from "context";
import { StoreType } from "../../types/geericTypes";
import { useSelector } from "react-redux";

const AccionesTable: React.FC<AccionesTableProps> = (
  props: AccionesTableProps
) => {
  const intl = useIntl();
  const id_usuario = useSelector((state: StoreType) => state?.app?.user?.data?.id || '0');
  const [controller] = useMaterialUIController();
  const {
    darkMode
  } = controller;

  const {
    anchorEl,
    handleClick,
    handleClose
  } = useAccionesTable(props);

  return (
    <div>
      <Button
        size="small"
        type="button"
        variant="contained"
        color="primary"
        onClick={handleClick}
        style={{ color: 'white' }}
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
        {id_usuario === 1 && !props?.soloEliminar ? <MenuItem onClick={() => props?.enAccion("editar")}>
          <IconButton aria-label={intl.formatMessage({ id: 'general_editar' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
            <EditIcon /> <small>{intl.formatMessage({ id: 'general_editar' })}</small>
          </IconButton>
        </MenuItem> :  null}
        {id_usuario === 1 ? <MenuItem onClick={() => props?.enAccion("eliminar")}>
          <IconButton aria-label={intl.formatMessage({ id: 'general_eliminar' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
            <DeleteIcon /> <small> {intl.formatMessage({ id: 'general_eliminar' })}  / {intl.formatMessage({ id: 'general_reactivar' })} </small>
          </IconButton>
        </MenuItem> : null}
      </Menu>
    </div>
  );
};

export default AccionesTable;
