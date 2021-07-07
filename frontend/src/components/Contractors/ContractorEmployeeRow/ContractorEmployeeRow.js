import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { connect } from 'react-redux';
import { deleteEstimateRow, addEstimateRow, editEstimateRow, 
    getEstimatesByObject, getEstimatesByObjectBySystem, 
    searchEstimatesByObject, searchEstimatesByObjectBySystem } from '../../../store/actions/estimates';
import { undoDataSave } from '../../../store/actions/undo';

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
});

const EstimatesRow = (props) => {
    const classes = useStyles();
    const { row, estimatesSystem, estimatesObject, searchActive, searchResult } = props;
    // State of row being edited before editing
    const [rowOld, setRowOld] = useState({
        system_number: '',
        ware_number: '',
        ware: '',
        units: '',
        quantity: '',
        price: '',
        system: '',
        note: '',
    });
    const [rowNew, setRowNew] = useState({
        system_number: '',
        ware_number : '',
        ware: '',
        units: '',
        quantity: '',
        price: '',
        system: '',
        note: '',
    });
    // Collapse open
    const [collapseOpen, setCollapseOpen] = useState(false);
    // Data loading process
    const [rowLoaded, setRowLoaded] = useState(false);
    // State for clicking delete button
    const [deleting, setDeleting] = useState({rowId: 0, enabled: false});
    // State for clicking edit button
    const [editing, setEditing] = useState({rowId: 0, enabled: false,});
    // State for deleting row
    const [rowRender, setRowRender] = useState(true);
    // Clicking edit row button
    const startEditingRow =  (rowId) => {
        setCollapseOpen(true);
        setEditing({rowId: rowId, enabled: true});
        const rowFound = props.estimatesData.find(row => row.id === rowId);
        setRowOld({
            system_number: rowFound.system_number,
            ware_number: rowFound.ware_number,
            ware: rowFound.ware,
            units: rowFound.units,
            quantity: rowFound.quantity,
            price: rowFound.price,
            system: rowFound.system,
            note: rowFound.note,
        });
        setRowNew({
            system_number: rowFound.system_number,
            ware_number: rowFound.ware_number,
            ware: rowFound.ware,
            units: rowFound.units,
            quantity: rowFound.quantity,
            price: rowFound.price,
            system: rowFound.system,
            note: rowFound.note,
        });
        setRowLoaded(true);
    };
    // Cancelling edit
    const cancelEdit = () => {
        setEditing({rowId: 0, enabled: false});
        setRowLoaded(false);
        setRowNew({
            system_number: '',
            ware_number: '',
            ware: '',
            units: '',
            quantity: '',
            price: '',
            system: '',
            note: '',
        });
    };
    // Confirming edit
    const confirmEdit = () => {
        const equality = _.isEqual(rowOld, rowNew);
        if (!equality){
            const data = JSON.stringify(rowNew);
            props.editEstimateRow(editing.rowId, data);
            props.undoDataSave('estimate_row_edit', rowOld, editing.rowId);
        }
        setEditing({rowId: 0, enabled: false});
        setRowLoaded(false);
        // Checking what data to load after row was restored
        setTimeout(() => {
            if (estimatesSystem === 'Все' && !searchActive ) {
                props.getEstimatesByObject(estimatesObject);
            };
            if (estimatesSystem !== 'Все' && !searchActive) {
                props.getEstimatesByObjectBySystem(estimatesObject, estimatesSystem);
            };
            if (estimatesSystem === 'Все' && searchActive) {
                props.searchEstimatesByObject(searchResult, estimatesObject);
            };
            if (estimatesSystem !== 'Все' && searchActive) {
                props.searchEstimatesByObjectBySystem(searchResult, estimatesObject, estimatesSystem)  ;
            };
        }, 500)
    };
    // Clicking delete button
    const startDeletingRow = (rowId) => {
        setCollapseOpen(true);
        setDeleting({rowId: rowId, enabled: true});
        const rowFound = props.estimatesData.find(row => row.id === rowId);
        setRowOld({
            id: rowId,
            system_number: rowFound.system_number,
            ware_number: rowFound.ware_number,
            ware: rowFound.ware,
            units: rowFound.units,
            quantity: rowFound.quantity,
            price: rowFound.price,
            system: rowFound.system,
            note: rowFound.note,
        });
    };
    // Cancelling delete
    const cancelDelete = () => {
        setDeleting({rowId: 0, enabled: false});
    };
    // Confirming delete 
    const confirmDelete = () => {
        props.undoDataSave('estimate_row_delete', rowOld, deleting.rowId);
        setDeleting({rowId: 0, enabled: false});
        props.deleteEstimateRow(deleting.rowId);
        setRowRender(false);
    };
    // Clicking confirm button
    const confirmClickHandler = () => {
        // Checking if editing was in process
        if (editing.enabled) {
            confirmEdit();
        }
        // Checking if deleting was in process
        if (deleting.enabled) {
            confirmDelete();
        }
        // Closing collapse
        setCollapseOpen(false);
    };
    // Clicking cancel button
    const cancelClickHandler = () => {
        // Checking if editing was in process
        if (editing.enabled) {
            cancelEdit();
        }
        // Checking if deleting was in process
        if (deleting.enabled) {
            cancelDelete();
        }
        // Closing collapse
        setCollapseOpen(false);
    };
    let mainRow = null;
    if (rowRender) {
        mainRow = (
            <React.Fragment key={`fragmentrow${row.id}`}>
            <TableRow key={`r${row.id}`} hover >
                <TableCell padding="default" key={`fio${row.id}`}>
                {row.first_name} {row.patron_name} {row.last_name}
                </TableCell>
                <TableCell key={`position${row.id}`}>
                {row.position}                    
                </TableCell>
                <TableCell key={`phone${row.id}`}>
                {row.phone}
                </TableCell>
                <TableCell key={`email${row.id}`}>
                {row.email}
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
                        <Tooltip title={<h6>Удалить</h6>} arrow>
                        <DeleteIcon className={classes.icon}
                        key={`delete${row.id}`}
                        color={!editing.enabled ? "action" : "disabled"}
                        onClick={!deleting.enabled ? (() => startDeletingRow(row.id)) : undefined} />
                        </Tooltip>
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
                               
                            </TableRow>
                            </TableBody>
                        </Table> : null }
                        {deleting.enabled ? 
                        <Box style={{position: 'relative', left: '45%'}}>
                        <p>Подтвердите удаление</p>
                        </Box>
                        : null}
                    </Box>  
             </Collapse>
            </TableCell>
            </TableRow>
            </React.Fragment>
        );
    }
    return mainRow;
};

const mapStateToProps = state => {
    return {
        estimatesLoaded: state.est.estimatesLoaded,
        estimatesData: state.est.estimatesData,
        systemsByObject: state.est.systemsByObject,
        estimatesObject: state.est.estimatesObject,
        estimatesSystem: state.est.estimatesSystem,
        searchActive: state.srch.searchActive,
        searchResult: state.srch.searchResult,
    };
};


export default connect(mapStateToProps, { deleteEstimateRow, addEstimateRow, editEstimateRow, undoDataSave,
    getEstimatesByObject, getEstimatesByObjectBySystem, 
    searchEstimatesByObject, searchEstimatesByObjectBySystem })(EstimatesRow);