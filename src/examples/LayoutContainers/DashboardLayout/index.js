/**
=========================================================
* Otis Admin PRO - v2.0.1
=========================================================

* Product Page: https://material-ui.com/store/items/otis-admin-pro-material-dashboard-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect , useRef} from "react";
import { useSelector } from "react-redux";
// react-router-dom componets
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Otis Admin PRO React componets
import MDBox from "../../../componets/MDBox/index";

// Otis Admin PRO React context
import { useMaterialUIController, setLayout } from "context";

function DashboardLayout({ children }) {
  const nodeRef = useRef(null)
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller;
  const { pathname } = useLocation();
  const rutaSeleccionada = useSelector((state) => state?.app?.ruta || null);
  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [pathname, dispatch]);
  
  return (
    <MDBox
      ref={nodeRef}
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: "relative",

        [breakpoints.up("xl")]: {
          marginLeft: rutaSeleccionada ? (miniSidenav ? pxToRem(120) : pxToRem(300)) : '0',
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      {children}
    </MDBox>
  );
}

// Typechecking props for the DashboardLayout
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
