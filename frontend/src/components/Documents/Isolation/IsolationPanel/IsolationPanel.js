import React, { useState, useEffect } from 'react';
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
import { getSystemsByObject } from '../../../../store/actions/estimates';
import { getJournalByObjectBySystem } from '../../../../store/actions/cable';
import { getObjects } from '../../../../store/actions/core';
import { showInfo } from '../../../../store/actions/info';
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
    const { cableJournal, cableJournalLoaded, refreshNeeded } = props;
    const [object, setObject] = useState('');
    const [objectId, setObjectId] = useState('');
    const [system, setSystem] = useState('');
    // Fetching objects
    useEffect(() => {
        props.getObjects();
        props.switchToResistance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Refreshing the journal manually
    const refreshJournal = () => { 
        props.cableDeleteRemoveAll();
        setTimeout(() => {
        props.getJournalByObjectBySystem(objectId, system)}, 300) };
    // Auto refreshing the journal after add / delete was performed
    useEffect(() => {
        if (cableJournalLoaded && refreshNeeded) {
            refreshJournal();
        };
    }, [refreshNeeded]);
    // Loading data for a chosen object
    const objChange = event => {
        setObject(event.target.value);
        const objName = event.target.value;
        const objFound = props.objectsData.filter(obj => obj.name === objName)[0];
        setObjectId(objFound.id);
        setSystem('');
        props.getSystemsByObject(objFound.id);
    };
    // Loading data for a chosen system
    const systemChange = event => {
        const chosenSystem = event.target.value;
        setSystem(chosenSystem);
        props.getJournalByObjectBySystem(objectId, chosenSystem);
    };
    // Objects list by default
    let objectsList = <MenuItem>Загрузка</MenuItem>;
    // Objects after loading
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
    // Systems after loading
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
            <ClearButton tooltipOn="Выбрать все" tooltipOff="Выбор недоступен"
            clearEnabled={cableJournalLoaded && cableJournal[0] !== undefined} 
            clicked={ async () => {
                await props.cableDeleteRemoveAll();
                props.cableDeleteAddAll();
            }}/>
            <RefreshButton tooltipOn="Обновить" tooltipOff="Обновление недоступно"
            refreshType='cable_journal' clicked={() => refreshJournal()} refreshEnabled={cableJournalLoaded}/>
            <ExportButton exportEnabled={cableJournalLoaded}/>                       
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
        cableJournal: state.cable.cableJournal,
        cableJournalLoaded: state.cable.cableJournalLoaded,
        refreshNeeded: state.cable.refreshNeeded,
    };
};

export default connect(mapStateToProps, 
    { getObjects, getSystemsByObject, showInfo,
        getJournalByObjectBySystem, switchToResistance, cableDeleteAddAll, cableDeleteRemoveAll })(IsolationPanel);