import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import CategorySelect, {
    ICategorySelectData,
    ICategorySelectProps,
} from '../../../components/theme/settings/CategorySelect';

const CategorySelectForm = reduxForm<ICategorySelectData, ICategorySelectProps>({
    form: 'themeCategorySelect',
})(CategorySelect as any);

const mapStateToProps = (state: any, props: any) => {
    return {
        initialValues: {
            category: props.category,
        },
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        push,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CategorySelectForm);
