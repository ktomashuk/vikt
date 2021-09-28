import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// Material UI
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import InfoIcon from '@material-ui/icons/Info';
import LinearProgress from '@material-ui/core/LinearProgress';

// Redux
import { connect } from 'react-redux';
import { cableDeleteAddItem, cableDeleteRemoveItem } from '../../../../store/actions/delete';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    icon: {
        cursor: 'pointer',
        marginLeft: 10,
    },
    text: {
        minWidth: 35,
        maxWidth: 1500,
        fontSize: 30,
    },
    checkbox: {
        marginBottom: 1,
    },
    progressBarUnfinished: {
        backgroundColor: 'blue', 
    },
    progressBarFinished: {
        backgroundColor: 'green',  
    },
});

const IsolationRow = (props) => {
    const classes = useStyles();
    const { row, percent, finished, systems, units, purchasedDoc, purchasedFact, infoClick, shipped } = props;

    const mainRow = (
        <React.Fragment key={`fragmentrow${row.id}`}>
        <TableRow key={`r${row.id}`} hover >
            <TableCell padding="default" key={`number${row.id}`}>
            {row.system_number}.{row.ware_number}
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
            <TableCell key={`fact${row.id}`}>
            {purchasedFact}
            </TableCell>
            <TableCell key={`doc${row.id}`}>
            {purchasedDoc}
            </TableCell>
            <TableCell key={`doc${row.id}`}>
            {shipped}
            </TableCell>
            <TableCell key={`percent${row.id}`}>
            <LinearProgress size="1rem" variant="determinate" value={percent}
            classes={finished ? 
            {barColorPrimary: classes.progressBarFinished} : 
            {barColorPrimary: classes.progressBarUnfinished} }/>
            </TableCell>
            <TableCell key={`system${row.id}`}>
            {systems ? systems.find(sys => sys.id === row.system).acronym : null}
            </TableCell>
            <TableCell key={`buttons${row.id}`}>
                <React.Fragment key={`frag2${row.id}`}>
                   <InfoIcon fontSize="small" color="primary" className={classes.icon}
                   onClick={() => infoClick(row.id)}/>
                </React.Fragment>
            </TableCell>
        </TableRow>
        </React.Fragment>
        );
    
    return mainRow;
};

const mapStateToProps = state => {
    return {
        cableJournalLoaded: state.cable.cableJournalLoaded,
        cableJournal: state.cable.cableJournal,
        cableObject: state.cable.cableObject,
        cableSystem: state.cable.cableSystem,
        deleteItemsNumber: state.del.deleteItemsNumber,
        deleteAllEnabled: state.del.deleteAllEnabled,
    };
};


export default connect(mapStateToProps, 
    { cableDeleteRemoveItem, cableDeleteAddItem })(IsolationRow);