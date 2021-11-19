import React from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import CheckIcon from '@material-ui/icons/Check';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// Redux
import { connect } from 'react-redux';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    row: {
        cursor: 'pointer',
        fontSize: 16,
    },
    redText: {
        color: 'red',
    },
    greenText: {
        color: 'green',
    },
});

const PurchasesBillRow = (props) => {
    const classes = useStyles();
    const { row, contractorsList, contractorsLoaded, invoicesChosenData, clicked } = props;
    // Converting date yyyy-mm-dd format to dd.mm.yyyy
    const [year, month, day] = row.inv_date.split('-');
    const date = `${day}.${month}.${year}`;
    const notAssigned = row.not_assigned > 0 ? true : false;
    const notReceived = row.not_received > 0 ? true : false;
    // Finding contractors name in a list
    const contractor = contractorsLoaded ?
    contractorsList.find(contractor => contractor.id === row.contractor).name : '';
    // Icons to determine if invoice has any unassigned positions
    const notAssignedIcon = (
        <Tooltip title={
        <React.Fragment>
        <Typography>
            {notAssigned ? 'Без привязки: ' + row.not_assigned: null}
        </Typography>
        <Typography>
            {notReceived ? 'Не получено: ' + row.not_received: null}
        </Typography>
        </React.Fragment>
        }>
            <PriorityHighIcon />
        </Tooltip>
    );
    const allAssignedIcon = (
        <Tooltip title={<Typography>Все учтено</Typography>}>
            <CheckIcon style={{color: 'green'}}/>
        </Tooltip>
    );

    return(
        <React.Fragment key={`fr${row.id}`}>
            <TableRow key={`row${row.id}`} hover
            style={row.id === invoicesChosenData.id ? {backgroundColor: 'lightblue'} : {} }>
                <TableCell key={`date${row.id}`} padding="default" className={classes.row}
                onClick={() => clicked(row.id)}>
                    {date}
                </TableCell>
                <TableCell key={`number${row.id}`} padding="default" className={classes.row}
                onClick={() => clicked(row.id)}>
                    {row.number}
                </TableCell>
                <TableCell key={`contractor${row.id}`} padding="default" className={classes.row}
                onClick={() => clicked(row.id)}>
                    {contractor}
                </TableCell>
                <TableCell key={`not_assigned${row.id}`} padding="default" className={classes.row}>
                    <Typography className={notAssigned || notReceived ? classes.redText : classes.greenText}
                    onClick={() => clicked(row.id)}>
                    {row.not_assigned > 0 || row.not_received > 0 ? notAssignedIcon : allAssignedIcon}
                    </Typography>
                </TableCell>
                <TableCell key={`info${row.id}`} padding="default" className={classes.row}>
                    <Tooltip title={
                        <Typography>
                        Редактировать
                        </Typography>
                        } arrow>
                        <EditIcon fontSize="small" style={{color: 'blue'}} 
                        onClick={(event) => event.preventDefault}/>
                    </Tooltip>
                    <Tooltip title={
                        <Typography>
                        Удалить
                        </Typography>
                        } arrow>
                        <DeleteIcon 
                        key={`delete${row.id}`}
                        color="action" fontSize="small"
                        onClick={() => console.log('CLICKED!!')}/>
                    </Tooltip>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        contractorsLoaded: state.contr.contractorsLoaded,
        contractorsList: state.contr.contractorsList,
        invoicesChosenData: state.inv.invoicesChosenData,
    };
};

export default connect(mapStateToProps)(PurchasesBillRow);