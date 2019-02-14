import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import instanceSelector from '../selectors/instance';

import ApplicationWindow from '../components/ApplicationWindow';

const mapStateToProps = (state: any, props: any) => {
    const instance = instanceSelector(state, props.instance);

    return {
        application: instance.application,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({}, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ApplicationWindow);
