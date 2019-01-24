import { startApplication } from 'applications';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import launchBarSelector from '../selectors/launchBar';

import LaunchBar from '../components/launch-bar/LaunchBar';

const mapStateToProps = (state: any) => {
    return launchBarSelector(state);
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        startApplication,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LaunchBar as any);
