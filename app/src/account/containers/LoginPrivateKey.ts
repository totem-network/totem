import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import { loginPrivateKey } from './../actions/login';
import LoginPrivateKey, {
    ILoginPrivateKeyData,
    ILoginPrivateKeyProps,
} from './../components/form/LoginPrivateKey';
import validate from './../validators/loginPrivateKey';

const LoginPrivateKeyForm = reduxForm<ILoginPrivateKeyData, ILoginPrivateKeyProps>({
    form: 'loginPrivateKey',
    validate,
})(LoginPrivateKey);

const mapStateToProps = (state: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        login: loginPrivateKey,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginPrivateKeyForm);
