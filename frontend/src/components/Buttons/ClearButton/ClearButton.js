import React from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import CheckIcon from '@material-ui/icons/Check';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';

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
        <Tooltip title={clearEnabled ?
            <Typography variant="subtitle1">{tooltipOn}</Typography> :
            <Typography variant="subtitle1">{tooltipOff}</Typography>} arrow>
        <Fab color="primary" aria-label="add" className={classes.button} size="medium"
                    onClick={clearEnabled ? clicked : null}>
            <CheckIcon style={clearEnabled ? {color: 'white'} : {color: 'grey'}} />
        </Fab>
    </Tooltip>
    );
}

export default ClearButton;