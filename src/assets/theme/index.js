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
import colors from "assets/theme/base/colors";
import breakpoints from "assets/theme/base/breakpoints";
import typography from "assets/theme/base/typography";
import boxShadows from "assets/theme/base/boxShadows";
import borders from "assets/theme/base/borders";
import globals from "assets/theme/base/globals";

// Otis Admin PRO React helper functions
import boxShadow from "assets/theme/functions/boxShadow";
import hexToRgb from "assets/theme/functions/hexToRgb";
import linearGradient from "assets/theme/functions/linearGradient";
import pxToRem from "assets/theme/functions/pxToRem";
import rgba from "assets/theme/functions/rgba";

// Otis Admin PRO React componets base styles for @mui material componets
import sidenav from "assets/theme/componets/sidenav";
import list from "assets/theme/componets/list";
import listItem from "assets/theme/componets/list/listItem";
import listItemText from "assets/theme/componets/list/listItemText";
import card from "assets/theme/componets/card";
import cardMedia from "assets/theme/componets/card/cardMedia";
import cardContent from "assets/theme/componets/card/cardContent";
import button from "assets/theme/componets/button";
import iconButton from "assets/theme/componets/iconButton";
import input from "assets/theme/componets/form/input";
import inputLabel from "assets/theme/componets/form/inputLabel";
import inputOutlined from "assets/theme/componets/form/inputOutlined";
import textField from "assets/theme/componets/form/textField";
import menu from "assets/theme/componets/menu";
import menuItem from "assets/theme/componets/menu/menuItem";
import switchButton from "assets/theme/componets/form/switchButton";
import divider from "assets/theme/componets/divider";
import tableContainer from "assets/theme/componets/table/tableContainer";
import tableHead from "assets/theme/componets/table/tableHead";
import tableCell from "assets/theme/componets/table/tableCell";
import linearProgress from "assets/theme/componets/linearProgress";
import breadcrumbs from "assets/theme/componets/breadcrumbs";
import slider from "assets/theme/componets/slider";
import avatar from "assets/theme/componets/avatar";
import tooltip from "assets/theme/componets/tooltip";
import appBar from "assets/theme/componets/appBar";
import tabs from "assets/theme/componets/tabs";
import tab from "assets/theme/componets/tabs/tab";
import stepper from "assets/theme/componets/stepper";
import step from "assets/theme/componets/stepper/step";
import stepConnector from "assets/theme/componets/stepper/stepConnector";
import stepLabel from "assets/theme/componets/stepper/stepLabel";
import stepIcon from "assets/theme/componets/stepper/stepIcon";
import select from "assets/theme/componets/form/select";
import formControlLabel from "assets/theme/componets/form/formControlLabel";
import formLabel from "assets/theme/componets/form/formLabel";
import checkbox from "assets/theme/componets/form/checkbox";
import radio from "assets/theme/componets/form/radio";
import autocomplete from "assets/theme/componets/form/autocomplete";
import flatpickr from "assets/theme/componets/flatpickr";
import container from "assets/theme/componets/container";
import popover from "assets/theme/componets/popover";
import buttonBase from "assets/theme/componets/buttonBase";
import icon from "assets/theme/componets/icon";
import svgIcon from "assets/theme/componets/svgIcon";
import link from "assets/theme/componets/link";
import dialog from "assets/theme/componets/dialog";
import dialogTitle from "assets/theme/componets/dialog/dialogTitle";
import dialogContent from "assets/theme/componets/dialog/dialogContent";
import dialogContentText from "assets/theme/componets/dialog/dialogContentText";
import dialogActions from "assets/theme/componets/dialog/dialogActions";

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
