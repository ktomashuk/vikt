import React from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip';
// Redux
import { connect } from 'react-redux';
import { purchaseCheckReceived, purchaseUncheckReceived } from '../../../../store/actions/purchases';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    row: {
        cursor: 'pointer',
        fontSize: 16,
    },
    redText: {
        color: 'red',
    },
    greenText: {
        color: 'green',
    },
});

const PurchasesInvoiceRow = (props) => {
    const classes = useStyles();
    const { row, contractorsList, contractorsLoaded, clicked, units,
        purchaseCheckReceived, purchaseUncheckReceived } = props;
    const red = true;
    // Icons to determine if invoice has any unassigned positions
    const notAssignedIcon = (
        <Tooltip title={<Typography>Не распределено</Typography>}>
            <PriorityHighIcon style={{ color: 'red'}} fontSize="default"/>
        </Tooltip>
    );
    const assignedIcon = (
        <Tooltip title={<Typography>Распределено</Typography>}>
            <CheckIcon fontSize="default" style={{color: 'green'}}/>
        </Tooltip>
    );
    // Clicking the checkbox
    const checkboxClickhandler = (id) => {
        if (row.received) {
            purchaseUncheckReceived(id);
        } else {
            purchaseCheckReceived(id);
        }
    };

    return(
        <React.Fragment key={`fr${row.id}`}>
            <TableRow key={`row${row.id}`} hover>
                <TableCell key={`ware${row.id}`} padding="default" className={classes.row}>
                    {row.ware_name}
                </TableCell>
                <TableCell key={`quant_doc${row.id}`} padding="default" className={classes.row}>
                    {row.purchased_doc}
                </TableCell>
                <TableCell key={`quant_fact${row.id}`} padding="default" className={classes.row}>
                    {row.purchased_fact}
                </TableCell>
                <TableCell key={`units${row.id}`} padding="default" className={classes.row}>
                    {units.find(u => u.id === row.units).name}
                </TableCell>
                <TableCell key={`price${row.id}`} padding="default" className={classes.row}>
                    {row.price}
                </TableCell>
                <TableCell key={`not_received${row.id}`} padding="default" className={classes.row}>
                    <Checkbox checked={row.received}
                    onChange={() => checkboxClickhandler(row.id)}/>
                </TableCell>
                <TableCell key={`not_assigned${row.id}`} padding="default" className={classes.row}>
                    {row.assigned ? assignedIcon : notAssignedIcon}
                    <EditIcon fontSize="small" style={{color: 'blue'}}/>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        contractorsLoaded: state.contr.contractorsLoaded,
        contractorsList: state.contr.contractorsList,
    };
};

export default connect(mapStateToProps, { purchaseCheckReceived, purchaseUncheckReceived })(PurchasesInvoiceRow);