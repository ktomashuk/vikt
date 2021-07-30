import React from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import ReplayIcon from '@material-ui/icons/Replay';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
// Redux
import { connect } from 'react-redux';
import { undoEstimateDelete, undoEstimateRowEdit, undoClear,
    undoCableJournalDelete, undoCableJournalRowEdit } from '../../../store/actions/undo';
import { getEstimatesByObject, getEstimatesByObjectBySystem, 
    searchEstimatesByObject, searchEstimatesByObjectBySystem,  } from '../../../store/actions/estimates';

const useStyles = makeStyles(() => ({   
    root: {
        cursor: 'pointer',
        marginLeft: 10,
        marginBottom: 5,
    },
}));

const UndoButton = props => {
    
    const classes = useStyles();
    const { undoActive, undoType, undoData, undoId, } = props;
    // Clicking the undo button
    const undoClickHandler = async (type, data) => {
        switch (type) { 
            // Undoing the deleting of an estimates row
            case 'estimate_delete':
                await props.undoEstimateDelete(data);
                props.undoClear();
                break;
            case 'estimate_row_edit':
                await props.undoEstimateRowEdit(undoId, data);
                props.undoClear();
                break;
            case 'cable_journal_delete':
                await props.undoCableJournalDelete(data);
                props.undoClear();
                break;
            case 'cable_journal_edit':
                await props.undoCableJournalRowEdit(undoId, data);
                props.undoClear();
                break;
            default:
                break;
        }
    };
    // Tooltip text
    let tooltipTitle = "Отмена недоступна";
    if (undoActive) {
        switch (undoType) {
            case 'estimate_row_delete':
            case 'cable_journal_delete':
                tooltipTitle = "Отменить удаление";
                break;
            case 'estimate_row_edit':
            case 'cable_journal_edit':
                tooltipTitle = "Отменить редактирование";
                break;
            default:
                break;
        };
    };
        return(
            <Box className={classes.root}>
                <Tooltip
                title={<Typography variant="subtitle1">{tooltipTitle}</Typography>} arrow>
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
    { undoEstimateDelete, undoEstimateRowEdit,
        getEstimatesByObject, getEstimatesByObjectBySystem,
        searchEstimatesByObject, searchEstimatesByObjectBySystem,
        undoCableJournalDelete, undoCableJournalRowEdit, undoClear })(UndoButton);