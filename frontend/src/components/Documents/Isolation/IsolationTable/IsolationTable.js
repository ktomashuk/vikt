import React, { useState, useEffect, useMemo } from 'react';
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
import IsolationRow from '../IsolationRow/IsolationRow';
// Redux
import { connect } from 'react-redux';
import { cableDeleteAddAllItems } from '../../../../store/actions/delete';

const columns = [
    { id: 'number', label: '№', minWidth: 50, maxWidth: 50 },
    { id: 'name', label: 'Обозначение', minWidth: 100, maxWidth: 150  },
    { id: 'start', label: 'Начало', minWidth: 150, maxWidth: 300  },
    { id: 'end', label: 'Конец', minWidth: 150, maxWidth: 300  },
    { id: 'cable', label: 'Марка', minWidth: 100, maxWidth: 300  },
    { id: 'cable_cut', label: 'Сечение', minWidth: 100, maxWidth: 300  },
    { id: 'length', label: 'Сопротивление', minWidth: 100, maxWidth: 300  },
    { id: 'actions', label: 'Действия', minWidth: 100, maxWidth: 300 },
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

const IsolationTable = props => {
    const classes = useStyles();
    const { cableJournal, cableJournalLoaded, deleteAllEnabled,
        cableDeleteAddAllItems  } = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [deleteData, setDeleteData] = useState([]);
    // Setting table to the right amount of rows as chosen in pagination menu
    let rows = useMemo(() => cableJournalLoaded ? 
    cableJournal.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : null, 
    [page, rowsPerPage, cableJournal, cableJournalLoaded]);
    // Changing page in a pagination menu
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    // Changing the amount of rows per page
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    // Adding all items currently shown to delete
    useEffect(() => {
        const deleteAllIds = rows ? rows.map((item) => {return item.id}) : null;
        const deleteRepeated = deleteAllIds ? deleteAllIds.some((item) => deleteData.includes(item)) : null;
        if (deleteAllEnabled && !deleteRepeated) {
            cableDeleteAddAllItems('cable_journal', deleteAllIds);
            setDeleteData(deleteData => ([...deleteData, ...deleteAllIds]));
        };
        if (!deleteAllEnabled) {
            setDeleteData([]);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleteAllEnabled, rows]);
    
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
                        {cableJournalLoaded ? rows.map((row) => {
                        return(<IsolationRow key={row.id} row={row} /> )}) : null}
                    </TableBody>
                </Table>
            </TableContainer>
            <Divider />
            <TablePagination
                rowsPerPageOptions={[15, 50, 100, {label: 'Все', value: -1}]}
                component="div"
                count={cableJournalLoaded ? cableJournal.length : 0 }
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
        cableJournal: state.cable.cableJournal,
        cableJournalLoaded: state.cable.cableJournalLoaded,
        deleteAllEnabled: state.del.deleteAllEnabled,
    };
};

export default connect(mapStateToProps, { cableDeleteAddAllItems })(IsolationTable);