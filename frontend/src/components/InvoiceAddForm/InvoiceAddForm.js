import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  saveButton: {
    position: 'relative',
    left: '35%'
  },
  invoiceHead: {
    display: 'flex',
    justifyContent: 'center',
  },
  textField: {
    width: '90%',
    marginBottom: 10,
  },
}));

export default function ControlledAccordions() {
  const classes = useStyles();
  const [expandedInfo, setExpandedInfo] = useState(true);
  const [expandedList, setExpandedList] = useState(false);
  const [disabledList, setDisabledList] = useState(true);

  // Clicking save button
  const saveClickHandler = () => {
    setExpandedInfo(false);
    setExpandedList(true);
    setDisabledList(false);
}

  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 }, ]
  
  return (
    <div className={classes.root}>
      <Accordion expanded={expandedInfo} onChange={() => setExpandedInfo(!expandedInfo)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
        <Typography className={classes.heading}>Данные платежки</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Box style={{width: '100%'}}>
        <TextField 
        label="Номер платежки"
        placeholder="Введите номер платежки"
        className={classes.textField}/>
        <Autocomplete
        id="contractor"
        freeSolo
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => (
          <TextField {...params} label="Поставщик" 
          placeholder="Введите название поставщика"
          className={classes.textField}/>
        )}/>
        <TextField
        id="date"
        label="Дата"
        type="date"
        defaultValue="2020-01-01"
        className={classes.textField}
        InputLabelProps={{
        shrink: true,
        }}/>
        <Button variant="contained" color="primary"
        startIcon={<SaveIcon />}
        className={classes.saveButton}
        onClick={saveClickHandler}>Сохранить</Button>     
        </Box>   
        </AccordionDetails>
      </Accordion>
      <Accordion disabled={disabledList} expanded={expandedList} 
      onChange={() => setExpandedList(!expandedList)}
      TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Список товаров</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
            diam eros in elit. Pellentesque convallis laoreet laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}