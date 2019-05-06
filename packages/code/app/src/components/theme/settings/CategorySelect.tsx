import MenuItem from '@material-ui/core/MenuItem';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import { InjectedFormProps } from 'redux-form';
import Select from '../../../components/form/Select';

const Field = require('redux-form/immutable').Field;

export interface ICategorySelectData {
    category: string;
}

export interface ICategorySelectProps {
    category?: string;
    push: (url: string) => any;
}

export interface ICategorySelectState {}

type CategorySelectProps = ICategorySelectProps &
    InjectedFormProps<ICategorySelectData, ICategorySelectProps> &
    WithStyles;

class CategorySelect extends Component<CategorySelectProps, ICategorySelectState> {

    constructor(props: CategorySelectProps, context?: any) {
        super(props, context);

        this.changeCategory = this.changeCategory.bind(this);
    }

    public changeCategory(event: any) {
        this.props.push(`/theme/${event.target.value}`);
    }

    public render() {
        const {
            select,
        } = this.props.classes;

        return (
            <Field
                className={select}
                component={Select}
                fullWidth={true}
                label='Category'
                name='category'
                onChange={this.changeCategory}
                options={[
                    (
                        <MenuItem key={'typography'} value={'typography'}>
                            Typography
                        </MenuItem>
                    ),
                    (
                        <MenuItem key={'palette'} value={'palette'}>
                            Palette
                        </MenuItem>
                    ),
                    (
                        <MenuItem key={'misc'} value={'misc'}>
                            Misc
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

export default withStyles(style)(CategorySelect);
