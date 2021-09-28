import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// Material UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// Custom components
import PurchasesOverviewPanel from '../../../components/Purchases/PurchasesOverview/PurchasesOverviewPanel/PurchasesOverviewPanel';
import PurchasesOverviewTable from '../../../components/Purchases/PurchasesOverview/PurchasesOverviewTable/PurchasesOverviewTable';
// Redux
import { connect } from 'react-redux';
import { getUnits } from '../../../store/actions/core';
import { loadPageName } from '../../../store/actions/info';

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
    const { loadPageName, getUnits } = props;

    useEffect(() => {
        loadPageName('Просмотр закупки');
        getUnits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <React.Fragment>
            <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <Paper className={classes.paper}>
                    <PurchasesOverviewPanel />
                    </Paper>
                    </Grid>
                    <Grid item xs={12}>
                    <Paper>
                    <PurchasesOverviewTable />
                    </Paper>
                    </Grid>
            </Grid>
        </React.Fragment>
    );
});


export default connect(null, { loadPageName, getUnits })(PurchaseOverviewContainer);