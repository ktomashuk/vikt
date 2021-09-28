import React, { useState, useEffect } from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// Custom components
import SearchBar from '../../../SearchBar/SearchBar';
// Redux
import { connect } from 'react-redux';
import { getObjects, getSystemsByObjectAndAddAll, getObjectById, unloadObjectSystems } from '../../../../store/actions/core';
import { getEstimatePurchasesByObject, getNonEstimatePurchasesByObject } from '../../../../store/actions/purchases';
import { getEstimatesByObject, getEstimatesByObjectBySystem, unloadEstimates } from '../../../../store/actions/estimates';
import { searchEstimatesByObject, searchEstimatesByObjectBySystem } from '../../../../store/actions/estimates';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: 10,
        marginBottom: 10,
    },
    chip: {
        marginLeft: 5,
        marginBottom: 5,
    },
    button: {
        marginTop: 5,
        marginBottom: 10,
        width: 50,
        marginLeft: 10,
        marginRight: 10,
    },
    formControl: {
        minWidth: 150,
        width: '12%',
        marginBottom: 10,
        marginLeft: 10,
    },
}));

const PurchasesOverviewPanel = (props) => {
    const classes = useStyles();
    const { chosenObjectId, chosenObjectSystems, chosenObjectSystemsLoaded, 
        objectsData, objectsLoaded, getObjects, getSystemsByObjectAndAddAll, getObjectById,
        getEstimatePurchasesByObject, getNonEstimatePurchasesByObject, 
        getEstimatesByObject, getEstimatesByObjectBySystem, estimatesObject, estimatesSystem,
        searchEstimatesByObject, searchEstimatesByObjectBySystem,
        unloadEstimates, unloadObjectSystems, } = props;
    const [object, setObject] = useState('');
    const [type, setType] = useState('По объекту');
    const [system, setSystem] = useState({name: '', id: 0});
    // Fetching objects
    useEffect(() => {
        getObjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Selecting the type of filtering
    const typeChange = event => {
        setType(event.target.value);
    };
    // Loading data for a chosen object
    const objChange = event => {
        unloadEstimates();
        unloadObjectSystems();
        setObject(event.target.value);
        const objName = event.target.value;
        const objFound = objectsData.filter(obj => obj.name === objName)[0];
        getObjectById(objFound.id);
        setSystem({...system, name: ''});
        getSystemsByObjectAndAddAll(objFound.id);
        getEstimatePurchasesByObject(objFound.id);
        getNonEstimatePurchasesByObject(objFound.id);
        getEstimatesByObject(objFound.id);
    };
    // Loading data for a chosen system
    const systemChange = event => {
        const chosenSystem = event.target.value;
        const sysFound = chosenObjectSystems.filter(sys => sys.acronym === chosenSystem)[0];
        const sysName = sysFound.acronym;
        const sysId = sysFound.id;
        setSystem({...system, name: sysName, id: sysId});
        if (chosenSystem === 'Все') {
        getEstimatesByObject(chosenObjectId);
        } else {
        getEstimatesByObjectBySystem(chosenObjectId, sysId);
        }
    };
    // Searching estimates
    const searchEstimatesFilter = (value, system) => {
        if (chosenObjectId === 0) {
            return;
        }
        switch(system) {
            case 'Все':
                searchEstimatesByObject(value, estimatesObject);
                break;
            default:
                searchEstimatesByObjectBySystem(value, estimatesObject, estimatesSystem)
                break;
            }
        };
    // Objects list by default
    let objectsList = <MenuItem>Загрузка</MenuItem>;
    // Objects after loading
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
    // Systems after loading
    if (chosenObjectSystemsLoaded) {
        systemsList = chosenObjectSystems.map(sys => {
            return(
                <MenuItem value={sys.acronym} key={sys.id}>
                    {sys.acronym}
                </MenuItem>
            );
        });
    };

    return(
        <div className={classes.root}>
            <FormControl className={classes.formControl}>
            <InputLabel id="object-select-label">Тип просмотра</InputLabel>
                <Select
                    labelId="object-select-label"
                    id="object-select"
                    onChange={typeChange}
                    value={type}>
                    <MenuItem value="По объекту" key="type1">По объекту</MenuItem>
                </Select>
            </FormControl>
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
                    value={system.name}>
                    {systemsList}
                </Select>
            </FormControl>
            <div style={{marginLeft: 10}}>
            <SearchBar type="estimates" filter={searchEstimatesFilter}/>
            </div>  
        </div>
    );
}

const mapStateToProps = state => {
    return {
        objectsLoaded: state.core.objectsLoaded,
        objectsData: state.core.objectsData,
        chosenObjectSystems: state.core.chosenObjectSystems,
        chosenObjectId: state.core.chosenObjectId,
        chosenObjectSystemsLoaded: state.core.chosenObjectSystemsLoaded,
        estimatesObject: state.est.estimatesObject,
        estimatesSystem: state.est.estimatesSystem,
        cableJournal: state.cable.cableJournal,
        cableJournalLoaded: state.cable.cableJournalLoaded,
        refreshNeeded: state.cable.refreshNeeded,
    };
};

export default connect(mapStateToProps, 
    { getObjects, getSystemsByObjectAndAddAll, getObjectById, unloadEstimates, unloadObjectSystems,
        getEstimatePurchasesByObject, getNonEstimatePurchasesByObject,
        getEstimatesByObjectBySystem, getEstimatesByObject,
        searchEstimatesByObject, searchEstimatesByObjectBySystem })(PurchasesOverviewPanel);