import { startApplication } from 'applications';
import { categoriesSelector } from 'filesystem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Categories from './../../components/side-nav/Categories';

const mapStateToProps = (state: any) => {
    return {
        categories: categoriesSelector(state),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        startApplication,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Categories as any);
