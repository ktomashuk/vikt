import React, { useState, useEffect } from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';
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
import SettingsIcon from '@material-ui/icons/Settings';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
// Redux
import { connect } from 'react-redux';
import { removeDevice, getJournalByObjectBySystem, 
    addCableRow, editCableRow, exportJournalByObjectBySystem } from '../../../../store/actions/cable';
import { cableDeleteAddAll, cableDeleteRemoveAll } from '../../../../store/actions/delete';
import { getObjects, getSystemsByObject } from '../../../../store/actions/core';
import { showInfo } from '../../../../store/actions/info';
import { switchToDeleting, switchToLength } from '../../../../store/actions/selectors';
// Custom components
import CableModal from '../CableModal/CableModal';
import UndoButton from '../../../Buttons/UndoButton/UndoButton';
import AddButton from '../../../Buttons/AddButton/AddButton';
import ClearButton from '../../../Buttons/ClearButton/ClearButton';
import ExportButton from '../../../Buttons/ExportButton/ExportButton';
import RefreshButton from '../../../Buttons/RefreshButton/RefreshButton';

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
    },
    formControl: {
        minWidth: 150,
        width: '12%',
        marginBottom: 10,
        marginLeft: 10,
    },
}));

const CablePanel = (props) => {
    const classes = useStyles();
    const { deviceList, cableJournal, cableJournalLoaded, refreshNeeded, objectsLoaded, objectsData,
        deleteSelectorEnabled, lengthSelectorEnabled, chosenObjectSystems, chosenObjectSystemsLoaded } = props;
    const [noNumChecked, setNoNumChecked] = useState(false);
    const [customStartChecked, setCustomStartChecked] = useState(false);
    const [object, setObject] = useState('');
    const [objectId, setObjectId] = useState('');
    const [system, setSystem] = useState({name: '', id: 0});
    const [addingEnabled, setAddingEnabled] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [customStartDirection, setCustomStartDirection] = useState('L');
    const [journal, setJournal] = useState({
        object: 0,
        system: 0,
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
        props.switchToDeleting();
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
        props.getJournalByObjectBySystem(objectId, system.id)}, 300) };
    // Auto refreshing the journal after add / delete was performed
    useEffect(() => {
        if (cableJournalLoaded && refreshNeeded) {
            refreshJournal();
        };
    }, [refreshNeeded]);
    // Export to excel
    const exportClickHandler = (id, sys) => {
        props.exportJournalByObjectBySystem(id, sys);
    };
    // Clicking chips to add devices
    const addCLickHandler = (device) => {
        // Finding if no number is checked anywhere
        let noNum = false;
        if (noNumChecked || device.noNum) {
            console.log('NO NUM FUCKING CHECKED');
            noNum = true;
        };
        // Finding if item with previous index exists
        const prevIndex = Number(journal.index) - 1;
        const prevItem = cableJournal.filter(item => item.index === prevIndex)[0];
        // Changing the values in the top bar
        const oldQuantity = Number(journal.quantity);
        if (noNum) {
            setJournal({
                ...journal,
                quantity: 1,
            });
        } else {
            setJournal({
                ...journal,
                start: Number(journal.start) + oldQuantity,
                end: Number(journal.start) + oldQuantity,
                quantity: 1,
            });
        };
        // If custom start is checked and it is 0 and we add a single item 
        if (customStartChecked && Number(journal.startpoint) === 0 && Number(journal.quantity) === 1) {
            return addFirstItemSingle(device, noNum);
        };
        // If custom start is checked and it is 0 and we add multiple items
        if (customStartChecked && Number(journal.startpoint) === 0 && Number(journal.quantity) !== 1) {
            return addFirstItemsMultiple(device, noNum);
        };
        // If previous entry does not exist and we need to add 1 item 
        if (!prevItem && Number(journal.quantity) === 1) {
            return addFirstItemSingle(device, noNum);
        };
        // If previous entry does not exist and we need to add more than 1 item
        if (!prevItem && Number(journal.quantity) !== 1) {
            return addFirstItemsMultiple(device, noNum);
        };
        // If previous entry exists 
        if (prevItem) {
            return addItemsRegular(device, noNum);
        };
    };
    // Adding a single first item to the empty journal
    const addFirstItemSingle = (device, noNumActive) => {
        console.log(noNumActive);
        // Start and end numbers of the item to be added
        let startNum = Number(journal.start);
        let middle = ' ';
        // If 'not numbered' is checked set numbers to blank
        if (noNumActive) {
            startNum = '';
        }
        const data = {
            object: objectId,
            system: system.id,
            index: journal.index,
            name: "Каб." + journal.index,
            start: device.name + middle + device.prefix + startNum,
            end: '???',
            cable: device.cable,
            cable_cut: device.cable_cut,
            length: journal.length,
        };
        props.addCableRow(data);
    };
    // Adding multiple items to the journal
    const addFirstItemsMultiple = (device, noNumActive) => {
        console.log(noNumActive);
        // Starting index 
        let startIndex = Number(journal.index);
        // Array for adding to the db
        let cableArray = [];
        // Start and end numbers of the item to be added
        let startNum = Number(journal.start);
        let endNum = startNum + 1;
        let middle = ' ';
        // If 'not numbered' is checked set numbers to blank
        if (noNumActive) {
            startNum = '';
            endNum = '';
            middle = ' ';
        }
        // Number of times the loop will run
        let journalLength = Number(journal.quantity) - 1;
        // Adding the items
        for (let i = 0; i < journalLength; i++) {
            const data = {
                object: objectId,
                system: system.id,
                index: startIndex,
                name: "Каб." + startIndex,
                start: device.name + middle + device.prefix + startNum,
                end: device.name + middle + device.prefix + endNum,
                cable: device.cable,
                cable_cut: device.cable_cut,
                length: journal.length,
            };
            cableArray.push(data);
            startIndex++;
            if (!noNumActive) {
                startNum++;
                endNum++;
            };
        };
        props.addCableRow(cableArray);    
    };
    // Adding items if there are 1 or more entries already in the journal
    const addItemsRegular = (device, noNumActive) => {
        console.log(noNumActive);
        // Starting index and index of the item that is last in journal
        let startIndex = Number(journal.index);
        let prevIndex = startIndex - 1;
        // If custom start is checked manually choose previous entry
        if (customStartChecked) {
            prevIndex = Number(journal.startpoint);
        };
        // Array for adding to the db
        let cableArray = [];
        // Finding the name of the entry that is last in journal
        let prevEntry = cableJournal.filter(item => item.index === prevIndex);
        // Showing error if previous entry does not exist
        if (prevEntry[0] === undefined) {
            return props.showInfo('Стартового устройства не существует!');
        };
        let prevName = prevEntry[0].end;
        // Start and end numbers of the item to be added
        let startNum = Number(journal.start);
        let endNum = startNum + 1;
        let middle = ' ';
        // If 'not numbered' is checked set numbers to blank
          if (noNumActive) {
            startNum = '';
            endNum = '';
        };
        // Editing the existing item if the name is '???'
        if (prevName === '???') {
            prevName = device.name + middle + device.prefix + startNum;
            const prevData = {
                id: prevEntry[0].id,
                object: objectId,
                system: system.id,
                index: prevEntry[0].index,
                name: prevEntry[0].name,
                start: prevEntry[0].start,
                end: device.name + middle + device.prefix + startNum,
                cable: device.cable,
                cable_cut: device.cable_cut,
                length: journal.length,
            };
            props.editCableRow(prevEntry[0].id, prevData);
        } else {
        // If custom start is checked choose the stating device - if left direction is chosen (default)
        if (customStartChecked && customStartDirection === 'L') {
            prevName = prevEntry[0].start;
        };
        // If right direction is chosen (meaning previous name will be the end of previous entry)
        if (customStartChecked && customStartDirection === 'R') {
            prevName = prevEntry[0].end;
        };
        // Adding first item that starts with last available item from the journal if the existing item is not '???'
        const firstData = {
            object: objectId,
            system: system.id,
            index: startIndex,
            name: "Каб." + startIndex,
            start: prevName,
            end: device.name + middle + device.prefix + startNum,
            cable: device.cable,
            cable_cut: device.cable_cut,
            length: journal.length,
        };
        startIndex++;
        cableArray.push(firstData);
        };
        // If custom start is checked choose the stating device - if left direction is chosen (default)
        if (customStartChecked && customStartDirection === 'L') {
            prevName = prevEntry[0].start;
        };
        // If right direction is chosen (meaning previous name will be the end of previous entry)
        if (customStartChecked && customStartDirection === 'R') {
            prevName = prevEntry[0].end;
        };
        // Number of times the loop will run
        let journalLength = Number(journal.quantity) - 1;
        // Adding the rest of the items
        for (let i = 0; i < journalLength; i++) {
            let startName = device.name + middle + device.prefix + startNum;
            // If custom start is checked
            if (customStartChecked) {
                startName = prevName; };
            const data = {
                object: objectId,
                system: system.id,
                index: startIndex,
                name: "Каб." + startIndex,
                start: startName,
                end: device.name + middle + device.prefix + endNum,
                cable: device.cable,
                cable_cut: device.cable_cut,
                length: journal.length,
            };
            cableArray.push(data);
            startIndex++;
            if (!noNumActive) {
                startNum++;
                endNum++;
            };
        };
        props.addCableRow(cableArray);
    };
    // Loading data for a chosen object
    const objChange = event => {
        setObject(event.target.value);
        const objName = event.target.value;
        const objFound = props.objectsData.filter(obj => obj.name === objName)[0];
        setObjectId(objFound.id);
        setSystem({...system, name: ''});
        props.getSystemsByObject(objFound.id);
        props.cableDeleteRemoveAll();
    };
    // Loading data for a chosen system
    const systemChange = event => {
        const chosenSystem = event.target.value;
        const sysFound = chosenObjectSystems.filter(sys => sys.acronym === chosenSystem)[0];
        const sysName = sysFound.acronym;
        const sysId = sysFound.id;
        setSystem({...system, name: sysName, id: sysId});
        props.getJournalByObjectBySystem(objectId, sysId);
        setAddingEnabled(true);
        props.cableDeleteRemoveAll();
    };
    // Settings menu
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // Selecting 'delete' option in the menu
    const menuDeleteClickHandler = () => {
        if (lengthSelectorEnabled) {
            props.switchToDeleting();
        };
    };
    // Selecting 'length' option in the game
    const menuLengthClickHandler = () => {
        if (deleteSelectorEnabled) {
            props.switchToLength();
            props.cableDeleteRemoveAll();
        };
    };
    // Objects list by default
    let objectsList = <MenuItem>Загрузка</MenuItem>;
    // Objects after loading
    if (objectsLoaded) {
        objectsList = objectsData.map(item => {
            return(
                <MenuItem value={item.name} key={item.id}>
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
            <CableModal show={openModal} />
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
                    value={system.name}
                    onChange={systemChange}>
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
            <AddButton addingEnabled={addingEnabled} 
            tooltipOn="Добавить устройство" tooltipOff="Выберите систему"
            clicked={
                addingEnabled ? () => {
                    setOpenModal(true);
                    setTimeout(() => setOpenModal(false), 500)} : null }/>
            <UndoButton />
            <ClearButton tooltipOn="Выбрать все" tooltipOff="Выбор недоступен"
            clearEnabled={cableJournalLoaded && cableJournal[0] !== undefined} 
            clicked={ async () => {
                await props.cableDeleteRemoveAll();
                props.cableDeleteAddAll();
            }}/>
            <RefreshButton tooltipOn="Обновить" tooltipOff="Обновление недоступно"
            refreshType='cable_journal' clicked={() => refreshJournal()} refreshEnabled={cableJournalLoaded}/>
            <div>
            <Tooltip title={<Typography variant="subtitle1">Настройки</Typography>} arrow>
            <Fab color="primary" aria-label="settings" className={classes.button} size="medium"
            onClick={handleClick}>
                <SettingsIcon style={{color: 'white'}} />
            </Fab>
            </Tooltip>
            <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
                <MenuItem onClick={menuDeleteClickHandler}>
                Удаление
                <Checkbox checked={deleteSelectorEnabled}/>
                </MenuItem>
                <MenuItem onClick={menuLengthClickHandler}>
                Установка длины
                <Checkbox checked={lengthSelectorEnabled}/>
                </MenuItem>
            </Menu>
            </div>
            <ExportButton clicked={() => exportClickHandler(objectId, system)} exportEnabled={cableJournalLoaded}
            tooltipOn="Экспорт в Word" tooltipOff="Экспорт недоступен"/>
            <div>
            {deviceList.map((item) => {
                return(
                <Chip
                    className={classes.chip}
                    key={item.id}
                    color="primary"
                    label={item.name + '(' + item.prefix + 'X) ' + item.cable}
                    onClick={() => {addCLickHandler(item)}}
                    onDelete={() => {props.removeDevice(item.id)}} />
                );
                })}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        objectsLoaded: state.core.objectsLoaded,
        objectsData: state.core.objectsData,
        chosenObjectId: state.core.chosenObjectId,
        chosenObjectSystems: state.core.chosenObjectSystems,
        chosenObjectSystemsLoaded: state.core.chosenObjectSystemsLoaded,
        deviceList: state.cable.deviceList,
        cableJournal: state.cable.cableJournal,
        cableJournalLoaded: state.cable.cableJournalLoaded,
        cableLengthSelectorActive: state.cable.cableLengthSelectorActive,
        deleteSelectorEnabled: state.sel.deleteSelectorEnabled,
        lengthSelectorEnabled: state.sel.lengthSelectorEnabled,
        refreshNeeded: state.cable.refreshNeeded,
    };
};

export default connect(mapStateToProps, 
    { removeDevice, getJournalByObjectBySystem, 
        getObjects, getSystemsByObject, 
        addCableRow, editCableRow, exportJournalByObjectBySystem,
        cableDeleteAddAll, cableDeleteRemoveAll, showInfo,
        switchToLength, switchToDeleting })(CablePanel);