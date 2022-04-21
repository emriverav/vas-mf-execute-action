/**
 * Copyright (c) 2022 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2022
 *
 * @author: Mauricio Aguilar [22/03/2022]
 * @updated: Angel Vazquez [08/04/2022]
 * @description: Archivo de importación de componentes y configuración de rutas.
 **/

import React, {Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Theme from '../../views/styles/App.theme';
import ExecuteAction from '../../../ExecuteAction/business/ExecuteAction';
import { BrowserRouter as Router, Routes , Route, Navigate } from "react-router-dom";



const App = () => (
   
        <ThemeProvider theme={Theme}>
            <CssBaseline />
                <Suspense fallback={<div>Loading...</div>}>
                    <Router>
                        <Routes>
                            <Route path="/execute/action" element={ <ExecuteAction/> }/>
                            <Route path="*" element={<Navigate to="/execute/action" replace />}/>
                        </Routes>
                    </Router>
                </Suspense>
        </ThemeProvider>
);

export default App;
