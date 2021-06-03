import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ReplayIcon from '@material-ui/icons/Replay';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { undoEstimateRowDelete, undoEstimateRowEdit } from '../../store/actions/undo';
import { getEstimatesByObject, 
    getEstimatesByObjectBySystem, 
    searchEstimatesByObject,
    searchEstimatesByObjectBySystem } from '../../store/actions/estimates';

const useStyles = makeStyles(() => ({
    root: {
        cursor: 'pointer',
    },
}));

const UndoButton = props => {
    
    const classes = useStyles();
    const { undoActive, undoType, undoData, undoId, estimatesObject, estimatesSystem, searchActive, searchResult } = props;
    // Refreshing the data after the undo
    const refreshData = () => {
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
                refreshData();
                break;
            case 'estimate_row_edit':
                props.undoEstimateRowEdit(undoId, data)
                refreshData();
                break;
            default:
                break;
        }
    }
    // Tooltip text
    let tooltipTitle = <h6>Отмена недоступна</h6>;
    if (undoActive && undoType === 'estimate_row_delete') {
        tooltipTitle = <h6>Отменить удаление</h6>
    }
    if (undoActive && undoType === 'estimate_row_edit') {
        tooltipTitle = <h6>Отменить редактирование</h6>
    }
        return(
            <Box className={classes.root}>
                <Tooltip
                title={tooltipTitle} arrow>
               <Fab color="primary" aria-label="add" size="medium">
               <ReplayIcon 
               style={props.undoActive ? {color: 'white'} : {color: 'grey'}}
               onClick={undoActive ? () => undoClickHandler(undoType, undoData) : undefined}/>
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
        searchEstimatesByObject, searchEstimatesByObjectBySystem })(UndoButton)