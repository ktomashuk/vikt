import React, { useEffect, useState } from 'react'
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
// Custom components
import ExportSignerChip from '../ExportSignerChip/ExportSignerChip';
// Redux
import { connect } from 'react-redux';
import { exportIsolationWord } from '../../../store/actions/export';
import { showInfo } from '../../../store/actions/info';
// Adding contractors menu height
const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
      display: 'flex',
      justifyContent: 'center',
      marginTop: 10,
    },
    box: {
        marginLeft: 10,
        marginBottom: 10,
        paddingTop: 10,
        display: 'flex',
        justifyContent: 'start',
    },
  }));

const ExportIsolation = props => {
    const classes = useStyles();
    const {closeClick, data, signers, exportIsolationWord, showInfo } = props;
    // State for controlling menu for adding contractors
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    // State for export data
    const [fields, setFields] = useState({
        city: '',
        date: '2020-01-01',
        code: '',
        objectName: '',
        projectName: '',
        customerSigners: [],
        installerSigners: [],
        deviceName: '',
        deviceNumber: '',
        deviceDate: '',
        tableContents: [],
        signersList: [],
    });
    // Filling the fields with data
    useEffect(() => {
        setFields( fields => ({
            ...fields,
            city: data.systemCity,
            code: data.systemCode,
            objectName: data.full_name,
            projectName: data.systemName,
            journal: data.tableContents,
            signersList: signers,
        }));
    }, [data, signers]);
    // Clicking add signer button to open a menu
    const addSignerOpenClickHandler = (event) => {
        setAnchorEl(event.currentTarget);
      };
    // Closing the signer menu
    const addSignerCloseClickHandler = () => {
        setAnchorEl(null);
      };
    // Adding a signer to an export
    const addSignerClickHandler = (id) => {
        // Check if total number of signers is not higher than 4 (not enough space for more than 4 in a template)
        if (fields.signersFinal.length < 4) {
            const personToAdd = fields.signersList.filter(item => item.id === id)[0];
            const newSigners = {...fields, 
                signersFinal: [...fields.signersFinal, personToAdd],
            };
            setFields(newSigners);
        } else {
            showInfo('Нельзя добавить больше 4х подписантов!');
        };
    };
    // Deleting a signer from an export
    const deleteSignerClickHandler = (id) => {
        const newSigners = {...fields,
            signersFinal: fields.signersFinal.filter(item => item.id !== id)
        };
        setFields(newSigners);
    };
    // Executing an export
    const exportFinishClickHandler = () => {
        // Setting the date string in a format mm.yy
        const dateMonth = fields.date.substr(5,2);
        const dateYear = fields.date.substr(2,2);
        const date = dateMonth + '.' + dateYear;
        // Creating final data for export
        const exportData = {
            city: 'Москва',
            date: '"09" августа 2021г.',
            object_name: 'Жилой комплекс с дошкольными образовательными учреждениями, школой, надземными паркингами, инженерными сетями и объектами инженерной инфраструктуры. 1 этап стрительства по адресу, г.Москва, НАО, поселение Московский, д.Картмазово,д.16/1,ДОО.',
            project_name: fields.projectName,
            customer_signers: [{name: 'Панин А.В.', position: 'Производитель работ'},
            {name: 'Алимов Р.Х.', position: 'Инженер строительного контроля'}],
            installer_signers: [{name: 'Томащук В.П.', position: 'Генеральный директор'}],
            note: 'Норма',
            device_name: 'Мегаомметр МЕГЕОН-13200',
            device_number: '04982863',
            device_date: '03.02.2021',
            table_contents: fields.journal,
        };
        exportIsolationWord(exportData);
    };

    return(
        <React.Fragment>
            <Table size="small" style={{marginTop: 10}}>
            <TableBody>
            <TableRow key='cbexprow1'>
                <TableCell ley='cbexpcell1'>
                <TextField style={{width: '20%', marginLeft: 10 }} label="Город"
                value={fields.company} 
                onChange={(e) => setFields({...fields, company: e.target.value})}/>
                <TextField style={{width: '15%', marginLeft: 10 }} label="Название объекта"
                value={fields.acronym} 
                onChange={(e) => setFields({...fields, acronym: e.target.value})}/>
                <TextField style={{width: '45%', marginLeft: 10 }} label="Шифр проекта"
                value={fields.code} 
                onChange={(e) => setFields({...fields, code: e.target.value})}/>
                
                <TextField
                style={{marginLeft: 10}}
                id="date"
                label="Дата"
                type="date"
                defaultValue="2020-01-01"
                onChange={(e) => setFields({...fields, date: e.target.value})}
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }} />
                <Box className={classes.box}>       
                <Typography vatiant="h6">
                    Подписанты ASAS:
                </Typography>   
                </Box>
                <Box className={classes.box}>
                <Chip style={{ marginLeft: 10 }} color="primary"
                label="Добавить подписанта" 
                onClick={addSignerOpenClickHandler}/>
                <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={addSignerCloseClickHandler}
                PaperProps={{
                style: { maxHeight: ITEM_HEIGHT * 4.5, width: '35ch' },}} >
                {fields.signersList ? fields.signersList.map((person) => (
                <MenuItem key={person.id} onClick={() => addSignerClickHandler(person.id)}>
                    {person.first_name} {person.last_name}
                </MenuItem>
                )) : null }
                </Menu>
                {fields.signersFinal ? fields.signersFinal.map((person) => {
                    return <ExportSignerChip key={person.id}
                    firstName={person.first_name} lastName={person.last_name}
                    deleteClick={() => deleteSignerClickHandler(person.id)}/>
                }) : null}
                </Box>
                </TableCell>
            </TableRow>
            </TableBody>
            </Table>
            <div className={classes.root}>
            <Button variant="contained" color="secondary" onClick={closeClick}>Отмена</Button>
            <Button variant="contained" color="primary" 
            onClick={() => exportFinishClickHandler()}>Экспорт в Word</Button>
            </div>
        </React.Fragment>
    );
};

export default connect(null, { exportIsolationWord, showInfo })(ExportIsolation);