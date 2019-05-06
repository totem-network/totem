import MenuItem from '@material-ui/core/MenuItem';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import { InjectedFormProps } from 'redux-form';
import Select from '../../../components/form/Select';

const Field = require('redux-form/immutable').Field;

export interface IComponentSelectData {
    component: string;
}

export interface IComponentSelectProps {
    component?: string;
    push: (url: string) => any;
}

export interface IComponentSelectState {}

type ComponentSelectProps = IComponentSelectProps &
    InjectedFormProps<IComponentSelectData, IComponentSelectProps> &
    WithStyles;

class ComponentSelect extends Component<ComponentSelectProps, IComponentSelectState> {

    constructor(props: ComponentSelectProps, context?: any) {
        super(props, context);

        this.changeComponent = this.changeComponent.bind(this);
    }

    public changeComponent(event: any) {
        this.props.push(`/theme/typography/${event.target.value}`);
    }

    public render() {
        const {
            component,
        } = this.props;

        const {
            select,
        } = this.props.classes;

        const value = component ? component : '';

        return (
            <Field
                className={select}
                component={Select}
                fullWidth={true}
                label='Component'
                name='component'
                onChange={this.changeComponent}
                options={[
                    (
                        <MenuItem key={'h1'} value={'h1'}>
                            h1 Heading
                        </MenuItem>
                    ),
                    (
                        <MenuItem key={'h2'} value={'h2'}>
                            h2 Heading
                        </MenuItem>
                    ),
                    (
                        <MenuItem key={'h3'} value={'h3'}>
                            h3 Heading
                        </MenuItem>
                    ),
                    (
                        <MenuItem key={'h4'} value={'h4'}>
                            h4 Heading
                        </MenuItem>
                    ),
                    (
                        <MenuItem key={'h5'} value={'h5'}>
                            h5 Heading
                        </MenuItem>
                    ),
                    (
                        <MenuItem key={'h6'} value={'h6'}>
                            h6 Heading
                        </MenuItem>
                    ),
                    (
                        <MenuItem key={'subtitle1'} value={'subtitle1'}>
                            subtitle1
                        </MenuItem>
                    ),
                    (
                        <MenuItem key={'subtitle2'} value={'subtitle2'}>
                            subtitle2
                        </MenuItem>
                    ),
                    (
                        <MenuItem key={'body1'} value={'body1'}>
                            body1
                        </MenuItem>
                    ),
                    (
                        <MenuItem key={'body2'} value={'body2'}>
                            body2
                        </MenuItem>
                    ),
                    (
                        <MenuItem key={'button'} value={'button'}>
                            button
                        </MenuItem>
                    ),
                    (
                        <MenuItem key={'caption'} value={'caption'}>
                            caption
                        </MenuItem>
                    ),
                    (
                        <MenuItem key={'overline'} value={'overline'}>
                            overline
                        </MenuItem>
                    ),
                ]}
            />
        );
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        select: {
            //
        },
    };
};

export default withStyles(style)(ComponentSelect);
