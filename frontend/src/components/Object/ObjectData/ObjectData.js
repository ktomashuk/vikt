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
import QueueIcon from '@material-ui/icons/Queue';
// Custom components
import ObjectSystemsTable from '../ObjectSystemsTable/ObjectSystemsTable';
import ObjectSystemsModal from '../ObjectSystemsModal/ObjectSystemsModal';
// Redux
import { connect } from 'react-redux';
import { deleteObject, editObjectData, getObjects } from '../../../store/actions/core';
// For comparing objects
const _ = require('lodash');

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
    const { chosenObjectId, chosenObjectData, clickable } = props;
    // State for controlling buttons
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
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
            setObject({
                ...object,
                id: chosenObjectId,
                name: chosenObjectData.name,
                full_name: chosenObjectData.full_name,
                city: chosenObjectData.city,
                address: chosenObjectData.address,
                contractors: chosenObjectData.contractors,
            });
        }
    }, [chosenObjectId])
    // Opening the first accordion when object is selected
    useEffect(() => {
        if (clickable) {
            setAccordion({...accordion, data: true, systems: false });
        };
    }, [clickable]);
    // Clicking save button
    const saveClickHandler = () => {
        const equality = _.isEqual(object, chosenObjectData);
        if (!equality) {
            props.editObjectData(object.id, object);
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
        props.deleteObject(object.id);
        props.getObjects();
        setDeleting(false);
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
        <QueueIcon style={{marginLeft: 10}}
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
    };
};

export default connect(mapStateToProps, 
    { deleteObject, editObjectData, getObjects })(ObjectData);