import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView"
// import { useEffect } from "react";

function Test() {

  const loadMap = () => {
    const map : any= new WebMap({
      basemap: "streets" // Basemap layer service
    });
  
    const view = new MapView({
      map: map,
      center: [103.851959,1.290270], // Longitude, latitude
      zoom: 11.4, // Zoom level
      container: "viewDiv" // Div element
    });
  }
 
  loadMap()
  // useEffect (() => {
  //   loadMap()
  // }, [])

  return<div style={{ height: 500, width: "100%" }} id='viewDiv'></div>
};

export default Test;