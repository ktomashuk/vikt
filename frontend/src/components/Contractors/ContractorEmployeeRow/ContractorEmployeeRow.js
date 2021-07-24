import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
// Redux
import { connect } from 'react-redux';
import { addRepresentative, deleteRepresentative, 
    editRepresentative, getRepresentativesByContractor } from '../../../store/actions/contractors';

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

const ContractorEmployeeRow = (props) => {
    const classes = useStyles();
    const { row, representatives } = props;
    // State of row being edited before editing
    const [rowOld, setRowOld] = useState({
        id: 0,
        first_name: '',
        last_name: '',
        patron_name: '',
        position: '',
        phone: '',
        email: '',
        note: '',
    });
    const [rowNew, setRowNew] = useState({
        id: 0,
        first_name: '',
        last_name: '',
        patron_name: '',
        position: '',
        phone: '',
        email: '',
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
        const rowFound = representatives.find(row => row.id === rowId);
        setRowOld({
            id: rowFound.id,
            first_name: rowFound.first_name,
            last_name: rowFound.last_name,
            patron_name: rowFound.patron_name,
            position: rowFound.position,
            phone: rowFound.phone,
            email: rowFound.email,
            company: rowFound.company,
            note: rowFound.note,
        });
        setRowNew({
            id: rowFound.id,
            first_name: rowFound.first_name,
            last_name: rowFound.last_name,
            patron_name: rowFound.patron_name,
            position: rowFound.position,
            phone: rowFound.phone,
            email: rowFound.email,
            company: rowFound.company,
            note: rowFound.note,
        });
        setRowLoaded(true);
    };
    // Cancelling edit
    const cancelEdit = () => {
        setEditing({rowId: 0, enabled: false});
        setRowLoaded(false);
        setRowNew({
            id: 0,
            first_name: '',
            last_name: '',
            patron_name: '',
            position: '',
            phone: '',
            email: '',
            company: 0,
            note: '',
        });
    };
    // Confirming edit
    const confirmEdit = async () => {
        const equality = _.isEqual(rowOld, rowNew);
        if (!equality){
            const data = JSON.stringify(rowNew);
            await props.editRepresentative(editing.rowId, data);
            props.getRepresentativesByContractor(row.company);
        }
        setEditing({rowId: 0, enabled: false});
        setRowLoaded(false);
    };
    // Clicking delete button
    const startDeletingRow = (rowId) => {
        setCollapseOpen(true);
        setDeleting({rowId: rowId, enabled: true});
        const rowFound = representatives.find(row => row.id === rowId);
        setRowOld({
            id: rowFound.id,
            first_name: rowFound.first_name,
            last_name: rowFound.last_name,
            patron_name: rowFound.patron_name,
            position: rowFound.position,
            phone: rowFound.phone,
            email: rowFound.email,
            company: rowFound.company,
            note: rowFound.note,
        });
    };
    // Cancelling delete
    const cancelDelete = () => {
        setDeleting({rowId: 0, enabled: false});
    };
    // Confirming delete 
    const confirmDelete = () => {
        setDeleting({rowId: 0, enabled: false});
        props.deleteRepresentative(deleting.rowId);
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
                {row.first_name} {row.last_name} {row.patron_name}
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
                            <TableRow key={`cr1${row.id}`}>
                            <TableCell key={`tc1${row.id}`}>
                                <TextField label="Фамилия"
                                defaultValue={rowOld.last_name}
                                onChange={(e) => setRowNew({...rowNew, last_name: e.target.value})} 
                                style={{marginRight: 10, width: "31%"}}/>
                                <TextField label="Имя"
                                defaultValue={rowOld.first_name}
                                onChange={(e) => setRowNew({...rowNew, first_name: e.target.value})} 
                                style={{marginRight: 10, width: "31%"}}/>
                                <TextField label="Отчество"
                                defaultValue={rowOld.patron_name}
                                onChange={(e) => setRowNew({...rowNew, patron_name: e.target.value})} 
                                style={{width: "31%"}}/>
                            </TableCell>
                            </TableRow>
                            <TableRow key={`cr2${row.id}`}> 
                            <TableCell key={`tc2${row.id}`}>
                            <TextField label="Должность"
                                defaultValue={rowOld.position}
                                onChange={(e) => setRowNew({...rowNew, position: e.target.value})} 
                                style={{marginRight: 10, width: "31%"}}/>
                            <TextField label="Телефон"
                                defaultValue={rowOld.phone}
                                onChange={(e) => setRowNew({...rowNew, phone: e.target.value})} 
                                style={{marginRight: 10, width: "31%"}}/>
                            <TextField label="Email"
                                defaultValue={rowOld.email}
                                onChange={(e) => setRowNew({...rowNew, email: e.target.value})} 
                                style={{marginRight: 10, width: "31%"}}/>
                            </TableCell>
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
        representatives: state.contr.representatives,
    };
};


export default connect(mapStateToProps, 
    { addRepresentative, deleteRepresentative, 
        editRepresentative, getRepresentativesByContractor })(ContractorEmployeeRow);