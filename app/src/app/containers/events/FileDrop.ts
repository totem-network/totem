import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { uploadFiles } from '../../actions/uploadFiles';

import FileDrop from '../../components/events/FileDrop';

const mapStateToProps = (state: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        uploadFiles,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FileDrop);
