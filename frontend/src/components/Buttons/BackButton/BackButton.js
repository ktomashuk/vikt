import React from 'react';
// Material UI
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// Redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { backClick } from '../../../store/actions/back';

const BackButton = (props) => {
    const { history, backActive, backClick } = props;
    return(
    <React.Fragment>
    {backActive &&
        <Button variant="contained" edge="end" disabled={!backActive}
        onClick={() => {
          history.goBack();
          backClick();
        }}>
            <Typography>
                Назад
            </Typography>
        </Button>
    }
    </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        backActive: state.back.backActive,
    };
};

export default connect(mapStateToProps, { backClick })(withRouter(BackButton));