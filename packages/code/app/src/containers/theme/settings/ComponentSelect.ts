import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import ComponentSelect, {
    IComponentSelectData,
    IComponentSelectProps,
} from '../../../components/theme/settings/ComponentSelect';

const ComponentSelectForm = reduxForm<IComponentSelectData, IComponentSelectProps>({
    form: 'themeComponentSelect',
})(ComponentSelect as any);

const mapStateToProps = (state: any, props: any) => {
    return {
        initialValues: {
            component: props.component,
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
)(ComponentSelectForm);
