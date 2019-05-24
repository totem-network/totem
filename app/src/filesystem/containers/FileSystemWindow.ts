import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showSideNav } from 'app';

import FileSystemWindow from '../components/FileSystemWindow';

const mapStateToProps = (state: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        showSideNav,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FileSystemWindow);
