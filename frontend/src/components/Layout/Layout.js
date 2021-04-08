import React, { useEffect } from 'react';
import NavigationBar from '../Navigation/NavigationBar/NavigationBar';
import ErrorModal from '../UI/ErrorModal/ErrorModal';
import { connect } from 'react-redux';
import { checkAuthentication } from '../../store/actions/auth';
import { showError, hideError } from '../../store/actions/errors';

const Layout = props => {

    useEffect(() => {
        props.checkAuthentication();
      }, [props]);
    
      return (
        <React.Fragment>
            <NavigationBar isAuthenticated={props.isAuthenticated} username={props.username}/>
            <ErrorModal 
            show={props.errorShow} 
            message={props.errorMessage}
            clicked={() => {props.hideError()}}/>
            {props.children}
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        username: state.auth.username,
        errorShow: state.err.errorShow,
        errorMessage: state.err.errorMessage,
    };
};

export default connect(mapStateToProps, { checkAuthentication, showError, hideError })(Layout);