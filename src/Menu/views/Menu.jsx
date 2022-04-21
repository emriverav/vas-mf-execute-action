/**
 * Copyright (c) 2022 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2022
 *
 * @author: Angel Vazquez [08/04/2022]
 * @updated:
 * @description: Servicios del componente Menu con redux.
 **/

import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import MenuItem from './MenuItem';
import MenuList from './MenuList';
import './styles/styles.css'
import { useDispatch, useSelector } from 'react-redux';
import { obtainMenu } from '../services/Menu.ducks';

export default function Menu(props) {
    const dispatch = useDispatch();
    const storeMenu = useSelector(
        (store) => {
            return store.menu.menu || {}
        }
    );
    useEffect(() => {
        dispatch(obtainMenu());
    }, []);

    let { isShowingMenu } = props;
    return (
        isShowingMenu ?
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', height: '100%', position: 'fixed', zIndex: '10', }}>
                <MenuList sx={{ width: '100%', bgcolor: 'background.paper' }} /* subheaderId={"nested-list-subheader"} subheaderText={"Nested List Items"} */>
                    {storeMenu.menuItems?.map((menuItem1, indx1) => {
                        return (<MenuItem key={indx1} id={indx1} icon={menuItem1.materialIconName} itemText={menuItem1.name}>
                            {menuItem1.menuItems ? <MenuList sx={{ paddingLeft: "10px" }}>
                                {menuItem1.menuItems?.map((menuItem2, indx2) => {
                                    return (<MenuItem key={`${indx1}-${indx2}`} id={`${indx1}-${indx2}`} icon={menuItem2.materialIconName} itemText={menuItem2.name} />)
                                })}
                            </MenuList> : null}
                        </MenuItem>
                        )
                    })}
                </MenuList>
            </Box>
            : ""
    );
}