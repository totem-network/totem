import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    selectCategory,
} from '../../actions/instances';
import categoriesSelector from '../../selectors/categories';
import instanceCategorySelector from '../../selectors/instanceCategory';

import Categories from '../../components/side-nav/Categories';

const mapStateToProps = (state: any, props: any) => {
    return {
        categories: categoriesSelector(state),
        selectedCategory: instanceCategorySelector(state, props.instance),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        selectCategory,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Categories as any);
