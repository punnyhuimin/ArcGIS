import React from 'react';
import ReactDOM from 'react-dom/client';
import Map from './Map';

// import esriConfig from "@arcgis/core/config"

// esriConfig.assetsPath = "./assets"
// esriConfig.apiKey = "98da9ed1ebe31f67bb8e55061d4a9618f34baa3092fdca373a9eed5d91a47cc9"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <link rel="stylesheet" href="https://js.arcgis.com/4.26/esri/themes/light/main.css"></link>
    <Map/>
  </React.StrictMode>
);
