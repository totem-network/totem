import { accountAddressSelector } from 'account';
import { startApplication } from 'applications';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from './../../components/side-nav/Header';

const mapStateToProps = (state: any) => {
    return {
        address: accountAddressSelector(state),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        startApplication,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header as any);
