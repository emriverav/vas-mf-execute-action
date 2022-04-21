/**
 * Copyright (c) 2022 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2022
 *
 * @author: Mauricio Aguilar [22/03/2022]
 * @updated:
 * @description: Archivo para renderizar los componentes.
 * version 1.01
 **/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/App.routes';
import registerServiceWorker from '../../../config/serviceWorker/serviceWorker.js';


ReactDOM.render(<App />, document.getElementById('mf-login'));
registerServiceWorker();