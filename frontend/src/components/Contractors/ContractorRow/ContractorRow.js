import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
import { getContractorById } from '../../../store/actions/contractors';

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
    const { row, getContractorById } = props;
    // Clicking a row
    const rowClickHandler = (rowId) => {
        getContractorById(rowId);
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


export default connect(null, { getContractorById })(ContractorRow);