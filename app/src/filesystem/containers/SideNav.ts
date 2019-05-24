import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import sideNavSelector from '../selectors/sideNav';

import SideNav from '../components/side-nav/SideNav';

const mapStateToProps = (state: any, props: any) => {
    return {
        isVisible: sideNavSelector(state, props.instance),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({}, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SideNav as any);
