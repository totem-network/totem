import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Images from '../../components/category/images/View';

const mapStateToProps = (state: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({}, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Images);
