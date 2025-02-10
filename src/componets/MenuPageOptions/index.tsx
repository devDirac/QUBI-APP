import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import env from "react-dotenv";

export interface MenuPageOptionsProps {
    item: any[]
}

const MenuPageOptions: React.FC<MenuPageOptionsProps> = (props: MenuPageOptionsProps) => {
    const tipoUsuario = useSelector((state: any) => state?.app?.user?.data?.tipo_usuario || []);
    const archivosCompartidos = useSelector((state: any) => state?.app?.user?.data?.archivos_compartidos || []);
    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const navigate = useNavigate();
    const handleClose = (item: any) => {
        setAnchorEl(null);
        navigate(item?.route);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Ver opciones &nbsp;  {<VisibilityIcon />}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                    (props?.item || []).filter((c: any) => (c?.allow || []).includes(tipoUsuario?.[0]?.id)).map((as: any) => {
                        return (
                            as?.key !== "el-finder" ?
                                <MenuItem key={as?.name + '_'} onClick={() => handleClose(as)}>{as?.name}</MenuItem> :
                                archivosCompartidos.map((er: any) => {
                                    return (
                                        <MenuItem key={er?.id + '_'}><a
                                            target="_blank"
                                            href={`${env.API_URL_DOCUMENTOS}storage/app/documentos/${espacio?.id || ""}/elFinder/elfinder.html?path=${(er?.path || '').replaceAll('storage/app/documentos/41/elFinder/files/', '')}`}>
                                            <span>{(er?.path || '').replaceAll('storage/app/documentos/41/elFinder/files/', '')}</span>
                                        </a></MenuItem>
                                    )
                                })
                        )
                    })
                }
            </Menu>
        </div>
    )
}

export default MenuPageOptions
