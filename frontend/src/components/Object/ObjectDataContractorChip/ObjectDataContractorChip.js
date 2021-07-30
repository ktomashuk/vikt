import React from 'react'
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    chip: {
        marginLeft: 10,
    }
  }));

const ObjectDataContractorChip = props => {
    const classes = useStyles();
    const { name, deletable, deleteClick } = props;
    
    return(
        <React.Fragment>
            <Chip className={classes.chip}
            label={name}
            onDelete={deletable ? deleteClick : undefined}
            />
        </React.Fragment>
    );
};

export default ObjectDataContractorChip;