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
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
// Custom components
import PurchasesInvoiceEstimateTable from '../PurchasesInvoiceEstimateTable/PurchasesInvoiceEstimateTable';
import SearchBar from '../../../SearchBar/SearchBar';
import Loading from '../../../UI/Loading/Loading';
// Redux
import { connect } from 'react-redux';
import { addPurchase, deletePurchase } from '../../../../store/actions/purchases';
import { getEstimatesByObject, getEstimatesByObjectBySystem,
        getNonEstimatesByObject, getNonEstimatesByObjectBySystem,
        searchEstimatesByObject, searchEstimatesByObjectBySystem,
        searchNonEstimatesByObject, searchNonEstimatesByObjectBySystem,
        unloadEstimates, } from '../../../../store/actions/estimates';
import { getSystemsByObjectAndAddAll, getObjectById, unloadObjectSystems } from '../../../../store/actions/core';
import { recountInvoice } from '../../../../store/actions/invoices';
import { showInfo } from '../../../../store/actions/info';

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
    textField: {
      marginLeft: 10,
      marginBottom: 10,
    },
    paper: {
      display: 'flex',
      flex: 1,
      padding: theme.spacing(1),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      alignItems: 'center',
      marginBottom: 10,
    },
    formControl: {
      margin: theme.spacing(1),
      mindWidth: 200,
      width: 200,
    },
  }));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PurchasesInvoiceModal = (props) => {
    const classes = useStyles();
    const { addingEnabled, editingEnabled, units, unitsLoaded, showInfo,
        addPurchase, deletePurchase, purchaseById, purchaseByIdLoaded,
        recountInvoice, invoicesChosenId,
        estimatesObject, estimatesSystem, 
        estimatesData, estimatesLoaded, nonEstimatesData, nonEstimatesLoaded,
        chosenObjectId, chosenObjectSystems, chosenObjectSystemsLoaded,
        objectsData, objectsLoaded, getObjectById,
        getSystemsByObjectAndAddAll, unloadObjectSystems,
        getEstimatesByObject, getEstimatesByObjectBySystem,
        getNonEstimatesByObject, getNonEstimatesByObjectBySystem,
        searchEstimatesByObject, searchEstimatesByObjectBySystem,
        searchNonEstimatesByObject, searchNonEstimatesByObjectBySystem,
        unloadEstimates, loadingSpinner } = props;
    // State for opening/closing the modal
    const [open, setOpen] = useState(false);
    // State for deleting the position
    const [deleting, setDeleting] = useState(false);
    // State to determine if we need to add a new position or edit an existing one
    const [modalType, setModalType] = useState({
        editing: false,
        adding: false,
    });
    // State for purchase details
    const [purchaseDetails, setPurchaseDetails] = useState({
        ware_name: '',
        purchased_fact: 0,
        purchased_doc: 0,
        units: 1,
        price: 0,
    });
    // State for binding purchase to the estimates
    const [bind, setBind] = useState({
      active: false,
      object: '',
      system: '',
      bindId: 0,
      bindName: '',
      bindType: '',
    });
    const [bindType, setBindType] = useState('');
    // Closing the modal
    const handleClose = () => {
        setOpen(false);
        setModalType({...modalType, editing: false, adding: false,})
        setBind({...bind, active: false, object: '', system: '', bindId: 0})
    };
    // Opening the modal
    useEffect(() => {
        if (addingEnabled)  {
        setModalType({...modalType, editing: false, adding: true,})
        setPurchaseDetails({...purchaseDetails,
            ware_name: '',
            purchased_fact: 0,
            purchased_doc: 0,
            units: 1,
            price: 0,
        });
        setOpen(true);
        }
        if (editingEnabled) {
        setModalType({...modalType, editing: true, adding: false,})
        setOpen(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addingEnabled, editingEnabled, modalType]);
    // Filling the fields for editing
    useEffect(() => {
        if(purchaseByIdLoaded) {
            setPurchaseDetails({...purchaseDetails, ...purchaseById});              
            // If estimate reference exists set bind info
            if (purchaseById.estimate_reference) {
              setBind({...bind, bindId: purchaseById.estimate_reference});
              setBindType('estimate');
            };
            // If non-estimate reference exists set bind info
            if (purchaseById.non_estimate_reference) {
              setBind({...bind, bindId: purchaseById.non_estimate_reference});
              setBindType('nonestimate');
            } 
            // Set bind to 0 (doesn't exist) if references were not found
            if (!purchaseById.non_estimate_reference && !purchaseById.estimate_reference) {
              setBind({...bind, bindId: 0});
              setBindType('');
            };
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[purchaseById, purchaseByIdLoaded]);
    useEffect(() => {
      if(bindType === 'estimate') {
        const estName = estimatesData.find(est => est.id === purchaseById.estimate_reference).ware;
        setBind({...bind, bindName: estName});
      };
      if(bindType === 'nonestimate') {
        const nonEstName = nonEstimatesData.find(est => est.id === purchaseById.non_estimate_reference).ware;
        setBind({...bind, bindName: nonEstName});
      };
    }, [bindType]);
    // Clicking add invoice button
    const confirmAddClickHandler = async () => {
        // Check form validity
       if (purchaseDetails.ware_name === '') {
           return showInfo('Заполните все поля!');
       }
       const data = {...purchaseDetails,
        invoice: invoicesChosenId
        };
       await addPurchase(data);
       await recountInvoice(invoicesChosenId);
    };
    // Clicking a confirm delete button
    const deleteConfirmClickHandler = () => {
        deletePurchase(purchaseById.id);
        setDeleting(false);
        setOpen(false);
    };
     // Loading data for a chosen object
     const objChange = (event) => {
      unloadEstimates();
      unloadObjectSystems();
      const objName = event.target.value;
      const objFound = objectsData.filter(obj => obj.name === objName)[0];
      setBind({
        ...bind,
        system: '',
        object: objName,
      });
      getEstimatesByObject(objFound.id);
      getNonEstimatesByObject(objFound.id);
      getObjectById(objFound.id);
      getSystemsByObjectAndAddAll(objFound.id);
  };
  // Loading data for a chosen system
  const systemChange = event => {
      const chosenSystem = event.target.value;
      const sysFound = chosenObjectSystems.filter(sys => sys.acronym === chosenSystem)[0]['id'];
      setBind({
        ...bind,
        system: chosenSystem,
      });
      if (chosenSystem === 'Все') {
      getEstimatesByObject(chosenObjectId);
      getNonEstimatesByObject(chosenObjectId);
      } else {
      getEstimatesByObjectBySystem(chosenObjectId, sysFound);
      getNonEstimatesByObjectBySystem(chosenObjectId, sysFound);
      }
  };
  // Searching estimates
  const searchEstimatesFilter = (value, system) => {
    if (estimatesObject === 0) {
        return;
    }
    switch(system) {
        case 'Все':
            searchEstimatesByObject(value, estimatesObject);
            searchNonEstimatesByObject(value, estimatesObject);
            break;
        default:
            searchEstimatesByObjectBySystem(value, estimatesObject, estimatesSystem);
            searchNonEstimatesByObjectBySystem(value, estimatesObject, estimatesSystem);
            break;
        }
  };
    // Form control with a list of units of measure
    let unitList = null;
    if (unitsLoaded) { 
    unitList = (
    <FormControl key={`fc`} style={{width: "10%"}}>
    <InputLabel>Ед.изм</InputLabel>
    <Select native style={{marginRight: 10, }}
    onChange={(e) => {
    const newUnitsId = units.find(u => u.name === e.target.value).id;
    setPurchaseDetails({...purchaseDetails, units: newUnitsId})
    }}
    defaultValue='шт.'>
    {units.map(unit => {return(
    <option key={`option_unit_${unit.id}`}>{unit.name}</option>
    )})}
    </Select>
    </FormControl>
    ); 
    }
    // Buttons for redacting and deleting by default
    const mainEditButtons = (
    <div className={classes.root}>
        <Button variant="contained" color="secondary" onClick={handleClose}>Отмена</Button>
        <Button variant="contained" color="primary" 
        onClick={() => confirmAddClickHandler()}>Сохранить</Button>
        <Button variant="outlined" color="secondary" 
        onClick={() => setDeleting(true)}>Удалить</Button>
        <Button variant="outlined" color="primary" 
        onClick={() => {
          console.log(bind);
          console.log(bindType);
        }}>Призяка</Button>
    </div>
    );
    // Buttons for adding by default
    const mainAddButtons = (
    <div className={classes.root}>
        <Button variant="contained" color="secondary" onClick={handleClose}>Отмена</Button>
        <Button variant="contained" color="primary" 
        onClick={() => confirmAddClickHandler()}>Добавить</Button>
    </div>
    );
    // Buttons for deleting an item
    const deleteButtons = (
    <div className={classes.root}>
        <Button variant="contained" color="secondary" onClick={() => setDeleting(false)}>Отмена</Button>
        <Button variant="contained" color="primary" 
        onClick={() => deleteConfirmClickHandler()}>Удалить</Button>
    </div>
    );
    // Objects list by default
    let objectsList = <MenuItem>Загрузка</MenuItem>;
    // Objects list after it is loaded
    if (objectsLoaded) {
        objectsList = objectsData.map(item => {
            return(
                <MenuItem value={item.name} key={item.name}>
                    {item.name}
                </MenuItem>
            );
        });
    };
    // Systems list by default
    let systemsList = <MenuItem>Загрузка</MenuItem>;
    // Systems list after it is loaded
    if (chosenObjectSystemsLoaded) {
        systemsList = chosenObjectSystems.map(sys => {
            return(
                <MenuItem value={sys.acronym} key={sys.acronym}>
                    {sys.acronym}
                </MenuItem>
            );
        });
    };
    // Panel for choosing object and system and searching for estimates
    let estimatesPanel = (
      <Paper className={classes.paper}>
        <FormControl className={classes.formControl}>
        <InputLabel id="object-select-label">Выбор объекта</InputLabel>
          <Select
          labelId="object-select-label"
          id="object-select"
          onChange={objChange}
          value={bind.object}>
          {objectsList}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
        <InputLabel id="object-select-label">Выбор системы</InputLabel>
          <Select
          labelId="system-select-label"
          id="system-select"
          onChange={systemChange}
          value={bind.system}>
          {systemsList}
          </Select>
        </FormControl>
        <Box component="span">
          <SearchBar type="estimates" filter={searchEstimatesFilter}/>
        </Box>
        <Box style={{marginLeft: 5}}>
        Текущая привязка:
        </Box>
        <Box style={{marginLeft: 5}}>
        {bind.bindId === 0 ? 'Нет' : bind.bindName}
        </Box>
      </Paper>
    );
    return(
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} fullWidth maxWidth="lg" >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {modalType.adding ? 'Добавить позицию в счёт' : 'Редактировать позицию'}
            </Typography>
          </Toolbar>
        </AppBar>
        <Loading active={loadingSpinner}/>
        <Table size="small" style={{marginTop: 10}}>
        <TableBody>
        <TableRow key={`cr`}>
        <TableCell key={`tc`}>
        <TextField style={{width: '99%', marginLeft: 10, marginRight: 10 }} label="Наименование товара"
                value={purchaseDetails.ware_name} 
                onChange={(e) => setPurchaseDetails({...purchaseDetails, ware_name: e.target.value})}/>
        </TableCell>
        </TableRow>
        <TableRow key={`cr2`}>
        <TableCell key={`tc2`}>
        <TextField style={{width: '29%', marginLeft: 10, marginRight: 10 }} label="Количество по документам"
                value={purchaseDetails.purchased_doc} 
                onChange={(e) => setPurchaseDetails({...purchaseDetails, purchased_doc: e.target.value})}/>
        <TextField style={{width: '29%', marginLeft: 10, marginRight: 10 }} label="Количество по факту"
                value={purchaseDetails.purchased_fact} 
                onChange={(e) => setPurchaseDetails({...purchaseDetails, purchased_fact: e.target.value})}/>
        {unitList}
        <TextField style={{width: '28%', marginLeft: 10}} label="Цена"
                value={purchaseDetails.price} 
                onChange={(e) => setPurchaseDetails({...purchaseDetails, price: e.target.value})}/>
        </TableCell>
        </TableRow>
        </TableBody>
        </Table>
        {modalType.editing && !deleting ? mainEditButtons : null}
        {modalType.adding ? mainAddButtons : null}
        {deleting ? deleteButtons : null}
        {estimatesPanel}
        <PurchasesInvoiceEstimateTable />
      </Dialog>
    </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        units: state.core.units,
        unitsLoaded: state.core.unitsLoaded,
        invoicesChosenId: state.inv.invoicesChosenId,
        purchaseById: state.pur.purchaseById,
        purchaseByIdLoaded: state.pur.purchaseByIdLoaded,
        estimatesObject: state.est.estimatesObject,
        estimatesSystem: state.est.estimatesSystem,
        estimatesLoaded: state.est.estimatesLoaded,
        estimatesData: state.est.estimatesData,
        nonEstimatesLoaded: state.est.nonEstimatesLoaded,
        nonEstimatesData: state.est.nonEstimatesData,
        objectsLoaded: state.core.objectsLoaded,
        objectsData: state.core.objectsData,
        chosenObjectId: state.core.chosenObjectId,
        chosenObjectSystems: state.core.chosenObjectSystems,
        chosenObjectSystemsLoaded: state.core.chosenObjectSystemsLoaded,
        loadingSpinner: state.info.loadingSpinner,
    };
};

export default connect(mapStateToProps, 
    { showInfo, addPurchase, deletePurchase, recountInvoice,
      getEstimatesByObject, getEstimatesByObjectBySystem,
      getNonEstimatesByObject, getNonEstimatesByObjectBySystem,
      searchEstimatesByObject, searchEstimatesByObjectBySystem,
      searchNonEstimatesByObject, searchNonEstimatesByObjectBySystem,
      getSystemsByObjectAndAddAll, getObjectById, unloadObjectSystems,
      unloadEstimates })(PurchasesInvoiceModal);