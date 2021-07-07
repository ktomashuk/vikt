import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EstimatesRow from '../EstimatesRow/EstimatesRow';
import { connect } from 'react-redux';


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

const EstimatesTable = props => {
    const classes = useStyles();
    // Default table
    let rows = <TableRow><TableCell>Выберите объект</TableCell></TableRow>
    // Loaded table
    if (props.estimatesLoaded) {
        rows = props.data.map((row) => {
            return(
                <EstimatesRow row={row} key={`row${row.id}`}/>
            );
        });
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
        estimatesLoaded: state.est.estimatesLoaded,
        estimatesData: state.est.estimatesData,
    };
};

export default connect(mapStateToProps)(EstimatesTable);