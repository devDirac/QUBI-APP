/**
=========================================================
* Otis Admin PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material componets
import { createTheme } from "@mui/material/styles";
// import Fade from "@mui/material/Fade";

// Otis Admin PRO React base styles
import colors from "assets/theme-dark/base/colors";
import breakpoints from "assets/theme-dark/base/breakpoints";
import typography from "assets/theme-dark/base/typography";
import boxShadows from "assets/theme-dark/base/boxShadows";
import borders from "assets/theme-dark/base/borders";
import globals from "assets/theme-dark/base/globals";

// Otis Admin PRO React helper functions
import boxShadow from "assets/theme-dark/functions/boxShadow";
import hexToRgb from "assets/theme-dark/functions/hexToRgb";
import linearGradient from "assets/theme-dark/functions/linearGradient";
import pxToRem from "assets/theme-dark/functions/pxToRem";
import rgba from "assets/theme-dark/functions/rgba";

// Otis Admin PRO React componets base styles for @mui material componets
import sidenav from "assets/theme-dark/componets/sidenav";
import list from "assets/theme-dark/componets/list";
import listItem from "assets/theme-dark/componets/list/listItem";
import listItemText from "assets/theme-dark/componets/list/listItemText";
import card from "assets/theme-dark/componets/card";
import cardMedia from "assets/theme-dark/componets/card/cardMedia";
import cardContent from "assets/theme-dark/componets/card/cardContent";
import button from "assets/theme-dark/componets/button";
import iconButton from "assets/theme-dark/componets/iconButton";
import input from "assets/theme-dark/componets/form/input";
import inputLabel from "assets/theme-dark/componets/form/inputLabel";
import inputOutlined from "assets/theme-dark/componets/form/inputOutlined";
import textField from "assets/theme-dark/componets/form/textField";
import menu from "assets/theme-dark/componets/menu";
import menuItem from "assets/theme-dark/componets/menu/menuItem";
import switchButton from "assets/theme-dark/componets/form/switchButton";
import divider from "assets/theme-dark/componets/divider";
import tableContainer from "assets/theme-dark/componets/table/tableContainer";
import tableHead from "assets/theme-dark/componets/table/tableHead";
import tableCell from "assets/theme-dark/componets/table/tableCell";
import linearProgress from "assets/theme-dark/componets/linearProgress";
import breadcrumbs from "assets/theme-dark/componets/breadcrumbs";
import slider from "assets/theme-dark/componets/slider";
import avatar from "assets/theme-dark/componets/avatar";
import tooltip from "assets/theme-dark/componets/tooltip";
import appBar from "assets/theme-dark/componets/appBar";
import tabs from "assets/theme-dark/componets/tabs";
import tab from "assets/theme-dark/componets/tabs/tab";
import stepper from "assets/theme-dark/componets/stepper";
import step from "assets/theme-dark/componets/stepper/step";
import stepConnector from "assets/theme-dark/componets/stepper/stepConnector";
import stepLabel from "assets/theme-dark/componets/stepper/stepLabel";
import stepIcon from "assets/theme-dark/componets/stepper/stepIcon";
import select from "assets/theme-dark/componets/form/select";
import formControlLabel from "assets/theme-dark/componets/form/formControlLabel";
import formLabel from "assets/theme-dark/componets/form/formLabel";
import checkbox from "assets/theme-dark/componets/form/checkbox";
import radio from "assets/theme-dark/componets/form/radio";
import autocomplete from "assets/theme-dark/componets/form/autocomplete";
import flatpickr from "assets/theme-dark/componets/flatpickr";
import container from "assets/theme-dark/componets/container";
import popover from "assets/theme-dark/componets/popover";
import buttonBase from "assets/theme-dark/componets/buttonBase";
import icon from "assets/theme-dark/componets/icon";
import svgIcon from "assets/theme-dark/componets/svgIcon";
import link from "assets/theme-dark/componets/link";
import dialog from "assets/theme-dark/componets/dialog";
import dialogTitle from "assets/theme-dark/componets/dialog/dialogTitle";
import dialogContent from "assets/theme-dark/componets/dialog/dialogContent";
import dialogContentText from "assets/theme-dark/componets/dialog/dialogContentText";
import dialogActions from "assets/theme-dark/componets/dialog/dialogActions";

export default createTheme({
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },

  componets: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...flatpickr,
        ...container,
      },
    },
    MuiDrawer: { ...sidenav },
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiCard: { ...card },
    MuiCardMedia: { ...cardMedia },
    MuiCardContent: { ...cardContent },
    MuiButton: { ...button },
    MuiIconButton: { ...iconButton },
    MuiInput: { ...input },
    MuiInputLabel: { ...inputLabel },
    MuiOutlinedInput: { ...inputOutlined },
    MuiTextField: { ...textField },
    MuiMenu: { ...menu },
    MuiMenuItem: { ...menuItem },
    MuiSwitch: { ...switchButton },
    MuiDivider: { ...divider },
    MuiTableContainer: { ...tableContainer },
    MuiTableHead: { ...tableHead },
    MuiTableCell: { ...tableCell },
    MuiLinearProgress: { ...linearProgress },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiSlider: { ...slider },
    MuiAvatar: { ...avatar },
    MuiTooltip: { ...tooltip },
    MuiAppBar: { ...appBar },
    MuiTabs: { ...tabs },
    MuiTab: { ...tab },
    MuiStepper: { ...stepper },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector },
    MuiStepLabel: { ...stepLabel },
    MuiStepIcon: { ...stepIcon },
    MuiSelect: { ...select },
    MuiFormControlLabel: { ...formControlLabel },
    MuiFormLabel: { ...formLabel },
    MuiCheckbox: { ...checkbox },
    MuiRadio: { ...radio },
    MuiAutocomplete: { ...autocomplete },
    MuiPopover: { ...popover },
    MuiButtonBase: { ...buttonBase },
    MuiIcon: { ...icon },
    MuiSvgIcon: { ...svgIcon },
    MuiLink: { ...link },
    MuiDialog: { ...dialog },
    MuiDialogTitle: { ...dialogTitle },
    MuiDialogContent: { ...dialogContent },
    MuiDialogContentText: { ...dialogContentText },
    MuiDialogActions: { ...dialogActions },
  },
});
