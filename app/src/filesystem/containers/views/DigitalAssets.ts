import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submit } from 'redux-form';
import DigitalAssets from '../../components/views/digital-assets/View';

const mapStateToProps = (state: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        addDigitalAssetSubmit: submit,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DigitalAssets);
