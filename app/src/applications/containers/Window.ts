import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeApplication } from './../actions/application';
import { showTaskManager } from './../actions/taskManager';
import {
    focusWindow,
    minimizeWindow,
    moveWindow,
    resizeWindow,
} from './../actions/windows';
import instanceSelector from './../selectors/instance';

import Window from './../components/Window';

const mapStateToProps = (state: any, props: any) => {
    const instance = instanceSelector(state, props.instance);

    return {
        application: instance.application,
        themeColor: instance.themeColor,
        title: instance.title,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        close: closeApplication,
        focus: focusWindow,
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
