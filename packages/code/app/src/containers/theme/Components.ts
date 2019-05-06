import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import themeSelector from '../../selectors/theme';

import Components from '../../components/theme/Components';

const mapStateToProps = (state: any) => {
    return {
        themeOptions: themeSelector(state),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({}, dispatch);
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(Components) as any);
