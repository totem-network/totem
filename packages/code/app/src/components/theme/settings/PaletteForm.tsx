import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { Theme, ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { Component } from 'react';
import { InjectedFormProps } from 'redux-form';
import TextField from '../../../components/form/TextField';
import clone from '../../../utils/clone';

const Field = require('redux-form/immutable').Field;

export interface IPaletteFormData {
    actionActive: string;
    actionDisabled: string;
    actionDisabledBackground: string;
    actionHover: string;
    actionHoverOpacity: number;
    actionSelected: string;
    backgroundDefault: string;
    backgroundPaper: string;
    black: string;
    errorContrastText: string;
    errorDark: string;
    errorLight: string;
    errorMain: string;
    miscContrastThreshold: number;
    miscDivider: string;
    miscTonalOffset: number;
    primaryContrastText: string;
    primaryDark: string;
    primaryLight: string;
    primaryMain: string;
    secondaryContrastText: string;
    secondaryDark: string;
    secondaryLight: string;
    secondaryMain: string;
    textPrimary: string;
    textSecondary: string;
    textDisabled: string;
    textHint: string;
    white: string;
}

export interface IPaletteFormProps {
    changeTheme: (theme: ThemeOptions) => any;
    themeOptions: ThemeOptions;
}

export interface IPaletteFormState {}

type PaletteFormProps = IPaletteFormProps &
    InjectedFormProps<IPaletteFormData, IPaletteFormProps> &
    WithStyles;

class PaletteForm extends Component<PaletteFormProps, IPaletteFormState> {

    constructor(props: PaletteFormProps, context?: any) {
        super(props, context);

        this.changeBlack = this.changeBlack.bind(this);
        this.changeWhite = this.changeWhite.bind(this);
        this.changePrimaryLight = this.changePrimaryLight.bind(this);
        this.changePrimaryMain = this.changePrimaryMain.bind(this);
        this.changePrimaryDark = this.changePrimaryDark.bind(this);
        this.changePrimaryContrastText = this.changePrimaryContrastText.bind(this);
        this.changeSecondaryLight = this.changeSecondaryLight.bind(this);
        this.changeSecondaryMain = this.changeSecondaryMain.bind(this);
        this.changeSecondaryDark = this.changeSecondaryDark.bind(this);
        this.changeSecondaryContrastText = this.changeSecondaryContrastText.bind(this);
        this.changeErrorLight = this.changeErrorLight.bind(this);
        this.changeErrorMain = this.changeErrorMain.bind(this);
        this.changeErrorDark = this.changeErrorDark.bind(this);
        this.changeErrorContrastText = this.changeErrorContrastText.bind(this);
        this.changeTextPrimary = this.changeTextPrimary.bind(this);
        this.changeTextSecondary = this.changeTextSecondary.bind(this);
        this.changeTextDisabled = this.changeTextDisabled.bind(this);
        this.changeTextHint = this.changeTextHint.bind(this);
        this.changeBackgroundPaper = this.changeBackgroundPaper.bind(this);
        this.changeBackgroundDefault = this.changeBackgroundDefault.bind(this);
        this.changeActionActive = this.changeActionActive.bind(this);
        this.changeActionHover = this.changeActionHover.bind(this);
        this.changeActionHoverOpacity = this.changeActionHoverOpacity.bind(this);
        this.changeActionSelected = this.changeActionSelected.bind(this);
        this.changeActionDisabled = this.changeActionDisabled.bind(this);
        this.changeActionDisabledBackground = this.changeActionDisabledBackground.bind(this);
        this.changeMiscContrastThreshold = this.changeMiscContrastThreshold.bind(this);
        this.changeMiscDivider = this.changeMiscDivider.bind(this);
        this.changeMiscTonalOffset = this.changeMiscTonalOffset.bind(this);
    }

    public changeBlack(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.common) {
            newThemeOptions.palette.common = {};
        }

        newThemeOptions.palette.common.black = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeWhite(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.common) {
            newThemeOptions.palette.common = {};
        }

        newThemeOptions.palette.common.white = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changePrimaryLight(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.primary) {
            newThemeOptions.palette.primary = {};
        }

        newThemeOptions.palette.primary.light = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changePrimaryMain(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.primary) {
            newThemeOptions.palette.primary = {};
        }

        newThemeOptions.palette.primary.main = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changePrimaryDark(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.primary) {
            newThemeOptions.palette.primary = {};
        }

        newThemeOptions.palette.primary.dark = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changePrimaryContrastText(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.primary) {
            newThemeOptions.palette.primary = {};
        }

        newThemeOptions.palette.primary.contrastText = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeSecondaryLight(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.secondary) {
            newThemeOptions.palette.secondary = {};
        }

        newThemeOptions.palette.secondary.light = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeSecondaryMain(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.secondary) {
            newThemeOptions.palette.secondary = {};
        }

        newThemeOptions.palette.secondary.main = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeSecondaryDark(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.secondary) {
            newThemeOptions.palette.secondary = {};
        }

        newThemeOptions.palette.secondary.dark = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeSecondaryContrastText(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.secondary) {
            newThemeOptions.palette.secondary = {};
        }

        newThemeOptions.palette.secondary.contrastText = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeErrorLight(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.error) {
            newThemeOptions.palette.error = {};
        }

        newThemeOptions.palette.error.light = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeErrorMain(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.error) {
            newThemeOptions.palette.error = {};
        }

        newThemeOptions.palette.error.main = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeErrorDark(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.error) {
            newThemeOptions.palette.error = {};
        }

        newThemeOptions.palette.error.dark = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeErrorContrastText(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.error) {
            newThemeOptions.palette.error = {};
        }

        newThemeOptions.palette.error.contrastText = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeTextPrimary(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.text) {
            newThemeOptions.palette.text = {};
        }

        newThemeOptions.palette.text.primary = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeTextSecondary(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.text) {
            newThemeOptions.palette.text = {};
        }

        newThemeOptions.palette.text.secondary = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeTextDisabled(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.text) {
            newThemeOptions.palette.text = {};
        }

        newThemeOptions.palette.text.disabled = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeTextHint(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.text) {
            newThemeOptions.palette.text = {};
        }

        newThemeOptions.palette.text.hint = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeBackgroundPaper(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.background) {
            newThemeOptions.palette.background = {};
        }

        newThemeOptions.palette.background.paper = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeBackgroundDefault(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.background) {
            newThemeOptions.palette.background = {};
        }

        newThemeOptions.palette.background.default = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeActionActive(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.action) {
            newThemeOptions.palette.action = {};
        }

        newThemeOptions.palette.action.active = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeActionHover(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.action) {
            newThemeOptions.palette.action = {};
        }

        newThemeOptions.palette.action.hover = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeActionHoverOpacity(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.action) {
            newThemeOptions.palette.action = {};
        }

        newThemeOptions.palette.action.hoverOpacity = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeActionSelected(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.action) {
            newThemeOptions.palette.action = {};
        }

        newThemeOptions.palette.action.selected = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeActionDisabled(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.action) {
            newThemeOptions.palette.action = {};
        }

        newThemeOptions.palette.action.disabled = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeActionDisabledBackground(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        if (!newThemeOptions.palette.action) {
            newThemeOptions.palette.action = {};
        }

        newThemeOptions.palette.action.disabledBackground = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeMiscContrastThreshold(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        newThemeOptions.palette.contrastThreshold = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeMiscDivider(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        newThemeOptions.palette.divider = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeMiscTonalOffset(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.palette) {
            newThemeOptions.palette = {};
        }

        newThemeOptions.palette.tonalOffset = event.target.value;

        changeTheme(newThemeOptions);
    }

    public render() {
        const {
            actionContainer,
            backgroundContainer,
            container,
            errorContainer,
            miscContainer,
            field,
            primaryContainer,
            secondaryContainer,
            textContainer,
        } = this.props.classes;

        return (
            <div className={container}>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>
                            Common
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Black"
                            name='black'
                            onChange={this.changeBlack}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="White"
                            name='white'
                            onChange={this.changeWhite}
                            variant="outlined"
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>
                            Primary
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={primaryContainer}>
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Light"
                            name='primaryLight'
                            onChange={this.changePrimaryLight}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Main"
                            name='primaryMain'
                            onChange={this.changePrimaryMain}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Dark"
                            name='primaryDark'
                            onChange={this.changePrimaryDark}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Contrast Text"
                            name='primaryContrastText'
                            onChange={this.changePrimaryContrastText}
                            variant="outlined"
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>
                            Secondary
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={secondaryContainer}>
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Light"
                            name='secondaryLight'
                            onChange={this.changeSecondaryLight}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Main"
                            name='secondaryMain'
                            onChange={this.changeSecondaryMain}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Dark"
                            name='secondaryDark'
                            onChange={this.changeSecondaryDark}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Contrast Text"
                            name='secondaryContrastText'
                            onChange={this.changeSecondaryContrastText}
                            variant="outlined"
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>
                            Error
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={errorContainer}>
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Light"
                            name='errorLight'
                            onChange={this.changeErrorLight}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Main"
                            name='errorMain'
                            onChange={this.changeErrorMain}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Dark"
                            name='errorDark'
                            onChange={this.changeErrorDark}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Contrast Text"
                            name='errorContrastText'
                            onChange={this.changeErrorContrastText}
                            variant="outlined"
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>
                            Text
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={textContainer}>
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Primary"
                            name='textPrimary'
                            onChange={this.changeTextPrimary}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Secondary"
                            name='textSecondary'
                            onChange={this.changeTextSecondary}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Disabled"
                            name='textDisabled'
                            onChange={this.changeTextDisabled}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Hint"
                            name='textHint'
                            onChange={this.changeTextHint}
                            variant="outlined"
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>
                            Background
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={backgroundContainer}>
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Paper"
                            name='backgroundPaper'
                            onChange={this.changeBackgroundPaper}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Default"
                            name='backgroundDefault'
                            onChange={this.changeBackgroundDefault}
                            variant="outlined"
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>
                            Action
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={actionContainer}>
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Active"
                            name='actionActive'
                            onChange={this.changeActionActive}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Hover"
                            name='actionHover'
                            onChange={this.changeActionHover}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Hover Opacity"
                            name='actionHoverOpacity'
                            onChange={this.changeActionHoverOpacity}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Selected"
                            name='actionSelected'
                            onChange={this.changeActionSelected}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Disabled"
                            name='actionDisabled'
                            onChange={this.changeActionDisabled}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Disabled Background"
                            name='actionDisabledBackground'
                            onChange={this.changeActionDisabledBackground}
                            variant="outlined"
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>
                            Misc
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={miscContainer}>
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Contrast Threshold"
                            name='miscContrastThreshold'
                            onChange={this.changeMiscContrastThreshold}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Divider"
                            name='miscDivider'
                            onChange={this.changeMiscDivider}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Tonal Offset"
                            name='miscTonalOffset'
                            onChange={this.changeMiscTonalOffset}
                            variant="outlined"
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        actionContainer: {
            display: 'block',
        },
        backgroundContainer: {
            display: 'block',
        },
        container: {
            margin: '1rem',
        },
        errorContainer: {
            display: 'block',
        },
        field: {
            marginTop: '1rem',
        },
        miscContainer: {
            display: 'block',
        },
        primaryContainer: {
            display: 'block',
        },
        secondaryContainer: {
            display: 'block',
        },
        textContainer: {
            display: 'block',
        },
    };
};

export default withStyles(style)(PaletteForm);
