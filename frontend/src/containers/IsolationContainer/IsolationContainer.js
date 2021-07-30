import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadPageName } from '../../store/actions/info';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// Custom components
import IsolationPanel from '../../components/Documents/Isolation/IsolationPanel/IsolationPanel';
import IsolationTable from '../../components/Documents/Isolation/IsolationTable/IsolationTable';
import ResistanceBar from '../../components/UI/ResistanceBar/ResistanceBar';

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
}));

const IsolationContainer = (props) => {
    const classes = useStyles();
    const { loadPageName } = props;
    // Setting page name
    useEffect(() => {
        loadPageName('Акт измерения сопротивления изоляции');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <div className={classes.root}>
            <ResistanceBar />
            <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <Paper className={classes.paper}>
                    <IsolationPanel />
                    </Paper>
                    </Grid>
                    <Grid item xs={12}>
                    <Paper>
                    <IsolationTable />  
                    </Paper>
                    </Grid>
            </Grid>
        </div>
    );
}


export default connect(null, { loadPageName })(IsolationContainer);