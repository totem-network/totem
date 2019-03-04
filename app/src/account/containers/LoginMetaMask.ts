import { web3InitializedSelector } from 'app';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import { loginMetaMask } from '../actions/login';
import LoginMetaMask, {
    ILoginMetaMaskData,
    ILoginMetaMaskProps,
} from '../components/form/LoginMetaMask';
import providedAccountSelector from '../selectors/providedAccount';
// import profileSelector from '../selectors/profile';
import validate from '../validators/loginMetaMask';

const LoginMetaMaskForm = reduxForm<ILoginMetaMaskData, ILoginMetaMaskProps>({
    form: 'loginMetaMask',
    validate,
})(LoginMetaMask as any);

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
)(LoginMetaMaskForm);
