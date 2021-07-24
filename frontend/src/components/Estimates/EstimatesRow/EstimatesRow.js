import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
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

const EstimatesRow = props => {
    const classes = useStyles();
    const { row, units, systems, deleteAllEnabled, deleteItemsNumber,
        editClick, checkOn, checkOff, undoAdd, undoRemove, undoClick } = props;
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
    };
    // Cancelling edit
    const cancelEdit = () => {
        setEditing({rowId: 0, enabled: false});
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
    const confirmEdit = async () => {
        const equality = _.isEqual(rowOld, rowNew);
        if (!equality){
            const data = JSON.stringify(rowNew);
            await editClick(editing.rowId, data);
            undoClick('estimate_row_edit', rowOld, editing.rowId);
        }
        setEditing({rowId: 0, enabled: false});        
    };
    // Clicking checbkox
    const checkboxClickHandler = (type, data) => {
        // If checkbox is not checked
        if (deletingCheck === false) {
            setDeletingCheck(true);
            checkOn(type, data);
            undoAdd('estimate_delete', row);
        } 
        else
        // If checkbox is checked 
        {
            setDeletingCheck(false);
            checkOff(data);
            undoRemove('estimate_delete', data)
        }
    };
    // Clicking confirm button
    const confirmClickHandler = () => {
        // Checking if editing was in process
        if (editing.enabled) {
            confirmEdit();
        }
    };
    // Clicking cancel button
    const cancelClickHandler = () => {
        // Checking if editing was in process
        if (editing.enabled) {
            cancelEdit();
        }
    };
    let mainRow = (
            <React.Fragment key={`fragmentrow${row.id}`}>
            <TableRow key={`r${row.id}`} hover >
                <TableCell padding="default" key={`number${row.id}`}>
                {row.system_number}.{row.ware_number}
                </TableCell>
                <TableCell key={`ware${row.id}`}>
                {row.ware}                    
                </TableCell>
                <TableCell key={`units${row.id}`}>
                {units.find(u => u.id === row.units).name}
                </TableCell>
                <TableCell key={`quantity${row.id}`}>
                {row.quantity}
                </TableCell>
                <TableCell key={`price${row.id}`}>
                {row.price}
                </TableCell>
                <TableCell key={`system${row.id}`}>
                {systems.find(sys => sys.id === row.system).acronym}
                </TableCell>
                <TableCell key={`note${row.id}`}>
                {row.note}
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
                        onClick={() => checkboxClickHandler('estimates', row.id)}/>
                    </React.Fragment> }
                </TableCell>
            </TableRow>
            <TableRow key={`collapserow${row.id}`}>
            <TableCell key={`c${row.id}`} style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            </TableCell>
            </TableRow>
            </React.Fragment>
        );
    return mainRow;
};

const mapStateToProps = state => {
    return {
        deleteItemsNumber: state.del.deleteItemsNumber,
        deleteAllEnabled: state.del.deleteAllEnabled,
    };
};


export default connect(mapStateToProps, { deleteEstimateRow, addEstimateRow, editEstimateRow, undoDataSave,
    getEstimatesByObject, getEstimatesByObjectBySystem, 
    searchEstimatesByObject, searchEstimatesByObjectBySystem })(EstimatesRow);