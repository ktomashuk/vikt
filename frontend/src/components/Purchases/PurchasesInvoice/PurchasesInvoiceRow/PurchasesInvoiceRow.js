import React, { useState, useEffect } from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
// Redux
import { connect } from 'react-redux';
import { purchaseCheckReceived, purchaseUncheckReceived, 
    getPurchaseById, getPurchasesByInvoice } from '../../../../store/actions/purchases';
import { recountInvoice } from '../../../../store/actions/invoices';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    row: {
        whiteSpace: 'normal',
        wordWrap: 'break-word',
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
    const { row, units, clicked, 
        purchaseCheckReceived, purchaseUncheckReceived, getPurchaseById, 
        recountInvoice, invoicesChosenId, getPurchasesByInvoice, clickedDelete } = props;
    // State for a checbox
    const [checkedReceived, setCheckedReceived] = useState(false);
    const [checkedAssigned, setCheckedAssigned] = useState(false);
    // Checking the checkbox if ware is received
    useEffect(() => {
        if (row.received) {
            setCheckedReceived(true);
        } else {
            setCheckedReceived(false);
        }
        if(row.assigned){
            setCheckedAssigned(true);
        } else {
            setCheckedAssigned(false);
        }
    },[row.received, row.assigned])
    // Clicking the checkbox
    const checkboxReceivedClickhandler = async (id) => {
        // Check if purhase is bound to estimate or non-estimate        
        if (checkedReceived) {
            await purchaseUncheckReceived(id);
            setCheckedReceived(false);
        } else {
            await purchaseCheckReceived(id);
            setCheckedReceived(true);
        }
        recountInvoice(invoicesChosenId);
        getPurchasesByInvoice(invoicesChosenId);
    };
    
    return(
        <React.Fragment key={`fr${row.id}`}>
            <TableRow key={`row${row.id}`} hover >
                <TableCell key={`ware${row.id}`} padding="default" className={classes.row}>
                    <span>
                    {row.ware_name} 

                    </span>
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
                    <Checkbox checked={checkedReceived}
                    onChange={() => checkboxReceivedClickhandler(row.id)}/>
                </TableCell>
                <TableCell key={`not_assigned${row.id}`} padding="default" className={classes.row}>
                    <Checkbox checked={checkedAssigned} color="primary"/>
                </TableCell>
                <TableCell key={`info${row.id}`} padding="default" className={classes.row}>
                    <Tooltip title={
                        <Typography>
                        Редактировать
                        </Typography>
                        } arrow>
                        <EditIcon fontSize="default" style={{color: 'blue'}} 
                        onClick={() => {
                        getPurchaseById(row.id);
                        clicked();}}/>
                    </Tooltip>
                    <Tooltip title={
                        <Typography>
                        Удалить
                        </Typography>
                        } arrow>
                        <DeleteIcon 
                        key={`delete${row.id}`}
                        color="action"
                        onClick={() => clickedDelete(row.ware_name, row.id)}/>
                    </Tooltip>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        contractorsLoaded: state.contr.contractorsLoaded,
        contractorsList: state.contr.contractorsList,
        invoicesChosenId: state.inv.invoicesChosenId,
    };
};

export default connect(mapStateToProps, 
    { purchaseCheckReceived, purchaseUncheckReceived, recountInvoice,
         getPurchaseById, getPurchasesByInvoice })(PurchasesInvoiceRow);