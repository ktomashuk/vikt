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
import Button from '@material-ui/core/Button';
// Custom components
import PurchasesInvoiceRow from '../PurchasesInvoiceRow/PurchasesInvoiceRow';
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
    { id: 'ware', label: 'Наименование', minWidth: '45%', maxWidth: '45%'  },
    { id: 'quantity_doc', label: 'Док', minWidth: '10%', maxWidth: '10%' },
    { id: 'quantity_fact', label: 'Факт', minWidth: '10%', maxWidth: '10:' },
    { id: 'units', label: 'Ед.изм.', minWidth: '10%', maxWidth: '10%'  },
    { id: 'price', label: 'Цена', minWidth: '10%', maxWidth: '10%'  },
    { id: 'received', label: 'Отгруз.', minWidth: '5%', maxWidth: '5%'  },
    { id: 'info', label: 'Инфо', minWidth: '10%', maxWidth: '10%'  },
]

const PurchasesInvoiceTable = (props) => {
    const classes = useStyles();
    const { invoicesListSpinner, units, unitsLoaded, 
        purchasesByInvoice, purchasesByInvoiceLoaded } = props;
    // Default table
    let rows = <TableRow><TableCell>
        <p className={classes.loadingText}>Загрузка</p>
        </TableCell></TableRow>
    // Loaded table
    if (purchasesByInvoiceLoaded && unitsLoaded) {
        rows = purchasesByInvoice.map((row) => {
            return(
                <PurchasesInvoiceRow 
                row={row}
                key={`cr${row.id}`}
                units={units}/>
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
                                    style={{width: column.minWidth}}>
                                    {column.label}
                                    </TableCell>);
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody key="tablebody">
                    {rows}
                    <TableRow>
                    <TableCell colSpan={7}>
                        <Button variant="contained" color="primary" fullWidth>
                        Добавить позицию
                        </Button>
                    </TableCell>
                    </TableRow>
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
        units: state.core.units,
        unitsLoaded: state.core.unitsLoaded,
        purchasesByInvoice: state.pur.purchasesByInvoice,
        purchasesByInvoiceLoaded: state.pur.purchasesByInvoiceLoaded
    };
};

export default connect(mapStateToProps )(PurchasesInvoiceTable);