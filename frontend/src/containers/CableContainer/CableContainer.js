import React, { useEffect } from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// Custom components
import CablePanel from '../../components/Documents/CableJournal/CablePanel/CablePanel';
import CableTable from '../../components/Documents/CableJournal/CableTable/CableTable';
import DeleteBar from '../../components/UI/DeleteBar/DeleteBar';
import CableBar from '../../components/UI/CableBar/CableBar';
import CableEditModal from '../../components/Documents/CableJournal/CableEditModal/CableEditModal';
// Redux
import { connect } from 'react-redux';
import { loadPageName } from '../../store/actions/info';

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

const CableContainer = (props) => {
    const classes = useStyles();
    const { loadPageName } = props;
    // Setting page name
    useEffect(() => {
        loadPageName('Кабельный журнал');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <div className={classes.root}>
            <DeleteBar />
            <CableBar />
            <CableEditModal />
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

export default connect(mapStateToProps, { loadPageName })(CableContainer);