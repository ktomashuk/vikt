import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// Material UI
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import Checkbox from '@material-ui/core/Checkbox';
// Redux
import { connect } from 'react-redux';
import { editCableRow, deleteCableRow, getJournalByObjectBySystem } from '../../../store/actions/cable';
import { cableDeleteAddItem, cableDeleteRemoveItem } from '../../../store/actions/delete';
import { undoCableJournalRowAdd, undoCableJournalRowRemove, undoCableJournalRowEdit, undoDataSave } from '../../../store/actions/undo';

const _ = require('lodash');

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    icon: {
        cursor: 'pointer',
    },
    text: {
        minWidth: 35,
        maxWidth: 1500,
        fontSize: 30,
    },
    checkbox: {
        marginBottom: 1,
    },
});

const CableRow = (props) => {
    const classes = useStyles();
    const { row, cableJournal, editCableRow, 
         cableObject, cableSystem, getJournalByObjectBySystem, deleteItemsNumber, deleteAllEnabled } = props;
    // State of row being edited before editing
    const [rowOld, setRowOld] = useState({
        index: 0,
        name: '',
        start: '',
        end: '',
        cable: '',
        cable_cut: '',
        length: 1.0,
    });
    const [rowNew, setRowNew] = useState({
        index: 0,
        name: '',
        start: '',
        end: '',
        cable: '',
        cable_cut: '',
        length: 1.0,
    });
    // Collapse open
    const [collapseOpen, setCollapseOpen] = useState(false);
    // Data loading process
    const [rowLoaded, setRowLoaded] = useState(false);
    // State for clicking delete button
    const [deletingCheck, setDeletingCheck] = useState(false);
    // State for clicking edit button
    const [editing, setEditing] = useState({rowId: 0, enabled: false,});
    // Unchecking the checkbox when the clear button is pressed in delete bar
    useEffect(() => {
        if (deleteItemsNumber < 1) {
            setDeletingCheck(false);
        }
    }, [deleteItemsNumber]);
    // Checking the checkbox when 'select all' is pressed in the cable panel
    useEffect(() => {
        if (deleteAllEnabled) {
            checkboxClickHandler('cable_journal', row.id);
        };
    }, [deleteAllEnabled]);
    // Clicking edit row button
    const startEditingRow =  (rowId) => {
        setCollapseOpen(true);
        setEditing({rowId: rowId, enabled: true});
        const rowFound = cableJournal.find(row => row.id === rowId);
        setRowOld({
            id: rowFound.id,
            index: rowFound.index,
            name: rowFound.name,
            start: rowFound.start,
            end: rowFound.end,
            cable: rowFound.cable,
            cable_cut: rowFound.cable_cut,
            length: rowFound.length,
            object: cableObject,
            system: cableSystem,
        });
        setRowNew({
            id: rowFound.id,
            index: rowFound.index,
            name: rowFound.name,
            start: rowFound.start,
            end: rowFound.end,
            cable: rowFound.cable,
            cable_cut: rowFound.cable_cut,
            length: rowFound.length,
            object: cableObject,
            system: cableSystem,
        });
        setRowLoaded(true);
    };
    // Cancelling edit
    const cancelEdit = () => {
        setEditing({rowId: 0, enabled: false});
        setRowLoaded(false);
        setRowNew({
            index: 0,
            name: '',
            start: '',
            end: '',
            cable: '',
            cable_cut: '',
            length: 1.0,
        });
    };
    // Confirming edit
    const confirmEdit = () => {
        const equality = _.isEqual(rowOld, rowNew);
        if (!equality){
            const data = JSON.stringify(rowNew);
            editCableRow(editing.rowId, data);
        };
        setEditing({rowId: 0, enabled: false});
        setRowLoaded(false);
        // Checking what data to load after row was restored
        setTimeout(() => {
            getJournalByObjectBySystem(cableObject, cableSystem);
        }, 500)
    };
    // Clicking confirm button
    const confirmClickHandler = () => {
        // Checking if editing was in process
        if (editing.enabled) {
            confirmEdit();
            props.undoDataSave('cable_journal_edit', row, row.id);
        };
        // Closing collapse
        setCollapseOpen(false);
    };
    // Clicking cancel button
    const cancelClickHandler = () => {
        // Checking if editing was in process
        if (editing.enabled) {
            cancelEdit();
        };
        // Closing collapse
        setCollapseOpen(false);
    };
    // Clicking checbkox
    const checkboxClickHandler = (type, data) => {
        // If checkbox is not checked
        if (deletingCheck === false) {
            setDeletingCheck(true);
            props.cableDeleteAddItem(type, data);
            props.undoCableJournalRowAdd('cable_journal_delete',row);
        } 
        else
        // If checkbox is checked 
        {
            setDeletingCheck(false);
            props.cableDeleteRemoveItem(data);
            props.undoCableJournalRowRemove('cable_journal_delete', data);
        }
    };

    const mainRow = (
            <React.Fragment key={`fragmentrow${row.id}`}>
            <TableRow key={`r${row.id}`} hover>
                <TableCell padding="default" key={`index${row.id}`} onClick={() => checkboxClickHandler('cable_journal', row.id)}>
                {row.index}
                </TableCell>
                <TableCell key={`name${row.id}`} onClick={() => checkboxClickHandler('cable_journal', row.id)}>
                {row.name}                    
                </TableCell>
                <TableCell key={`start${row.id}`} onClick={() => checkboxClickHandler('cable_journal', row.id)}>
                {row.start}
                </TableCell>
                <TableCell key={`end${row.id}`} onClick={() => checkboxClickHandler('cable_journal', row.id)}>
                {row.end}
                </TableCell>
                <TableCell key={`cable${row.id}`} onClick={() => checkboxClickHandler('cable_journal', row.id)}>
                {row.cable}
                </TableCell>
                <TableCell key={`cut${row.id}`} onClick={() => checkboxClickHandler('cable_journal', row.id)}>
                {row.cable_cut}
                </TableCell>
                <TableCell key={`length${row.id}`} onClick={() => checkboxClickHandler('cable_journal', row.id)}>
                {row.length}    
                </TableCell>
                <TableCell key={`buttons${row.id}`}>
                    {collapseOpen ? 
                    <React.Fragment key={`frag1${row.id}`}>
                        <Tooltip title={<h6>Подтвердить</h6>} arrow>
                        <CheckIcon key={`check${row.id}`} className={classes.icon} 
                        style={{ color: 'green' }}
                        onClick={() => confirmClickHandler()} />
                        </Tooltip>
                        <Tooltip title={<h6>Отменить</h6>} arrow>
                        <ClearIcon key={`clear${row.id}`} className={classes.icon} 
                        color="secondary"
                        onClick={() => cancelClickHandler()}/>
                        </Tooltip>
                    </React.Fragment> : 
                    <React.Fragment key={`frag2${row.id}`}>
                        <Tooltip title={<h6>Редактировать</h6>} arrow>
                        <EditIcon className={classes.icon}
                        key={`edit${row.id}`}
                        color={!editing.enabled ? "primary" : "disabled"}
                        onClick={!editing.enabled ? (() => startEditingRow(row.id)) : undefined}/>
                        </Tooltip>
                        <Checkbox size="small" checked={deletingCheck}
                        className={classes.checkbox}
                        onClick={() => checkboxClickHandler('cable_journal', row.id)}/>
                    </React.Fragment> }
                </TableCell>
            </TableRow>
            <TableRow key={`collapserow${row.id}`}>
            <TableCell key={`c${row.id}`} style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
             <Collapse key ={`collapse${row.id}`} in={collapseOpen} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                        {editing.enabled && rowLoaded ?
                        <Table size="small">
                            <TableBody>
                            <TableRow key={`cr${row.id}`}>
                                <TableCell key={`tc${row.id}`}>
                                <TextField label="№ П/П"
                                defaultValue={rowOld.index}
                                onChange={(e) => setRowNew({...rowNew, index: e.target.value})} 
                                style={{marginRight: 10, width: "5%"}}/>
                                <TextField label="Обозначение"
                                defaultValue={rowOld.name}
                                onChange={(e) => setRowNew({...rowNew, name: e.target.value})} 
                                style={{marginRight: 10, width: "10%"}}/>
                                <TextField label="Начало"
                                defaultValue={rowOld.start}
                                onChange={(e) => setRowNew({...rowNew, start: e.target.value})} 
                                style={{marginRight: 10, width: "20%"}}/>
                                <TextField label="Конец"
                                defaultValue={rowOld.end}
                                onChange={(e) => setRowNew({...rowNew, end: e.target.value})} 
                                style={{marginRight: 10, width: "20%"}}/>
                                <TextField label="Марка кабеля"
                                value={rowNew.cable}
                                onChange={(e) => setRowNew({...rowNew, cable: e.target.value})} 
                                style={{marginRight: 10, width: "15%"}} />
                                <TextField label="Сечение"
                                defaultValue={rowOld.cable_cut}
                                onChange={(e) => setRowNew({...rowNew, cable_cut: e.target.value})} 
                                style={{marginRight: 10, width: "15%"}} />
                                <TextField label="Длина" 
                                defaultValue={rowOld.length}
                                onChange={(e) => setRowNew({...rowNew, length: e.target.value})} 
                                style={{marginRight: 10, width: "5%"}} />
                                </TableCell>
                            </TableRow>
                            </TableBody>
                        </Table> : null }
                    </Box>  
             </Collapse>
            </TableCell>
            </TableRow>
            </React.Fragment>
        );
    
    return mainRow;
};

const mapStateToProps = state => {
    return {
        cableJournalLoaded: state.cable.cableJournalLoaded,
        cableJournal: state.cable.cableJournal,
        cableObject: state.cable.cableObject,
        cableSystem: state.cable.cableSystem,
        deleteItemsNumber: state.del.deleteItemsNumber,
        deleteAllEnabled: state.del.deleteAllEnabled,
    };
};


export default connect(mapStateToProps, 
    { editCableRow, deleteCableRow, getJournalByObjectBySystem, 
        cableDeleteRemoveItem, cableDeleteAddItem, 
        undoCableJournalRowAdd, undoCableJournalRowRemove, undoCableJournalRowEdit, undoDataSave })(CableRow);