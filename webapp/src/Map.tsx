import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView"
import Point from "@arcgis/core/geometry/Point.js";
import Graphic from "@arcgis/core/Graphic.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Draw from "@arcgis/core/views/draw/Draw.js";
import DefaultUI from "@arcgis/core/views/ui/DefaultUI.js";
import Sketch from "@arcgis/core/widgets/Sketch.js";
import Widget from "@arcgis/core/widgets/Widget.js";
import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";
import { useEffect, useRef, useState, useLayoutEffect } from "react";

function Map() {
  const apiKey = "98da9ed1ebe31f67bb8e55061d4a9618f34baa3092fdca373a9eed5d91a47cc9";
  const mapRef: any = useRef<HTMLDivElement>(null);
  const graphicsLayer = new GraphicsLayer();
  let currentSymbol = "circle-1"
  let map: WebMap | null = null;
  let view: MapView | null = null;
  const loadMap = () => {
    if (mapRef.current && !map && !view) {
      map = new WebMap({
        basemap: "topo-vector",
        // layers: [graphicsLayer]
      });
      map.add(graphicsLayer);
      view = new MapView({
        map: map,
        center: [103.851959, 1.290270], // Longitude, latitude
        zoom: 11.4, // Zoom level
        container: mapRef.current
      });


      const sketch = new Sketch({
        layer: graphicsLayer,
        view: view,
        // graphic will be selected as soon as it is created
        creationMode: "update"});
        
        view.ui.add(sketch, "top-right");

      // const draw = new Draw({
      //   view: view
      // });
      // let action = draw.create("polyline", {mode: "click"});

      //     function createLine(vertices: any) {
      //       let polyline = {
      //         type: "polyline", // autocasts as new Polyline()
      //         paths: vertices,
      //         spatialReference: view!.spatialReference
      //       }
      // // return polyline;
      //     }

      if (view) {
        view.on("click", (event) => {
          const lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
          const lon = Math.round(event.mapPoint.longitude * 1000) / 1000;
          createPoint(lat, lon, view as MapView);
        });
      }
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

  function chooseShape (e: any) {
    console.log(e.target.id);
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
    view.graphics.add(createPointGraphic);
  }

  useEffect(() => {
    loadMap();
  }, []);

  return (
          <div>
            <button onClick={chooseShape} id="circle-1">circle</button>
            <button onClick={chooseShape} id="square-2">square</button>
            <button onClick={chooseShape} id="triangle-3">triangle</button>
            <div style={{ height: 500, width: "100%" , padding: 0, margin: 0 }} ref={mapRef} id="test"><div>asdhasdoiuh</div></div>
          </div>)
};

export default Map;