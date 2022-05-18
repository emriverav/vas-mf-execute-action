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
    mt3: {
        marginTop: '3rem !important'
	},
    paperContainer: {
		height: 'auto',
		boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.3)',
		paddingBottom: 10,
        textAlign: 'center',
		marginBottom:'40px !important'
	},
    title: {
		fontWeight: 'bold !important',
		padding: '10px 20px'
	},
	cenLoader: {
		position: 'absolute',
		top: '50%',
		left: '43%',
		transform: 'translate(-50%, -50%)',
		width: '60px !important',
    	height: '60px !important',
		color:'#9c27b0'
	  },
	  center:{
		textAlign:'center',
		position: 'relative',
    	height: 100
	}
 }));

 export default useStyles;