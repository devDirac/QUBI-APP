import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    Typography,
    Grid,
    Box,
    Backdrop,
    CircularProgress,
    Zoom,
    Fab,
    Drawer,
    Button,
    Divider,
    Autocomplete,
    TextField
} from "@mui/material";
import Header from '../../componets/Header/Header';
import _ from 'lodash';
import ModalComponent from '../../componets/Modal';
import { getErrorHttpMessage } from '../../utils';
import { convierteGeoJsonHttp } from '../../actions/junoGeos';
import { useIntl } from 'react-intl';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';

import { Chip } from "@mui/material";
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import Marquee from "react-fast-marquee";
import env from "react-dotenv";
import { useLocation, useSearchParams } from "react-router-dom";
//import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MapGL, { Source, Layer } from "react-map-gl";
import "ol/ol.css";
import { Map, View } from "ol";
import GeoJSON from "ol/format/GeoJSON";
import { Tile as TileLayer, Vector as VectorLayer, Heatmap as HeatmapLayer } from "ol/layer";
import { OSM } from "ol/source";
import VectorSource from "ol/source/Vector";
import { Style, Fill, Stroke } from "ol/style";
import CircleStyle from "ol/style/Circle";
import { position } from 'stylis';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import CampoSwitch from '../../componets/CampoSwitch';
import MDButton from '../../componets/MDButton';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import FilterListIcon from '@mui/icons-material/FilterList';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const VerAnalisisPageLayOut: React.FC = () => {
    const location = useLocation();
    const { miEstado } = location.state || {};
    const [startDate, setStartDate] = useState<any>(null);
    const [excludedDates, setExcludedDates] = useState<any>([]);
    const [misionSeleccionada, setMisionSeleccionada] = useState<any>(null);

    const intl = useIntl();
    const mapRef = useRef<any>(null);
    const [mediaItems, setMediaItem] = useState([]);
    const [data, setData] = useState<any>([]);
    const [procesando, setProcesando] = useState(false);
    /* Modal mensajes generales */
    const [mensajeAlert, setMensajeAlert] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);
    // Estado para controlar la visibilidad del side menu (Drawer)
    const [openDrawer, setOpenDrawer] = useState(false);

    const [openDrawer2, setOpenDrawer2] = useState(false);

    const [openDrawer3, setOpenDrawer3] = useState(false);

    const [tipoVista, setTipoVista] = useState('mapa');

    // Función para alternar la visibilidad del Drawer
    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };

    const toggleDrawer2 = () => {
        setOpenDrawer2(!openDrawer2);
    };

    const toggleDrawer3 = () => {
        setOpenDrawer3(!openDrawer3);
    };

    const libraries: any = ['drawing', 'geometry'];

    const mexicoPolygon = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                geometry: {
                    type: "Polygon",
                    coordinates: [
                        [
                            [-118.0, 32.0], // Coordenadas del polígono
                            [-86.0, 32.0],
                            [-86.0, 14.0],
                            [-118.0, 14.0],
                            [-118.0, 32.0],
                        ],
                    ],
                },
            },
        ],
    };

    const mexicoStyle = new Style({
        fill: new Fill({ color: "rgba(0, 0, 255, 0.1)" }),
        stroke: new Stroke({ color: "blue", width: 2 }),
    });

    const geoJsonData = {
        type: "FeatureCollection",
        features: [
            { type: "Feature", properties: { weight: 1 }, geometry: { type: "Point", coordinates: [-99.1332, 19.4326] } }, // CDMX
            { type: "Feature", properties: { weight: 0.8 }, geometry: { type: "Point", coordinates: [-100.983, 22.1565] } }, // San Luis Potosí
            { type: "Feature", properties: { weight: 0.5 }, geometry: { type: "Point", coordinates: [-102.5528, 23.6345] } }, // Zacatecas
        ],
    };

    const polygonStyle = new Style({
        fill: new Fill({ color: "rgba(0, 0, 255, 0.1)" }), // Azul claro, semi-transparente
        stroke: new Stroke({ color: "blue", width: 2 }), // Bordes azules
    });

    const pointStyle = (feature: any) => {
        return new Style({
            image: new CircleStyle({
                radius: 15, // Radio del punto
                fill: new Fill({ color: feature.get("color") }),
                stroke: new Stroke({ color: "black", width: 1 }), // Borde negro
            }),
        });
    };

    const polygonLayer = new VectorLayer({
        source: new VectorSource({
            features: new GeoJSON().readFeatures(mexicoPolygon, {
                dataProjection: "EPSG:4326",
                featureProjection: "EPSG:3857",
            }),
        }),
        style: polygonStyle,
    });


    const baseLayer = new TileLayer({
        source: new OSM(),
    });

    const pointsLayer = new VectorLayer({
        source: new VectorSource({
            features: new GeoJSON().readFeatures(geoJsonData, {
                dataProjection: "EPSG:4326",
                featureProjection: "EPSG:3857",
            }),
        }),
        style: pointStyle,
    });

    const heatmapLayer = new HeatmapLayer({
        source: new VectorSource({
            features: new GeoJSON().readFeatures(geoJsonData, {
                dataProjection: "EPSG:4326",
                featureProjection: "EPSG:3857",
            }),
        }),
        blur: 15, // Difuminado
        radius: 15, // Radio del degradado
        weight: (feature) => feature.get("weight"), // Peso del punto
    });

    const mexicoLayer = new VectorLayer({
        source: new VectorSource({
            features: new GeoJSON().readFeatures(mexicoPolygon, {
                dataProjection: "EPSG:4326",
                featureProjection: "EPSG:3857",
            }),
        }),
        style: new Style({
            fill: new Fill({
                color: "rgba(255, 255, 255, 0.1)", // Transparente para ver el mapa de calor
            }),
            stroke: new Stroke({
                color: "black",
                width: 2,
            }),
        }),
    });

    const polygons = {
        type: "FeatureCollection",
        features: [
            { type: "Feature", properties: { weight: 1 }, geometry: { type: "Point", coordinates: [-99.1332, 19.4326] } }, // CDMX
            { type: "Feature", properties: { weight: 2 }, geometry: { type: "Point", coordinates: [-100.3161, 25.6866] } }, // Monterrey
            { type: "Feature", properties: { weight: 3 }, geometry: { type: "Point", coordinates: [-103.3496, 20.6597] } }, // Guadalajara
            { type: "Feature", properties: { weight: 2 }, geometry: { type: "Point", coordinates: [-87.2169, 21.1619] } }, // Cancún
        ],
    };

    // Función para asignar estilo según el valor de cada polígono
    const getPolygonStyle = (feature: any) => {
        const value = feature.get("value");
        let color;

        if (value === 1) {
            color = "rgba(255, 0, 0, 0.6)"; // Rojo (bajo)
        } else if (value === 2) {
            color = "rgba(255, 255, 0, 0.6)"; // Amarillo (medio)
        } else if (value === 3) {
            color = "rgba(0, 255, 0, 0.6)"; // Verde (alto)
        }

        return new Style({
            fill: new Fill({
                color: color,
            }),
            stroke: new Stroke({
                color: "black",
                width: 1,
            }),
        });
    };

    // Capa base de OpenStreetMap
    // Capa vectorial con los polígonos
    const polygonLayer_ = new VectorLayer({
        source: new VectorSource({
            features: new GeoJSON().readFeatures(polygons, {
                dataProjection: "EPSG:4326",
                featureProjection: "EPSG:3857",
            }),
        }),
        style: getPolygonStyle,
    });

    const switchView = (newView: string) => {
        if (newView === 'dashboard' && mapRef.current) {
            mapRef.current.setTarget(null); // Desasocia el mapa del DOM
            mapRef.current = null; // Elimina la referencia
        }

        setTipoVista(newView);

        if (newView === 'mapa') {
            setTimeout(() => {
                handleAddItemDos();
            }, 500);
        }
    };

    const handleAddItemDos = useCallback(async () => {
        try {
            setProcesando(true);
            if (mapRef.current) {
                console.log("El mapa ya está creado, no se recreará.");
                setProcesando(false);
                return;
            }
            /*  new Map({
                 target: "map2", // ID del div
                 layers: [baseLayer, heatmapLayer, mexicoLayer],
                 view: new View({
                     center: [-99.1332, 19.4326], // Centro en México
                     zoom: 5,
                 }),
             }); */
            const map = new Map({
                target: "map3",
                layers: [baseLayer, heatmapLayer, mexicoLayer],
                view: new View({
                    center: [-99.1332, 19.4326], // Centro de México
                    zoom: 2,
                }),
            });
            mapRef.current = map;
            setProcesando(false);
        } catch (error) {
            setProcesando(false);
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || 'error');
            handleisAlertOpen();
        }
    }, []);

    useEffect(() => {
        handleAddItemDos();
    }, [handleAddItemDos]);

    const handleAddItem = useCallback(async () => {
        try {
            setProcesando(true);
            const response = await convierteGeoJsonHttp();
            setData(response)
            const vectorSource = new VectorSource({
                features: new GeoJSON().readFeatures(response?.[0]?.json, {
                    featureProjection: "EPSG:3857", // Proyección estándar de OpenLayers
                }),
            });
            // Estilo para las características
            const vectorLayer = new VectorLayer({
                source: vectorSource,
                style: new Style({
                    fill: new Fill({
                        color: "rgba(201, 1, 141, 0.5)",
                    }),
                    stroke: new Stroke({
                        color: "rgba(46, 255, 19, 0.5)",
                        width: 10,
                    }),
                }),
            });

            // Crear el mapa
            const map = new Map({
                target: "map",
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                    vectorLayer,
                ],
                view: new View({
                    center: [-11318336.2786, 2389465.3835], // Coordenadas iniciales en EPSG:3857
                    zoom: 12,
                }),
            });
            mapRef.current = map;
            // Evento de clic en el mapa
            map.on("singleclick", (event) => {
                const features = map.getFeaturesAtPixel(event.pixel);
                if (features.length > 0) {
                    const feature = features[0];
                    const properties = feature.getProperties();
                    alert(
                        `Nombre: ${properties.NOM_PROD}\nEstado: ${properties.ESTADO}\nMunicipio: ${properties.MUNICIPIO}\nÁrea (ha): ${properties.AREA_HA}`
                    );
                }
            });
            setProcesando(false);
        } catch (error) {
            setProcesando(false);
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || 'error');
            handleisAlertOpen();
        }
    }, [])

    const containerStyle = {
        width: '100%',
        height: '100%'
    };

    const center = {
        lat: 19.432608, // Coordenadas iniciales (CDMX)
        lng: -99.133209,
    };

    const onLoad = (map: any) => {
        mapRef.current = map;
    };

    useEffect(() => {
        console.log('tipo vista', tipoVista)
    }, [tipoVista])

    useEffect(() => {
        setExcludedDates((location?.state?.reportes || []).map((r: any) => {
            const [year, month, day] = r?.fecha_ejecucion.split("-").map(Number);

            return new Date(year, month - 1, day)
        }))
    }, [location?.state?.reportes])


    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            {/* Navbar */}
            <Header />
            {/* Main Content */}
            <Grid container sx={{ flexGrow: 1, textAlign: "center" }} spacing={2} justifyContent="center" >
                <Grid item xs={12} md={12}>
                    {useMemo(() => (tipoVista === 'mapa' ? <div id="map3" style={{ width: "100%", height: "100%", }}></div> : null), [tipoVista])}
                    {tipoVista === 'dashboard' ?
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                {JSON.stringify(location?.state?.reportes)}
                            </Grid>

                        </Grid> : null}

                </Grid>
                <Zoom
                    key={'fab'}
                    in={true}
                    unmountOnExit
                >
                    <Fab sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                    }} aria-label={'Add'} color={'info'} onClick={toggleDrawer}>
                        <DisplaySettingsIcon fontSize='large' />
                    </Fab>
                </Zoom>

                <Zoom
                    key={'fab2'}
                    in={true}
                    unmountOnExit
                >
                    <Fab sx={{
                        position: 'absolute',
                        bottom: 80,
                        right: 16,
                    }} aria-label={'Add'} color={'info'} onClick={toggleDrawer2}>
                        <ViewInArIcon fontSize='large' />
                    </Fab>
                </Zoom>


                {tipoVista === 'mapa' ? <Zoom
                    key={'fab2'}
                    in={true}
                    unmountOnExit
                >
                    <Fab sx={{
                        position: 'absolute',
                        bottom: 145,
                        right: 16,
                    }} aria-label={'Add'} color={'info'} onClick={() => {
                        mapRef.current.getView().setCenter([23.634501, -102.552784]);
                        mapRef.current.getView().setZoom(1);
                    }}>
                        <CenterFocusStrongIcon fontSize='large' />
                    </Fab>
                </Zoom> : null}

                <Zoom
                    key={'fab2'}
                    in={true}
                    unmountOnExit
                >
                    <Fab sx={{
                        position: 'absolute',
                        bottom: tipoVista === 'mapa' ? 210 : 145,
                        right: 16,
                    }} aria-label={'Add'} color={'info'} onClick={() => {
                        alert('Limpia filtro')
                    }}>
                        <CleaningServicesIcon fontSize='large' />
                    </Fab>
                </Zoom>


                <Zoom
                    key={'fab2'}
                    in={true}
                    unmountOnExit
                >
                    <Fab sx={{
                        position: 'absolute',
                        bottom: tipoVista === 'mapa' ? 275 : 210,
                        right: 16,
                    }} aria-label={'Add'} color={'info'} onClick={() => {
                        toggleDrawer3()
                    }}>
                        <FilterListIcon fontSize='large' />
                    </Fab>
                </Zoom>


                <Drawer
                    anchor="top"
                    key="sadsadsad"
                    open={openDrawer}
                    onClose={toggleDrawer}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            position: 'absolute',
                            width: 300,
                            boxSizing: 'border-box',
                            top: 75,
                            height: 'auto'
                        },
                    }}
                >
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Categoría
                        </Typography>
                        {/* Agrega las opciones que necesites en el side menu */}
                        <Button variant="outlined" size="small" className='active' style={{ width: '100%', color: 'black' }}>
                            Large
                        </Button>
                        <Divider />
                        <Button variant="outlined" size="small" style={{ width: '100%', color: 'black' }}>
                            Large
                        </Button>
                        <Divider />
                        <Button variant="outlined" size="small" style={{ width: '100%', color: 'black' }}>
                            Large
                        </Button>
                        <Divider />
                        <Button variant="outlined" size="small" style={{ width: '100%', color: 'black' }}>
                            Large
                        </Button>
                        <Divider />
                        <Button variant="outlined" size="small" style={{ width: '100%', color: 'black' }}>
                            Large1
                        </Button>
                    </Box>
                </Drawer>

                <Drawer
                    anchor="top"
                    key="asda"
                    open={openDrawer2}
                    onClose={toggleDrawer2}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            position: 'absolute',
                            width: 220,
                            boxSizing: 'border-box',
                            top: 75,
                            height: 120
                        },
                    }}
                >
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Tipo de vista: {tipoVista}
                        </Typography>
                        {useMemo(() => (<CampoSwitch
                            key={"switch3"}
                            label={'Tipo de reporte'}
                            value={tipoVista === 'mapa' ? true : false}
                            onAction={(v: any) => {
                                switchView(v ? 'mapa' : 'dashboard');
                            }}
                        />), [tipoVista])}
                    </Box>
                </Drawer>


                <Drawer
                    anchor="top"
                    key="asdaasdada"
                    open={openDrawer3}
                    onClose={toggleDrawer3}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            position: 'absolute',
                            width: 350,
                            boxSizing: 'border-box',
                            top: 75,
                            height: '500px',
                            backgroundColor: 'transparent'
                        },
                    }}
                >
                    <Box sx={{ p: 2 }} style={{ textAlign: 'center' }}>
                        <br></br>
                        <Typography variant="h6" gutterBottom>
                            Indique la fecha en que se ejecuto la misión
                        </Typography>
                        <Grid container spacing={2} justifyContent={'center'} justifyItems={'center'} alignContent={'center'}>
                            <Grid item>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => {
                                        setStartDate(date)
                                        setMisionSeleccionada(null)
                                    }}
                                    includeDates={excludedDates}
                                    dateFormat="yyyy/MM/dd"
                                    placeholderText="Selecciona una fecha"
                                />
                            </Grid>
                        </Grid>
                        {startDate ? <Grid item>
                            <br></br>
                            <Typography variant="h6" gutterBottom>
                                Seleccione la misión
                            </Typography>
                            <Autocomplete
                                disablePortal
                                onChange={(event, newValue) => {

                                    console.log(event, newValue)
                                    setMisionSeleccionada(newValue)
                                }}
                                value={misionSeleccionada}
                                options={(location?.state?.reportes || []).filter((r: any) => {
                                    const [year, month, day] = r?.fecha_ejecucion.split("-").map(Number);
                                    const fecha = new Date(startDate);
                                    const ano = fecha.getFullYear();
                                    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
                                    const dia = String(fecha.getDate()).padStart(2, '0');
                                    return year === ano && month === parseInt(mes) && day === parseInt(dia)
                                }).map((r: any) => {
                                    return {
                                        label: r?.titulo,
                                        value: r?.id + ''
                                    }
                                })}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Misión" />}
                            />
                        </Grid> : null}

                    </Box>
                </Drawer>

            </Grid>

            <Backdrop style={{ zIndex: 1000, color: "#fff" }} open={procesando}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <ModalComponent handleClose={handleisAlerClose} isOpen={isAlertOpen} key={'alerta'}>
                <Grid container spacing={2} style={{ textAlign: 'center' }}>
                    <Grid item xs={12}>
                        <br />
                        <br />
                        <p>{mensajeAlert}</p>
                    </Grid>
                </Grid>
            </ModalComponent>

        </Box>
    );
}
export default VerAnalisisPageLayOut;