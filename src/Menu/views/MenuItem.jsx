import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
//import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Icon } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';

export default function MenuItem(props) {
    const [open, setOpen] = React.useState(true);

    const handleClick = ({ handleCustomClick }) => {
        if (props.children) setOpen(!open)
        if (handleCustomClick != undefined) handleCustomClick();
    };

    //{icon, primary, children, handleCustomClick}

    return (
        <React.Fragment>
            <ListItemButton onClick={() => handleClick({ handleCustomClick: props.handleCustomClick })}>
                <ListItemIcon>
                    <Icon>{props.icon}</Icon>
                    {/* <InboxIcon /> */}
                </ListItemIcon>
                <ListItemText primary={props.itemText} />
                {props.children ? (open ? <ExpandLess /> : <ExpandMore />) : null}
            </ListItemButton>
            {props.children ? <Collapse in={open} timeout="auto" unmountOnExit>
                {props.children}
            </Collapse> : null}
        </React.Fragment>
    );
}