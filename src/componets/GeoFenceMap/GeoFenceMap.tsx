import React, { useState, useCallback } from 'react';
import { GoogleMap, useLoadScript, DrawingManager, Polygon, InfoWindow } from '@react-google-maps/api';
import env from "react-dotenv";
import { Grid } from '@mui/material';
import DinamicTableMejorada from '../DinamicTableMejorada/DinamicTableMejorada';
import InfoWindowMark from './InfoWindowMark';
import { Button } from 'react-bootstrap';

const mapContainerStyle = {
    width: '100%',
    height: '700px'
};

const center = {
    lat: 19.432608,
    lng: -99.133209,
};

const libraries: any = ['drawing', 'geometry'];

export interface GeoFenceMapProps {
    procesando: boolean
    contrato: any[]
    enGeocerca: (data: any) => void
    geocercas: any[]
    enEliminar: (id: number) => void
}

const GeoFenceMap = (props: GeoFenceMapProps) => {

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: env.googleMapsKey,
        libraries,
    });

    const [geofences, setGeofences] = useState<any>([]);
    const [selectedGeofence, setSelectedGeofence] = useState<any>(null);
    const [selectedGeofenceSaved, setSelectedGeofenceSaved] = useState<any>(null);
    const [itemGuardado, setItemGuardado] = useState<any>(null);
    const [infoWindowPosition, setInfoWindowPosition] = useState(null);
    const [infoWindowPositionSaved, setInfoWindowPositionSaved] = useState(null);

    const calculateArea = (coordinates: any) => {
        const paths = coordinates.map((coord: any) => new window.google.maps.LatLng(coord.lat, coord.lng));
        const polygon = new window.google.maps.Polygon({ paths });
        return window.google.maps.geometry.spherical.computeArea(polygon.getPath());
    };

    const isPointInGeofence = (point: any, coordinates: any) => {
        const polygon = new window.google.maps.Polygon({ paths: coordinates });
        return window.google.maps.geometry.poly.containsLocation(point, polygon);
    };

    const findClosestGeofence = (clickLatLng: any) => {
        let closestGeofence = null;
        let minDistance = Infinity;
        geofences.forEach((geofence: any, index: any) => {
            if (isPointInGeofence(clickLatLng, geofence.coordinates)) {
                const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
                    clickLatLng,
                    new window.google.maps.LatLng(geofence.center)
                );
                if (distance < minDistance) {
                    minDistance = distance;
                    closestGeofence = { geofence, index };
                }
            }
        });
        return closestGeofence;
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

    const isGeofenceInsideAnother = (innerCoords: any, outerCoords: any) => {
        const outerPolygon = new window.google.maps.Polygon({ paths: outerCoords });
        return innerCoords.every((coord: any) => window.google.maps.geometry.poly.containsLocation(new window.google.maps.LatLng(coord.lat, coord.lng), outerPolygon));
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

    const onPolygonComplete = useCallback((polygon: any) => {
        const path = polygon.getPath();
        const coordinates: any = [];
        for (let i = 0; i < path.getLength(); i++) {
            const latLng = path.getAt(i);
            coordinates.push({
                lat: latLng.lat(),
                lng: latLng.lng(),
            });
        }
        const area = calculateArea(coordinates);
        const center = calculateCenter(coordinates);
        setGeofences((prevGeofences: any) => [...prevGeofences, { coordinates, area, center }]);
        polygon.setMap(null);
    }, []);

    const handleMapClick = (event: any) => {
        const clickLatLng = event.latLng;
        const closestGeofence: any = findClosestGeofence(clickLatLng);
        const closestGeofenceSaved: any = findClosestGeofenceSaved(clickLatLng);
        setSelectedGeofence(null);
        setInfoWindowPosition(null);
        setSelectedGeofenceSaved(null);
        setInfoWindowPositionSaved(null);
        if (closestGeofence) {
            setSelectedGeofence(closestGeofence.index);
            setInfoWindowPosition(closestGeofence.geofence.center);
        }
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
                    {geofences.map((geofence: any, index: any) => (
                        <Polygon
                            key={index}
                            path={geofence.coordinates}
                            options={{
                                fillColor: index === selectedGeofence ? '#FF0000' : '#2196F3',
                                fillOpacity: 0.5,
                                strokeColor: '#2196F3',
                                strokeWeight: 2,
                                clickable: false,
                            }}
                        />
                    ))}
                    {infoWindowPosition && (
                        <InfoWindow
                            position={infoWindowPosition}
                            onCloseClick={() => {
                                setSelectedGeofence(null);
                                setInfoWindowPosition(null);
                            }}
                        >
                            <InfoWindowMark
                                procesando={props?.procesando}
                                enAccion={(a: any) => {
                                    props?.enGeocerca(a);
                                    setInfoWindowPosition(null);
                                    const elementoEnPosicion = geofences.filter((_: any, indice: any) => indice !== selectedGeofence);
                                    setGeofences(elementoEnPosicion);
                                }}
                                contrato={props?.contrato}
                                selectedGeofence={selectedGeofence + 1}
                                area={(geofences[selectedGeofence].area / 1000).toFixed(2)}
                                item={geofences[selectedGeofence]}
                            />
                        </InfoWindow>
                    )}
                    
                    
                    {infoWindowPositionSaved && (
                        <InfoWindow
                            key='aaa'
                            position={infoWindowPositionSaved}
                            onCloseClick={() => {
                                setSelectedGeofenceSaved(null);
                                setInfoWindowPositionSaved(null);
                            }}
                        >
                            <Grid container spacing={2}>

                                <Grid item xs={12} md={12} style={{ textAlign: 'left' }}>Obra: {itemGuardado?.geofence?.obra || ''}  </Grid>
                                <Grid item xs={12} md={12} style={{ textAlign: 'left' }}>Contrato: {itemGuardado?.geofence?.contrato || 'Sin contrato asignado'}  </Grid>
                                <Grid item xs={12} md={12} style={{ textAlign: 'left' }}>Area: {(calculateArea(JSON.parse(itemGuardado?.geofence?.coordenadas)) / 1000).toFixed(2)} km²</Grid>
                                <Grid item xs={12} md={12} style={{ textAlign: 'left' }}>
                                    <Button
                                        variant="danger"
                                        onClick={(e: any) => {
                                            props?.enEliminar(itemGuardado?.geofence?.id);
                                            setSelectedGeofenceSaved(null);
                                            setInfoWindowPositionSaved(null);
                                        }}
                                    >
                                        Eliminar
                                    </Button>
                                </Grid>
                            </Grid>
                        </InfoWindow>
                    )}


                    <DrawingManager
                        onPolygonComplete={onPolygonComplete}
                        options={{
                            drawingControl: true,
                            drawingControlOptions: {
                                drawingModes: ['polygon' as google.maps.drawing.OverlayType], // Solo permite dibujar polígonos
                            },
                            polygonOptions: {
                                fillColor: '#2196F3',
                                fillOpacity: 0.5,
                                strokeWeight: 2,
                                clickable: true,
                                editable: true,
                                draggable: false,
                            },
                        }}
                    />
                </GoogleMap>
            </Grid>
        </Grid>
    );
};

export default GeoFenceMap;