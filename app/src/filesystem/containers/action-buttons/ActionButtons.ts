import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showSideNav } from 'app';

import ActionButtons from '../../components/action-buttons/ActionButtons';

const mapStateToProps = (state: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        showSideNav,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ActionButtons);
