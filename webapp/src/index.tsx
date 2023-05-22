import React from 'react';
import ReactDOM from 'react-dom/client';
import Map from './Map';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <link rel="stylesheet" href="https://js.arcgis.com/4.26/esri/themes/light/main.css"></link>
    <Map/>
  </React.StrictMode>
);
