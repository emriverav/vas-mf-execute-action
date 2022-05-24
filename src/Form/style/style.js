/**
 * Copyright (c) 2022 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2022
 *
 * @author: Angel Vázquez [23/03/2022]
 * @updated: -
 * @description: Estilos del componente Form.
 **/
 import { createTheme } from '@mui/material/styles';

 export const theme = createTheme({
    palette: {
        primary: {
          // light: will be calculated from palette.primary.main,
          main: '#ff4400',
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contrast with palette.primary.main
        }
    },
     components: {
        MuiButton: {
          styleOverrides: {
            textPrimary: {
                fontWeight: 'bolder'
            }
          }
        }
    }
 });