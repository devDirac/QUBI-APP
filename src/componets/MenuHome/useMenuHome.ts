import { useState } from 'react'
import routes from "../../routes";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useIntl } from 'react-intl';
import { useMaterialUIController } from 'context';


const useMenuHome = (props: any) => {
    const intl = useIntl();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tipoUsuario = useSelector((state: any) => state?.app?.user?.data?.tipo_usuario || []);
    const newRoutes = routes.filter(w => w?.type === 'collapse' && (w?.allow || []).includes(tipoUsuario?.[0]?.id));
    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    const contrato = useSelector((state: any) => state?.app?.contrato || null);
    const superAdministrador = useSelector((state: any) => state?.app?.user?.data?.tipo_usuario || [])?.find((e: any) => e?.id === 3);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    const handleisAlerClose = () => {
        navigate(`/inicio`);
        setIsAlertOpen(false);
    };

    const handleNavegarSinEspacio = () => {
        setMensajeAlert(intl.formatMessage({ id: 'menu_home_advertencia_navegar' }));
        handleisAlertOpen();
    }
    return {
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
    }
}

export default useMenuHome
