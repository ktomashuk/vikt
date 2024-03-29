import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
// Custom components
import PurchasesBillRow from '../PurchasesBillRow/PurchasesBillRow';
// Redux
import { connect } from 'react-redux';
import { chooseInvoice } from '../../../store/actions/invoices';
import { getPurchasesByInvoice } from '../../../store/actions/purchases';

const useStyles = makeStyles(theme => ({
    root: {
        width: '99%',
    },
    container: {
        [theme.breakpoints.down('lg')]:{
        height: 565,
        },
        [theme.breakpoints.up('lg')]:{
        height: 780,
        },
        [theme.breakpoints.up('xl')]:{
        height: 1120,
        },
    },
    loading: {
        position: 'relative',
        left: '45%',
    },
    loadingText: {
        position: 'relative',
        left: '30%',
    },
}));

const columns = [
    { id: 'date', label: 'Дата', minWidth: '10%', maxWidth: '20%'  },
    { id: 'number', label: 'Номер', minWidth: '30%', maxWidth: '30%' },
    { id: 'contractor', label: 'Поставщик', minWidth: '40%', maxWidth: '40%'  },
    { id: 'info', label: 'Инфо', minWidth: "10%", maxWidth: '10%'  },
    { id: 'actions', label: 'Действия', minWidth: "10%", maxWidth: '10%'  },
]

const PurchasesBillTable = (props) => {
    const classes = useStyles();
    const { invoicesLoaded, invoicesData, invoicesListSpinner, chooseInvoice, getPurchasesByInvoice, 
        clickedEdit, clickedDelete } = props;
    
    // Fetching invoice data after clicking table row
    const rowClickHandler = (id) => {
        chooseInvoice(id);
        getPurchasesByInvoice(id);
    };
    // Default table
    let rows = <TableRow><TableCell>
        <p className={classes.loadingText}>Загрузка</p>
        </TableCell></TableRow>
    // Loaded table
    if (invoicesLoaded) {
        rows = invoicesData.map((row) => {
            return(
                <PurchasesBillRow row={row} key={`cr${row.id}`} clicked={rowClickHandler}
                clickedEdit={clickedEdit} clickedDelete={clickedDelete}/>
            );
        })
    };
    // Showing spinner while loading
    if (invoicesListSpinner) {
        rows = <TableRow><TableCell>
        <CircularProgress className={classes.loading} />
        </TableCell></TableRow>
    };
    return(
        <Paper key="papertable" className={classes.root}>
            <TableContainer key="tablecontainer" className={classes.container}>
                <Table key="tablemain" stickyHeader aria-label="table1" size="small">
                    <TableHead key="tablehead">
                        <TableRow key="header">
                        {columns.map((column) => {
                            return(
                                <TableCell key={column.id}
                                style={{minWidth: column.minWidth, maxWidth: column.maxWidth}}>
                                {column.label}
                                </TableCell>);
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody key="tablebody">
                        {rows}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

const mapStateToProps = state => {
    return {
        invoicesLoaded: state.inv.invoicesLoaded,
        invoicesData: state.inv.invoicesData,
        invoicesListSpinner: state.inv.invoicesListSpinner,
    };
};

export default connect(mapStateToProps, { chooseInvoice, getPurchasesByInvoice } )(PurchasesBillTable);