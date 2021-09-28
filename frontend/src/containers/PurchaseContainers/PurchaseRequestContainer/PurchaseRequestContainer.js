import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// Material UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// Custom components
// Redux
import { connect } from 'react-redux';
//import { getObjects, getSystemsByObjectAndAddAll, getObjectById, getUnits, unloadObjectSystems } from '../../store/actions/core';
import { getEstimatePurchasesByObject, getNonEstimatePurchasesByObject } from '../../../store/actions/purchases';
// import { loadPageName } from '../../store/actions/info';

const useStyles = makeStyles((theme) => ({

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
        mindWidth: 200,
        width: 200,
    },
    topGrid: {
        height: '20%',
    },
    bottomGrid: {
        display: 'flex',
        height: '50%',
    },
}));

const PurchaseOverviewContainer = React.memo(props => {
    const classes = useStyles();
    const { getEstimatePurchasesByObject, getNonEstimatePurchasesByObject } = props;

    useEffect(() => {
        getEstimatePurchasesByObject(1);
        getNonEstimatePurchasesByObject(1);
    }, [getEstimatePurchasesByObject, getNonEstimatePurchasesByObject]);

    return(
        <React.Fragment>
            <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <Paper className={classes.paper}>
                    </Paper>
                    </Grid>
                    <Grid item xs={12}>
                    <Paper>
                    </Paper>
                    </Grid>
            </Grid>
        </React.Fragment>
    );
});

const mapStateToProps = state => {
    return {
        estimatesLoaded: state.est.estimatesLoaded,
        estimatesData: state.est.estimatesData,
        estimatesObject: state.est.estimatesObject,
        estimatesSystem: state.est.estimatesSystem,
        objectsLoaded: state.core.objectsLoaded,
        objectsData: state.core.objectsData,
        chosenObjectId: state.core.chosenObjectId,
        chosenObjectSystems: state.core.chosenObjectSystems,
        chosenObjectSystemsLoaded: state.core.chosenObjectSystemsLoaded,
    };
};

export default connect(mapStateToProps, { 
    getEstimatePurchasesByObject, getNonEstimatePurchasesByObject })(PurchaseOverviewContainer);