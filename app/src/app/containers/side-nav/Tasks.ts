import {
    focusWindow,
    instancesSelector,
    startApplication,
 } from 'applications';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Tasks from './../../components/side-nav/Tasks';

const mapStateToProps = (state: any) => {
    return {
        tasks: instancesSelector(state),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        focus: focusWindow,
        startApplication,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tasks as any);
