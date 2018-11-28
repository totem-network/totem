import { hideLauncher } from 'applications/actions/launcher';
import launcherSelector from 'applications/selectors/launcher';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Launcher from './../components/launcher/Launcher';

const mapStateToProps = (state: any) => {
    return launcherSelector(state);
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        hideLauncher,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Launcher);
