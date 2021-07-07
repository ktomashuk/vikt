import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getSystemsByObject } from '../../store/actions/estimates';
import { getObjects } from '../../store/actions/core';
import { getJournalByObjectBySystem } from '../../store/actions/cable';
import { loadPageName } from '../../store/actions/info';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// Custom components
import CablePanel from '../../components/Documents/CablePanel/CablePanel';
import CableTable from '../../components/Documents/CableTable/CableTable';
import DeleteBar from '../../components/UI/DeleteBar/DeleteBar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        display: 'flex',
        flex: 1,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        alignItems: 'center',
    },
    button: {
        marginTop: 5,
        marginBottom: 5,
        width: 50,
        marginLeft: 10,
        marginRight: 10,
    },
    formControl: {
        margin: theme.spacing(1),
        mindWidth: 200,
        width: 200,
    },
    icon: {
        cursor: 'pointer',
    },
    panel: {
        display: 'flex',
        alignItems: 'center',
    },
}));

const CableContainer = (props) => {
    const classes = useStyles();

    // Setting page name
    useEffect(() => {
        props.loadPageName('Кабельный журнал');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <div className={classes.root}>
            <DeleteBar />
            <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <Paper className={classes.paper}>
                    <CablePanel />
                    </Paper>
                    </Grid>
                    <Grid item xs={12}>
                    <Paper>
                    <CableTable />  
                    </Paper>
                    </Grid>
            </Grid>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        objectsLoaded: state.core.objectsLoaded,
        objectsData: state.core.objectsData,
        systemsByObject: state.est.systemsByObject,
        systemsLoaded: state.est.systemsLoaded,
        deviceList: state.cable.deviceList,
    };
};

export default connect(mapStateToProps, 
    { getObjects, getSystemsByObject, loadPageName, getJournalByObjectBySystem })(CableContainer);