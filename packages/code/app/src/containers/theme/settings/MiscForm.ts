import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import { changeTheme } from '../../../actions/theme';
import MiscForm, {
    IMiscFormData,
    IMiscFormProps,
} from '../../../components/theme/settings/MiscForm';
import themeSelector from '../../../selectors/theme';

const MiscFormForm = reduxForm<IMiscFormData, IMiscFormProps>({
    form: 'themeMiscForm',
})(MiscForm as any);

const mapStateToProps = (state: any) => {
    const themeOptions = themeSelector(state);

    const theme = createMuiTheme(themeOptions);

    return {
        initialValues: {
            breakpointLG: theme.breakpoints.values.lg,
            breakpointMD: theme.breakpoints.values.md,
            breakpointSM: theme.breakpoints.values.sm,
            breakpointXL: theme.breakpoints.values.xl,
            breakpointXS: theme.breakpoints.values.xs,
            shapeBorderRadius: theme.shape.borderRadius,
            spacingUnit: theme.spacing.unit,
            transitionDurationComplex: theme.transitions.duration.complex,
            transitionDurationEnteringScreen: theme.transitions.duration.enteringScreen,
            transitionDurationLeavingScreen: theme.transitions.duration.leavingScreen,
            transitionDurationShort: theme.transitions.duration.short,
            transitionDurationShorter: theme.transitions.duration.shorter,
            transitionDurationShortest: theme.transitions.duration.shortest,
            transitionDurationStandard: theme.transitions.duration.standard,
            transitionEasingIn: theme.transitions.easing.easeIn,
            transitionEasingInOut: theme.transitions.easing.easeInOut,
            transitionEasingOut: theme.transitions.easing.easeOut,
            transitionEasingSharp: theme.transitions.easing.sharp,
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
)(MiscFormForm);
