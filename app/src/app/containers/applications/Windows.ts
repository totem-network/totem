import {
    instancesSelector,
    taskManagerSelector,
    windowsSelector,
 } from 'applications';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Windows from './../../components/applications/Windows';

const mapStateToProps = (state: any) => {
    return {
        instances: instancesSelector(state),
        showTaskManager: taskManagerSelector(state).showTaskManager,
        windows: windowsSelector(state),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({}, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Windows as any);
