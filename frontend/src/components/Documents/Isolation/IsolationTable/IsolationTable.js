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
import IsolationRow from '../IsolationRow/IsolationRow';
// Redux
import { connect } from 'react-redux';
import { getJournalByObjectBySystem } from '../../../../store/actions/cable';


const columns = [
    { id: 'number', label: '№ П/П', minWidth: 50, maxWidth: 50 },
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

const IsolationTable = props => {
    const classes = useStyles();
    const { cableJournal, cableJournalLoaded } = props;
    // Default table
    let rows = <TableRow><TableCell>Выберите объект и систему</TableCell></TableRow>
    // Table if data is loaded
    if (cableJournalLoaded) {
        rows = cableJournal.map((row) => {
            return(
                <IsolationRow key={row.id} row={row} />
            );
        })
    }
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
};

const mapStateToProps = state => {
    return {
        cableJournal: state.cable.cableJournal,
        cableJournalLoaded: state.cable.cableJournalLoaded,
    };
};

export default connect(mapStateToProps, { getJournalByObjectBySystem })(IsolationTable);