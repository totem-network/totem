import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import { changeTheme } from '../../../actions/theme';
import PaletteForm, {
    IPaletteFormData,
    IPaletteFormProps,
} from '../../../components/theme/settings/PaletteForm';
import themeSelector from '../../../selectors/theme';

const PaletteFormForm = reduxForm<IPaletteFormData, IPaletteFormProps>({
    form: 'themePaletteForm',
})(PaletteForm as any);

const mapStateToProps = (state: any) => {
    const themeOptions = themeSelector(state);

    const theme = createMuiTheme(themeOptions);

    return {
        initialValues: {
            actionActive: theme.palette.action.active,
            actionDisabled: theme.palette.action.disabled,
            actionDisabledBackground: theme.palette.action.disabledBackground,
            actionHover: theme.palette.action.hover,
            actionHoverOpacity: theme.palette.action.hoverOpacity,
            actionSelected: theme.palette.action.selected,
            backgroundDefault: theme.palette.background.default,
            backgroundPaper: theme.palette.background.paper,
            black: theme.palette.common.black,
            errorContrastText: theme.palette.error.contrastText,
            errorDark: theme.palette.error.dark,
            errorLight: theme.palette.error.light,
            errorMain: theme.palette.error.main,
            miscContrastThreshold: theme.palette.contrastThreshold,
            miscDivider: theme.palette.divider,
            miscTonalOffset: theme.palette.tonalOffset,
            primaryContrastText: theme.palette.primary.contrastText,
            primaryDark: theme.palette.primary.dark,
            primaryLight: theme.palette.primary.light,
            primaryMain: theme.palette.primary.main,
            secondaryContrastText: theme.palette.secondary.contrastText,
            secondaryDark: theme.palette.secondary.dark,
            secondaryLight: theme.palette.secondary.light,
            secondaryMain: theme.palette.secondary.main,
            textDisabled: theme.palette.text.disabled,
            textHint: theme.palette.text.hint,
            textPrimary: theme.palette.text.primary,
            textSecondary: theme.palette.text.secondary,
            white: theme.palette.common.white,
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
)(PaletteFormForm);
