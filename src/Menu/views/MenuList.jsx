import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import * as React from 'react';


export default function MenuList(props) {
    return (
        <List
            sx={props.sx}
            component="nav"
            aria-labelledby={props.subheaderId}
            subheader={
                <ListSubheader component="div" id={props.subheaderId}>
                    {props.subheaderText}
                </ListSubheader>
            }
        >
            {props.children}
        </List>
    );
}





















