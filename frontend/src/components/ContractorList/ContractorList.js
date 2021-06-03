import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ContractorRow from '../ContractorRow/ContractorRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 600,
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
        position: 'relative',
        left: '45%',
    },
});


const ContractorList = (props) => {
    const classes = useStyles();
    const { contractorsLoaded, contractorsList} = props;
    // Default table
    let rows = <TableRow><TableCell>
        <CircularProgress className={classes.loading}/>
        </TableCell></TableRow>
    // Loaded table
    if (contractorsLoaded) {
        rows = contractorsList.map((row) => {
            return(
                <ContractorRow row={row} key={`cr${row.id}`}/>
            );
        })
    }
    return(
        <Paper key="papertable" className={classes.root}>
            <TableContainer key="tablecontainer" className={classes.container}>
                <Table key="tablemain" stickyHeader aria-label="table1" size="medium">
                    <TableHead key="tablehead">
                        <TableRow key="header">
                            <TableCell key="head"
                            style={{ maxWidth: 1500}}>
                            <h6>Поставщики</h6>
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
        contractorsLoaded: state.contr.contractorsLoaded,
        contractorsList: state.contr.contractorsList,
    };
};

export default connect(mapStateToProps)(ContractorList);