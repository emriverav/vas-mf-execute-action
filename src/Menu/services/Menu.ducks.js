/**
 * Copyright (c) 2022 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2022
 *
 * @author: Angel Vazquez [08/04/2022]
 * @updated:
 * @description: Servicios del componente Menu con redux.
 **/

const initState = {
	menu: {}
};

const OBTAIN_MENU = 'OBTAIN_MENU';
const MENU_ERROR = 'MENU_ERROR';

/** Reducer */
export default function menuReducer(state = initState, action = {}) {
	const { type, payload, error } = action;
	switch (type) {
		case OBTAIN_MENU:
			return {
				...state,
				menu: payload
			};
		case MENU_ERROR:
			return error;
		default:
			return state;
	}
};

/** Acciones */
export const obtainMenu = () => async (dispatch) => {
	try {
		const rs = await fetch(`${process.env.APIURL}/menu`);
		debugger
		const { value } = await rs.json();
		const menu = JSON.parse(JSON.parse(value).value.replaceAll("'", "\""));
		dispatch({
			type: OBTAIN_MENU,
			payload: menu ? menu : {}
		});

		return 200;
	} catch (error) {
		dispatch({ type: MENU_ERROR, error });
		return 400;
	}
};
