import React, { useState, useEffect } from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';
// Redux
import { connect } from 'react-redux';
import { editStart } from '../../../store/actions/edit';

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
        checkOn, checkOff, undoAdd, undoRemove, editStart } = props;
    // State for clicking delete button
    const [deletingCheck, setDeletingCheck] = useState(false);
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
                    <React.Fragment key={`frag2${row.id}`}>
                        <EditIcon className={classes.icon}
                        key={`edit${row.id}`}
                        color="primary"
                        onClick={() => editStart('estimate_row', row)}/>
                        <Checkbox size="small" checked={deletingCheck}
                        className={classes.checkbox}
                        onClick={() => checkboxClickHandler('estimates', row.id)}/>
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


export default connect(mapStateToProps, { editStart })(EstimatesRow);