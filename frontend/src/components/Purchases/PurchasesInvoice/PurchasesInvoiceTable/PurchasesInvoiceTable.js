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
import PurchasesBillRow from '../../PurchasesBillRow/PurchasesBillRow';
// Redux
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    container: {
        [theme.breakpoints.down('lg')]:{
        height: 495,
        },
        [theme.breakpoints.up('lg')]:{
        height: 710,
        },
        [theme.breakpoints.up('xl')]:{
        height: 1050,
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
    { id: 'ware', label: 'Наименование', minWidth: 100, maxWidth: 200  },
    { id: 'quantity', label: 'Кол-во', minWidth: 50, maxWidth: 50 },
    { id: 'units', label: 'Ед.изм.', minWidth: 50, maxWidth: 50  },
    { id: 'price', label: 'Цена', minWidth: 50, maxWidth: 50  },
]

const PurchasesInvoiceTable = (props) => {
    const classes = useStyles();
    const { invoicesLoaded, invoicesData, invoicesListSpinner } = props;
    
    // Default table
    let rows = <TableRow><TableCell>
        <p className={classes.loadingText}>Загрузка</p>
        </TableCell></TableRow>
    // Loaded table
    if (invoicesLoaded) {
        rows = invoicesData.map((row) => {
            return(
                <PurchasesBillRow row={row} key={`cr${row.id}`}/>
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
                <Table key="tablemain" stickyHeader aria-label="table1" size="medium">
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

export default connect(mapStateToProps )(PurchasesInvoiceTable);