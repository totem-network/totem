import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submit } from 'redux-form';
import CryptoCurrencies from '../../components/views/crypto-currencies/View';

const mapStateToProps = (state: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        addTokenSubmit: submit,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CryptoCurrencies);
