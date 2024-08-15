"use client";
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Tracking from "./Tracking";
mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxpNzg4N2FsYWVpIiwiYSI6ImNsemZrZzY2ajE2eTIybHM4MG8ybjFsY3IifQ.s4zjR5Q8Y90zzEoeYcpSXg";
mapboxgl.setRTLTextPlugin(
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.3.0/mapbox-gl-rtl-text.js",
  null,
  true
);
const MapBox = () => {
  const mapContainerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [51.457723867350154, 35.709562664862815],
        },
      },
    ],
  });
  const mapRef = useRef(null);
  const [style, setStyle] = useState("mapbox://styles/mapbox/outdoors-v11"); // Default style
  const busTaxiPoints = [
    [51.389, 35.6892],
    [51.416, 35.74],
    [51.448, 35.73],
    [51.4, 35.665],
    [51.457, 35.69],
    [51.402, 35.74],
    [51.41, 35.72],
    [51.42, 35.75],
    [51.43, 35.71],
    [51.44, 35.695],
  ];
  const CameraPoint =[
    [51.11402109795418, 35.73716458177675],
    [51.08361322327508, 35.74475157439484],
    [51.04318669768881, 35.7650581307105],
    [51.010991854810214, 35.79807712319939],
  ]
  const styles = [
    {value:"mapbox://styles/mapbox/outdoors-v11" , name:'فضا باز'},
    {value:"mapbox://styles/mapbox/standard" , name:'استاندارد'},
    {value:"mapbox://styles/mapbox/light-v11" , name:'روشن'},
    {value:"mapbox://styles/mapbox/dark-v10" , name:'تاریک'},
    {value:"mapbox://styles/mapbox/satellite-streets-v11" , name:'ماهواره ای'},
  ];
  useEffect(() => {
    // Create a new Map instance
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      zoom: 10,
      center: [51.389, 35.6892], // Updated initial coordinates
      style: style,
      antialias: true,
      projection: "mercator",
    });
    mapRef.current = map;
    busTaxiPoints.forEach((coords) => {
      const customMarker = document.createElement("div");
      customMarker.style.backgroundImage = `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4STOox3IBDwvfqpSnvsZpldh5J119pSq21w&s)`; // Replace with your icon URL
      customMarker.style.backgroundSize = "cover";
      customMarker.style.width = "30px"; // Width of the marker
      customMarker.style.height = "30px"; // Height of the marker
      customMarker.style.cursor = "pointer";

      new mapboxgl.Marker(customMarker)
        .setLngLat(coords)
        .addTo(mapRef.current);
    });
    CameraPoint.forEach((coords) => {
      const customMarker = document.createElement("div");
      customMarker.style.backgroundImage = `url(https://play-lh.googleusercontent.com/LyhoGepIfdunJTRk7FO0BIOm1l9TLJCkGnQsE8_No9l02_XQcawP1RPi188JCG_tFg)`; // Replace with your icon URL
      customMarker.style.backgroundSize = "cover";
      customMarker.style.width = "30px"; // Width of the marker
      customMarker.style.height = "30px"; // Height of the marker
      customMarker.style.cursor = "pointer";

      new mapboxgl.Marker(customMarker)
        .setLngLat(coords)
        .addTo(mapRef.current);
    });
    // Save map instance to a ref
    map.on("load", () => {
      mapRef.current.addSource("ArgentinaTerminal", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [51.416186061104895, 35.73976231832087],
              [51.4204914435754, 35.73981345858404],
              [51.42065945850098, 35.73877360010277],
              [51.422129589100706, 35.73870541218649],
              [51.421352520069746, 35.73568803844516],
              [51.417845208496914, 35.73543232355064],
              [51.41637507789713, 35.73698364795759],
              [51.416165059239376, 35.73962594412431],
            ],
            type: "LineString",
          },
        },
      });
      mapRef.current.addLayer({
        id: "ArgentinaTerminal",
        type: "fill",
        slot: "middle",
        source: "ArgentinaTerminal",
        layout: {},
        paint: {
          "fill-color": "#f08",
          "fill-opacity": 0.4,
        },
      });
      mapRef.current.addSource("RoyalSafarTerminal", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [51.32566851235782, 35.76218142570988],
              [51.325193123179105, 35.760361929841366],
              [51.327023371518834, 35.759873294887484],
              [51.327538376464304, 35.76167994336963],
            ],
            type: "LineString",
          },
        },
      });
      mapRef.current.addLayer({
        id: "RoyalSafarTerminal",
        type: "fill",
        slot: "middle",
        source: "RoyalSafarTerminal",
        layout: {},
        paint: {
          "fill-color": "#f08",
          "fill-opacity": 0.4,
        },
      });
      mapRef.current.addSource("EastTerminal", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [51.50991370041456, 35.720392339130655],
              [51.51969780313209, 35.723375053276456],
              [51.520323151907945, 35.722687558145495],
              [51.51524219310642, 35.721576976556435],
              [51.51095594837335, 35.71857304021725],
            ],
            type: "LineString",
          },
        },
      });
      mapRef.current.addLayer({
        id: "EastTerminal",
        type: "fill",
        slot: "middle",
        source: "EastTerminal",
        layout: {},
        paint: {
          "fill-color": "#f08",
          "fill-opacity": 0.4,
        },
      });
      mapRef.current.addSource("southTerminal", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [51.41653035206838, 35.651894955396315],
              [51.415904454157385, 35.64771055482011],
              [51.42132670099778, 35.64705168060539],
              [51.42127602579416, 35.65046953157193],
            ],
            type: "LineString",
          },
        },
      });
      mapRef.current.addLayer({
        id: "southTerminal",
        type: "fill",
        slot: "middle",
        source: "southTerminal",
        layout: {},
        paint: {
          "fill-color": "#f08",
          "fill-opacity": 0.4,
        },
      });
      mapRef.current.addSource("westTerminal", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [51.33134888723089, 35.70708820781559],
              [51.336690086512675, 35.706374502263145],
              [51.33719716239301, 35.7024764591888],
              [51.33178835299435, 35.69989595963537],
            ],
            type: "LineString",
          },
        },
      });
      mapRef.current.addLayer({
        id: "westTerminal",
        type: "fill",
        slot: "middle",
        source: "westTerminal",
        layout: {},
        paint: {
          "fill-color": "#f08",
          "fill-opacity": 0.4,
        },
      });
      mapRef.current.addSource("karajRoute", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [51.335925309171984, 35.70173445024268],
              [51.334719717879295, 35.700657521485425],
              [51.33423748136286, 35.699482673523804],
              [51.302289327384244, 35.69879733211761],
              [51.126604657356836, 35.73151840216856],
              [51.12377151782073, 35.73308423266096],
              [51.11665852919762, 35.736166871473145],
              [51.10273463327397, 35.74012993251341],
              [51.08573579605425, 35.74399510268961],
              [51.07741724225215, 35.74913205844622],
              [51.05469211919913, 35.759307077761704],
              [51.049327448735795, 35.76258425461231],
              [51.042335019242614, 35.76586139762823],
              [51.019670501031754, 35.78879735154278],
              [51.01153296109811, 35.79666933733856],
              [51.01068904719514, 35.80400289238152],
              [51.01084627019557, 35.80946333487961],
              [50.990810673613424, 35.820820495727375],
            ],
            type: "LineString",
          },
        },
      });
      //add line
      mapRef.current.addLayer({
        id: "karajRoute",
        type: "line",
        source: "karajRoute",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#888",
          "line-width": 5,
        },
      });
      mapRef.current.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [51.27585208318163, 35.71550771417627],
              [51.30739933673715, 35.71694669114868],
              [51.30763564575287, 35.713780907510824],
              [51.309289808860086, 35.71109468943682],
              [51.309762426890074, 35.707448962954075],
              [51.309762426890074, 35.70409090946343],
            ],
            type: "LineString",
          },
        },
      });
      //add line
      mapRef.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#888",
          "line-width": 5,
        },
      });
      //add heatmap
      mapRef.current.addSource("radar", {
        type: "image",
        url: "https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif",
        coordinates: [
          [51.433855809074345, 35.815236423259776],
          [51.328418026794026, 35.80513343187742],
          [51.34634548833404, 35.780979611138235],
          [51.43902134884016, 35.7960149949145],
        ],
      });
      mapRef.current.addLayer({
        id: "radar-layer",
        type: "raster",
        source: "radar",
        paint: {
          "raster-fade-duration": 0,
        },
      });
    });
    map.on("click", (event) => {
      // Check if the click event intersects with the "route" layer
      const features = map.queryRenderedFeatures(event.point, {
        layers: ["route", "karajRoute"], // Specify the layer you want to check against
      });

      if (features.length) {
        // If the features array is not empty, a feature on the "route" layer was clicked
        const coordinates = features[0].geometry.coordinates;
        const data = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: coordinates,
              },
            },
          ],
        };
        setData(data);
        setOpen(true);
      } else {
        // Get the clicked coordinates
        const { lng, lat } = event.lngLat;

        // Log coordinates
        console.log(` Longitude: ${lng}, Latitude: ${lat}`);

        // Create a marker
        new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
      }
    });
    function updateLayerVisibility() {  
      const zoomLevel = mapRef.current.getZoom();  
      if (zoomLevel > 16.4) {  
        // Hide the layer if zoom is less than 12  
        if (mapRef.current.getLayer("ArgentinaTerminal")) {  
          mapRef.current.setLayoutProperty("ArgentinaTerminal", "visibility", "none");  
        }  
        if (mapRef.current.getLayer("RoyalSafarTerminal")) {  
          mapRef.current.setLayoutProperty("RoyalSafarTerminal", "visibility", "none");  
        }  
        if (mapRef.current.getLayer("EastTerminal")) {  
          mapRef.current.setLayoutProperty("EastTerminal", "visibility", "none");  
        }  
        if (mapRef.current.getLayer("southTerminal")) {  
          mapRef.current.setLayoutProperty("southTerminal", "visibility", "none");  
        }  
        if (mapRef.current.getLayer("westTerminal")) {  
          mapRef.current.setLayoutProperty("westTerminal", "visibility", "none");  
        }  
      } else {  
        // Show the layer if zoom is 12 or higher  
        if (mapRef.current.getLayer("ArgentinaTerminal")) {  
          mapRef.current.setLayoutProperty("ArgentinaTerminal", "visibility", "visible");  
        }  
        if (mapRef.current.getLayer("RoyalSafarTerminal")) {  
          mapRef.current.setLayoutProperty("RoyalSafarTerminal", "visibility", "visible");  
        }  
        if (mapRef.current.getLayer("EastTerminal")) {  
          mapRef.current.setLayoutProperty("EastTerminal", "visibility", "visible");  
        }  
        if (mapRef.current.getLayer("southTerminal")) {  
          mapRef.current.setLayoutProperty("southTerminal", "visibility", "visible");  
        }  
        if (mapRef.current.getLayer("westTerminal")) {  
          mapRef.current.setLayoutProperty("westTerminal", "visibility", "visible");  
        }  
      }  
    }  
    
    // Add zoom event listener  
    mapRef.current.on("zoom", updateLayerVisibility);  
    
    // Initial check to set the visibility correctly on load  
    updateLayerVisibility();
    mapRef.current.addControl(new mapboxgl.FullscreenControl());
    mapRef.current.addControl(new mapboxgl.NavigationControl());
    // Cleanup function to remove the map on component unmount
    return () => {
      if (map) map.remove();
    };
  }, [style]); // Depend on style to reinitialize map when it changes
  // Function to handle style change
  const handleStyleChange = (event) => {
    setStyle(event.target.value);
    if (mapRef.current) {
      mapRef.current.setStyle(event.target.value);
    }
  };

  return (
    <div>
      <select onChange={handleStyleChange} value={style}>
        {styles.map((s) => (
          <option key={s} value={s.value}>
            {s.name}
          </option>
        ))}
      </select>
      <div ref={mapContainerRef} style={{ height: "60vh" }} />
      <Dialog open={open}>
        <DialogContent size="full" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-base font-medium text-default-700 ">
              شما میتوانید مسیر حرکت را در اینجا ببینید:
            </DialogTitle>
          </DialogHeader>
          <Tracking data={data} />
          <DialogFooter className="absolute bottom-0 left-0 w-full py-3 pr-12 bg-background flex-row gap-4 justify-end">
            <DialogClose asChild>
              <Button
                type="submit"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                بستن
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MapBox;
