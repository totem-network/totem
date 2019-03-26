import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import instanceCategorySelector from '../selectors/instanceCategory';

import Views from '../components/views/Views';

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
)(Views as any);
