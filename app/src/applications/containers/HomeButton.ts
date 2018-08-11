import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideTaskManager } from './../actions/taskManager';
import { minimizeAll } from './../actions/windows';

import HomeButton from './../components/task-manager/HomeButton';

const mapStateToProps = (state: any, props: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        hideTaskManager,
        minimizeAll,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeButton);
