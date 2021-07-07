import React, { useState, useEffect } from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
// Redux
import { connect } from 'react-redux';
import { getSystemsByObject } from '../../../../store/actions/estimates';
import { getJournalByObjectBySystem } from '../../../../store/actions/cable';
import { getObjects } from '../../../../store/actions/core';
import { showInfo } from '../../../../store/actions/info';
// Custom components

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
    const [noNumChecked, setNoNumChecked] = useState(false);
    const [customStartChecked, setCustomStartChecked] = useState(false);
    const [object, setObject] = useState('');
    const [objectId, setObjectId] = useState('');
    const [system, setSystem] = useState('');
    //const [openModal, setOpenModal] = useState(false);
    const [customStartDirection, setCustomStartDirection] = useState('L');
    const [journal, setJournal] = useState({
        object: null,
        system: null,
        index: 1,
        prefix: '',
        start: '1',
        end: '1',
        quantity: '1',
        device: null,
        startpoint: 0,
        length: 0,
    });

    // Fetching objects
    useEffect(() => {
        props.getObjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Changing starting index when journal is loaded
    useEffect(() => {
        if (cableJournalLoaded && cableJournal[0]) {
            const lastIndex = cableJournal[cableJournal.length - 1].index;
            const newIndex = Number(lastIndex) + 1;
            setJournal({
                ...journal, index: newIndex}); } else {
            setJournal({
                ...journal, index: 1, });
            };
    }, [cableJournal]);
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
            <TextField className={classes.textField} label="№ П/П" style={{width: "4%"}} value={journal.index}
            onChange={(e) => setJournal({...journal, index: e.target.value})}/>            
            <TextField className={classes.textField} label="Кол-во" style={{width: "5%"}} value={journal.quantity}
            onChange={noNumChecked ? 
            (e) => {setJournal({...journal, quantity: e.target.value})}
            : (e) => {setJournal({...journal, quantity: e.target.value, end: Number(journal.start) + Number(e.target.value) - 1})}}/>
            <TextField className={classes.textField} label="Начало" style={{width: "5%"}} value={journal.start}
            disabled={noNumChecked} onChange={(e) => {setJournal({...journal, start: e.target.value, end: Number(e.target.value) + Number(journal.quantity) - 1})}}/>
            <TextField className={classes.textField} label="Конец" style={{width: "5%"}} disabled={noNumChecked} value={journal.end}/>
            <FormControl style={{ width: "7%"}}>
                <InputLabel style={{ marginLeft: 7 }}>Старт</InputLabel>
                <Input type="text" value={journal.startpoint}
                className={classes.textField} disabled={!customStartChecked}
                onChange={(e) => setJournal({...journal, startpoint: e.target.value})}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={customStartDirection === 'L' ? 
                        () => setCustomStartDirection('R') :
                        () => setCustomStartDirection('L')} >
                            { customStartDirection === 'L' ? 
                            <ArrowLeftIcon /> : <ArrowRightIcon/> }
                        </IconButton>
                    </InputAdornment>
                }>
                </Input>
            </FormControl>
            <FormControl component="fieldset" style={{marginLeft: 15}}>
                <FormGroup>
                <FormControlLabel
                control={<Switch checked={noNumChecked} color="primary"
                onChange={() => setNoNumChecked(!noNumChecked)} name="nunum" />}
                label="Без номера"/>
                <FormControlLabel
                control={<Switch checked={customStartChecked} color="primary"
                onChange={() => setCustomStartChecked(!customStartChecked)} name="custom" />}
                label="Не подряд"/>
                </FormGroup>
            </FormControl>
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
    { getObjects, getSystemsByObject, showInfo, getJournalByObjectBySystem })(IsolationPanel);