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

export interface IMiscFormData {
    breakpointXS: number;
    breakpointSM: number;
    breakpointMD: number;
    breakpointLG: number;
    breakpointXL: number;
    shapeBorderRadius: number;
    spacingUnit: number;
    transitionDurationComplex: number;
    transitionDurationEnteringScreen: number;
    transitionDurationLeavingScreen: number;
    transitionDurationShort: number;
    transitionDurationShorter: number;
    transitionDurationShortest: number;
    transitionDurationStandard: number;
    transitionEasingIn: string;
    transitionEasingInOut: string;
    transitionEasingOut: string;
    transitionEasingSharp: string;
}

export interface IMiscFormProps {
    changeTheme: (theme: ThemeOptions) => any;
    themeOptions: ThemeOptions;
}

export interface IMiscFormState {}

type MiscFormProps = IMiscFormProps &
    InjectedFormProps<IMiscFormData, IMiscFormProps> &
    WithStyles;

class MiscForm extends Component<MiscFormProps, IMiscFormState> {

    constructor(props: MiscFormProps, context?: any) {
        super(props, context);

        this.changeBreakpointXS = this.changeBreakpointXS.bind(this);
        this.changeBreakpointSM = this.changeBreakpointSM.bind(this);
        this.changeBreakpointMD = this.changeBreakpointMD.bind(this);
        this.changeBreakpointLG = this.changeBreakpointLG.bind(this);
        this.changeBreakpointXL = this.changeBreakpointXL.bind(this);
        this.changeShapeBorderRadius = this.changeShapeBorderRadius.bind(this);
        this.changeSpacingUnit = this.changeSpacingUnit.bind(this);
        this.changeTransitionDurationComplex = this.changeTransitionDurationComplex.bind(this);
        this.changeTransitionDurationEnteringScreen = this.changeTransitionDurationEnteringScreen.bind(this);
        this.changeTransitionDurationShort = this.changeTransitionDurationShort.bind(this);
        this.changeTransitionDurationShorter = this.changeTransitionDurationShorter.bind(this);
        this.changeTransitionDurationShortest = this.changeTransitionDurationShortest.bind(this);
        this.changeTransitionDurationStandard = this.changeTransitionDurationStandard.bind(this);
        this.changeTransitionEasingIn = this.changeTransitionEasingIn.bind(this);
        this.changeTransitionEasingInOut = this.changeTransitionEasingInOut.bind(this);
        this.changeTransitionEasingOut = this.changeTransitionEasingOut.bind(this);
        this.changeTransitionEasingSharp = this.changeTransitionEasingSharp.bind(this);
    }

    public changeBreakpointXS(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.breakpoints) {
            newThemeOptions.breakpoints = {};
        }

        if (!newThemeOptions.breakpoints.values) {
            newThemeOptions.breakpoints.values = {};
        }

        newThemeOptions.breakpoints.values.xs = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeBreakpointSM(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.breakpoints) {
            newThemeOptions.breakpoints = {};
        }

        if (!newThemeOptions.breakpoints.values) {
            newThemeOptions.breakpoints.values = {};
        }

        newThemeOptions.breakpoints.values.sm = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeBreakpointMD(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.breakpoints) {
            newThemeOptions.breakpoints = {};
        }

        if (!newThemeOptions.breakpoints.values) {
            newThemeOptions.breakpoints.values = {};
        }

        newThemeOptions.breakpoints.values.md = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeBreakpointLG(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.breakpoints) {
            newThemeOptions.breakpoints = {};
        }

        if (!newThemeOptions.breakpoints.values) {
            newThemeOptions.breakpoints.values = {};
        }

        newThemeOptions.breakpoints.values.lg = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeBreakpointXL(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.breakpoints) {
            newThemeOptions.breakpoints = {};
        }

        if (!newThemeOptions.breakpoints.values) {
            newThemeOptions.breakpoints.values = {};
        }

        newThemeOptions.breakpoints.values.xl = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeShapeBorderRadius(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.shape) {
            newThemeOptions.shape = {};
        }

        newThemeOptions.shape.borderRadius = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeSpacingUnit(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.spacing) {
            newThemeOptions.spacing = {};
        }

        newThemeOptions.spacing.unit = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeTransitionEasingIn(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.transitions) {
            newThemeOptions.transitions = {};
        }

        if (!newThemeOptions.transitions.easing) {
            newThemeOptions.transitions.easing = {};
        }

        newThemeOptions.transitions.easing.easeIn = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeTransitionEasingInOut(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.transitions) {
            newThemeOptions.transitions = {};
        }

        if (!newThemeOptions.transitions.easing) {
            newThemeOptions.transitions.easing = {};
        }

        newThemeOptions.transitions.easing.easeInOut = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeTransitionEasingOut(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.transitions) {
            newThemeOptions.transitions = {};
        }

        if (!newThemeOptions.transitions.easing) {
            newThemeOptions.transitions.easing = {};
        }

