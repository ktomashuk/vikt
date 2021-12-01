import React, { useState, useEffect, useCallback } from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// Custom components

// Redux
import { connect } from 'react-redux';
import { getObjects, getSystemsByObject, getObjectById } from '../../../store/actions/core';

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
    const { chosenObjectId, chosenObjectData, 
        chosenObjectSystems, chosenObjectSystemsLoaded, objectsData, objectsLoaded,
        getObjects, getSystemsByObject, getObjectById, } = props;
    const [object, setObject] = useState('');
    const [objectId, setObjectId] = useState('');
    const [system, setSystem] = useState({name: '', id: 0});
    // Fetching objects
    useEffect(() => {
        getObjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Loading data for a chosen object
    const objChange = event => {
        setObject(event.target.value);
        const objName = event.target.value;
        const objFound = objectsData.filter(obj => obj.name === objName)[0];
        setObjectId(objFound.id);
        getObjectById(objFound.id);
        setSystem({...system, name: ''});
        getSystemsByObject(objFound.id);
    };
    // Loading data for a chosen system
    const systemChange = event => {
        const chosenSystem = event.target.value;
        const sysFound = chosenObjectSystems.filter(sys => sys.acronym === chosenSystem)[0];
        const sysName = sysFound.acronym;
        const sysId = sysFound.id;
        setSystem({...system, name: sysName, id: sysId});
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
                    value={system.name  }>
                    {systemsList}
                </Select>
            </FormControl>                
        </div>
    );
}

const mapStateToProps = state => {
    return {
        objectsLoaded: state.core.objectsLoaded,
        objectsData: state.core.objectsData,
        chosenObjectSystems: state.core.chosenObjectSystems,
        chosenObjectId: state.core.chosenObjectId,
        chosenObjectData: state.core.chosenObjectData,
        chosenObjectSystemsLoaded: state.core.chosenObjectSystemsLoaded,
        cableJournal: state.cable.cableJournal,
        cableJournalLoaded: state.cable.cableJournalLoaded,
        refreshNeeded: state.cable.refreshNeeded,
    };
};

export default connect(mapStateToProps, 
    { getObjects, getSystemsByObject,getObjectById })(IsolationPanel);