import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import { loginMetaMask } from './../actions/login';
import LoginMetaMask, {
    ILoginMetaMaskData,
    ILoginMetaMaskProps,
} from './../components/form/LoginMetaMask';
import validate from './../validators/loginMetaMask';

const LoginMetaMaskForm = reduxForm<ILoginMetaMaskData, ILoginMetaMaskProps>({
    form: 'loginMetaMask',
    validate,
})(LoginMetaMask);

const mapStateToProps = (state: any) => {
    return {};
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
