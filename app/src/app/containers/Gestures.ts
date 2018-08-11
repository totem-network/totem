import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showSideNav } from './../actions/sideNav';

import Gestures from './../components/gestures/Gestures';

const mapStateToProps = (state: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        swipeFromLeft: showSideNav,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Gestures);
