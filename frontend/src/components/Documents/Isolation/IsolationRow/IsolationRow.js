import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// Material UI
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
// Redux
import { connect } from 'react-redux';
import { editCableRow, deleteCableRow, getJournalByObjectBySystem } from '../../../../store/actions/cable';
import { cableDeleteAddItem, cableDeleteRemoveItem } from '../../../../store/actions/delete';
import { undoCableJournalRowAdd, undoCableJournalRowRemove, undoCableJournalRowEdit, undoDataSave } from '../../../../store/actions/undo';

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

const IsolationRow = (props) => {
    const classes = useStyles();
    const { row, deleteItemsNumber, deleteAllEnabled } = props;
    // State for clicking delete button
    const [deletingCheck, setDeletingCheck] = useState(false);
    // Unchecking the checkbox when the clear button is pressed in delete bar
    useEffect(() => {
        if (deleteItemsNumber < 1) {
            setDeletingCheck(false);
        }
    }, [deleteItemsNumber])
    // Checking the checkbox when 'select all' is pressed in the cable panel
    useEffect(() => {
        if (deleteAllEnabled) {
            checkboxClickHandler('cable_journal', row.id);
        };
    }, [deleteAllEnabled])
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
                {Number(row.isolation).toFixed(2)}
                </TableCell>
                <TableCell key={`buttons${row.id}`}>
                    <React.Fragment key={`frag1${row.id}`}>
                    <Checkbox size="small" checked={deletingCheck}
                        className={classes.checkbox}
                        onClick={() => checkboxClickHandler('cable_journal', row.id)}/>
                    </React.Fragment>
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
        undoCableJournalRowAdd, undoCableJournalRowRemove, undoCableJournalRowEdit, undoDataSave })(IsolationRow);