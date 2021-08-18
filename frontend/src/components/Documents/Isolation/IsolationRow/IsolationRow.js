import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// Material UI
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
// Redux
import { connect } from 'react-redux';
import { cableDeleteAddItem, cableDeleteRemoveItem } from '../../../../store/actions/delete';

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
    const { row, deleteItemsNumber, deleteAllEnabled, 
        cableDeleteRemoveItem, cableDeleteAddItem } = props;
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
            setDeletingCheck(true);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleteAllEnabled])
    // Clicking checbkox
    const checkboxClickHandler = useCallback((type, data) => {
        // If checkbox is not checked
        if (deletingCheck === false) {
            setDeletingCheck(true);
            cableDeleteAddItem(type, data);
        } 
        else
        // If checkbox is checked 
        {
            setDeletingCheck(false);
            cableDeleteRemoveItem(data);
        }
    }, [cableDeleteRemoveItem, cableDeleteAddItem, deletingCheck]);

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
    { cableDeleteRemoveItem, cableDeleteAddItem })(IsolationRow);