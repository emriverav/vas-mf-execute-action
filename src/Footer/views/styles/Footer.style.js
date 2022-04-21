/**
 * Copyright (c) 2022 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2022
 *
 * @author: Mauricio Aguilar [23/03/2022]
 * @updated: -
 * @description: Estilos del componente Users.
 **/

 import { makeStyles } from '@mui/styles';

 const useStyles = makeStyles(() => ({
    footer: {
		padding: '1rem !important',
		position: 'fixed !important',
		bottom: 0,
		textAlign: 'center',
		minWidth: '100%',
		fontFamily: 'Roboto',
		backgroundColor: '#555',
		bottom: 0,
		left: 0,
		padding: '16px 0',
		width: '100%',
		color: 'white',
		zIndex: 10,
		fontSize: '.75rem',
	}
 }));

 export default useStyles;