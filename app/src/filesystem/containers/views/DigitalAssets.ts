import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DigitalAssets from '../../components/views/digital-assets/View';

const mapStateToProps = (state: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({}, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DigitalAssets);
