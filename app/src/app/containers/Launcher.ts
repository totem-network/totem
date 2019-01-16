import {
    hideLauncher,
    launcherSelector,
    startApplication,
} from 'applications';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Launcher from '../components/launcher/Launcher';

const mapStateToProps = (state: any) => {
    return launcherSelector(state);
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        hideLauncher,
        startApplication,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Launcher);
