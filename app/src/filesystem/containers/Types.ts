import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import instanceCategorySelector from '../selectors/instanceCategory';

import Types from '../components/types/Types';

const mapStateToProps = (state: any, props: any) => {
    return {
        instanceCategory: instanceCategorySelector(state, props.instance),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({}, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Types as any);
