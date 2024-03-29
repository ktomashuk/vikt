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
// Redux
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    container: {
        [theme.breakpoints.down('lg')]:{
        height: 565,
        },
        [theme.breakpoints.up('lg')]:{
        height: 780,
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
        position: 'relative',
        left: '45%',
    },
    loadingText: {
        position: 'relative',
        left: '30%',
    },
}));


const ContractorList = (props) => {
    const classes = useStyles();
    const { contractorsLoaded, contractorsList, contractorListSpinner } = props;
    // Default table
    let rows = <TableRow><TableCell>
        <p className={classes.loadingText}>Выберите тип контрагента</p>
        </TableCell></TableRow>
    // Loaded table
    if (contractorsLoaded) {
        rows = contractorsList.map((row) => {
            return(
                <ContractorRow row={row} key={`cr${row.id}`}/>
            );
        })
    };
    // Showing spinner while loading
    if (contractorListSpinner) {
        rows = <TableRow><TableCell>
        <CircularProgress className={classes.loading} />
        </TableCell></TableRow>
    }
    return(
        <Paper key="papertable" className={classes.root}>
            <TableContainer key="tablecontainer" className={classes.container}>
                <Table key="tablemain" stickyHeader aria-label="table1" size="medium">
                    <TableHead key="tablehead">
                        <TableRow key="header">
                            <TableCell key="head"
                            style={{ maxWidth: 1500}}>
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
        contractorListSpinner: state.contr.contractorListSpinner,
    };
};

export default connect(mapStateToProps )(ContractorList);