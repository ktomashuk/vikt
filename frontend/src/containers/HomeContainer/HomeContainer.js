import React, { useEffect } from 'react'
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// Custom components
import HomeTop from '../../components/HomePage/HomeTop/HomeTop';
import HomeNews from '../../components/HomePage/HomeNews/HomeNews';
// Redux
import { connect } from 'react-redux';
import { loadPageName } from '../../store/actions/info';

const useStyles = makeStyles((theme) => ({
    box: {
        display: 'flex',
        flex: 1,
        marginLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    topPanel: {
        height: 100,
    },
    leftPanel: {
        height: 650,
    },
    rightPanel: {
        height: 650,
    },
}));

const HomeContainer = (props) => {
    const { loadPageName } = props;
    const classes = useStyles();
    // Setting page name
    useEffect(() => {
        loadPageName('Главная');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <div>
            <Grid container spacing={0}>
            <Grid item xs={12} className={classes.topPanel}> 
            <HomeTop />
            </Grid>
                <Grid item xs={6} className={classes.leftPanel}>
                <HomeNews />
                </Grid>
                <Grid item xs={6} className={classes.rightPanel}>

                </Grid>
            </Grid>
        </div>
    );
};


  export default connect(null, { loadPageName })(HomeContainer);