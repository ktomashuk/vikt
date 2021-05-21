import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import { connect } from 'react-redux';


const columns = [
    { id: 'ware', label: 'Наименование', minWidth: 150, maxWidth: 1500  },
    { id: 'units', label: 'Ед.изм', minWidth: 100, maxWidth: 300  },
    { id: 'quantity', label: 'Кол-во', minWidth: 100, maxWidth: 300  },
    { id: 'bought-fact', label: 'Закуплено по факту', minWidth: 100, maxWidth: 300  },
    { id: 'bought-doc', label: 'Закуплено по докам', minWidth: 100, maxWidth: 300  },
    { id: 'buttons', label: 'Действия', minWidth: 100, maxWidth: 300  },
]


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 500,
    },
    icon: {
        cursor: 'pointer',
    },
    text: {
        minWidth: 35,
        maxWidth: 1500,
        fontSize: 30,
    },
});


const InvoiceTable = props => {
    const classes = useStyles();
    const { size } = props;
    // Default table
    let rows = <TableRow><TableCell>Выберите объект</TableCell></TableRow>
    // Loaded table
    
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

export default InvoiceTable;