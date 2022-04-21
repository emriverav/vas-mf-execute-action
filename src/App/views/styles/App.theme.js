/**
 * Copyright (c) 2022 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2022
 *
 * @author: Mauricio Aguilar [23/03/2022]
 * @updated: -
 * @description: Estilos para el tema principal de la aplicación.
 **/

 import { createTheme } from '@mui/material/styles';

 const Theme = createTheme({
    palette: {
        primary: {
            main: '#e10098'
        },
        secondary: {
            main: '#aaa',
            contrastText: '#fff'
        },
        background: {
            default: '#e8e8e8'
        }
    },
    components: {
        MuiTableSortLabel: {
          styleOverrides: {
            root: {
                fontWeight: 'bold'
            }
          }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none'
                }
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                asterisk: {
                    color: '#ff0000'
                }
            }
        }
    }
 });

 export default Theme;
