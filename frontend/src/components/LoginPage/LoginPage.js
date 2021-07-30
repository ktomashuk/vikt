import React, { useState, useEffect } from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// Redux
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/auth';
import { loadPageName } from '../../store/actions/info';
// Router
import { Redirect, withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    box: {
        display: 'flex',
        marginLeft: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper : {
        width: '50%',
        paddingBottom: 10,
        paddingTop: 10,
    },
    text: {
        width: '80%',
        marginBottom: 10,
    },
    button: {
        width: '50%',
    },
}));

const LoginPage = props => {
    const classes = useStyles();
    const { isAuthenticated } = props;
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
    props.loadPageName('Войти');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <Box className={classes.box}>
                <Paper className={classes.paper}>
                <Box className={classes.box}>
                    <Typography variant="h6">
                        Введите данные для авторизации
                    </Typography>
                </Box>
                <Box className={classes.box}>
                <TextField className={classes.text} 
                label="Логин" variant="outlined" placeholder="Введите логин"
                value={login} 
                onChange={(e) => {setLogin(e.target.value)}}/>
                </Box>
                <Box className={classes.box}>
                <TextField className={classes.text} 
                label="Пароль" variant="outlined" placeholder="Введите пароль"
                value={password} type="password"
                onChange={(e) => {setPassword(e.target.value)}}/>
                </Box>
                <Box className={classes.box}>
                <Button className={classes.button}
                variant="contained" color="primary"
                onClick={() => props.loginUser(login, password)}>
                        Войти
                </Button>
                </Box>    
                </Paper>
            </Box>
        {isAuthenticated ? <Redirect to="/" /> : null}
        </React.Fragment>
    );
};


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};


export default connect(mapStateToProps,{ loginUser, loadPageName })(withRouter(LoginPage));