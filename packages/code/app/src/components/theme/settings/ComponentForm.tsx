import { Theme, ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import { InjectedFormProps } from 'redux-form';
import TextField from '../../../components/form/TextField';
import clone from '../../../utils/clone';

const Field = require('redux-form/immutable').Field;

export interface IComponentFormData {
    fontFamily: string;
    fontSize: any;
    fontWeightLight: any;
    fontWeightMedium: any;
    fontWeightRegular: any;
}

export interface IComponentFormProps {
    changeTheme: (theme: ThemeOptions) => any;
    component: string;
    themeOptions: ThemeOptions;
}

export interface IComponentFormState {}

type ComponentFormProps = IComponentFormProps &
    InjectedFormProps<IComponentFormData, IComponentFormProps> &
    WithStyles;

class ComponentForm extends Component<ComponentFormProps, IComponentFormState> {

    constructor(props: ComponentFormProps, context?: any) {
        super(props, context);

        this.changeFontFamily = this.changeFontFamily.bind(this);
        this.changeFontSize = this.changeFontSize.bind(this);
        this.changeFontWeight = this.changeFontWeight.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.changeLineHeight = this.changeLineHeight.bind(this);
        this.changeLetterSpacing = this.changeLetterSpacing.bind(this);
    }

    public changeFontFamily(event: any) {
        const {
            changeTheme,
            component,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.typography) {
            newThemeOptions.typography = {};
        }

        if (!newThemeOptions.typography[component]) {
            newThemeOptions.typography[component] = {};
        }

        newThemeOptions.typography[component].fontFamily = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeFontSize(event: any) {
        const {
            changeTheme,
            component,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.typography) {
            newThemeOptions.typography = {};
        }

        if (!newThemeOptions.typography[component]) {
            newThemeOptions.typography[component] = {};
        }

        newThemeOptions.typography[component].fontSize = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeFontWeight(event: any) {
        const {
            changeTheme,
            component,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.typography) {
            newThemeOptions.typography = {};
        }

        if (!newThemeOptions.typography[component]) {
            newThemeOptions.typography[component] = {};
        }

        newThemeOptions.typography[component].fontWeight = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeColor(event: any) {
        const {
            changeTheme,
            component,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.typography) {
            newThemeOptions.typography = {};
        }

        if (!newThemeOptions.typography[component]) {
            newThemeOptions.typography[component] = {};
        }

        newThemeOptions.typography[component].color = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeLineHeight(event: any) {
        const {
            changeTheme,
            component,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.typography) {
            newThemeOptions.typography = {};
        }

        if (!newThemeOptions.typography[component]) {
            newThemeOptions.typography[component] = {};
        }

        newThemeOptions.typography[component].lineHeight = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeLetterSpacing(event: any) {
        const {
            changeTheme,
            component,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.typography) {
            newThemeOptions.typography = {};
        }

        if (!newThemeOptions.typography[component]) {
            newThemeOptions.typography[component] = {};
        }

        newThemeOptions.typography[component].letterSpacing = event.target.value;

        changeTheme(newThemeOptions);
    }

    public render() {
        const {
            container,
            field,
        } = this.props.classes;

        return (
            <div className={container}>
                <Field
                    className={field}
                    component={TextField}
                    fullWidth={true}
                    label="Color"
                    name='color'
                    onChange={this.changeColor}
                    variant="outlined"
                />
                <Field
                    className={field}
                    component={TextField}
                    fullWidth={true}
                    label="Font Family"
                    name='fontFamily'
                    onChange={this.changeFontFamily}
                    variant="outlined"
                />
                <Field
                    className={field}
                    component={TextField}
                    fullWidth={true}
                    label="Font Size"
                    name='fontSize'
                    onChange={this.changeFontSize}
                    variant="outlined"
                />
                <Field
                    className={field}
                    component={TextField}
                    fullWidth={true}
                    label="Font Weight"
                    name='fontWeight'
                    onChange={this.changeFontWeight}
                    variant="outlined"
                />
                <Field
                    className={field}
                    component={TextField}
                    fullWidth={true}
                    label="Line Height"
                    name='lineHeight'
                    onChange={this.changeLineHeight}
                    variant="outlined"
                />
                <Field
                    className={field}
                    component={TextField}
                    fullWidth={true}
                    label="Letter Spacing"
                    name='letterSpacing'
                    onChange={this.changeLetterSpacing}
                    variant="outlined"
                />
            </div>
        );
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        container: {
            margin: '1rem',
        },
        field: {
            marginTop: '1rem',
        },
    };
};

export default withStyles(style)(ComponentForm);
