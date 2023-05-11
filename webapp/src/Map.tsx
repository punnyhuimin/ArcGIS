import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView"
import { useEffect, useRef, useState, useLayoutEffect } from "react";

function Map() {
  const mapRef: any = useRef<HTMLDivElement>(null);
  // const [mapLoaded, setMapLoaded] = useState(false);

  const loadMap = () => {
      const map = new WebMap({
        basemap: "topo-vector" // Basemap layer service
      });

      const view = new MapView({
        map: map,
        center: [103.851959, 1.290270], // Longitude, latitude
        zoom: 11.4, // Zoom level
        container: mapRef.current
      });

      // setMapLoaded(true);
      return () => {
        // Clean up the map and view instances when the component is unmounted
        view.destroy();
        map.destroy();
      };

  };

  // useEffect (() => {
  //   loadMap()
  // }, [])

  useLayoutEffect(() => {
    const map = new WebMap({
      basemap: "topo-vector" // Basemap layer service
    });

    const view = new MapView({
      map: map,
      center: [103.851959, 1.290270], // Longitude, latitude
      zoom: 11.4, // Zoom level
      container: mapRef.current
    });

    return () => {
      // Clean up the map and view instances when the component is unmounted
      view.destroy();
      map.destroy();
    };
  }, []);

  return (
          <div>
            <div style={{ height: 500, width: "100%" }} ref={mapRef}></div>
          </div>)
};

export default Map;