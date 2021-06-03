import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
import { getContractorById } from '../../store/actions/contractors';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    row: {
        cursor: 'pointer',
        fontSize: 16,
    },
});

const ContractorRow = (props) => {
    const classes = useStyles();
    const { row } = props;
    // Clicking a row
    const rowClickHandler = (rowId) => {
        props.getContractorById(rowId);
    };

    return(
        <React.Fragment key={`fr${row.id}`}>
            <TableRow key={`row${row.id}`} hover>
                <TableCell key={`c${row.id}`} padding="default" 
                onClick={() => rowClickHandler(row.id)}
                className={classes.row}>
                    {row.name}
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        contractorData: state.contr.contractorData,
        contractorDataLoaded: state.contr.contractorDataLoaded,
    };
};

export default connect(mapStateToProps, { getContractorById })(ContractorRow);