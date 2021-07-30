import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// Material UI
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import Checkbox from '@material-ui/core/Checkbox';
// Redux
import { connect } from 'react-redux';
import { cableDeleteAddItem, cableDeleteRemoveItem } from '../../../../store/actions/delete';
import { undoCableJournalRowAdd, undoCableJournalRowRemove } from '../../../../store/actions/undo';
import { editStart } from '../../../../store/actions/edit';

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
    const { row, deleteItemsNumber, deleteAllEnabled, editStart,
        cableDeleteAddItem, cableDeleteRemoveItem, undoCableJournalRowAdd, undoCableJournalRowRemove } = props;
    // State for clicking delete button
    const [deletingCheck, setDeletingCheck] = useState(false);
    // Clicking checbkox
    const checkboxClickHandler = useCallback((type, data) => {
        // If checkbox is not checked
        if (deletingCheck === false) {
            setDeletingCheck(true);
            cableDeleteAddItem(type, data);
            undoCableJournalRowAdd('cable_journal_delete',row);
        } 
        else
        // If checkbox is checked 
        {
            setDeletingCheck(false);
            cableDeleteRemoveItem(data);
            undoCableJournalRowRemove('cable_journal_delete', data);
        }
    }, [row, cableDeleteAddItem, cableDeleteRemoveItem, deletingCheck,
          undoCableJournalRowAdd, undoCableJournalRowRemove]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleteAllEnabled, row.id]);
    
    

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
                    <React.Fragment key={`frag2${row.id}`}>
                        <EditIcon className={classes.icon}
                        key={`edit${row.id}`}
                        color="primary"
                        onClick={() => editStart('cable_journal_row', row)}/>
                        <Checkbox size="small" checked={deletingCheck}
                        className={classes.checkbox}
                        onClick={() => checkboxClickHandler('cable_journal', row.id)}/>
                    </React.Fragment>
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


export default connect(mapStateToProps, { editStart, 
        cableDeleteRemoveItem, cableDeleteAddItem, 
        undoCableJournalRowAdd, undoCableJournalRowRemove })(CableRow);