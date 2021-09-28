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
    checkbox: {
        margin: 'auto',
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
            checkboxClickHandler('estimates', row.id);
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
                {row.system_number ?
                row.system_number + "." + row.ware_number
                : 'Б/Н'}
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
                {row.price ?
                row.price :
                '-'}
                </TableCell>
                <TableCell key={`system${row.id}`}>
                {systems ? systems.find(sys => sys.id === row.system).acronym : null}
                </TableCell>
                <TableCell key={`note${row.id}`}>
                {row.system_number ? 
                row.note :
                'не по смете'}
                </TableCell>
                <TableCell key={`buttons${row.id}`}>
                    <React.Fragment key={`frag2${row.id}`}>
                        <EditIcon className={classes.icon}
                        key={`edit${row.id}`}
                        color="primary" fontSize="small"
                        onClick={row.system_number ?
                        () => editStart('estimate_row', row) : () => editStart('nonestimate_row', row)}/>
                        <Checkbox size="small" checked={deletingCheck}
                        className={classes.checkbox}
                        onClick={() => checkboxClickHandler('estimates', row.id)}/>
                    </React.Fragment>
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