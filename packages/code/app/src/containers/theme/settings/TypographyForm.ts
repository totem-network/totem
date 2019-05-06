import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import { changeTheme } from '../../../actions/theme';
import TypographyForm, {
    ITypographyFormData,
    ITypographyFormProps,
} from '../../../components/theme/settings/TypographyForm';
import themeSelector from '../../../selectors/theme';

const TypographyFormForm = reduxForm<ITypographyFormData, ITypographyFormProps>({
    form: 'themeTypographyForm',
})(TypographyForm as any);

const mapStateToProps = (state: any) => {
    const themeOptions = themeSelector(state);

    const theme = createMuiTheme(themeOptions);

    return {
        initialValues: {
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.fontSize,
            fontWeightLight: theme.typography.fontWeightLight,
            fontWeightMedium: theme.typography.fontWeightMedium,
            fontWeightRegular: theme.typography.fontWeightRegular,
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
)(TypographyFormForm);
