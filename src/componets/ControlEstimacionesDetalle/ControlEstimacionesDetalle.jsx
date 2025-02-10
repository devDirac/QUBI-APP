import React from 'react'
import { VectorMap } from "@react-jvectormap/core";
import { worldMerc } from "@react-jvectormap/world";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

// @mui material componets
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Otis Admin PRO React componets
import MDBox from "../../componets/MDBox/index";
import MDTypography from "../../componets/MDTypography/index";

// Otis Admin PRO React example componets
import SalesTable from "../../examples/Tables/SalesTable";

// Data
import salesTableData from "../../layouts/dashboards/analytics/components/SalesByCountry/data/salesTableData";

const ControlEstimacionesDetalle = (props) => {
    return (
        <Card sx={{ width: "100%" }}>
            <MDBox display="flex">
                <MDBox
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="4rem"
                    height="4rem"
                    variant="gradient"
                    bgColor="success"
                    color="white"
                    shadow="md"
                    borderRadius="xl"
                    ml={3}
                    mt={-2}
                >
                    <Icon fontSize="medium" color="inherit">
                        calculate
                    </Icon>
                </MDBox>
                <MDTypography variant="h6" sx={{ mt: 2, mb: 1, ml: 2 }}>
                    Estimación # :  {props?.numEstimacion}
                </MDTypography>
            </MDBox>
            <MDBox p={2}>
                <Grid container>
                    <Grid item xs={12} md={12} lg={12}>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                sx={{ color: 'text.primary', display: 'inline' }}
                                            >
                                                Periodo : {props?.periodo}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                sx={{ color: 'text.primary', display: 'inline' }}
                                            >
                                                Volumen estimación : {props?.volEstimacion}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                sx={{ color: 'text.primary', display: 'inline' }}
                                            >
                                                Importe estimación : {props?.impEstimacion}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />


                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                sx={{ color: 'text.primary', display: 'inline' }}
                                            >
                                                % Avance : {props?.avanceEstimacion}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />


                            </ListItem>

                        </List>
                    </Grid>
                </Grid>
            </MDBox>
        </Card>
    )
}

export default ControlEstimacionesDetalle
