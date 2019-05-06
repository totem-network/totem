import { Theme, ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import { InjectedFormProps } from 'redux-form';
import clone from '../../../utils/clone';
import TextField from '../../form/TextField';

const Field = require('redux-form/immutable').Field;

export interface ITypographyFormData {
    fontFamily: string;
    fontSize: any;
    fontWeightLight: any;
    fontWeightMedium: any;
    fontWeightRegular: any;
}

export interface ITypographyFormProps {
    changeTheme: (theme: ThemeOptions) => any;
    themeOptions: ThemeOptions;
}

export interface ITypographyFormState {}

type TypographyFormProps = ITypographyFormProps &
    InjectedFormProps<ITypographyFormData, ITypographyFormProps> &
    WithStyles;

class TypographyForm extends Component<TypographyFormProps, ITypographyFormState> {

    constructor(props: TypographyFormProps, context?: any) {
        super(props, context);

        this.changeFontFamily = this.changeFontFamily.bind(this);
        this.changeFontSize = this.changeFontSize.bind(this);
        this.changeFontWeightLight = this.changeFontWeightLight.bind(this);
        this.changeFontWeightRegular = this.changeFontWeightRegular.bind(this);
        this.changeFontWeightMedium = this.changeFontWeightMedium.bind(this);
    }

    public changeFontFamily(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.typography) {
            newThemeOptions.typography = {};
        }

        newThemeOptions.typography.fontFamily = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeFontSize(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.typography) {
            newThemeOptions.typography = {};
        }

        newThemeOptions.typography.fontSize = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeFontWeightLight(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.typography) {
            newThemeOptions.typography = {};
        }

        newThemeOptions.typography.fontWeightLight = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeFontWeightRegular(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.typography) {
            newThemeOptions.typography = {};
        }

        newThemeOptions.typography.fontWeightRegular = event.target.value;

        changeTheme(newThemeOptions);
    }

    public changeFontWeightMedium(event: any) {
        const {
            changeTheme,
            themeOptions,
        } = this.props;

        const newThemeOptions = clone(themeOptions);

        if (!newThemeOptions.typography) {
            newThemeOptions.typography = {};
        }

        newThemeOptions.typography.fontWeightMedium = event.target.value;

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
                    label="Font Weight Light"
                    name='fontWeightLight'
                    onChange={this.changeFontWeightLight}
                    variant="outlined"
                />
                <Field
                    className={field}
                    component={TextField}
                    fullWidth={true}
                    label="Font Weight Regular"
                    name='fontWeightRegular'
                    onChange={this.changeFontWeightRegular}
                    variant="outlined"
                />
                <Field
                    className={field}
                    component={TextField}
                    fullWidth={true}
                    label="Font Weight Medium"
                    name='fontWeightMedium'
                    onChange={this.changeFontWeightMedium}
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

export default withStyles(style)(TypographyForm);
