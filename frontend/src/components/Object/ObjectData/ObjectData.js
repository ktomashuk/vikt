import React, { useEffect, useState } from 'react'
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// Custom components
import ObjectSystemsTable from '../ObjectSystemsTable/ObjectSystemsTable';
import ObjectSystemsModal from '../ObjectSystemsModal/ObjectSystemsModal';
import ObjectDataContractorChip from '../ObjectDataContractorChip/ObjectDataContractorChip';
// Redux
import { connect } from 'react-redux';
import { deleteObject, editObjectData, getObjects } from '../../../store/actions/core';
import { getContractors } from '../../../store/actions/contractors';
// For comparing objects
const _ = require('lodash');
// Adding contractors menu height
const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
    box: {
        marginLeft: 10,
        marginBottom: 10,
        paddingTop: 10,
        display: 'flex',
        justifyContent: 'start',
    },
    paperBottom: {
        width: '99%',
        height: '100%',
    },
  }));

const ObjectData = (props) => {
    const classes = useStyles();
    const { chosenObjectId, chosenObjectData, clickable, contractorsList, 
        deleteObject, editObjectData, getObjects, getContractors } = props;
    // State for controlling buttons
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    // State for controlling menu for adding contractors
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    // State for controlling accordion
    const [accordion, setAccordion] = useState({
        data: false,
        systems: false,
    });
    // State for opening a modal
    const [systemsModal, setSystemsModal] = useState(false);
    // State for editing data
    const [object, setObject] = useState(
        {
            id: 0,
            name: '',
            city: '',
            address: '',
            full_name: '',
            contractors: [],
          }
      );
    // Setting the state after object is chosen
    useEffect(() => {
        if (chosenObjectId !== 0) {
            setObject(object => ({
                ...object,
                id: chosenObjectId,
                name: chosenObjectData.name,
                full_name: chosenObjectData.full_name,
                city: chosenObjectData.city,
                address: chosenObjectData.address,
                contractors: chosenObjectData.contractors,
            }));
            getContractors();
        }
    }, [chosenObjectId, chosenObjectData, getContractors])
    // Opening the first accordion when object is selected
    useEffect(() => {
        if (clickable) {
            setAccordion(accordion => ({...accordion, data: true, systems: false }));
        };
    }, [clickable]);
    // Clicking add contractor button to open a menu
    const addContractorOpenClickHandler = (event) => {
        setAnchorEl(event.currentTarget);
      };
    // Closing the contractor menu
    const addContractorCloseClickHandler = () => {
        setAnchorEl(null);
      };
    // Adding a contractor to an object
    const addContractorClickHandler = (id) => {
        // Only add new contractor if it doesnt exist in an array already
        if (!object.contractors.includes(id)) {
            const newData = {...object, 
                contractors: [...object.contractors, id],
            };
            editObjectData(object.id, newData);
            setObject(newData);
        };
        addContractorCloseClickHandler();
    };
    // Clicking save button
    const saveClickHandler = () => {
        const equality = _.isEqual(object, chosenObjectData);
        if (!equality) {
            editObjectData(object.id, object);
        }
        setEditing(false);
    };
    // Clicking cancel button
    const cancelClickHandler = () => {
        setObject(chosenObjectData);
        setEditing(false);
        setDeleting(false);
    };
    // Clicking delete button
    const deleteClickHandler = () => {
        deleteObject(object.id);
        getObjects();
        setDeleting(false);
    };
    // Clicking delete on a contractor chip
    const deleteContractorHandler = (id) => {
        const newData = {...object, 
        contractors: object.contractors.filter(item => item !== id),
        };
        editObjectData(object.id, newData);
        setObject(newData);
    };
    // Opening the system add modal
    const addClickHandler = () => {
        setSystemsModal(true);
        setTimeout(() => setSystemsModal(false), 500)
    };
    // Button to add system
    const addSystemButton = (
    <React.Fragment>
    <Tooltip title={<h6>Добавить систему</h6>} arrow>
        <AddBoxIcon style={{marginLeft: 10}}
        onClick={(event) => {
            event.stopPropagation();
            addClickHandler();
        }}/>
    </Tooltip>
    </React.Fragment>
    );
    // Buttons when editing is disabled
    const buttonsDefault = (
        <React.Fragment>
        <Button variant="contained" color="primary" 
        className={classes.button} onClick={() => setEditing(true)}>
        Редактировать
        </Button>
        <Button variant="contained" color="secondary" 
        className={classes.button} onClick={() => setDeleting(true)}>
        Удалить
        </Button>
        </React.Fragment>);
        // Save and cancel buttons when editing is enabled
        const buttonsEditOn = (
            <React.Fragment>
            <Button variant="contained" color="primary" 
            className={classes.button} onClick={() => saveClickHandler()}>Сохранить</Button>
            <Button variant="contained" color="secondary" 
            className={classes.button} onClick={() => cancelClickHandler()}>Отменить</Button>
            </React.Fragment>
        );
        // Confirm and cancel buttons when deleting is enabled
        const buttonsDeleteOn = (
            <React.Fragment>
            <Button variant="contained" color="primary" 
            className={classes.button} onClick={() => deleteClickHandler()}>Удалить</Button>
            <Button variant="contained" color="secondary" 
            className={classes.button} onClick={() => cancelClickHandler()}>Отменить</Button>
            </React.Fragment>
        );
    return(
        <React.Fragment>
        <ObjectSystemsModal show={systemsModal} />
        <Accordion expanded={accordion.data} TransitionProps={{ unmountOnExit: true }}
        onChange={clickable ? () => setAccordion({...accordion, data: !accordion.data, systems: !accordion.systems}) : undefined}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header">
        Общие данные
        </AccordionSummary>
        <AccordionDetails>
        <Paper className={classes.paperBottom}>
        <Box className={classes.box}>
                <TextField style={{width: '20%', marginLeft: 10 }} label="Название"
                value={object.name} 
                onChange={ editing ? (e) => setObject({...object, name: e.target.value}) : undefined }/>
                <TextField style={{width: '70%', marginLeft: 10 }} label="Полное наименование"
                value={object.full_name} 
                onChange={ editing ? (e) => setObject({...object, full_name: e.target.value}) : undefined }/>
            </Box>
            <Box className={classes.box}>
                <TextField style={{width: '20%', marginLeft: 10 }} label="Город"
                value={object.city} 
                onChange={ editing ? (e) => setObject({...object, city: e.target.value}) : undefined }/>
                <TextField style={{width: '70%', marginLeft: 10 }} label="Адрес"
                value={object.address} 
                onChange={ editing ? (e) => setObject({...object, address: e.target.value}) : undefined}/>
            </Box>
            <Divider />
            <Box className={classes.box}>       
            <Typography vatiant="h6">
                Компании на объекте:
            </Typography>   
            </Box>
            <Box className={classes.box}>          
            {chosenObjectId && contractorsList ? 
            chosenObjectData.contractors.map((contractor) => {
                const contractorName = contractorsList.filter(item => item.id === contractor)[0].name;
                return(
                <ObjectDataContractorChip key={contractor} name={contractorName} deletable={editing} 
                deleteClick={() => deleteContractorHandler(contractor)}/>
            )}) : null }
            {chosenObjectId && !chosenObjectData.contractors[0] && !editing ?
            <Chip style={{ marginLeft: 10 }} label="Нет компаний" color="secondary"/> : null }
            {editing ? 
            <React.Fragment>
            <Chip style={{ marginLeft: 10 }} color="primary"
            label="Добавить компанию" 
            onClick={addContractorOpenClickHandler}/>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={addContractorCloseClickHandler}
                PaperProps={{
                style: { maxHeight: ITEM_HEIGHT * 4.5, width: '20ch' },}} >
                {contractorsList.map((option) => (
                <MenuItem key={option.name} onClick={() => addContractorClickHandler(option.id)}>
                    {option.name}
                </MenuItem>
                ))}
            </Menu>
            </React.Fragment>
            : null }
            </Box>
            <Box style={{marginTop: 20, marginLeft: '40%', paddingBottom: 10,}}>
            {!editing && !deleting ? buttonsDefault : null }
            {editing ? buttonsEditOn : null}
            {deleting ? buttonsDeleteOn : null}
            </Box>
            </Paper>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={accordion.systems} TransitionProps={{ unmountOnExit: true }}
      onChange={clickable ? () => setAccordion({...accordion, systems: !accordion.systems, data: !accordion.data}) : undefined}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header">
        Системы 
        {accordion.systems ? addSystemButton : null}
        </AccordionSummary>
        <AccordionDetails>
            <Box className={classes.box} style={{ width: '100%'}}>
                <ObjectSystemsTable />
            </Box>
        </AccordionDetails>
        </Accordion>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        chosenObjectId: state.core.chosenObjectId,
        chosenObjectData: state.core.chosenObjectData,
        contractorsList: state.contr.contractorsList,
    };
};

export default connect(mapStateToProps, 
    { deleteObject, editObjectData, getObjects, getContractors })(ObjectData);