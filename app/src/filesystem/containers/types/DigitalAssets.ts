import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submit } from 'redux-form';
import DigitalAssets from '../../components/types/digital-assets/DigitalAssets';

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
