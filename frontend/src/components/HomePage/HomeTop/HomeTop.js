import React from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
// Redux
import { connect } from 'react-redux';
// Router
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    box: {
        display: 'flex',
        marginLeft: 10,
        marginBottom: 10,
        justifyContent: 'center',
    },
}));

const HomeTop = props => {
    const classes = useStyles();
    const { firstName, lastName, isAuthenticated } = props;

    let dashboard = (
        <React.Fragment>
            <Box className={classes.box}>
            <Typography variant="h4">
            Чтобы получить доступ к порталу, войдите в систему!
            </Typography>
            </Box>
            <Box className={classes.box}>
            <Button variant="contained" color="primary" title="Войти"
            onClick={() => {props.history.push(`/login`);}}>
            Войти
            </Button>
            </Box>
        </React.Fragment>
    );

    if (isAuthenticated) {
        const fullName = firstName + ' ' + lastName;
        dashboard = (
            <React.Fragment>
            <Box className={classes.box}>
            <Typography variant="h4">
            Здравствуйте, {fullName}!
            </Typography>
            </Box>
                <Box className={classes.box}>
                    <Button variant="contained" color="primary"
                    onClick={() => {console.log(localStorage.getItem('access_token'))}}>
                    JWT
                    </Button>
                </Box>
            </React.Fragment>
        );
    }
    return(
        <div>
            {dashboard}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        firstName: state.auth.firstName,
        lastName: state.auth.lastName,
    };
};

export default connect(mapStateToProps)(withRouter(HomeTop));