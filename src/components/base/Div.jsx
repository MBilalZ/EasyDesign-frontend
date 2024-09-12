import React from 'react';
import {Paper} from "@mui/material";

const Div = (props) => {
    return (
        <Paper elevation={0} {...props}>
            {props.children}
        </Paper>
    );
};

export default Div;