import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeApplication } from '../actions/application';
import {
    hideTaskManager,
    showTaskManager,
} from '../actions/taskManager';
import {
    focusWindow,
    minimizeWindow,
    moveWindow,
    resizeWindow,
} from '../actions/windows';
import instanceSelector from '../selectors/instance';

import Window from '../components/window/Window';

const mapStateToProps = (state: any, props: any) => {
    const instance = instanceSelector(state, props.instance);

    return {
        themeColor: instance.themeColor,
        title: instance.title,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        close: closeApplication,
        focus: focusWindow,
        hideTaskManager,
        minimize: minimizeWindow,
        move: moveWindow,
        resize: resizeWindow,
        showTaskManager,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Window);
