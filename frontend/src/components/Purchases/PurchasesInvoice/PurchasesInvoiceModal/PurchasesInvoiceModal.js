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
import InfoModal from '../../../UI/InfoModal/InfoModal';
// Redux
import { connect } from 'react-redux';
import { addPurchase, getPurchaseReferenceById, 
  unloadPurchaseReference, changePurchaseQuantity, editPurchase } from '../../../../store/actions/purchases';
import { getEstimatesByObject, getEstimatesByObjectBySystem,
        getNonEstimatesByObject, getNonEstimatesByObjectBySystem,
        searchEstimatesByObject, searchEstimatesByObjectBySystem,
        searchNonEstimatesByObject, searchNonEstimatesByObjectBySystem,
        unloadEstimates, addNonEstimateRow } from '../../../../store/actions/estimates';
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
    const { addingEnabled, editingEnabled, copyEnabled, units, unitsLoaded, showInfo,
        addPurchase, purchaseById, purchaseByIdLoaded,
        recountInvoice, invoicesChosenId, loadingSpinner,
        estimatesObject, estimatesSystem, estimatesLoaded, unloadEstimates, addNonEstimateRow, 
        chosenObjectId, chosenObjectSystems, chosenObjectSystemsLoaded,
        objectsData, objectsLoaded, getObjectById, estimatesRefreshNeeded,
        getSystemsByObjectAndAddAll, unloadObjectSystems,
        getEstimatesByObject, getEstimatesByObjectBySystem,
        getNonEstimatesByObject, getNonEstimatesByObjectBySystem,
        searchEstimatesByObject, searchEstimatesByObjectBySystem,
        searchNonEstimatesByObject, searchNonEstimatesByObjectBySystem,
        getPurchaseReferenceById, purchaseReference, purchaseReferenceLoaded, 
        unloadPurchaseReference, changePurchaseQuantity, editPurchase} = props;
    // State for opening/closing the modal
    const [open, setOpen] = useState(false);
    // State for handling closing after data was changed
    const [editing, setEditing] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    // State for saving old and new info when editing
    const [dataOld, setDataOld] = useState(null);
    // State for choosing objects and systems in estimate panel
    const [estPanel, setEstPanel] = useState({object: '', system: ''});
    // State for currently selected unit name
    const [unitName, setUnitName] = useState('шт.');
    // State for determining if we need to add a new position or edit an existing one
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
      object: 0,
      system: 0,
      bindId: 0,
      bindName: 'Нет',
      bindType: '',
    });
    // Clicking close modal and checking if data was changed
    const checkClose = () => {
      if (editing) {
        setConfirmModal(true);
      } else {
        handleClose();
      }
    }; 
    // Clicking cancel button on a modal
    const cancelClose = () => {
      setConfirmModal(false);
    };
    // Closing the modal
    const handleClose = () => {
        setOpen(false);
        setModalType({...modalType, editing: false, adding: false,});
        setBind({...bind, active: false, object: '', system: '', bindId: 0});
        setEstPanel({object: '', system: ''});
        setEditing(false);
        setConfirmModal(false);
        unloadEstimates(); 
        unloadPurchaseReference();
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
        setDataOld({...purchaseById});
        if(purchaseByIdLoaded) {
          const newUnitsName = units.find(u => u.id === purchaseById.units).name;
          setUnitName(newUnitsName);
        };
        if (purchaseByIdLoaded && purchaseById.estimate_reference) {
          setBind({...bind,
          active: true,
          bindName: purchaseReference,
          bindId: purchaseById.estimate_reference,
          bindType: 'estimate',
          object: purchaseById.object_reference,
          system: purchaseById.system_reference,
          });
        };
        if (purchaseByIdLoaded && purchaseById.non_estimate_reference) {
          setBind({...bind,
            active: true,
            bindName: purchaseReference,
            bindId: purchaseById.non_estimate_reference,
            bindType: 'nonestimate',
            object: purchaseById.object_reference,
            system: purchaseById.system_reference,
            });
        };
      };
      if (copyEnabled) {
        if(purchaseByIdLoaded) {
          const newUnitsName = units.find(u => u.id === purchaseById.units).name;
          setUnitName(newUnitsName);
        };
        setModalType({...modalType, editing: false, adding: true});
        setOpen(true);
        setDataOld({...purchaseById});
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addingEnabled, editingEnabled, modalType, bind, copyEnabled]);
    // Filling the fields for editing
    useEffect(() => {
        if(purchaseByIdLoaded) {
            setPurchaseDetails({...purchaseDetails, ...purchaseById});
            getPurchaseReferenceById(purchaseById.id);              
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[purchaseById, purchaseByIdLoaded]);
    // Refreshing estimates
    useEffect(() => {
      if (estimatesRefreshNeeded) {
        getEstimatesByObjectBySystem(chosenObjectId, estimatesSystem);
        getNonEstimatesByObjectBySystem(chosenObjectId, estimatesSystem);
      }
    },[estimatesRefreshNeeded, chosenObjectId, estimatesSystem,
      getEstimatesByObjectBySystem, getNonEstimatesByObjectBySystem]);
    // Clicking save edit invoice button
    const confirmEditClickHandler = async () => {
      let editData = {
        ...purchaseDetails,
      };
      if (bind.active) {
        editData = {...editData, 
          assigned: true,
          estimate_reference: bind.bindType === 'estimate' ? bind.bindId : null,
          non_estimate_reference: bind.bindType === 'nonestimate' ? bind.bindId : null,
        };
      };
      await editPurchase(purchaseById.id, editData);
      // Subtracting old value from purchase quantity
      if (dataOld.assigned && dataOld.estimate_reference) {
        const estimateSubtract = {
          bind_type: 'estimate',
          bind: dataOld.estimate_reference,
          object: dataOld.object_reference,
          fact: 0 - dataOld.purchased_fact,
          doc: 0 - dataOld.purchased_doc,
        };
        console.log('SUBTRACTING ESTIMATE');
        console.log(estimateSubtract);
        await changePurchaseQuantity(estimateSubtract);
      };
      if (dataOld.assigned && dataOld.non_estimate_reference) {
        const nonestimateSubtract = {
          bind_type: 'nonestimate',
          bind: dataOld.non_estimate_reference,
          object: dataOld.object_reference,
          fact: 0 - dataOld.purchased_fact,
          doc: 0 - dataOld.purchased_doc,
        };
        console.log('SUBTRACTING NONESTIMATE');
        console.log(nonestimateSubtract);
        await changePurchaseQuantity(nonestimateSubtract);
      };
      // Adding new purchase quantity
      if (bind.active) {
        const quantityData = {
          bind_type: bind.bindType,
          bind: bind.bindId,
          fact: purchaseDetails.purchased_fact,
          doc: purchaseDetails.purchased_doc,
          object: bind.object,
         };
         await changePurchaseQuantity(quantityData);
        };
      setBind({
          ...bind,
          active: false,
          object: 0,
          system: 0,
          bindId: 0,
          bindName: 'Нет',
          bindType: '',
         });
      await recountInvoice(invoicesChosenId);
      setEditing(false);
      setOpen(false);
    };
    // Clicking add invoice button
    const confirmAddClickHandler = async () => {
      // Check form validity
       if (purchaseDetails.ware_name === '') {
           return showInfo('Заполните все поля!');
       }
       const purchaseData = {...purchaseDetails,
        invoice: invoicesChosenId,
        assigned: bind.active,
        received: false,
        estimate_reference: bind.active && bind.bindType === 'estimate' ? bind.bindId : null,
        non_estimate_reference: bind.active && bind.bindType === 'nonestimate' ? bind.bindId : null,
        object_reference: bind.object !== 0 ? bind.object : null,
        system_reference: bind.system !== 0 ? bind.system : null,
        };
       await addPurchase(purchaseData);
       if (bind.active) {
        const quantityData = {
          bind_type: bind.bindType,
          bind: bind.bindId,
          object: chosenObjectId,
          fact: purchaseDetails.purchased_fact,
          doc: purchaseDetails.purchased_doc,
         };
         await changePurchaseQuantity(quantityData);
       };
       await recountInvoice(invoicesChosenId);
       setPurchaseDetails({
        ...purchaseDetails,
        ware_name: '',
        purchased_fact: 0,
        purchased_doc: 0,
        units: 1,
        price: 0,
       });
       setBind({
        ...bind,
        active: false,
        object: '',
        system: '',
        bindId: 0,
        bindName: 'Нет',
        bindType: '',
       });
       setEditing(false);
    };
    // Clicking the bind button if a new item is being added
    const addingBindClickHandler = (id, name, object, system, isEstimate) => {
      if (isEstimate) {
        setBind({...bind, 
          bindType: 'estimate', 
          bindId: id, 
          bindName: name, 
          active: true, 
          object: object,
          system: system,
        });
      } else {
        setBind({...bind, 
          bindType: 'nonestimate', 
          bindId: id, 
          bindName: name, 
          active: true, 
          object: object,
          system: system,
        });
      };
    };
    // Clicking the bind button if an existing item is being edited
    const editingBindClickHandler = (id, name, object, system, isEstimate) => {
      if (isEstimate) {
        setBind({...bind, 
          bindType: 'estimate', 
          bindId: id, 
          bindName: name, 
          active: true, 
          object: object,
          system: system,
        });
      } else {
        setBind({...bind, 
          bindType: 'nonestimate', 
          bindId: id, 
          bindName: name, 
          active: true, 
          object: object,
          system: system,
        });
      };
      setEditing(true);
    };
    // Clicking the button to add a new nonestimate
    const addNonestimateClickHandler = () => {
      const nonEstimateNew = {
        ware: purchaseDetails.ware_name,
        quantity: 0,
        object: chosenObjectId,
        units: purchaseDetails.units,
        system: estimatesSystem,
      };
      // Check for validity
      if (nonEstimateNew.ware === '') {
        return showInfo('Введите название товара');
      } else {
        addNonEstimateRow(nonEstimateNew);
      }
    };
    // Loading data for a chosen object
    const objChange = (event) => {
      unloadEstimates();
      unloadObjectSystems();
      const objName = event.target.value;
      const objFound = objectsData.filter(obj => obj.name === objName)[0];
      setEstPanel({...estPanel, object: objName});
      getEstimatesByObject(objFound.id);
      getNonEstimatesByObject(objFound.id);
      getObjectById(objFound.id);
      getSystemsByObjectAndAddAll(objFound.id);
    };
  // Loading data for a chosen system
  const systemChange = event => {
      const chosenSystem = event.target.value;
      const sysFound = chosenObjectSystems.filter(sys => sys.acronym === chosenSystem)[0]['id'];
      setEstPanel({...estPanel, system: chosenSystem});
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
  setPurchaseDetails({...purchaseDetails, units: newUnitsId});
  setUnitName(e.target.value);
  setEditing(true);
  }}
  value={unitName}>
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
  <Button variant="contained" color="primary" disabled={!editing}
    style={{width: 300}} 
    onClick={() => confirmEditClickHandler()}>Сохранить</Button>
  </div>
  );
  // Buttons for adding by default
  const mainAddButtons = (
  <div className={classes.root}>
  <Button variant="contained" color="primary"
    style={{width: 300}} 
    onClick={() => confirmAddClickHandler()}>Добавить</Button>
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
          value={estPanel.object}>
          {objectsList}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
        <InputLabel id="object-select-label">Выбор системы</InputLabel>
          <Select
          labelId="system-select-label"
          id="system-select"
          onChange={systemChange}
          value={estPanel.system}>
          {systemsList}
          </Select>
        </FormControl>
        <Box component="span">
          <SearchBar type="estimates" filter={searchEstimatesFilter}/>
        </Box>
        {purchaseReferenceLoaded && modalType.editing ?
        <Typography style={{marginLeft: 10, color: 'black'}} variant="subtitle1">
        Текущая привязка: {purchaseReference}
        </Typography>
        : null}
        {modalType.adding ?
        <Typography style={{marginLeft: 10, color: 'black'}} variant="subtitle1">
        Текущая привязка: {bind.bindName}
        </Typography>
        : null}
      </Paper>
    );
    return(
    <React.Fragment>
      <InfoModal show={confirmModal} message="У вас есть не сохраненные данные! Закрыть окно?"
      clickedCancel={cancelClose} clickedOk={handleClose}/>
      <Dialog open={open} onClose={checkClose} TransitionComponent={Transition} fullWidth maxWidth="lg" >
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
                onChange={(e) => {
                  setPurchaseDetails({...purchaseDetails, ware_name: e.target.value});
                  setEditing(true);
                  }}/>
        </TableCell>
        </TableRow>
        <TableRow key={`cr2`}>
        <TableCell key={`tc2`}>
        <TextField style={{width: '29%', marginLeft: 10, marginRight: 10 }} label="Количество по документам"
                value={purchaseDetails.purchased_doc} 
                onChange={(e) => {
                setPurchaseDetails({...purchaseDetails, purchased_doc: e.target.value});
                setEditing(true);
                }}/>
        <TextField style={{width: '29%', marginLeft: 10, marginRight: 10 }} label="Количество по факту"
                value={purchaseDetails.purchased_fact} 
                onChange={(e) => {
                setPurchaseDetails({...purchaseDetails, purchased_fact: e.target.value});
                setEditing(true);
                }}/>
        {unitList}
        <TextField style={{width: '28%', marginLeft: 10}} label="Цена"
                value={purchaseDetails.price} 
                onChange={(e) => {
                setPurchaseDetails({...purchaseDetails, price: e.target.value});
                setEditing(true);
                }}/>
        </TableCell>
        </TableRow>
        </TableBody>
        </Table>
        {modalType.editing ? mainEditButtons : null}
        {modalType.adding ? mainAddButtons : null}
        {estimatesPanel}
        {estimatesLoaded ?
        <PurchasesInvoiceEstimateTable clicked={modalType.adding ? addingBindClickHandler : editingBindClickHandler}
        newNonestimateClick={addNonestimateClickHandler}/>
        : null}
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
        purchaseReference: state.pur.purchaseReference,
        purchaseReferenceLoaded: state.pur.purchaseReferenceLoaded,
        estimatesObject: state.est.estimatesObject,
        estimatesSystem: state.est.estimatesSystem,
        estimatesLoaded: state.est.estimatesLoaded,
        estimatesData: state.est.estimatesData,
        estimatesRefreshNeeded: state.est.estimatesRefreshNeeded,
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
    { showInfo, addPurchase, recountInvoice,
      getEstimatesByObject, getEstimatesByObjectBySystem,
      getNonEstimatesByObject, getNonEstimatesByObjectBySystem,
      searchEstimatesByObject, searchEstimatesByObjectBySystem,
      searchNonEstimatesByObject, searchNonEstimatesByObjectBySystem,
      getSystemsByObjectAndAddAll, getObjectById, unloadObjectSystems,
      unloadEstimates, getPurchaseReferenceById, unloadPurchaseReference, 
      addNonEstimateRow, changePurchaseQuantity, editPurchase })(PurchasesInvoiceModal);