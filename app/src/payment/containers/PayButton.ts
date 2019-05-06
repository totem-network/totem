import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PayButton from './../components/PayButton';

const mapStateToProps = (state: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({}, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PayButton);
