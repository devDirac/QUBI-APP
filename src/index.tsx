import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';

import reportWebVitals from './reportWebVitals';
import configureStore from "./store";
import { Provider } from 'react-redux'
import { MaterialUIControllerProvider } from "context";
import { PrimeReactProvider } from 'primereact/api';
import App from './App';

const store = configureStore;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
   <MaterialUIControllerProvider>
    {" "}
    <Provider store={store}>
      <PrimeReactProvider value={{ appendTo: 'self', cssTransition: false}}>
        <App />
      </PrimeReactProvider>
    </Provider>
    {" "}
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
reportWebVitals();
