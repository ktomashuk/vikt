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
import ObjectSystemsRow from '../ObjectSystemsRow/ObjectSystemsRow';
// Redux
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    container: {
        [theme.breakpoints.down('lg')]:{
        height: 380,
        },
        [theme.breakpoints.up('lg')]:{
        height: 580,
        },
        [theme.breakpoints.up('xl')]:{
        height: 780,
        },
    },
    icon: {
        cursor: 'pointer',
    },
    text: {
        minWidth: 35,
        maxWidth: 150,
        fontSize: 30,
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


const ObjectSystemsTable = (props) => {
    const classes = useStyles();
    const { chosenObjectSystems, chosenObjectSystemsLoaded } = props;
    // Default table
    let rows = <TableRow key="loading">
        <TableCell>
        <CircularProgress className={classes.loading} />
        </TableCell>
        </TableRow>
    // Loaded table
    if (chosenObjectSystemsLoaded) {
        rows = chosenObjectSystems.map((row) => {
            return(
                <ObjectSystemsRow row={row} key={`cr${row.id}`}/>
            );
        })
    };
    return(
        <Paper key="papertable" className={classes.root}>
            <TableContainer key="tablecontainer" className={classes.container}>
                <Table key="tablemain" stickyHeader aria-label="table1" size="medium">
                    <TableHead key="tablehead">
                        <TableRow key="header">
                            <TableCell key="c1">
                            Краткое название
                            </TableCell>
                            <TableCell key="c2">
                            Полное название
                            </TableCell>
                            <TableCell key="c3">
                            Код проекта
                            </TableCell>
                            <TableCell key="c4">
                            Действия
                            </TableCell>
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
        chosenObjectSystems: state.core.chosenObjectSystems,
        chosenObjectSystemsLoaded: state.core.chosenObjectSystemsLoaded,
    };
};

export default connect(mapStateToProps)(ObjectSystemsTable);