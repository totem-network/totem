import { web3InitializedSelector } from 'app';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginMetaMask } from '../actions/login';
import LoginMetaMask from '../components/form/LoginMetaMask';
import providedAccountSelector from '../selectors/providedAccount';
import validate from '../validators/loginMetaMask';

const mapStateToProps = (state: any) => {
    return {
        account: providedAccountSelector(state),
        web3: web3InitializedSelector(state),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        login: loginMetaMask,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginMetaMask);
