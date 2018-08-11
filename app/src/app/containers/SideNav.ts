import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideSideNav } from './../actions/sideNav';
import sideNavSelector from './../selectors/sideNav';

import SideNav from './../components/side-nav/SideNav';

const mapStateToProps = (state: any) => {
    return sideNavSelector(state);
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        hideSideNav,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SideNav);
