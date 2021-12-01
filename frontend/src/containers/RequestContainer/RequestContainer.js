import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getEstimatesByObject, 
    getSystemsByObject, 
    getEstimatesByObjectBySystem } from '../../store/actions/estimates';
import { getObjects } from '../../store/actions/core';
import { makeStyles } from '@material-ui/core/styles';
import { loadPageName } from '../../store/actions/info';
// Material UI
import Grid from '@material-ui/core/Grid';
// Custom components
import RequestPanel from '../../components/Request/RequestPanel/RequestPanel';
import RequestPurchasesTable from '../../components/Request/RequestPurchasesTable/RequestPurchasesTable';

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
    formControl: {
        margin: theme.spacing(1),
        mindWidth: 150,
        width: 200,
    },
    button: {
        marginRight: 10,
        marginLeft: 10,
    },
    topGrid: {
        height: '20%',
    },
    bottomGrid: {
        height: '75%',
    },
    icon: {
        cursor: 'pointer',
        marginLeft: 10,
        color: 'green'
    },
}));

const RequestContainer = React.memo(props => {

    const classes = useStyles();

        return(
                <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12} className={classes.topGrid} style={{marginTop: 5}}>
                    <RequestPanel />
                    </Grid>
                    <Grid item xs={7} className={classes.bottomGrid}>
                    <RequestPurchasesTable />
                    </Grid>
                    <Grid item xs={5} className={classes.bottomGrid}>
                    
                    </Grid>
                </Grid>
                </div>
        );
});

const mapStateToProps = state => {
    return {
        estimatesLoaded: state.est.estimatesLoaded,
        estimatesData: state.est.estimatesData,
        objectsLoaded: state.core.objectsLoaded,
        objectsData: state.core.objectsData,
        systemsByObject: state.est.systemsByObject,
        systemsLoaded: state.est.systemsLoaded,
    };
};

export default connect(mapStateToProps, 
    { getEstimatesByObject, getObjects, 
        getSystemsByObject, getEstimatesByObjectBySystem, loadPageName })(RequestContainer)