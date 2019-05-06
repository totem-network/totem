import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import { changeTheme } from '../../../actions/theme';
import ComponentForm, {
    IComponentFormData,
    IComponentFormProps,
} from '../../../components/theme/settings/ComponentForm';
import themeSelector from '../../../selectors/theme';

const ComponentFormForm = reduxForm<IComponentFormData, IComponentFormProps>({})(ComponentForm as any);

const mapStateToProps = (state: any, props: any) => {
    const themeOptions = themeSelector(state);

    const theme = createMuiTheme(themeOptions) as any;

    if (!theme.typography[props.component]) {
        return {
            component: props.component,
            themeOptions,
        };
    }

    return {
        component: props.component,
        initialValues: {
            color: theme.typography[props.component].color,
            fontFamily: theme.typography[props.component].fontFamily,
            fontSize: theme.typography[props.component].fontSize,
            fontWeight: theme.typography[props.component].fontWeight,
            letterSpacing: theme.typography[props.component].letterSpacing,
            lineHeight: theme.typography[props.component].lineHeight,
        },
        themeOptions,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        changeTheme,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ComponentFormForm);
