import { Routes, Route } from "react-router-dom";
//import PrivateRouter from "./hocs/PrivateRouter";
import PublicRouter from "./hocs/PublicRoutes";
import { IntlProvider, ReactIntlErrorCode } from "react-intl";
import textosMx from "./idioms/mx";
import textoEn from "./idioms/en";
import { useSelector } from "react-redux";
import { StoreType } from "./types/geericTypes";
import {
  useMaterialUIController
} from "context";
import { CssBaseline } from "@mui/material";
import themeDarkRTL from "./assets/theme-dark/theme-rtl";
import themeRTL from "./assets/theme/theme-rtl";
import { ThemeProvider } from "@mui/material/styles";
import _ from "lodash";
import PasswordRecoverPage from "./pages/PasswordRecoverPage";
import PasswordRecoverValidationPage from "./pages/PasswordRecoverValidationPage";
import LoginPageCover from "./pages/LoginPageCover";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRouter from "./hocs/PrivateRouter";
import InicioPage from "./pages/InicioPage";
import LogoutPage from "./pages/logoutPage";
import GestionProyectosPage from "./pages/GestionProyectosPage";
import GestionUsuariosPage from "./pages/GestionUsuariosPage";
import PerfilUsuarioPage from "./pages/PerfilUsuarioPage";
import VerAnalisisPage from "./pages/VerAnalisisPage";

export default function App() {
  const [controller] = useMaterialUIController();

  const { darkMode } = controller;

  const onError = (e: any) => {
    if (e.code === ReactIntlErrorCode.MISSING_DATA) {
      return;
    }
  };

  const local = useSelector(
    (state: StoreType) => state?.app?.idioma || 'mx'
  );

  const loadLocaleData = (locale: string) => {
    if (locale === 'en') {
      return textoEn;
    }
    return textosMx;
  };

  return (
    <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
      <CssBaseline />
      <IntlProvider onError={onError} locale={local} messages={loadLocaleData(local)}>
        <Routes>
          {/* inicia rutas publicas */}
          <Route path="/login-juno" element={<PublicRouter />}>
            <Route path="/login-juno" element={<LoginPageCover />} />
          </Route>
          <Route path="/recupera-password" element={<PublicRouter />}>
            <Route path="/recupera-password" element={<PasswordRecoverPage />} />
          </Route>
          <Route path="/recupera-password-validacion" element={<PublicRouter />}>
            <Route path="/recupera-password-validacion" element={<PasswordRecoverValidationPage />} />
          </Route>
          <Route path="/" element={<PublicRouter />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          {/* fin rutas publicas */}
          {/* inicia rutas privadas */}
          <Route path="/" element={<PrivateRouter path="/login-juno" />}>
            <Route path="/inicio" element={<InicioPage />} />
            <Route path="/logoutPage" element={<LogoutPage />} />
            <Route path="/gestion-proyectos" element={<GestionProyectosPage />} />
            <Route path="/gestion-usuarios" element={<GestionUsuariosPage />} />
            <Route path="/perfil" element={<PerfilUsuarioPage />} />
            <Route path="/ver-analisis" element={<VerAnalisisPage />} />
          </Route>
          {/* fin rutas privadas */}
          {/* inicia pagina no encontrada */}
          <Route path="*" element={<NotFoundPage />} />
          {/* fin pagina no encontrada */}
        </Routes>
      </IntlProvider>
    </ThemeProvider>
  );
}
