import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import PayButton, {
    IPayButtonData,
    IPayButtonProps,
} from './../components/PayButton';

const PayButtonForm = reduxForm<IPayButtonData, IPayButtonProps>({
    form: 'payment',
})(PayButton);

const mapStateToProps = (state: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({}, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PayButtonForm);
