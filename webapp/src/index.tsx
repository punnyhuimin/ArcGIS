import React from 'react';
import ReactDOM from 'react-dom/client';
import Test from './Map';

// import esriConfig from "@arcgis/core/config"

// esriConfig.assetsPath = "./assets"
// esriConfig.apiKey = "98da9ed1ebe31f67bb8e55061d4a9618f34baa3092fdca373a9eed5d91a47cc9"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Test />
  </React.StrictMode>
);
