import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { getUserProfile, updateUserProfile } from '../../store/actions/auth';
import { loadPageName } from '../../store/actions/info';
import { showSnack } from '../../store/actions/snack';
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
    const { dataLoaded, firstName, lastName, email, 
      getUserProfile, updateUserProfile, showSnack, loadPageName } = props;
    const [profile, setProfile] = useState({
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
    });
    const classes = useStyles();

    useEffect(() => {
        // Setting page name
        loadPageName('Профиль');
        // Getting current user id from token
        const token = localStorage.getItem('refresh_token');
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.user_id;
        setProfile(profile => ({...profile, id: userId}));
        // Sending a request
        getUserProfile(userId);   
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, []);

    useEffect(() => {
        // Filling forms
        if (dataLoaded) {
          setProfile(profile => ({...profile, 
            firstName: firstName,
            lastName: lastName,
            email: email,
        }));
        }
    }, [dataLoaded, firstName, lastName, email]);

    const updateProfileHandler = event => {
        event.preventDefault();
        updateUserProfile(profile.id, profile.firstName, profile.lastName, profile.email);
        showSnack('Данные успешно сохранены!', 'success');
    };

    let userProfile = null;

    if (dataLoaded) {
    userProfile = (
            <Paper className={classes.paper}>
            <FormGroup m={4} pt={4}>
            <TextField id="firstName" label="Имя" variant="filled" 
            defaultValue={firstName} onChange={e => setProfile({...profile, firstName: e.target.value})} 
            style={{marginBottom: 10}}/>
            <TextField id="lastName" label="Фамилия" variant="filled" 
            defaultValue={lastName} onChange={e => setProfile({...profile, lastName: e.target.value})}
            style={{marginBottom: 10}}/>
            <TextField id="email" label="Email" variant="filled" 
            defaultValue={email} onChange={e => setProfile({...profile, email: e.target.value})}
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

export default connect(mapStateToProps, { getUserProfile, updateUserProfile, showSnack, loadPageName })(UserDashboard);