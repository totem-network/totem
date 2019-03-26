import {
    currentNetworkSelector,
    feeSelector,
    fetchFee,
} from 'network';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submit } from 'redux-form';
import SendCryptoCurrencyDialog from '../../../components/views/crypto-currencies/SendCryptoCurrencyDialog';

const mapStateToProps = (state: any, props: any) => {
    const {
        network,
        platform,
    } = currentNetworkSelector(state);

    const fee = feeSelector(state, platform, network);

    if (!fee) {
        return {
            gasPriceFast: '0',
            gasPriceSafeLow: '0',
            network,
            platform,
        };
    }

    return {
        gasPriceFast: fee.fast,
        gasPriceSafeLow: fee.safeLow,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        fetchFee,
        submit,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SendCryptoCurrencyDialog as any);
