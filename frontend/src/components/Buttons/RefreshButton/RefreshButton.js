import React from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import CachedIcon from '@material-ui/icons/Cached';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
// Redux
import { connect } from 'react-redux';
import { showSnack } from '../../../store/actions/snack';

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: 5,
        marginBottom: 10,
        width: 50,
        marginLeft: 10,
    },
}));

const RefreshButton = (props) => {
    const { clicked, refreshEnabled, tooltipOn, tooltipOff } = props;
    const classes = useStyles();
    return(
        <Tooltip title={refreshEnabled ?
            <Typography variant="subtitle1">{tooltipOn}</Typography> :
            <Typography variant="subtitle1">{tooltipOff}</Typography>} arrow>
        <Fab color="primary" aria-label="add" className={classes.button} size="medium"
                    onClick={refreshEnabled ? () => {
                        clicked();
                        setTimeout(() => {props.showSnack('Обновлено!', 'info')}, 700);
                    } : null }>
            <CachedIcon style={refreshEnabled ? {color: 'white'} : {color: 'grey'}} />
        </Fab>
    </Tooltip>
    );
};

export default connect(null, { showSnack })(RefreshButton);