import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Spinner from '../UI/Spinner/Spinner';
import SaveIcon from '@material-ui/icons/Save';
import { getUserProfile, updateUserProfile } from '../../store/actions/auth';
import { showInfo, loadPageName } from '../../store/actions/info';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      marginTop: 10,
      padding: theme.spacing(4),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    text: {
    margin: theme.spacing(1),
    width: '25ch',
    },
  }));

const UserDashboard = props => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const classes = useStyles();

    useEffect(() => {
        // Setting page name
        props.loadPageName('Профиль');
        // Getting current user id from token
        const token = localStorage.getItem('refresh_token');
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.user_id;
        setId(userId);
        // Sending a request
        props.getUserProfile(userId);   
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, []);

    useEffect(() => {
        // Filling forms
        if (props.dataLoaded) {
        setFirstName(props.firstName);
        setLastName(props.lastName);
        setEmail(props.email);
        }
    }, [props]);

    const updateProfileHandler = event => {
        event.preventDefault();
        props.updateUserProfile(id, firstName, lastName, email);
        props.showInfo('Данные успешно сохранены!');
    };

    let userProfile = <Spinner />;

    if (props.dataLoaded) {
    userProfile = (
            <Paper className={classes.paper}>
            <FormGroup m={4} pt={4}>
            <TextField id="firstName" label="Имя" variant="filled" 
            defaultValue={props.firstName} onChange={e => {setFirstName(e.target.value)}} 
            style={{marginBottom: 10}}/>
            <TextField id="lastName" label="Фамилия" variant="filled" 
            defaultValue={props.lastName} onChange={e => {setLastName(e.target.value)}} 
            style={{marginBottom: 10}}/>
            <TextField id="email" label="Email" variant="filled" 
            defaultValue={props.email} onChange={e => {setEmail(e.target.value)}}
            style={{marginBottom: 10}}/>
            <Button variant="contained" color="primary" 
            startIcon={<SaveIcon />} onClick={updateProfileHandler}>
            Сохранить
            </Button>
            </FormGroup>
            </Paper>);
    }

    return(
        <div className={classes.root}>
        <Grid container spacing={4} justify="center" >
          <Grid item xs={6}>
            {userProfile}
          </Grid>
        </Grid>
      </div>
    );
};

const mapStateToProps = state => {
    return {
        firstName: state.auth.firstName,
        lastName: state.auth.lastName,
        email: state.auth.email,
        dataLoaded: state.auth.dataLoaded,
    };
};

export default connect(mapStateToProps, { getUserProfile, updateUserProfile, showInfo, loadPageName })(UserDashboard);