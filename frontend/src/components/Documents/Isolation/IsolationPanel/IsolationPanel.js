import React, { useState, useEffect, useCallback } from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// Custom components
import ClearButton from '../../../Buttons/ClearButton/ClearButton';
import ExportButton from '../../../Buttons/ExportButton/ExportButton';
import RefreshButton from '../../../Buttons/RefreshButton/RefreshButton';
// Redux
import { connect } from 'react-redux';
import { getJournalByObjectBySystem, exportResistanceByObjectBySystem } from '../../../../store/actions/cable';
import { getObjects, getSystemsByObject } from '../../../../store/actions/core';
import { switchToResistance } from '../../../../store/actions/selectors';
import { cableDeleteAddAll, cableDeleteRemoveAll } from '../../../../store/actions/delete';

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

const IsolationPanel = (props) => {
    const classes = useStyles();
    const { cableJournal, cableJournalLoaded, refreshNeeded, 
        chosenObjectSystems, chosenObjectSystemsLoaded, objectsData, objectsLoaded,
        getObjects, getSystemsByObject, getJournalByObjectBySystem, exportResistanceByObjectBySystem,
        switchToResistance, cableDeleteAddAll, cableDeleteRemoveAll  } = props;
    const [object, setObject] = useState('');
    const [objectId, setObjectId] = useState('');
    const [system, setSystem] = useState({name: '', id: 0});
    // Fetching objects
    useEffect(() => {
        getObjects();
        switchToResistance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Refreshing the journal manually
    const refreshJournal = useCallback(() => { 
        cableDeleteRemoveAll();
        setTimeout(() => {
        getJournalByObjectBySystem(objectId, system.id)}, 300) }, 
        [cableDeleteRemoveAll, getJournalByObjectBySystem, objectId, system.id]);
    // Auto refreshing the journal after add / delete was performed
    useEffect(() => {
        if (cableJournalLoaded && refreshNeeded) {
            refreshJournal();
        };
    }, [refreshNeeded, cableJournalLoaded, refreshJournal]);
    // Loading data for a chosen object
    const objChange = event => {
        setObject(event.target.value);
        const objName = event.target.value;
        const objFound = objectsData.filter(obj => obj.name === objName)[0];
        setObjectId(objFound.id);
        setSystem('');
        getSystemsByObject(objFound.id);
    };
    // Loading data for a chosen system
    const systemChange = event => {
        const chosenSystem = event.target.value;
        const sysFound = chosenObjectSystems.filter(sys => sys.acronym === chosenSystem)[0];
        const sysName = sysFound.acronym;
        const sysId = sysFound.id;
        setSystem({...system, name: sysName, id: sysId});
        getJournalByObjectBySystem(objectId, sysId);
        cableDeleteRemoveAll();
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
            <ClearButton tooltipOn="Выбрать все" tooltipOff="Выбор недоступен"
            clearEnabled={cableJournalLoaded && cableJournal[0] !== undefined} 
            clicked={ async () => {
                await cableDeleteRemoveAll();
                cableDeleteAddAll();
            }}/>
            <RefreshButton tooltipOn="Обновить" tooltipOff="Обновление недоступно"
            refreshType='cable_journal' clicked={() => refreshJournal()} refreshEnabled={cableJournalLoaded}/>
            <ExportButton exportEnabled={cableJournalLoaded}
            clicked={() => exportResistanceByObjectBySystem(objectId, system.id)}
            tooltipOn="Экспорт в Word" tooltipOff="Экспорт недоступен"/>                       
        </div>
    );
}

const mapStateToProps = state => {
    return {
        objectsLoaded: state.core.objectsLoaded,
        objectsData: state.core.objectsData,
        chosenObjectSystems: state.core.chosenObjectSystems,
        chosenObjectSystemsLoaded: state.core.chosenObjectSystemsLoaded,
        cableJournal: state.cable.cableJournal,
        cableJournalLoaded: state.cable.cableJournalLoaded,
        refreshNeeded: state.cable.refreshNeeded,
    };
};

export default connect(mapStateToProps, 
    { getObjects, getSystemsByObject, getJournalByObjectBySystem, exportResistanceByObjectBySystem, 
        switchToResistance, cableDeleteAddAll, cableDeleteRemoveAll })(IsolationPanel);