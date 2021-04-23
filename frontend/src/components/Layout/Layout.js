import React, { useEffect } from 'react';
import ErrorModal from '../UI/ErrorModal/ErrorModal';
import InfoModal from '../UI/InfoModal/InfoModal';
import MainDrawer from '../Navigation/NavigationBar/Drawer';
import { connect } from 'react-redux';
import { checkAuthentication } from '../../store/actions/auth';
import { hideError } from '../../store/actions/errors';
import { hideInfo } from '../../store/actions/info';

const Layout = props => {

    useEffect(() => {
        props.checkAuthentication();
       // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
      return (
        <React.Fragment>
            <MainDrawer pageName={props.pageName}/>
            <ErrorModal 
            show={props.errorShow} 
            message={props.errorMessage}
            clicked={() => {props.hideError()}}/>
            <InfoModal 
            show={props.showInfo} 
            message={props.infoMessage}
            clickedOk={() => {props.hideInfo()}}/>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        username: state.auth.username,
        errorShow: state.err.errorShow,
        errorMessage: state.err.errorMessage,
        pageName: state.info.pageName,
        showInfo: state.info.showInfo,
        infoMessage: state.info.infoMessage,
    };
};

export default connect(mapStateToProps, { checkAuthentication, hideError, hideInfo })(Layout);