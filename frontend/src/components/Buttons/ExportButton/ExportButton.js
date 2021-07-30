import React from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
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

const ExportButton = (props) => {
    const { clicked, exportEnabled, tooltipOn, tooltipOff } = props;
    const classes = useStyles();
    return(
        <Tooltip title={exportEnabled ?
            <Typography variant="subtitle1">{tooltipOn}</Typography> :
            <Typography variant="subtitle1">{tooltipOff}</Typography>} arrow>
        <Fab color="primary" aria-label="add" className={classes.button} size="medium"
                    onClick={clicked}>
            <NoteAddIcon style={exportEnabled ? {color: 'white'} : {color: 'grey'}} />
        </Fab>
    </Tooltip>
    );
}

export default ExportButton;