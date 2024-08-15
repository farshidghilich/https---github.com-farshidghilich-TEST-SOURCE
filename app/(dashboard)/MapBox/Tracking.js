'use client';  
import React, { useEffect, useRef } from 'react';  
import mapboxgl from 'mapbox-gl';  
import { lineString } from '@turf/helpers';  
import length from '@turf/length';  
import along from '@turf/along';  
import 'mapbox-gl/dist/mapbox-gl.css';  

const Tracking = ({data}) => {  
    const mapRef = useRef(null);  

    useEffect(() => {  
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpNzg4N2FsYWVpIiwiYSI6ImNsemZrZzY2ajE2eTIybHM4MG8ybjFsY3IifQ.s4zjR5Q8Y90zzEoeYcpSXg';  
        const map = new mapboxgl.Map({  
            container: mapRef.current,  
            zoom: 13,  
            center: [data.features[0].geometry.coordinates[0][0], data.features[0].geometry.coordinates[0][1]],  
            pitch: 76,  
            bearing: 150,  
            style: 'mapbox://styles/mapbox/outdoors-v11'  
        });  

        const fetchData = async () => {  
            const pinRouteGeojson = data;  
            console.log(pinRouteGeojson);  

            // Add style load event listener  
            map.on('style.load', () => {  
                map.addSource('mapbox-dem', {  
                    type: 'raster-dem',  
                    url: 'mapbox://mapbox.terrain-rgb',  
                    tileSize: 512,  
                    maxzoom: 14  
                });  
                map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });  

                const pinRoute = pinRouteGeojson.features[0].geometry.coordinates;  
                const popup = new mapboxgl.Popup({ closeButton: false });  

                const marker = new mapboxgl.Marker({  
                    color: 'red',  
                    scale: 0.8,  
                    draggable: false  
                })  
                .setLngLat(pinRoute[0])  
                .setPopup(popup)  
                .addTo(map)  
                .togglePopup();  

                map.addSource('line', {  
                    type: 'geojson',  
                    lineMetrics: true,  
                    data: pinRouteGeojson  
                });  

                map.addLayer({  
                    type: 'line',  
                    source: 'line',  
                    id: 'line',  
                    paint: {  
                        'line-color': 'rgba(0,0,0,0)',  
                        'line-width': 5  
                    },  
                    layout: {  
                        'line-cap': 'round',  
                        'line-join': 'round'  
                    }  
                });  

                const animationDuration = 20000;  
                const path = lineString(pinRoute);  
                const pathDistance = length(path);  
                let start;  

                const frame = (time) => {  
                    if (!start) start = time;  
                    const animationPhase = (time - start) / animationDuration;  
                    if (animationPhase > 1) {  
                        return;  
                    }  
                
                    const alongPath = along(path, pathDistance * animationPhase).geometry.coordinates;  
                    const lngLat = { lng: alongPath[0], lat: alongPath[1] };  
                
                    const elevation = Math.floor(map.queryTerrainElevation(lngLat, { exaggerated: false }));  
                    popup.setHTML('Altitude: ' + elevation + 'm<br/>');  
                    marker.setLngLat(lngLat);  
                
                    // Remove line that changes line gradient  
                    mapRef.current && map.setPaintProperty('line', 'line-gradient', [  
                        'step',  
                        ['line-progress'],  
                        'red',  
                        animationPhase,  
                        'rgba(255, 0, 0, 0)'  
                    ]);  
                    
                    // Comment out the rotation line  
                    // const rotation = 150 - animationPhase * 40.0;   
                    // map.setBearing(rotation % 360);  
                
                    window.requestAnimationFrame(frame);  
                };
                window.requestAnimationFrame(frame);  
            });  
        };  

        fetchData();  

        return () => map.remove(); // Cleanup map on unmount  
    }, []);  

    return (  
        <div style={{ margin: 0, padding: 0, position: 'relative', height: '60vh' }}>  
            <div id="map" style={{ width: '100%', height: '100%' }} ref={mapRef} />  
        </div>  
    );  
};  

export default Tracking;