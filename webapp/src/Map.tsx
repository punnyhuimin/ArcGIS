import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView"
import Point from "@arcgis/core/geometry/Point.js";
import Graphic from "@arcgis/core/Graphic.js";
// import * as locator from "@arcgis/core/rest/locator.js";
import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";
import { useEffect, useRef, useState, useLayoutEffect } from "react";

function Map() {
  // let [currentSymbol, setCurrentSymbol] = useState("circle-1");
  // const locatorUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";
  const mapRef: any = useRef<HTMLDivElement>(null);
  let currentSymbol = "circle-1"
  let map: WebMap | null = null;
  let view: MapView | null = null;
  const loadMap = () => {
    if (mapRef.current && !map && !view) {
      map = new WebMap({
        basemap: "topo-vector"
      });

      view = new MapView({
        map: map,
        center: [103.851959, 1.290270], // Longitude, latitude
        zoom: 11.4, // Zoom level
        container: mapRef.current
      });
      // view.graphics.addMany([pointGraphic1, pointGraphic2]);

      // // you must overwrite default click-for-popup
      // // behavior to display your own popup
      // view.popup.autoOpenEnabled = false;
      // await view.when()
      
      // view.ui.add("line-button", "top-left");
      //DO THIS TMR
      if (view) {
        view.on("click", (event) => {
          const lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
          const lon = Math.round(event.mapPoint.longitude * 1000) / 1000;
          createPoint(lat, lon, view as MapView);
        });
      }

      // return () => {
      //   // Clean up the map and view instances when the component is unmounted
      //   view.destroy();
      //   map.destroy();
      // };

          }

          return () => {
            if (view) {
              view.destroy();
              view = null;
            }
            if (map) {
              map.destroy();
              map = null;
            }
          };

  };

  //   const textSymbol = {
  //   type: "text", // autocasts as new TextSymbol()
  //   color: "#7A003C",
  //   text: "", // esri-icon-map-pin
  //   font: {
  //     // autocasts as new Font()
  //     size: 36,
  //     family: "CalciteWebCoreIcons"
  //   }
  // };

  // const circleSymbol = new WebStyleSymbol({
  //   name: "circle-1",
  //   styleName: "Esri2DPointSymbolsStyle"
  // });

  // const squareSymbol = new WebStyleSymbol({
  //   name: "square-2",
  //   styleName: "Esri2DPointSymbolsStyle"
  // });

  // const triangleSymbol = new WebStyleSymbol({
  //   name: "triangle-3",
  //   styleName: "Esri2DPointSymbolsStyle"
  // });

  function chooseShape (e: any) {
    console.log(e.target.id);
    // setCurrentSymbol(e.target.id);
    currentSymbol = e.target.id
  }

  const createPoint = (latitude: number, longitude: number, view: MapView) => {
    const createdPoint = new Point({
      longitude: longitude,
      latitude: latitude
    });
    const createPointGraphic = new Graphic({
      geometry: createdPoint,
      symbol: (new WebStyleSymbol({
        name: currentSymbol,
        styleName: "Esri2DPointSymbolsStyle"
      }))
    });
    console.log(currentSymbol)
    view.graphics.add(createPointGraphic);
  }

  // const point1 = new Point({
  //   longitude: 103.851959,
  //   latitude: 1.290270
  // });

  // const point2 = new Point({
  //   longitude: 103.951959,
  //   latitude: 1.290270
  // });

  // // Create a graphic and add the geometry and symbol to it
  // const pointGraphic1 = new Graphic({
  //   geometry: point1,
  //   symbol: textSymbol
  // });

  // // Create another graphic and add the geometry and symbol to it
  // const pointGraphic2 = new Graphic({
  //   geometry: point2,
  //   symbol: textSymbol
  // });

  useEffect(() => {
    loadMap();

    // return () => {
    //   if (view) {
    //     view.destroy();
    //     view = null;
    //   }
    //   if (map) {
    //     map.destroy();
    //     map = null;
    //   }
    // };

    // const map = new WebMap({
    //   basemap: "topo-vector" // Basemap layer service
    // });

    // const view = new MapView({
    //   map: map,
    //   center: [103.851959, 1.290270], // Longitude, latitude
    //   zoom: 11.4, // Zoom level
    //   container: mapRef.current
    // });

    // view.graphics.addMany([pointGraphic1]);
    // // setMapLoaded(true);
    // return () => {
    //   // Clean up the map and view instances when the component is unmounted
    //   view.destroy();
    //   map.destroy();
    // };
  }, []);

  return (
          <div>
            <button onClick={chooseShape} id="circle-1">circle</button>
            <button onClick={chooseShape} id="square-2">square</button>
            <button onClick={chooseShape} id="triangle-3">triangle</button>
            <div style={{ height: 500, width: "100%" }} ref={mapRef}></div>
          </div>)
};

export default Map;