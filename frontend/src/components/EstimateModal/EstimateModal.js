import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';
import { addEstimateRow } from '../../store/actions/estimates';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EstimateModal = (props) => {
  const classes = useStyles();
  // Variables to control opening/closing
  const { show, estimatesObject } = props;
  const [open, setOpen] = React.useState(false);
  // Setting a row to be added
  const [newRow, setNewRow] = useState({
      object: 1,
      system_number: 0,
      ware_number: 0,
      ware: '',
      units: '',
      quantity: 0,
      price: 0,
      system: '',
      note: '',
  });
  // Units of measure
  const units = ["шт.", "м.", "км.", "кг.", "г.", "компл.", "упак.", "набор"];
  // Setting object id
  useEffect(() => {
    setNewRow({...newRow, object: estimatesObject})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estimatesObject]);
  // Closing the modal
  const handleClose = () => {
    setNewRow({
        system_number: 0,
        ware_number: 0,
        ware: '',
        units: 'шт.',
        quantity: 0,
        price: 0,
        system: '',
        note: '',
    });
    setOpen(false); 
    };
  // Opening the modal
  useEffect(() => {
      if (show)  {
          setOpen(true);
      }
  }, [show])
  // Add row and prepare for another
  const addRowAndContinue = () => {
    const data = JSON.stringify(newRow);
    props.addEstimateRow(data);
    setNewRow({
        system_number: 0,
        ware_number: 0,
        ware: '',
        units: 'шт.',
        quantity: 0,
        price: 0,
        system: '',
        note: '',
    });
  };
  // Add row and close modal
  const addRowAndClose = () => {
    const data = JSON.stringify(newRow);
    props.addEstimateRow(data);
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} fullWidth maxWidth="lg" >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Добавить позицию в смету
            </Typography>
          </Toolbar>
        </AppBar>
        <Table size="small" style={{marginTop: 10}}>
                            <TableBody>
                            <TableRow key={`cr`}>
                                <TableCell key={`tc`}>
                                <TextField label="№ системы" style={{width: '10%', marginRight: 10}}
                                onChange={(e) => setNewRow({...newRow, system_number: e.target.value})}
                                value={newRow.system_number}/>
                                <TextField label="№ материала" style={{width: '10%', marginRight: 10}}
                                onChange={(e) => setNewRow({...newRow, ware_number: e.target.value})}
                                value={newRow.ware_number}/>
                                <FormControl key={`fc`} style={{width: "10%"}}>
                                    <InputLabel>Ед.изм</InputLabel>
                                    <Select native style={{marginRight: 10, }}
                                    onChange={(e) => {setNewRow({...newRow, units: e.target.value})}}
                                    defaultValue={newRow.units}>
                                    {units.map(unit => {return(
                                        <option key={`option_${unit}`}>{unit}</option>
                                    )})}
                                </Select>
                                </FormControl>
                                <TextField label="Кол-во" style={{width: '10%', marginRight: 10}}
                                onChange={(e) => setNewRow({...newRow, quantity: e.target.value})}
                                value={newRow.quantity}/>
                                <TextField label="Цена" style={{width: '10%', marginRight: 10}}
                                onChange={(e) => setNewRow({...newRow, price: e.target.value})}
                                value={newRow.price}/>
                                <TextField label="Система" style={{width: '15%', marginRight: 10}}
                                onChange={(e) => setNewRow({...newRow, system: e.target.value})}
                                value={newRow.system}/>
                                <TextField label="Примечание" style={{width: '30%'}}
                                onChange={(e) => setNewRow({...newRow, note: e.target.value})}
                                value={newRow.note}/>
                                </TableCell>
                            </TableRow>
                            <TableRow key={`cr2`}>
                                <TableCell>
                                <TextField label="Наименование" style={{width: '100%'}}
                                onChange={(e) => setNewRow({...newRow, ware: e.target.value})}
                                value={newRow.ware}/>
                                </TableCell>
                            </TableRow>
                            </TableBody>
                        </Table>
                        <div className={classes.root}>
                        <Button variant="contained" color="secondary" onClick={handleClose}>Отмена</Button>
                        <Button variant="contained" color="primary" 
                        onClick={() => addRowAndContinue()}>Сохранить и добавить ещё</Button>
                        <Button variant="contained" color="primary" 
                        onClick={() => addRowAndClose()}>Сохранить и выйти</Button>
                        <Button variant="contained" color="primary"
                        onClick={() => console.log(estimatesObject)}>Click me</Button>
                        </div>
      </Dialog>
    </div>
  );
}

const mapStateToProps = state => {
  return {
      estimatesObject: state.est.estimatesObject,
  };
};

export default connect(mapStateToProps, { addEstimateRow })(EstimateModal);