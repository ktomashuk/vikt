import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ReplayIcon from '@material-ui/icons/Replay';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { undoEstimateRowDelete, undoEstimateRowEdit, undoCableJournalDelete, undoCableJournalRowEdit } from '../../../store/actions/undo';
import { getEstimatesByObject, 
    getEstimatesByObjectBySystem, 
    searchEstimatesByObject,
    searchEstimatesByObjectBySystem } from '../../../store/actions/estimates';

const useStyles = makeStyles(() => ({   
    root: {
        cursor: 'pointer',
        marginLeft: 10,
        marginBottom: 5,
    },
}));

const UndoButton = props => {
    
    const classes = useStyles();
    const { undoActive, undoType, undoData, undoId, estimatesObject, estimatesSystem, searchActive, searchResult } = props;
    // Refreshing the data after the undo
    const refreshEstimateData = () => {
    // Checking what data to load after row was restored
    setTimeout(() => {
        if (estimatesSystem === 'Все' && !searchActive ) {
            props.getEstimatesByObject(estimatesObject);
        };
        if (estimatesSystem !== 'Все' && !searchActive) {
            props.getEstimatesByObjectBySystem(estimatesObject, estimatesSystem);
        };
        if (estimatesSystem === 'Все' && searchActive) {
            props.searchEstimatesByObject(searchResult, estimatesObject);
        };
        if (estimatesSystem !== 'Все' && searchActive) {
            props.searchEstimatesByObjectBySystem(searchResult, estimatesObject, estimatesSystem)  ;
        };
    }, 500);
    };
    // Clicking the undo button
    const undoClickHandler = (type, data) => {
        switch (type) { 
            // Undoing the deleting of an estimates row
            case 'estimate_row_delete':
                props.undoEstimateRowDelete(data);
                refreshEstimateData();
                break;
            case 'estimate_row_edit':
                props.undoEstimateRowEdit(undoId, data)
                refreshEstimateData();
                break;
            case 'cable_journal_delete':
                props.undoCableJournalDelete(data);
                break;
            case 'cable_journal_edit':
                props.undoCableJournalRowEdit(undoId, data);
                break;
            default:
                break;
        }
    }
    // Tooltip text
    let tooltipTitle = <h6>Отмена недоступна</h6>;
    if (undoActive) {
        switch (undoType) {
            case 'estimate_row_delete':
            case 'cable_journal_delete':
                tooltipTitle = <h6>Отменить удаление</h6>;
                break;
            case 'estimate_row_edit':
            case 'cable_journal_edit':
                tooltipTitle = <h6>Отменить редактирование</h6>;
                break;
            default:
                break;
        };
    };
        return(
            <Box className={classes.root}>
                <Tooltip
                title={tooltipTitle} arrow>
               <Fab color="primary" aria-label="add" size="medium"
               onClick={undoActive ? () => undoClickHandler(undoType, undoData) : null}>
               <ReplayIcon 
               style={props.undoActive ? {color: 'white'} : {color: 'grey'}}
               />
               </Fab>
               </Tooltip>
            </Box>
        );
};

const mapStateToProps = state => {
    return {
        undoActive: state.undo.undoActive,
        undoType: state.undo.undoType,
        undoData: state.undo.undoData,
        undoId: state.undo.undoId,
        estimatesObject: state.est.estimatesObject,
        estimatesSystem: state.est.estimatesSystem,
        searchActive: state.srch.searchActive,
        searchResult: state.srch.searchResult,
    };
};

export default connect(mapStateToProps, 
    { undoEstimateRowDelete, undoEstimateRowEdit,
        getEstimatesByObject, getEstimatesByObjectBySystem,
        searchEstimatesByObject, searchEstimatesByObjectBySystem,
        undoCableJournalDelete, undoCableJournalRowEdit })(UndoButton);