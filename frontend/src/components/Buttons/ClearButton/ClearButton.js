import React from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import ClearIcon from '@material-ui/icons/Clear';
import Fab from '@material-ui/core/Fab';
const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: 5,
        marginBottom: 10,
        width: 50,
        marginLeft: 10,
    },
}));

const ClearButton = (props) => {
    const { clicked, clearEnabled, tooltipOn, tooltipOff } = props;
    const classes = useStyles();
    return(
    <Tooltip title={clearEnabled ? <h6>{tooltipOn}</h6> : <h6>{tooltipOff}</h6>} arrow>
        <Fab color="primary" aria-label="add" className={classes.button} size="medium"
                    onClick={clearEnabled ? clicked : null}>
            <ClearIcon style={clearEnabled ? {color: 'white'} : {color: 'grey'}} />
        </Fab>
    </Tooltip>
    );
}

export default ClearButton;