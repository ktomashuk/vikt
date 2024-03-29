import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Divider from '@material-ui/core/Divider';
// Custom components
import PurchasesOverviewModalRow from '../PurchasesOverviewModalRow/PurchasesOverviewModalRow';
// Redux
import { connect } from 'react-redux';

const columns = [
    { id: 'date', label: 'Дата', width: '10%' },
    { id: 'contractor', label: 'Поставщик', width: '20%' },
    { id: 'name', label: 'Наименование по счёту', width: '35%' },
    { id: 'quantity', label: 'Кол-во', width: '10%' },
    { id: 'units', label: 'Ед.изм.', width: '5%' },
    { id: 'price', label: 'Цена', width: '10%' },
    { id: 'actions', label: 'Действия', width: '10%' },
]


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        [theme.breakpoints.down('lg')]:{
        height: 500,
        },
        [theme.breakpoints.up('lg')]:{
        height: 700,
        },
        [theme.breakpoints.up('xl')]:{
        height: 1100,
        },
    },
    icon: {
        cursor: 'pointer',
    },
    text: {
        minWidth: 35,
        maxWidth: 1500,
        fontSize: 30,
    },
    loading: {
        position: 'absolute',
        left: '50%',
    },
}));

const PurhasesOverviewModalTable = props => {
    const classes = useStyles();
    const { purchasesByItem, purchasesByItemLoaded } = props;
    // Default rows list
    let rows = (
    <TableRow>
        <TableCell colSpan={7}>Загрузка...</TableCell>
    </TableRow>);
    if (purchasesByItemLoaded) {
        rows = purchasesByItem.map((row) => {
            return <PurchasesOverviewModalRow key={`ovmodrow${row.purchase_id}`} row={row}/>;
        });
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
                                    style={{ width: column.width }}>
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
            <Divider />
        </Paper>
    );
};

const mapStateToProps = state => {
    return {
        estimatesLoaded: state.est.estimatesLoaded,
        estimatesData: state.est.estimatesData,
        purchasesByItem: state.pur.purchasesByItem,
        purchasesByItemLoaded: state.pur.purchasesByItemLoaded,
    };
};

export default connect(mapStateToProps, { })(PurhasesOverviewModalTable);