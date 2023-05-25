import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Point from "@arcgis/core/geometry/Point.js";
import Multipoint from "@arcgis/core/geometry/Multipoint.js";
import Graphic from "@arcgis/core/Graphic.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Draw from "@arcgis/core/views/draw/Draw.js";
import Sketch from "@arcgis/core/widgets/Sketch.js";
import Polyline from "@arcgis/core/geometry/Polyline.js";
import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import TextSymbol from "@arcgis/core/symbols/TextSymbol.js";
import Expand from "@arcgis/core/widgets/Expand.js";
import "@esri/calcite-components";
// import { CalcitePanel } from '@esri/calcite-components';

import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel.js";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
// import { setAssetPath } from '@esri/calcite-components/dist/components';
// // Local assets
// setAssetPath(window.location.href);

// currently: can snap. but points do not store what lines are connected to them
// they need to store line details when snapping. and change x or y coord depending on which direction

function Map() {
  // var modulename = '@esri/calcite-components'
  // if (modulename not in sys.modules): {
  //   console.log('You have not imported the {} module'.format(modulename))
  // }

  //     declare calcite-panel: () => string;

  //     export {
  //         _decode,
  //     }

  // const apiKey = "98da9ed1ebe31f67bb8e55061d4a9618f34baa3092fdca373a9eed5d91a47cc9";
  const mapRef: any = useRef<HTMLDivElement>(null);
  const graphicsLayer = new GraphicsLayer();
  let currentSymbol = "circle-1";
  let map: WebMap | null = null;
  let view: MapView | null = null;
  let line1: Polyline;

  const loadMap = () => {
    if (mapRef.current && !map && !view) {
      map = new WebMap({
        basemap: "topo-vector",
      });
      map.add(graphicsLayer);
      view = new MapView({
        map: map,
        center: [103.851959, 1.29027], // Longitude, latitude
        zoom: 11.4, // Zoom level
        container: mapRef.current,
      });

        const sketch = new Sketch({
          layer: graphicsLayer,
          view: view,
          // graphic will be selected as soon as it is created if creationMode is "update"
          // creationMode: "update",
          snappingOptions: {
            // autocasts as SnappingOptions()
            enabled: true,
            // enable snapping on the graphicslayer by default
            featureSources: [{ layer: graphicsLayer, enabled: true }]
          },
          visibleElements: {
            // hide/show sketch elements
            createTools: {
              circle: false // hide the circle tool
            },
            selectionTools: {
              "lasso-selection": true // hide the lasso-selection tool
            }
          }
        });
        
        const sketchVM = new SketchViewModel({
          view: view,
          layer: graphicsLayer
        });

        // const stylerExpand = new Expand({
        //   view: view,
        //   content: document.getElementById("propPanel"),
        //   expanded: true,
        //   expandIconClass: "esri-icon-edit",
        //   expandTooltip: "Open Styler"
        // });


        view.ui.add(sketch, "top-right");

      if (view) {
        view.on("click", (event) => {
          const lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
          const lon = Math.round(event.mapPoint.longitude * 1000) / 1000;
          createPoint(lat, lon, view as MapView);
          // multipointthing(view as MapView);
        });

        sketch.on("update", (event) => {
          updateLineGraphics(event, view as MapView);

        })
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

  const updateLineGraphics = (event: any, view: any) => {
    // const movedPoint = event.graphics[0].geometry as Point;

    // line1 = new Polyline({
    //   paths: [[[-122.4194, 37.7749], [-122.4300, 37.7900]]],
    //   spatialReference: view!.spatialReference
    // });

    // const lineSymbol = new SimpleLineSymbol({
    //   color: "red",
    //   width: 2
    // });
  
    // var lineGraphics = new Graphic({
    //   geometry: line1,
    //   symbol: lineSymbol
    // });
  
    // graphicsLayer.add(lineGraphics);


    // // Update the line geometries
    // const updatedline = new Polyline({
    //   paths: [[[movedPoint.x, movedPoint.y], [-122.4300, 37.7900]]],
    //   spatialReference: view!.spatialReference
    // });

    // graphicsLayer.remove(lineGraphics);
    // const updatedLineSymbol = new SimpleLineSymbol({
    //   color: "blue",
    //   width: 4
    // });

    //     // Create a new graphic with the updated geometry
    // lineGraphics = new Graphic({
    //   geometry: updatedline,
    //   symbol: updatedLineSymbol
    // });

    // graphicsLayer.add(lineGraphics);
  };

  function chooseShape(e: any) {
    currentSymbol = e.target.id;
  }

  // const multipointthing = (view: MapView) => {
  //   var mpJson ={"points":[[103.851959, 1.29027],[103.851959, 1.39027],[103.851959, 1.49027]],"spatialReference": { wkid: 4326 }};
  //   var multipoint = new Multipoint(mpJson);
  //   const createPointGraphic = new Graphic({
  //     geometry: multipoint,
  //     symbol: new WebStyleSymbol({
  //       name: currentSymbol,
  //       styleName: "Esri2DPointSymbolsStyle",
  //     }),
  //   });
  //   view.graphics.add(createPointGraphic);
  // }
  

  const createPoint = (latitude: number, longitude: number, view: MapView) => {
    const createdPoint = new Point({
      longitude: longitude,
      latitude: latitude,
    });

    // console.log("Longitude: ", createdPoint.longitude);
    // console.log("Latitude: ", createdPoint.latitude);

    const createPointGraphic = new Graphic({
      geometry: createdPoint,
      symbol: new WebStyleSymbol({
        name: currentSymbol,
        styleName: "Esri2DPointSymbolsStyle",
      }),
    });
    view.graphics.add(createPointGraphic);
    const loader = document.createElement("calcite-loader");
document.body.appendChild(loader);
loader.label = "Loading the application";
  };

  useEffect(() => {
    loadMap();
  }, []);

  return (
    <div>
      <button onClick={chooseShape} id="circle-1">
        circle
      </button>
      <button onClick={chooseShape} id="square-2">
        square
      </button>
      <button onClick={chooseShape} id="triangle-3">
        triangle
      </button>
      {/* <p>
        <b>Lat/Long:</b>
      </p> */}
      <div
        style={{ height: 500, width: "100%", padding: 0, margin: 0 }}
        ref={mapRef}
        id="test"
      >

<div id="viewDiv">

<calcite-panel heading="SketchViewModel Styler" id="propPanel">
      <calcite-block id="headingBlock">
        <calcite-action
          icon="cursor"
          title="Select graphic"
          scale="s"
          slot="control"
          id="selectBtn"
        ></calcite-action>
        <calcite-action
          icon="pin"
          title="Draw a point"
          scale="s"
          slot="control"
          id="pointBtn"
        ></calcite-action>
        <calcite-action
          icon="line"
          title="Draw a polyline"
          scale="s"
          slot="control"
          id="polylineBtn"
        ></calcite-action>
        <calcite-action
          icon="polygon"
          title="Draw a polygon"
          scale="s"
          slot="control"
          id="polygonBtn"
        ></calcite-action>
        <calcite-action
          icon="rectangle"
          title="Draw a rectangle"
          scale="s"
          slot="control"
          id="rectangleBtn"
        >
        </calcite-action>
        <calcite-action
          icon="circle"
          title="Draw a circle"
          scale="s"
          slot="control"
          id="circleBtn"
        ></calcite-action>
        <calcite-action
          icon="trash"
          title="Clear graphics"
          scale="s"
          slot="control"
          id="clearBtn"
        ></calcite-action>
      </calcite-block>
      <calcite-accordion selection-mode="single">
        <calcite-accordion-item heading="pointSymbol">
          <div class="scrollSection">
            <calcite-label
              >style
              <calcite-select scale="s" id="point-style-select">
                <calcite-option value="circle" selected>circle</calcite-option>
                <calcite-option value="cross">cross</calcite-option>
                <calcite-option value="diamond">diamond</calcite-option>
                <calcite-option value="square">square</calcite-option>
                <calcite-option value="x">x</calcite-option>
              </calcite-select>
            </calcite-label>
            <calcite-label
              >color
              <calcite-input
                placeholder="Placeholder"
                type="color"
                scale="s"
                id="point-color-input"
              >
              </calcite-input>
            </calcite-label>
            <calcite-label
              >outline
              <calcite-button id="point-outline-btn" scale="s"
                >Set Outline</calcite-button
              >
            </calcite-label>
            <calcite-label
              >size
              <calcite-input
                id="point-size-input"
                placeholder="Placeholder"
                type="number"
                scale="s"
                min="0"
              ></calcite-input>
            </calcite-label>
            <calcite-label
              >xoffset
              <calcite-input
                id="point-xoffset-input"
                placeholder="Placeholder"
                type="number"
                scale="s"
              ></calcite-input>
            </calcite-label>
            <calcite-label
              >yoffset
              <calcite-input
                id="point-yoffset-input"
                placeholder="Placeholder"
                type="number"
                scale="s"
              ></calcite-input>
            </calcite-label>
            <calcite-label
              >angle
              <calcite-input
                id="point-angle-input"
                placeholder="Placeholder"
                type="number"
                scale="s"
                min="-360"
                max="360"
              >
              </calcite-input>
            </calcite-label>
          </div>
        </calcite-accordion-item>
      </calcite-accordion>
    </calcite-panel>

    <calcite-panel
      heading="SketchViewModel Shortcut Keys"
      id="sketchVM-controls"
    >
      <calcite-value-list>
        <calcite-value-list-item
          label="F"
          disabled
          description="Adds a vertex to the polyline or polygon graphic. Completes the rectangle or circle polygon graphic in click mode."
        >
        </calcite-value-list-item>
        <calcite-value-list-item
          label="Enter"
          description="Completes the polyline or polygon graphic sketch. Adds a point graphic at the pointer location."
        >
        </calcite-value-list-item>
        <calcite-value-list-item
          label="Z"
          description="Incrementally undo actions recorded in the stack."
        >
        </calcite-value-list-item>
        <calcite-value-list-item
          label="R"
          description="Incrementally redo actions recorded in the stack."
        >
        </calcite-value-list-item>
        <calcite-value-list-item
          label="Ctrl"
          description="Toggle snapping dependent on the configuration in snappingOptions."
        >
        </calcite-value-list-item>
        <calcite-value-list-item
          label="Delete"
          description="Remove the selected graphic(s) from the layer."
        >
        </calcite-value-list-item>
        <calcite-value-list-item
          label="Shift+Left-click"
          description="Select multiple graphics."
        ></calcite-value-list-item>
      </calcite-value-list>
    </calcite-panel>

    <calcite-modal id="point-outline-modal" width="300">
      <h3 slot="header">SimpleLineSymbol</h3>
      <div slot="content">
        <calcite-label
          >width
          <calcite-input
            min="0"
            placeholder="Placeholder"
            type="number"
            scale="s"
            id="point-sls-width-input"
          >
          </calcite-input>
        </calcite-label>
        <calcite-label
          >color
          <calcite-input
            placeholder="Placeholder"
            type="color"
            scale="s"
            id="point-sls-color-input"
            format="rgb"
          >
          </calcite-input>
        </calcite-label>
      </div>
    </calcite-modal>

</div>

   


      </div>
    </div>
  );
}

export default Map;
