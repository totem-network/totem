import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CryptoCurrencies from '../../components/views/crypto-currencies/View';

const mapStateToProps = (state: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({}, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CryptoCurrencies);
