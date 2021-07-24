import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// Material UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// Custom components
import AddButton from '../../components/Buttons/AddButton/AddButton';
import ObjectAddModal from '../../components/Object/ObjectAddModal/ObjectAddModal';
import ObjectData from '../../components/Object/ObjectData/ObjectData';
// Redux 
import { connect } from 'react-redux';
import { getObjects, getObjectById, getSystemsByObject } from '../../store/actions/core';
import { loadPageName } from '../../store/actions/info';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        display: 'flex',
        flex: 1,
        padding: theme.spacing(1),
        textAlign: 'left',
        alignItems: 'center',
    },
    formControl: {
        margin: theme.spacing(1),
        mindWidth: 200,
        width: 200,
    },
    button: {
        marginRight: 10,
        marginLeft: 10,
    },
    icon: {
        cursor: 'pointer',
    },
}));

const ObjectsContainer = React.memo(props => {
    const { objectsData, objectsLoaded } = props;
    const classes = useStyles();
    const [object, setObject] = useState('');
    const [objectModal, setObjectModal] = useState(false);
    const [accordionClickable, setAccordionClickable] = useState(false);
    // Loading data for a chosen object
    const objChange = (event) => {
        const objName = event.target.value;
        setObject(objName);
        const objFound = objectsData.filter(obj => obj.name === objName)[0];
        props.getObjectById(objFound.id);
        props.getSystemsByObject(objFound.id);
        setAccordionClickable(true);
    };
    // Setting page name
    useEffect(() => {
        props.loadPageName('Данные объекта');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Fetching objects
    useEffect(() => {
        props.getObjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Opening the object add modal
    const addClickHandler = () => {
        setObjectModal(true);
        setTimeout(() => setObjectModal(false), 500)
    };
    // Objects list by default
    let objectsList = <MenuItem>Загрузка</MenuItem>;

    if (objectsLoaded) {
        objectsList = props.objectsData.map(item => {
            return(
                <MenuItem value={item.name} key={item.name}>
                    {item.name}
                </MenuItem>
            );
        });
    };
    
        return(
                <div className={classes.root}>
                <ObjectAddModal show={objectModal}/>
                <Grid container spacing={1}>
                    <Grid item xs={12} >
                        <Paper className={classes.paper}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="object-select-label">Выбор объекта</InputLabel>
                                <Select
                                labelId="object-select-label"
                                id="object-select"
                                onChange={objChange}
                                value={object}>
                                {objectsList}
                                </Select>
                            </FormControl>
                            <AddButton tooltipOn="Добавить объект" tooltipOff="Недоступно"
                            addingEnabled={true}  clicked={addClickHandler}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} >
                        <ObjectData clickable={accordionClickable} />
                    </Grid>
                </Grid>
                </div>
        );
});

const mapStateToProps = state => {
    return {
        objectsLoaded: state.core.objectsLoaded,
        objectsData: state.core.objectsData,
    };
};

export default connect(mapStateToProps, 
    { getObjects, getObjectById, getSystemsByObject, loadPageName })(ObjectsContainer);