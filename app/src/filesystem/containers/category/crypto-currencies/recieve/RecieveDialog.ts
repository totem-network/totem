import {
    accountAddressSelector,
} from 'account';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RecieveDialog from '../../../../components/category/crypto-currencies/recieve/RecieveDialog';

const mapStateToProps = (state: any, props: any) => {
    const address = accountAddressSelector(state);

    return {
        ...props,
        address,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({}, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RecieveDialog as any);
