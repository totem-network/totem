import { accountSelector } from 'account';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from './../../components/side-nav/Header';

const mapStateToProps = (state: any) => {
    return accountSelector(state);
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({}, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);
