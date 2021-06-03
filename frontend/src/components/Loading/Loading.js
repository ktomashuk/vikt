import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles({
    loading: {
        position: 'absolute',
        left: '50%',
        top: '50%',
    },
});

const Loading = (props) => {
    const classes = useStyles();
    const { active } = props;
    return(
    <React.Fragment>
        {active ? <CircularProgress className={classes.loading}/> : null}
    </React.Fragment>
    );
}

export default Loading;