import React, { useState, useEffect } from "react";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Box,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material";
import {
  NotificationsOutlined,
  Warning as WarningIcon,
  Info as InfoIcon,
  Error as ErrorIcon,
  CheckCircle as CheckIcon,
  Circle as CircleIcon,
  AccessTime,
} from "@mui/icons-material";
import { useLocation, Link } from "react-router-dom";

// Services
import { $endpoints } from "@endpoints";
import api from "@/services/api";

const NotificationsMenu = () => {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    getNotifications();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "warning":
        return "warning.main";
      case "error":
        return "error.main";
      case "success":
        return "success.main";
      case "info":
        return "info.main";
      default:
        return "primary.main";
    }
  };

  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "warning":
        return (
          <WarningIcon fontSize="medium" sx={{ color: getTypeColor(type) }} />
        );
      case "error":
        return (
          <ErrorIcon fontSize="medium" sx={{ color: getTypeColor(type) }} />
        );
      case "success":
        return (
          <CheckIcon fontSize="medium" sx={{ color: getTypeColor(type) }} />
        );
      case "info":
        return (
          <InfoIcon fontSize="medium" sx={{ color: getTypeColor(type) }} />
        );
      default:
        return <InfoIcon color="primary" />;
    }
  };

  const getBackgroundColor = (type) => {
    switch (type?.toLowerCase()) {
      case "warning":
        return "warning";
      case "error":
        return "danger";
      case "danger":
        return "danger";
      case "success":
        return "success";
      case "info":
        return "primary";
      default:
        return "primary";
    }
  };

  const getNotifications = async () => {
    try {
      const response = await api.post($endpoints.panel.notifications,{ filter: "unread" }, false);
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="large"
        color="inherit"
        aria-label="show notifications"
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsOutlined fontSize={"medium"} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            maxHeight: 480,
            width: "400px",
            maxWidth: "400px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            "& .MuiMenuItem-root": {
              px: 2,
              py: 1,
              borderBottom: "1px solid",
              borderColor: "divider",
              "&:last-child": {
                borderBottom: "none",
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box
          sx={{
            pt: 1,
            px: 2,
            pb: 1,
            bgcolor: "#0000000d",
            borderBottom: "1px solid",
            borderColor: "#0000000d",
            position: "sticky",
            top: 0,
            zIndex: 1,
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h6" sx={{ fontSize: "1rem" }}>
            Notificaciones
          </Typography>
          {notifications.length > 0 && (
            <Typography variant="caption" color="text.secondary">
              Tienes ({notifications.length}) notificación
              {notifications.length !== 1 ? "es" : ""} sin leer
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            flex: 1,
            paddingTop: "10px",
            paddingBottom: "30px",
            overflow: "auto",
            maxHeight: "calc(480px - 100px)",
          }}
        >
          {notifications.length === 0 ? (
            <Box
              sx={{
                py: 6,
                textAlign: "center",
                color: "text.secondary",
              }}
            >
              <NotificationsOutlined
                fontSize="40px"
                sx={{ fontSize: 40, mb: 1, opacity: 0.3 }}
              />
              <br />
              <Typography variant="p">
                ¡No tienes notificaciones nuevas!
              </Typography>
            </Box>
          ) : (
            notifications.map((notification, index) => (
              <MenuItem
                className={`notification-item ${
                  !notification.read ? "unread" : ""
                } text-${getBackgroundColor(notification.type)}`}
                key={index}
                sx={{
                  m: 0.5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 1,
                  bgcolor: !notification.read ? "action.hover" : "transparent",
                  borderLeft: !notification.read ? "4px solid red" : "none",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    width: "100%",
                    gap: 1,
                  }}
                >
                  <Avatar
                    sx={{
                      background: "#ced4da69",
                      width: 30,
                      height: 30,
                      bgcolor: getBackgroundColor(notification.type),
                    }}
                  >
                    {getTypeIcon(notification.type)}
                  </Avatar>

                  <Box sx={{ flex: 1 }}>
                    <b
                      className={
                        "text-" + getBackgroundColor(notification.type)
                      }
                    >
                      {notification.title}
                    </b>

                    <p
                      className="fs-75 m-0 text-black notification-description"
                      sx={{
                        display: "-webkit-box",
                      }}
                    >
                      {notification.description}
                    </p>

                    <span className="fs-75 text-muted">
                      <AccessTime
                        sx={{ width: "13px", mt: "-2px", opacity: 0.8 }}
                        fontSize="small"
                      />{" "}
                      {notification.created_at}
                    </span>
                  </Box>
                </Box>
              </MenuItem>
            ))
          )}
        </Box>

        {/* <Box
          sx={{
            px: 1,
            py: 0,
            pt: 1,
            bgcolor: "#0000000d",
            borderTop: "1px solid",
            borderColor: "#0000000d",
            position: "sticky",
            bottom: 0,
            zIndex: 1,
            bgcolor: "background.paper",
          }}
        >
          <div className="text-center">
            <Link to={"/u/notifications"}> Ver todas </Link>
          </div>
        </Box> */}
      </Menu>
    </>
  );
};

export default NotificationsMenu;
