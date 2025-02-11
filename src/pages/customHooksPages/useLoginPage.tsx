import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginAction } from "../../componets/LoginForm/types";
import { loginHttp, setUser } from "../../actions/auth";
import { getErrorHttpMessage } from "../../utils";
import { catalogos } from "../../utils/constants";
import { useIntl } from "react-intl";

export const useLoginPage = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const navigate = useNavigate();
  const [procesando, setProcesando] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [mensajeAlert, setMensajeAlert] = useState('');
  const [errorLogin, setErrorLogin] = useState(false);
  const handleisAlertOpen = () => setIsAlertOpen(true);
  const handleisAlerClose = () => setIsAlertOpen(false);

  const login = async (data: LoginAction) => {
    try {
      setProcesando(true);
      const user = await loginHttp(data);
      dispatch(setUser(user));
      setProcesando(false);
      navigate(`/inicio`);
    } catch (error) {
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'login_error' }));
      setProcesando(false);
      handleisAlertOpen();
      setErrorLogin(true);
    }
  }
  return {
    procesando,
    login,
    isAlertOpen,
    handleisAlerClose,
    mensajeAlert,
    intl,
    errorLogin
  }
}