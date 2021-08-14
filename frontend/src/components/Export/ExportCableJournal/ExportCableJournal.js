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
import { exportCableJournalWord } from '../../../store/actions/export';
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

const ExportCableJournal = props => {
    const classes = useStyles();
    const {closeClick, data, signers, exportCableJournalWord, showInfo } = props;
    // State for controlling menu for adding contractors
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    // State for export data
    const [fields, setFields] = useState({
        acronym: '',
        code: '',
        company: '',
        journal: [],
        date: '2020-01-01',
    });
    // Filling the fields with data
    useEffect(() => {
        setFields( fields => ({
            ...fields,
            acronym: data.systemAcronym,
            code: data.systemCode,
            journal: data.tableContents,
            signersList: signers,
            signersFinal: [],
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
        // Declaring a lot of variables for names and positions of signers in a template (p for postion, n for name, d for date)
        let p1 = '';
        let p2 = '';
        let p3 = '';
        let p4 = '';
        let n1 = '';
        let n2 = '';
        let n3 = '';
        let n4 = '';
        let d1 = '';
        let d2 = '';
        let d3 = '';
        let d4 = '';
        // Create an array of signers with the dates
        for (let i = 0; i < fields.signersFinal.length; i++) {
            // Setting the name in a format of Last name + one-letter first name and patron name
            const fullName = fields.signersFinal[i].last_name + ' ' + 
                fields.signersFinal[i].first_name.charAt(0) + '.' + fields.signersFinal[i].last_name.charAt(0) + '.';
            const job = fields.signersFinal[i].position;
            // See what iteration it is and set export data accordingly
            // Isn't done through an array because of the word template problems, has to be done in separate variables
            switch(i) {
                case 0:
                    p1 = job;
                    n1 = fullName;
                    d1 = date;
                    break;
                case 1:
                    p2 = job;
                    n2 = fullName;
                    d2 = date;
                    break;
                case 2:
                    p3 = job;
                    n3 = fullName;
                    d3 = date;
                    break;
                case 3:
                    p4 = job;
                    n4 = fullName;
                    d4 = date;
                    break;
                default:
                    break;
            };
        };
        // Creating final data for export
        const exportData = {
            table_contents: fields.journal,
            system_code: fields.code,
            system_name: fields.acronym,
            company_name: fields.company,
            p1: p1,
            p2: p2,
            p3: p3,
            p4: p4,
            n1: n1,
            n2: n2,
            n3: n3,
            n4: n4,
            d1: d1,
            d2: d2,
            d3: d3,
            d4: d4,
        };
        exportCableJournalWord(exportData);
    };

    return(
        <React.Fragment>
            <Table size="small" style={{marginTop: 10}}>
            <TableBody>
            <TableRow key='cbexprow1'>
                <TableCell ley='cbexpcell1'>
                <TextField style={{width: '15%', marginLeft: 10 }} label="Краткое название"
                value={fields.acronym} 
                onChange={(e) => setFields({...fields, acronym: e.target.value})}/>
                <TextField style={{width: '45%', marginLeft: 10 }} label="Шифр проекта"
                value={fields.code} 
                onChange={(e) => setFields({...fields, code: e.target.value})}/>
                <TextField style={{width: '20%', marginLeft: 10 }} label="Компания"
                value={fields.company} 
                onChange={(e) => setFields({...fields, company: e.target.value})}/>
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
                    Подписанты:
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

export default connect(null, { exportCableJournalWord, showInfo })(ExportCableJournal);