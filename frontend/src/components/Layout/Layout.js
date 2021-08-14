import React, { useEffect } from 'react';
// Custom components
import ErrorModal from '../UI/ErrorModal/ErrorModal';
import InfoModal from '../UI/InfoModal/InfoModal';
import SnackBar from '../UI/SnackBar/SnackBar';
import MainDrawer from '../Navigation/NavigationBar/Drawer';
import Loading from '../UI/Loading/Loading';
// Redux
import { connect } from 'react-redux';
import { checkAuthentication } from '../../store/actions/auth';
import { hideError } from '../../store/actions/errors';
import { hideInfo } from '../../store/actions/info';
import { hideSnack } from '../../store/actions/snack';
import ExportModal from '../Export/ExportModal/ExportModal';

const Layout = React.memo(props => {
    const { isAuthenticated, checkAuthentication, pageName, errorShow, errorMessage,
    showInfo, infoMessage, hideInfo, hideError, showSnack, snackSeverity, snackMessage,
    hideSnack, loadingSpinner } = props;
    // Getting user names when he is authenticated
    useEffect(() => {
        checkAuthentication();
    }, [isAuthenticated, checkAuthentication]);
    
      return (
        <React.Fragment>
            <MainDrawer pageName={pageName}/>
            <ExportModal />
            <ErrorModal 
            show={errorShow} 
            message={errorMessage}
            clicked={() => {hideError()}}/>
            <InfoModal 
            show={showInfo} 
            message={infoMessage}
            clickedOk={() => {hideInfo()}}/>
            <SnackBar 
            show={showSnack}
            message={snackMessage}
            severity={snackSeverity}
            clicked={() => {hideSnack()}}/>
            <Loading active={loadingSpinner}/>
        </React.Fragment>
    );
});

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        username: state.auth.username,
        errorShow: state.err.errorShow,
        errorMessage: state.err.errorMessage,
        pageName: state.info.pageName,
        showInfo: state.info.showInfo,
        infoMessage: state.info.infoMessage,
        loadingSpinner: state.info.loadingSpinner,
        snackSeverity: state.snack.snackSeverity,
        snackMessage: state.snack.snackMessage,
        showSnack: state.snack.showSnack,
    };
};

export default connect(mapStateToProps, { checkAuthentication, hideError, hideInfo, hideSnack })(Layout);