import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// Custom components
import PurchasesInvoiceEstimateRow from '../PurchasesInvoiceEstimateRow/PurchasesInvoiceEstimateRow';
// Redux
import { connect } from 'react-redux';
import { getEstimatesByObject, getEstimatesByObjectBySystem, 
    searchEstimatesByObject, searchEstimatesByObjectBySystem,
    getNonEstimatesByObject, getNonEstimatesByObjectBySystem,
    searchNonEstimatesByObject, searchNonEstimatesByObjectBySystem } from '../../../../store/actions/estimates';

const columns = [
    { id: 'number', label: 'Номер', minWidth: '10%', maxWidth: 300 },
    { id: 'ware', label: 'Наименование', minWidth: '50%', maxWidth: 1500  },
    { id: 'units', label: 'Ед.изм', minWidth: '10%', maxWidth: 300  },
    { id: 'quantity', label: 'Кол-во', minWidth: '10%', maxWidth: 300  },
    { id: 'system', label: 'Система', minWidth: '10%', maxWidth: 300  },
    { id: 'buttons', label: 'Действия', minWidth: '10%', maxWidth: 300  },
]


const useStyles = makeStyles((theme) => ({
    root: {
        width: '99%',
        marginLeft: 7,
        marginBottom: 10,
    },
    container: {
        [theme.breakpoints.down('lg')]:{
        height: 300,
        },
        [theme.breakpoints.up('lg')]:{
        height: 750,
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

const PurchasesInvoiceEstimateTable = React.memo(props => {
    const classes = useStyles();
    const { estimatesData, estimatesLoaded, units, unitsLoaded,
    chosenObjectSystems, chosenObjectSystemsLoaded } = props;
    // Default table
    let estimateRows = <TableRow><TableCell>Выберите объект</TableCell></TableRow>
    // Loaded table of estimates
    if (estimatesLoaded && unitsLoaded && chosenObjectSystemsLoaded) {
        estimateRows = estimatesData.map((row) => {
            return(
                <PurchasesInvoiceEstimateRow row={row} key={`row${row.id}`}
                units={units}
                systems={chosenObjectSystems}/>
            );
        });
    };

    return(
        <Paper key="papertable" className={classes.root}>
            <TableContainer key="tablecontainer" className={classes.container}>
                <Table key="tablemain" stickyHeader aria-label="table1" size="small" padding="none">
                    <TableHead key="tablehead">
                        <TableRow key="header">
                            {columns.map((column) => {
                                return(
                                    <TableCell key={column.id}
                                    style={{ width: column.minWidth, maxWidth: column.maxWidth}}>
                                    {column.label}
                                    </TableCell>);
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody key="tablebody">
                        {estimateRows}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
});

const mapStateToProps = state => {
    return {
        estimatesLoaded: state.est.estimatesLoaded,
        estimatesData: state.est.estimatesData,
        nonEstimatesLoaded: state.est.nonEstimatesLoaded,
        nonEstimatesData: state.est.nonEstimatesData,
        estimatesSystem: state.est.estimatesSystem,
        searchActive: state.srch.searchActive,
        searchResult: state.srch.searchResult,
        units: state.core.units,
        unitsLoaded: state.core.unitsLoaded,
        chosenObjectId: state.core.chosenObjectId,
        chosenObjectSystems: state.core.chosenObjectSystems,
        chosenObjectSystemsLoaded: state.core.chosenObjectSystemsLoaded,
    };
};

export default connect(mapStateToProps, 
    { getEstimatesByObject, getEstimatesByObjectBySystem, 
    searchEstimatesByObject, searchEstimatesByObjectBySystem,
    getNonEstimatesByObject, getNonEstimatesByObjectBySystem,
    searchNonEstimatesByObject, searchNonEstimatesByObjectBySystem })(PurchasesInvoiceEstimateTable);