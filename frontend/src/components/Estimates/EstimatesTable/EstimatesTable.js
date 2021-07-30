import React, { useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// Custom components
import EstimatesRow from '../EstimatesRow/EstimatesRow';
// Redux
import { connect } from 'react-redux';
import { getUnits } from '../../../store/actions/core';
import { deleteEstimateRow, editEstimateRow, 
    getEstimatesByObject, getEstimatesByObjectBySystem, 
    searchEstimatesByObject, searchEstimatesByObjectBySystem } from '../../../store/actions/estimates';
import { estimateDeleteAddItem, estimateDeleteRemoveItem, estimateDeleteRemoveAll } from '../../../store/actions/delete';
import { undoDataSave, undoEstimateRowAdd, undoEstimateRowRemove } from '../../../store/actions/undo';

const columns = [
    { id: 'number', label: 'Номер', minWidth: 50, maxWidth: 300 },
    { id: 'ware', label: 'Наименование', minWidth: 150, maxWidth: 1500  },
    { id: 'units', label: 'Ед.изм', minWidth: 100, maxWidth: 300  },
    { id: 'quantity', label: 'Кол-во', minWidth: 100, maxWidth: 300  },
    { id: 'price', label: 'Цена', minWidth: 100, maxWidth: 300  },
    { id: 'system', label: 'Система', minWidth: 100, maxWidth: 300  },
    { id: 'note', label: 'Примечание', minWidth: 100, maxWidth: 300  },
    { id: 'buttons', label: 'Действия', minWidth: 100, maxWidth: 300  },
]


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        [theme.breakpoints.down('lg')]:{
        height: 540,
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

const EstimatesTable = React.memo(props => {
    const classes = useStyles();
    const { estimatesData, estimatesLoaded, estimatesSystem, units, unitsLoaded,
    chosenObjectSystems, chosenObjectSystemsLoaded, chosenObjectId, 
    deleteEstimateRow, editEstimateRow, 
    estimateDeleteAddItem, estimateDeleteRemoveItem, estimatesRefreshNeeded, estimateDeleteRemoveAll, 
    searchActive, searchResult, getEstimatesByObject, 
    undoDataSave, undoEstimateRowAdd, undoEstimateRowRemove } = props;
    // Refresh estimates
    const refreshEstimates = useCallback(() => {
        estimateDeleteRemoveAll();
        if (estimatesSystem === 'Все' && !searchActive ) {
            getEstimatesByObject(chosenObjectId);
        };
        if (estimatesSystem !== 'Все' && !searchActive) {
            getEstimatesByObjectBySystem(chosenObjectId, estimatesSystem);
        };
        if (estimatesSystem === 'Все' && searchActive) {
            searchEstimatesByObject(searchResult, chosenObjectId);
        };
        if (estimatesSystem !== 'Все' && searchActive) {
            searchEstimatesByObjectBySystem(searchResult, chosenObjectId, estimatesSystem);
        };
    }, [chosenObjectId, estimateDeleteRemoveAll, estimatesSystem, getEstimatesByObject, searchActive, searchResult]);
    // Auto refreshing estimates after deleting
    useEffect(() => {
        if (estimatesRefreshNeeded) {
            refreshEstimates();
        };
    }, [estimatesRefreshNeeded, refreshEstimates])
    // Default table
    let rows = <TableRow><TableCell>Выберите объект</TableCell></TableRow>
    // Loaded table
    if (estimatesLoaded && unitsLoaded && chosenObjectSystemsLoaded) {
        rows = estimatesData.map((row) => {
            return(
                <EstimatesRow row={row} key={`row${row.id}`}
                deleteClick={deleteEstimateRow}
                editClick={editEstimateRow}
                undoClick={undoDataSave}
                undoAdd={undoEstimateRowAdd}
                undoRemove={undoEstimateRowRemove}
                checkOn={estimateDeleteAddItem}
                checkOff={estimateDeleteRemoveItem}
                units={units}
                systems={chosenObjectSystems}/>
            );
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
                                    style={{ minWidth: column.minWidth, maxWidth: column.maxWidth}}>
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
});

const mapStateToProps = state => {
    return {
        estimatesLoaded: state.est.estimatesLoaded,
        estimatesData: state.est.estimatesData,
        estimatesSystem: state.est.estimatesSystem,
        estimatesRefreshNeeded: state.est.estimatesRefreshNeeded,
        searchActive: state.srch.searchActive,
        searchResult: state.srch.searchResult,
        units: state.core.units,
        unitsLoaded: state.core.unitsLoaded,
        chosenObjectId: state.core.chosenObjectId,
        chosenObjectSystems: state.core.chosenObjectSystems,
        chosenObjectSystemsLoaded: state.core.chosenObjectSystemsLoaded,
    };
};

export default connect(mapStateToProps, { getUnits, 
    estimateDeleteAddItem, estimateDeleteRemoveItem, estimateDeleteRemoveAll,
    deleteEstimateRow, editEstimateRow, undoDataSave, undoEstimateRowAdd, undoEstimateRowRemove, 
    getEstimatesByObject, getEstimatesByObjectBySystem, 
    searchEstimatesByObject, searchEstimatesByObjectBySystem })(EstimatesTable);