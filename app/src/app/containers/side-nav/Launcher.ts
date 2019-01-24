import { showLauncher } from 'app/actions/launcher';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Launcher from './../../components/side-nav/Launcher';

const mapStateToProps = (state: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        showLauncher,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Launcher);
