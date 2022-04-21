/**
 * Copyright (c) 2022 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2022
 *
 * @author: Erick Lopez [24/03/2022]
 * @updated:
 * @description: Servicios del componente Login con redux.
 **/

 const initState = {
    login: [],
	isLoggedIn: false,
};

const OBTAIN_CREDENTIALS_GOOGLE = 'OBTAIN_CREDENTIALS_GOOGLE';
const CREDENTIALS_GOOGLE_ERROR =  'CREDENTIALS_GOOGLE_ERROR';

/** Reducer */
export default function LoginReducer(state = initState, action = {}) {
	const { type, payload, error } = action;

	switch (type) {
		case OBTAIN_CREDENTIALS_GOOGLE:
			return {
				...state,
				login: payload,
				isLoggedIn: true
			};
		case CREDENTIALS_GOOGLE_ERROR:
			return error;
		default:
			return state; 
	}
};

/** Acciones */
export const obtainCredentials = (val) => async (dispatch) => {
	try {
		const payload = val
		
		dispatch({
			type: OBTAIN_CREDENTIALS_GOOGLE,
			payload: payload
		});

		return 200;
	} catch (error) {
		dispatch({ type: CREDENTIALS_GOOGLE_ERROR, error });
		return 400;
	}
};
