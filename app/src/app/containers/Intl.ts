import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import intlSelector from './../selectors/intl';

import Intl from './../components/Intl';

const mapStateToProps = (state: any) => {
    return intlSelector(state);
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({}, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Intl);
