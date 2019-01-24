import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideTaskManager } from '../actions/taskManager';

import HomeButton from '../components/task-manager/HomeButton';

const mapStateToProps = (state: any, props: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        hideTaskManager,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeButton);
