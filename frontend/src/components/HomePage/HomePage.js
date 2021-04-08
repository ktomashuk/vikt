import React from 'react';
import { connect } from 'react-redux';

const HomePage = props => {
    
    let dashboard = '';
    if (props.isAuthenticated) {
        dashboard = (
            <h1>Hello, {props.username}!</h1>
        );
    } else {
        dashboard = <h1>Please log in</h1>
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
        username: state.auth.username,
    };
};

export default connect(mapStateToProps)(HomePage);