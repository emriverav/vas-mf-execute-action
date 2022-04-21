/**
 * Copyright (c) 2022 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2022
 *
 * @author: Angel Vazquez [23/03/2022]
 * @updated: -
 * @description: Componente Header.
 **/
 import React from "react";
 import AppBar from '@mui/material/AppBar';
 import Box from '@mui/material/Box';
 import Toolbar from '@mui/material/Toolbar';
 import Typography from '@mui/material/Typography';
 import IconButton from '@mui/material/IconButton';
 import { ThemeProvider } from '@mui/material/styles';
 import { theme } from "./styles/styles";
 
 export default function Header() {
   return <ThemeProvider theme={theme}>
     <Box sx={{ flexGrow: 1 }}>
       <AppBar position="static">
         <Toolbar>
           <img src="https://micredito.liverpool.com.mx:9443/cdn//app/assets/images/liverpool-logo.svg" alt="Liverpool, es parte de tu vida" style={{ maxWidth: "165px" }} />
           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
             News
           </Typography>
           <IconButton
             size="large"
             edge="start"
             color="inherit"
             aria-label="menu"
             sx={{ mr: 2 }}
           >
           </IconButton>
         </Toolbar>
       </AppBar>
     </Box>
   </ThemeProvider>
 };
 