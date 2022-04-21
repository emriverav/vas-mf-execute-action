/**
 * Copyright (c) 2022 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2022
 *
 * @author: Juan Ángel de Jesús Vázquez Crespo [05/04/2022]
 * @updated:
 * @description: Archivo para manejo de errores.
 * version 1.01
 **/

import React from 'react';

export default class SafeComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }
    
    render() {
        if (this.state.hasError) {
            return <div>MicroFrontend Inactivo</div>
        }
        return this.props.children;
    }
}