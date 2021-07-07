import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getEstimatesByObject, 
    getSystemsByObject, 
    getEstimatesByObjectBySystem, searchEstimatesByObject, searchEstimatesByObjectBySystem } from '../../store/actions/estimates';
import { getObjects } from '../../store/actions/core';
import { makeStyles } from '@material-ui/core/styles';
import { loadPageName } from '../../store/actions/info';
// Custom components
import EstimatesTable from '../../components/Estimates/EstimatesTable/EstimatesTable';
import UndoButton from '../../components/Buttons/UndoButton/UndoButton';
import SearchBar from '../../components/SearchBar/SearchBar';
import EstimateModal from '../../components/Estimates/EstimateModal/EstimateModal';
// Material UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddButton from '../../components/Buttons/AddButton/AddButton';

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
    button: {
        marginRight: 10,
        marginLeft: 10,
    },
    topGrid: {
        height: '20%',
    },
    bottomGrid: {
        display: 'flex',
        height: '50%',
    },
    icon: {
        cursor: 'pointer',
    },
}));

const EstimatesContainer = React.memo(props => {
    const { estimatesObject, estimatesSystem } = props;
    const classes = useStyles();
    const [object, setObject] = useState('');
    const [objectId, setObjectId] = useState('');
    const [system, setSystem] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [addingEnabled, setAddingEnabled] = useState(false);

    // Loading data for a chosen object
    const objChange = event => {
        setObject(event.target.value);
        const objName = event.target.value;
        const objFound = props.objectsData.filter(obj => obj.name === objName)[0];
        setObjectId(objFound.id);
        setSystem('');
        props.getEstimatesByObject(objFound.id);
        props.getSystemsByObject(objFound.id);
        setAddingEnabled(true);
    };
    // Loading data for a chosen system
    const systemChange = event => {
        const chosenSystem = event.target.value;
        setSystem(chosenSystem);
        if (chosenSystem === 'Все') {
        props.getEstimatesByObject(objectId);
        } else {
        props.getEstimatesByObjectBySystem(objectId, chosenSystem);
        }
    };
    // Searching estimates
    const searchEstimatesFilter = (value, system) => {
    if (estimatesObject === 0) {
        return;
    }
    switch(system) {
        case 'Все':
            props.searchEstimatesByObject(value, estimatesObject);
            break;
        default:
            props.searchEstimatesByObjectBySystem(value, estimatesObject, estimatesSystem)
            break;
        }
    };
    // Setting page name
    useEffect(() => {
        props.loadPageName('Просмотр смет');
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
    
    // Systems list by default
    let systemsList = <MenuItem>Загрузка</MenuItem>;

    if (props.systemsLoaded) {
        systemsList = props.systemsByObject.map(sys => {
            return(
                <MenuItem value={sys} key={sys}>
                    {sys}
                </MenuItem>
            );
        });
    };
        return(
                <div className={classes.root}>
                <EstimateModal show={openModal}/>
                <Grid container spacing={1}>
                    <Grid item xs={12} className={classes.topGrid}>
                        <Paper className={classes.paper}>
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
                            <FormControl className={classes.formControl}>
                                <InputLabel id="object-select-label">Выбор системы</InputLabel>
                                <Select
                                labelId="system-select-label"
                                id="system-select"
                                onChange={systemChange}
                                value={system}>
                                {systemsList}
                                </Select>
                            </FormControl>
                            <Box component="span">
                            <SearchBar type="estimates" filter={searchEstimatesFilter}/>
                            </Box>
                            <AddButton tooltipOn="Добавить позицию" tooltipOff="Выберите объект"
                            addingEnabled={addingEnabled}
                            clicked={
                                () => {
                                setOpenModal(true);
                                setTimeout(() => setOpenModal(false), 500)}}
                            />
                            <UndoButton />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} className={classes.bottomGrid}>
                        <EstimatesTable data={props.estimatesData} key="table1"/>
                    </Grid>
                </Grid>
                </div>
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
        systemsByObject: state.est.systemsByObject,
        systemsLoaded: state.est.systemsLoaded,
    };
};

export default connect(mapStateToProps, 
    { getEstimatesByObject, getObjects, 
        getSystemsByObject, getEstimatesByObjectBySystem,
        searchEstimatesByObjectBySystem, searchEstimatesByObject, loadPageName })(EstimatesContainer)