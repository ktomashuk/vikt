import React from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import LinkIcon from '@material-ui/icons/Link';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
// Redux
import { connect } from 'react-redux';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    icon: {
        cursor: 'pointer',
    },
    text: {
        minWidth: 35,
        maxWidth: 1500,
        fontSize: 30,
    },
    checkbox: {
        margin: 'auto',
    },
});

const EstimatesRow = props => {
    const classes = useStyles();
    const { row, units, systems, clicked } = props;
    const isEstimate = row.system_number ? true : false;
    let mainRow = (
            <React.Fragment key={`fragmentrow${row.id}`}>
            <TableRow key={`r${row.id}`} hover >
                <TableCell padding="default" key={`number${row.id}`}>
                {row.system_number ?
                row.system_number + "." + row.ware_number
                : 'Б/Н'}
                </TableCell>
                <TableCell key={`ware${row.id}`}>
                {row.ware}                    
                </TableCell>
                <TableCell key={`units${row.id}`}>
                {units.find(u => u.id === row.units).name}
                </TableCell>
                <TableCell key={`quantity${row.id}`}>
                {row.quantity}
                </TableCell>
                <TableCell key={`system${row.id}`}>
                {systems ? systems.find(sys => sys.id === row.system).acronym : null}
                </TableCell>
                <TableCell key={`buttons${row.id}`}>
                    <React.Fragment key={`frag2${row.id}`}>
                    <Tooltip title={
                        <Typography>
                            Привязать
                        </Typography>
                    }>
                    <LinkIcon className={classes.icon} style={{color: "green"}}
                    onClick={() => clicked(row.id, row.ware, row.object, row.system, isEstimate)}/>
                    </Tooltip>
                    </React.Fragment>
                </TableCell>
            </TableRow>
            </React.Fragment>
        );

    return mainRow;
};

const mapStateToProps = state => {
    return {
        deleteItemsNumber: state.del.deleteItemsNumber,
        deleteAllEnabled: state.del.deleteAllEnabled,
    };
};


export default connect(mapStateToProps, { })(EstimatesRow);