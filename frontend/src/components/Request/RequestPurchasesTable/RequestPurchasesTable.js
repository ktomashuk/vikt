import React, { useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Divider from '@material-ui/core/Divider';
// Custom components
import RequestPurchasesRow from '../RequestPurchasesRow/RequestPurchasesRow';
// Redux
import { connect } from 'react-redux';

const columns = [
    { id: 'checkbox', label: 'Выбор', minWidth: 40, maxWidth: 300  },
    { id: 'number', label: 'Номер', minWidth: 50, maxWidth: 300 },
    { id: 'ware', label: 'Наименование', minWidth: 200, maxWidth: 1500  },
    { id: 'units', label: 'Ед.изм', minWidth: 50, maxWidth: 300  },
    { id: 'quantity', label: 'Кол-во', minWidth: 50, maxWidth: 300  },
    { id: 'purchased_doc', label: 'Куплено', minWidth: 50, maxWidth: 300  },
    { id: 'system', label: 'Система', minWidth: 50, maxWidth: 300  },
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

const PurhaseOverviewTable = props => {
    const classes = useStyles();
    const { estimatesData, estimatesLoaded, getPurchasesByEstimateItem, getPurchasesByNonEstimateItem,
        units, unitsLoaded, chosenObjectSystems, chosenObjectSystemsLoaded,
        estimatePurchases, estimatePurchasesLoaded, nonEstimatePurchasesLoaded } = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    // State for opening the modal
    const [modal, setModal] = useState(false);
    // Checking if everything is fetched from the server
    let dataLoaded = estimatesLoaded && unitsLoaded && chosenObjectSystemsLoaded &&
    estimatePurchasesLoaded && nonEstimatePurchasesLoaded ? true : false;
    // Setting table to the right amount of rows as chosen in pagination menu
    let rows = useMemo(() => dataLoaded ? 
    estimatesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : [], 
    [page, rowsPerPage, dataLoaded, estimatesData]);
    // Changing page in a pagination menu
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    // Changing the amount of rows per page
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
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
                                    style={{ minWidth: column.minWidth, maxWidth: column.maxWidth}}>
                                    {column.label}
                                    </TableCell>);
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody key="tablebody">
                    {dataLoaded ? rows.map((row) => {
                    // Finding corresponding purchases in redux
                    const purchase = estimatePurchases.find(purchase => Number(purchase.estimate_reference) === row.id);
                    // If purchases exist show them, otherwise show 0
                    const doc = purchase ? purchase.purchases_doc : 0;
                    return(
                        <RequestPurchasesRow row={row} key={`row${row.id}`}
                        purchasedDoc={doc}
                        units={units}
                        systems={chosenObjectSystems}
                        />
                    )}) : null}
                    </TableBody>
                </Table>
            </TableContainer>
            <Divider />
            <TablePagination
                rowsPerPageOptions={[15, 50, 100, {label: 'Все', value: -1}]}
                component="div"
                count={dataLoaded ? estimatesData.length : 0 }
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                nextIconButtonText="Следующая страница"
                backIconButtonText="Предыдущая страница"
                labelRowsPerPage="Строк на странице"
            />
        </Paper>
    );
};

const mapStateToProps = state => {
    return {
        estimatesLoaded: state.est.estimatesLoaded,
        estimatesData: state.est.estimatesData,
        estimatesRefreshNeeded: state.est.estimatesRefreshNeeded,
        searchActive: state.srch.searchActive,
        searchResult: state.srch.searchResult,
        units: state.core.units,
        unitsLoaded: state.core.unitsLoaded,
        chosenObjectSystems: state.core.chosenObjectSystems,
        chosenObjectSystemsLoaded: state.core.chosenObjectSystemsLoaded,
        estimatePurchases: state.pur.estimatePurchases,
        nonEstimatePurchases: state.pur.nonEstimatePurchases,
        estimatePurchasesLoaded: state.pur.estimatePurchasesLoaded,
        nonEstimatePurchasesLoaded: state.pur.nonEstimatePurchasesLoaded,
    };
};

export default connect(mapStateToProps, { })(PurhaseOverviewTable);