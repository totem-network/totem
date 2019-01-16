import {
    launcherSelector,
    startApplication,
} from 'applications';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LaunchBar from '../components/launch-bar/LaunchBar';

const mapStateToProps = (state: any) => {
    return launcherSelector(state);
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        startApplication,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LaunchBar);
