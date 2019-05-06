import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginPrivateKey } from './../actions/login';
import LoginPrivateKey from './../components/form/LoginPrivateKey';

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
)(LoginPrivateKey);
