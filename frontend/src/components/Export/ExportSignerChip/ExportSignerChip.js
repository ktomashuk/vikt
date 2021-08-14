import React from 'react'
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    chip: {
        marginLeft: 10,
    }
  }));

const ExportSignerChip = props => {
    const classes = useStyles();
    const { firstName, lastName, deleteClick } = props;
    
    return(
        <React.Fragment>
            <Chip className={classes.chip}
            label={firstName + ' ' + lastName}
            onDelete={deleteClick}
            />
        </React.Fragment>
    );
};

export default ExportSignerChip;