import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getErrorHttpMessage } from "../../utils";
import { recoverPasswordGenerateToken } from "../../actions/auth";
import { useIntl } from "react-intl";

export const usePasswordRecoverPage = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const [procesando, setProcesando] = useState<boolean>(false);
  const [isAlertOpen,setIsAlertOpen] = useState(false);
    const [mensajeAlert,setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);
  const recuperaPassword = async (usr: { user: string }) => {
    try {
      setProcesando(true);
      await recoverPasswordGenerateToken({ email: usr.user });
      setMensajeAlert(intl.formatMessage({ id: 'recuperacion_contrasena_inicio_proceso_exito' }));
      setProcesando(false);
      handleisAlertOpen();
    } catch (err) {
      const message = getErrorHttpMessage(err);
      setMensajeAlert(message || intl.formatMessage({ id: 'recuperacion_contrasena_inicio_proceso_error' }));
      setProcesando(false);
      handleisAlertOpen();
    }
  }

  return {
    procesando,
    setProcesando,
    navigate,
    recuperaPassword,
    isAlertOpen,
    handleisAlerClose,
    mensajeAlert,
    intl
  }
}