import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// Material UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddButton from '../../components/Buttons/AddButton/AddButton';
// Custom components
import EstimatesTable from '../../components/Estimates/EstimatesTable/EstimatesTable';
import UndoButton from '../../components/Buttons/UndoButton/UndoButton';
import ClearButton from '../../components/Buttons/ClearButton/ClearButton';
import SearchBar from '../../components/SearchBar/SearchBar';
import EstimateModal from '../../components/Estimates/EstimateModal/EstimateModal';
import EstimateEditModal from '../../components/Estimates/EstimateEditModal/EstimateEditModal';
import DeleteBar from '../../components/UI/DeleteBar/DeleteBar';
// Redux
import { connect } from 'react-redux';
import { getEstimatesByObject, getEstimatesByObjectBySystem,
    searchEstimatesByObject, searchEstimatesByObjectBySystem, unloadEstimates,
    getNonEstimatesByObjectBySystem, getNonEstimatesByObject,
    searchNonEstimatesByObject, searchNonEstimatesByObjectBySystem } from '../../store/actions/estimates';
import { estimateDeleteRemoveAll, estimateDeleteAddAll } from '../../store/actions/delete';
import { getObjects, getSystemsByObjectAndAddAll, getObjectById, getUnits, unloadObjectSystems } from '../../store/actions/core';
import { switchToDeleting } from '../../store/actions/selectors';
import { loadPageName } from '../../store/actions/info';

const useStyles = makeStyles((theme) => ({

    paper: {
        display: 'flex',
        flex: 1,
        padding: theme.spacing(0),
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

const EstimatesContainer = React.memo(props => {
    const { estimatesObject, estimatesSystem, estimatesLoaded, estimatesData,
    chosenObjectId, chosenObjectSystems, chosenObjectSystemsLoaded,
    objectsData, objectsLoaded, unloadEstimates, unloadObjectSystems,
    getEstimatesByObject, getObjects, getObjectById, getUnits,
    getSystemsByObjectAndAddAll, getEstimatesByObjectBySystem, switchToDeleting,
    estimateDeleteRemoveAll, estimateDeleteAddAll, loadPageName,
    searchEstimatesByObjectBySystem, searchEstimatesByObject,
    getNonEstimatesByObject, getNonEstimatesByObjectBySystem,
    searchNonEstimatesByObject, searchNonEstimatesByObjectBySystem } = props;
    const classes = useStyles();
    const [object, setObject] = useState('');
    const [system, setSystem] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [addingEnabled, setAddingEnabled] = useState(false);

    // Loading data for a chosen object
    const objChange = async(event) => {
        unloadEstimates();
        unloadObjectSystems();
        setObject(event.target.value);
        const objName = event.target.value;
        const objFound = objectsData.filter(obj => obj.name === objName)[0];
        setSystem('');
        getEstimatesByObject(objFound.id);
        getNonEstimatesByObject(objFound.id);
        getObjectById(objFound.id);
        getSystemsByObjectAndAddAll(objFound.id);
        setAddingEnabled(true);
    };
    // Loading data for a chosen system
    const systemChange = event => {
        const chosenSystem = event.target.value;
        const sysFound = chosenObjectSystems.filter(sys => sys.acronym === chosenSystem)[0]['id'];
        setSystem(chosenSystem);
        if (chosenSystem === 'Все') {
        getEstimatesByObject(chosenObjectId);
        getNonEstimatesByObject(chosenObjectId);
        } else {
        getEstimatesByObjectBySystem(chosenObjectId, sysFound);
        getNonEstimatesByObjectBySystem(chosenObjectId, sysFound);
        }
    };
    // Searching estimates
    const searchEstimatesFilter = (value, system) => {
    if (estimatesObject === 0) {
        return;
    }
    switch(system) {
        case 'Все':
            searchEstimatesByObject(value, estimatesObject);
            searchNonEstimatesByObject(value, estimatesObject);
            break;
        default:
            searchEstimatesByObjectBySystem(value, estimatesObject, estimatesSystem);
            searchNonEstimatesByObjectBySystem(value, estimatesObject, estimatesSystem);
            break;
        }
    };
    // Setting page name & fetching objects && activating delete bar
    useEffect(() => {
        loadPageName('Просмотр смет');
        getObjects();
        getUnits();
        switchToDeleting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Objects list by default
    let objectsList = <MenuItem>Загрузка</MenuItem>;
    // Objects list after it is loaded
    if (objectsLoaded) {
        objectsList = objectsData.map(item => {
            return(
                <MenuItem value={item.name} key={item.name}>
                    {item.name}
                </MenuItem>
            );
        });
    };
    // Systems list by default
    let systemsList = <MenuItem>Загрузка</MenuItem>;
    // Systems list after it is loaded
    if (chosenObjectSystemsLoaded) {
        systemsList = chosenObjectSystems.map(sys => {
            return(
                <MenuItem value={sys.acronym} key={sys.acronym}>
                    {sys.acronym}
                </MenuItem>
            );
        });
    };
        return(
                <React.Fragment>
                <EstimateModal show={openModal}/>
                <EstimateEditModal />
                <DeleteBar />
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
                            <ClearButton tooltipOn="Выбрать все" tooltipOff="Выбор недоступен"
                            clearEnabled={estimatesLoaded && estimatesData[0] !== undefined} 
                            clicked={ async () => {
                                await estimateDeleteRemoveAll();
                                estimateDeleteAddAll();
                            }}/>
                            <UndoButton />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} className={classes.bottomGrid}>
                        <EstimatesTable key="table1"/>
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
        nonEstimatesLoaded: state.est.nonEstimatesLoaded,
        nonEstimatesData: state.est.nonEstimatesData,
        objectsLoaded: state.core.objectsLoaded,
        objectsData: state.core.objectsData,
        chosenObjectId: state.core.chosenObjectId,
        chosenObjectSystems: state.core.chosenObjectSystems,
        chosenObjectSystemsLoaded: state.core.chosenObjectSystemsLoaded,
    };
};

export default connect(mapStateToProps, 
    { getEstimatesByObject, getObjects, getObjectById, getUnits,
        getSystemsByObjectAndAddAll, getEstimatesByObjectBySystem, switchToDeleting,
        estimateDeleteRemoveAll, estimateDeleteAddAll, loadPageName,
        searchEstimatesByObjectBySystem, searchEstimatesByObject,
        searchNonEstimatesByObject, searchNonEstimatesByObjectBySystem,
        getNonEstimatesByObjectBySystem, getNonEstimatesByObject,
        unloadEstimates, unloadObjectSystems })(EstimatesContainer);