        newThemeOptions.transitions.easing.easeOut = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeTransitionEasingSharp(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.transitions) {
            newThemeOptions.transitions = {};
        }

        if (!newThemeOptions.transitions.easing) {
            newThemeOptions.transitions.easing = {};
        }

        newThemeOptions.transitions.easing.easeSharp = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeTransitionDurationComplex(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.transitions) {
            newThemeOptions.transitions = {};
        }

        if (!newThemeOptions.transitions.duration) {
            newThemeOptions.transitions.duration = {};
        }

        newThemeOptions.transitions.duration.complex = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeTransitionDurationEnteringScreen(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.transitions) {
            newThemeOptions.transitions = {};
        }

        if (!newThemeOptions.transitions.duration) {
            newThemeOptions.transitions.duration = {};
        }

        newThemeOptions.transitions.duration.enteringScreen = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeTransitionDurationLeavingScreen(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.transitions) {
            newThemeOptions.transitions = {};
        }

        if (!newThemeOptions.transitions.duration) {
            newThemeOptions.transitions.duration = {};
        }

        newThemeOptions.transitions.duration.leavingScreen = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeTransitionDurationShort(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.transitions) {
            newThemeOptions.transitions = {};
        }

        if (!newThemeOptions.transitions.duration) {
            newThemeOptions.transitions.duration = {};
        }

        newThemeOptions.transitions.duration.short = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeTransitionDurationShorter(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.transitions) {
            newThemeOptions.transitions = {};
        }

        if (!newThemeOptions.transitions.duration) {
            newThemeOptions.transitions.duration = {};
        }

        newThemeOptions.transitions.duration.shorter = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeTransitionDurationShortest(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.transitions) {
            newThemeOptions.transitions = {};
        }

        if (!newThemeOptions.transitions.duration) {
            newThemeOptions.transitions.duration = {};
        }

        newThemeOptions.transitions.duration.shortest = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeTransitionDurationStandard(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.transitions) {
            newThemeOptions.transitions = {};
        }

        if (!newThemeOptions.transitions.duration) {
            newThemeOptions.transitions.duration = {};
        }

        newThemeOptions.transitions.duration.standard = event.target.value;

        changeTheme(newThemeOptions);
    }

    public render() {
        const {
            breakpointContainer,
            container,
            field,
            miscContainer,
        } = this.props.classes;

        return (
            <div className={container}>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>
                            Breakpoints
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={breakpointContainer}>
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="XS"
                            name='breakpointXS'
                            onChange={this.changeBreakpointXS}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="SM"
                            name='breakpointSM'
                            onChange={this.changeBreakpointSM}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="MD"
                            name='breakpointMD'
                            onChange={this.changeBreakpointMD}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="LG"
                            name='breakpointLG'
                            onChange={this.changeBreakpointLG}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="XL"
                            name='breakpointXL'
                            onChange={this.changeBreakpointXL}
                            variant="outlined"
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>
                            Transition Easing
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={miscContainer}>
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Ease In"
                            name='transitionEasingIn'
                            onChange={this.changeTransitionEasingIn}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Ease InOut"
                            name='transitionEasingInOut'
                            onChange={this.changeTransitionEasingInOut}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Ease Out"
                            name='transitionEasingOut'
                            onChange={this.changeTransitionEasingOut}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Ease Sharp"
                            name='transitionEasingSharp'
                            onChange={this.changeTransitionEasingSharp}
                            variant="outlined"
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>
                            Transition Duration
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={miscContainer}>
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Complex"
                            name='transitionDurationComplex'
                            onChange={this.changeTransitionDurationComplex}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Entering Screen"
                            name='transitionDurationEnteringScreen'
                            onChange={this.changeTransitionDurationEnteringScreen}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Leaving Screen"
                            name='transitionDurationLeavingScreen'
                            onChange={this.changeTransitionDurationLeavingScreen}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Short"
                            name='transitionDurationShort'
                            onChange={this.changeTransitionDurationShort}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Shorter"
                            name='transitionDurationShorter'
                            onChange={this.changeTransitionDurationShorter}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Shortest"
                            name='transitionDurationShortest'
                            onChange={this.changeTransitionDurationShortest}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Standard"
                            name='transitionDurationStandard'
                            onChange={this.changeTransitionDurationStandard}
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
                            label="Border Radius"
                            name='shapeBorderRadius'
                            onChange={this.changeShapeBorderRadius}
                            variant="outlined"
                        />
                        <Field
                            className={field}
                            component={TextField}
                            fullWidth={true}
                            label="Spacing Unit"
                            name='spacingUnit'
                            onChange={this.changeSpacingUnit}
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
        breakpointContainer: {
            display: 'block',
        },
        container: {
            margin: '1rem',
        },
        field: {
            marginTop: '1rem',
        },
        miscContainer: {
            display: 'block',
        },
    };
};

export default withStyles(style)(MiscForm);
