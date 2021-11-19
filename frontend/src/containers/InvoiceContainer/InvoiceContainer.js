import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getEstimatesByObject, 
    getSystemsByObject, 
    getEstimatesByObjectBySystem } from '../../store/actions/estimates';
import { getObjects } from '../../store/actions/core';
import { makeStyles } from '@material-ui/core/styles';
import { loadPageName } from '../../store/actions/info';
// Custom components
import SearchBar from '../../components/SearchBar/SearchBar';
// Material UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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

const EstimatesContainer = React.memo(props => {

    const classes = useStyles();
    const [object, setObject] = useState('');
    // Loading data for a chosen object
    const objChange = event => {
        setObject(event.target.value);
        const objName = event.target.value;
        const objFound = props.objectsData.filter(obj => obj.name === objName)[0];
        props.getEstimatesByObject(objFound.id);
        props.getSystemsByObject(objFound.id);
    };
    
    // Setting page name
    useEffect(() => {
        props.loadPageName('Добавить платежку');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Fetching objects
    useEffect(() => {
        props.getObjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Objects list by default
    let objectsList = <MenuItem>Загрузка</MenuItem>;

    if (props.objectsLoaded) {
        objectsList = props.objectsData.map(item => {
            return(
                <MenuItem value={item.name} key={item.name}>
                    {item.name}
                </MenuItem>
            );
        });
    };

        return(
                <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={6} className={classes.bottomGrid}>
                    <Paper>
                    <Box style={{marginBottom: 10, display: 'flex', alignItems: 'center'}}>
                    </Box>
                    </Paper>
                    </Grid>
                    <Grid item xs={6} className={classes.bottomGrid}>
                    <Paper>
                    <Box style={{marginBottom: 10, display: 'flex', alignItems: 'center'}}>
                    <FormControl className={classes.formControl}>
                            <InputLabel id="object-select-label">Выбор объекта</InputLabel>
                            <Select
                            labelId="object-select-label"
                            id="object-select"
                            onChange={objChange}
                            value={object}>
                            {objectsList}
                            </Select>
                    </FormControl>
                    <SearchBar type="invoices"/>
                    </Box>
                    </Paper>
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
        getSystemsByObject, getEstimatesByObjectBySystem, loadPageName })(EstimatesContainer)