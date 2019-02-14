import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideSideNav } from '../actions/instances';
import sideNavSelector from '../selectors/sideNav';

import SideNav from '../components/side-nav/SideNav';

const mapStateToProps = (state: any, props: any) => {
    return {
        isVisible: sideNavSelector(state, props.instance),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        hideSideNav,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SideNav as any);
