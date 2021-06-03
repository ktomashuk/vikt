import React from 'react'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    containerTop: {
        marginLeft: 20,
        display: 'flex',
        justifyContent: 'start',
    },
    paper: {
        height: "100%",
    },

});

const ContractorReqs = (props) => {
    const classes = useStyles();
    const { contractor } = props;
    return(
        <React.Fragment>
                <Box className={classes.containerTop}>
                <TextField label="ИНН" defaultValue="7714333985"
                style={{width: '15%', marginRight: 20, marginTop: 10}}/>
                <TextField label="ОГРН/ОГРНИП" defaultValue="1157746270912"
                style={{width: '20%', marginRight: 20, marginTop: 10}}/>
                <TextField label="КПП" defaultValue="771401001"
                style={{width: '15%', marginRight: 20, marginTop: 10}}/>
                <TextField label="Код по ОКПО" defaultValue="42846998"
                style={{width: '16%', marginRight: 20, marginTop: 10}}/>
                <TextField label="ОКВЭД" defaultValue="69.20"
                style={{width: '11%', marginRight: 20, marginTop: 10}}/>
                <TextField label="ОКТМО" defaultValue="45334000"
                style={{width: '11%', marginTop: 10}}/>
                </Box>
                <Box className={classes.containerTop}>
                <TextField label="Юр.адрес" defaultValue="125124, г. Москва, 1-я ул. Ямского поля, д. 28"
                style={{width: '48%', marginRight: 20, marginTop: 10}}/>
                <TextField label="Факт.адрес" defaultValue="125124, г. Москва, 1-я ул. Ямского поля, д. 28"
                style={{width: '48%', marginTop: 10}}/>
                </Box>
                <Box className={classes.containerTop}>
                <TextField label="Банк" defaultValue="АО АЛЬФА-БАНК"
                style={{width: '44%', marginRight: 20, marginTop: 10}}/>
                <TextField label="БИК" defaultValue="044525593"
                style={{width: '15%', marginRight: 20, marginTop: 10}}/>
                <TextField label="Ген. директор" defaultValue="Рыжий Вячеслав Игоревич"
                style={{width: '35%', marginTop: 10}}/>
                </Box>
                <Box className={classes.containerTop}>
                <TextField label="Кор.счет" defaultValue="30101810200000000593"
                style={{width: '48%', marginRight: 20, marginTop: 10}}/>
                <TextField label="Р/сч" defaultValue="40702810401400005254"
                style={{width: '48%', marginTop: 10}}/>
                </Box>
        </React.Fragment>
        );
}

export default ContractorReqs;