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

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @fullcalendar componets
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// @mui material componets
import Card from "@mui/material/Card";

// Otis Admin PRO React componets
import MDBox from "../../componets/MDBox";
import MDTypography from "../../componets/MDTypography";

// Custom styles for Calendar
import CalendarRoot from "./CalendarRoot";

// Otis Admin PRO React context
import { useMaterialUIController } from "context";

function Calendar({ header, ...rest }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const validClassNames = [
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",


  "avances_fecha_ejecucion",
  "avances_fecha_captura",
  "estimaciones",
  "actividadesProgramadas"

  ];

  const handleEventMouseEnter = (info) => {
    info.el.style.backgroundColor = '#f0f0f0'; // Cambia el color al pasar el mouse
    info.el.style.cursor = 'pointer'; // Cambia el cursor a pointer
  };

  const handleEventMouseLeave = (info) => {
    info.el.style.backgroundColor = ''; // Resetea el color al salir
  };

  const events = rest.events
    ? rest.events.map((el) => ({
        ...el,
        className: validClassNames.find((item) => item === el.className)
          ? `event-${el.className}`
          : "event-info",
      }))
    : [];

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={header?.title || header?.date ? 2 : 0} px={2} lineHeight={1}>
        {header?.title ? (
          <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            {header?.title || ''}
          </MDTypography>
        ) : null}
        {header?.date ? (
          <MDTypography component="p" variant="button" color="text" fontWeight="regular">
            {header.date}
          </MDTypography>
        ) : null}
      </MDBox>
      <CalendarRoot p={2} ownerState={{ darkMode }}>
        <FullCalendar
          {...rest} 
          selectable={true}
          locales={'es'}
          locale={'es'}
          eventMouseEnter={handleEventMouseEnter}
          eventMouseLeave={handleEventMouseLeave}
          dayMaxEventRows={3}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          events={events}
          height="100%"
        />
      </CalendarRoot>
    </Card>
  );
}

// Typechecking props for the Calendar
Calendar.propTypes = {
  header: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
  }),
};

export default Calendar;
