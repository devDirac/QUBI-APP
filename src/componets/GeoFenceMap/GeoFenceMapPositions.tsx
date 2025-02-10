import React, { useState, useCallback } from 'react';
import { GoogleMap, useLoadScript, DrawingManager, Polygon, InfoWindow, Marker, OverlayView, MarkerClusterer } from '@react-google-maps/api';
import env from "react-dotenv";
import { Grid } from '@mui/material';
import DinamicTableMejorada from '../DinamicTableMejorada/DinamicTableMejorada';
import InfoWindowMark from './InfoWindowMark';
import { Button } from 'react-bootstrap';
import RoomIcon from '@mui/icons-material/Room';
import ModalComponent from '../Modal/index';
const mapContainerStyle = {
    width: '100%',
    height: '700px'
};
const center = {
    lat: 19.432608,
    lng: -99.133209,
};

const libraries: any = ['drawing', 'geometry'];

export interface GeoFenceMapPositionsProps {
    procesando: boolean
    geocercas: any[]
    positions: any
}

const GeoFenceMapPositions = (props: GeoFenceMapPositionsProps) => {

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: env.googleMapsKey,
        libraries,
    });

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);

    const [clusterMarkers, setClusterMarkers] = React.useState([]);
    const [selectedGeofenceSaved, setSelectedGeofenceSaved] = useState<any>(null);
    const [infoContent, setInfoContent] = useState<any>('');
    const [infoWindowPosition, setInfoWindowPosition] = useState<any>(null);
    const [infoWindowPositionSaved, setInfoWindowPositionSaved] = useState(null);
    const [itemGuardado, setItemGuardado] = useState<any>(null);
    // Verificar si una posición está dentro de alguna geocerca

    const isPositionInGeofence = (position: any) => {
        const latLng = new window.google.maps.LatLng(position.latitude, position.longitude);
        const geofences: any = [];
        (props?.geocercas || []).forEach((geofence: any, index: any) => {
            if (geofence?.id_contrato === position?.contrato) {
                geofences.push(JSON.parse(geofence?.coordenadas))
            }
        });
        return geofences.some((geofence: any) => {
            const polygon = new window.google.maps.Polygon({ paths: geofence });
            return window.google.maps.geometry.poly.containsLocation(latLng, polygon);
        });
    };


    const calculateArea = (coordinates: any) => {
        const paths = coordinates.map((coord: any) => new window.google.maps.LatLng(coord.lat, coord.lng));
        const polygon = new window.google.maps.Polygon({ paths });
        return window.google.maps.geometry.spherical.computeArea(polygon.getPath());
    };

    const calculateCenter = (coordinates: any) => {
        let latSum = 0;
        let lngSum = 0;
        coordinates.forEach((coord: any) => {
            latSum += coord.lat;
            lngSum += coord.lng;
        });
        return {
            lat: latSum / coordinates.length,
            lng: lngSum / coordinates.length,
        };
    };
    const isPointInGeofence = (point: any, coordinates: any) => {
        const polygon = new window.google.maps.Polygon({ paths: coordinates });
        return window.google.maps.geometry.poly.containsLocation(point, polygon);
    };

    const findClosestGeofenceSaved = (clickLatLng: any) => {
        let closestGeofence = null;
        let minDistance = Infinity;
        (props?.geocercas || []).forEach((geofence: any, index: any) => {
            const center = calculateCenter(JSON.parse(geofence?.coordenadas));
            if (isPointInGeofence(clickLatLng, JSON.parse(geofence?.coordenadas))) {
                const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
                    clickLatLng,
                    new window.google.maps.LatLng(center)
                );
                if (distance < minDistance) {
                    minDistance = distance;
                    closestGeofence = { geofence, index };
                }
            }
        });
        return closestGeofence;
    };

    const handleMapClick = (event: any) => {
        const clickLatLng = event.latLng;
        const closestGeofenceSaved: any = findClosestGeofenceSaved(clickLatLng);
        setSelectedGeofenceSaved(null);
        setInfoWindowPositionSaved(null);

        if (closestGeofenceSaved) {
            const center: any = calculateCenter(JSON.parse(closestGeofenceSaved.geofence?.coordenadas));
            setSelectedGeofenceSaved(closestGeofenceSaved.index);
            setInfoWindowPositionSaved(center);
            setItemGuardado(closestGeofenceSaved)
        }
    };

    if (loadError) return <div>Error cargando el mapa</div>;
    if (!isLoaded) return <div>Cargando mapa...</div>;

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={14}
                    center={center}
                    onClick={handleMapClick}
                >
                    {
                        props?.geocercas.map((r: any, index: any) => {
                            const geofences_ = JSON.parse(r?.coordenadas);
                            return (
                                <Polygon
                                    key={index}
                                    path={geofences_}
                                    options={{
                                        fillColor: index === selectedGeofenceSaved ? '#75ba94' : '#45ad74',
                                        fillOpacity: 0.5,
                                        strokeColor: '#1a402b',
                                        strokeWeight: 2,
                                        clickable: false
                                    }}
                                />
                            )
                        })
                    }
                    {/*  {props?.positions.map((posicion: any) => {
                        const dentroDeGeocerca = isPositionInGeofence(posicion);


                        return (
                            <OverlayView
                                position={{ lat: posicion.latitude, lng: posicion.longitude }}
                                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET} // Permite la interacción del mouse

                            >
                                <div

                                    style={{
                                        backgroundColor: dentroDeGeocerca ? "#71e38c" : '#cc6b58',
                                        border: dentroDeGeocerca ? "solid 1px #2e7507" : 'solid 1px #821500',
                                        color: "white",
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        setMensajeAlert(`${posicion.nombre} está ${dentroDeGeocerca ? 'dentro' : 'fuera'} de una geocerca, Fecha: ${posicion?.device_time}, Contrato: ${posicion?.contrato || ''} `)
                                        handleisAlertOpen();
                                    }}
                                >

                                    {
                                        dentroDeGeocerca ? <RoomIcon /> : <RoomIcon />
                                    }
                                </div>
                            </OverlayView>
                        )
                    })} */}
                    <MarkerClusterer>
                        {(clusterer) =>
                            props?.positions.map((posicion: any, k: any) => {
                                const dentroDeGeocerca = isPositionInGeofence(posicion);
                                return (<Marker
                                    key={k}
                                    position={{ lat: posicion.latitude, lng: posicion.longitude } }
                                    clusterer={clusterer}
                                    onClick={() => {
                                        setMensajeAlert(`${posicion.nombre} está ${dentroDeGeocerca ? 'dentro' : 'fuera'} de una geocerca, Fecha: ${posicion?.device_time}, Contrato: ${posicion?.contrato || ''} `)
                                        handleisAlertOpen();
                                    }}
                                    icon={{
                                        url: dentroDeGeocerca
                                            ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' // Verde si está dentro
                                            : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', // Rojo si está fuera
                                    }}
                                    children={<>este es un buenb ejemplo</>}
                                />)
                            })
                        }
                    </MarkerClusterer>
                    {infoWindowPositionSaved && (
                        <InfoWindow
                            key='aaa'
                            position={infoWindowPositionSaved}
                            onCloseClick={() => {
                                setInfoWindowPositionSaved(null);
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12} style={{ textAlign: 'left' }}>Obra: {itemGuardado?.geofence?.obra || ''}  </Grid>
                                <Grid item xs={12} md={12} style={{ textAlign: 'left' }}>Contrato: {itemGuardado?.geofence?.contrato || 'Sin contrato asignado'}  </Grid>
                                <Grid item xs={12} md={12} style={{ textAlign: 'left' }}>Area: {(calculateArea(JSON.parse(itemGuardado?.geofence?.coordenadas)) / 1000).toFixed(2)} km²</Grid>
                            </Grid>
                        </InfoWindow>
                    )}
                </GoogleMap>
                <ModalComponent handleClose={handleisAlerClose} isOpen={isAlertOpen} key={'alerta'}>
                    <Grid container spacing={2} style={{ textAlign: 'center' }}>
                        <Grid item xs={12}>
                            <br />
                            <br />
                            <p>{mensajeAlert}</p>
                        </Grid>
                    </Grid>
                </ModalComponent>
            </Grid>
        </Grid>
    );
};

export default GeoFenceMapPositions;