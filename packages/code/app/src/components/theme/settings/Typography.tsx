import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import ComponentForm from '../../../containers/theme/settings/ComponentForm';
import ComponentSelect from '../../../containers/theme/settings/ComponentSelect';
import DefaultForm from '../../../containers/theme/settings/TypographyForm';

export interface ITypographyProps {
    component?: string;
    match: any;
}

export interface ITypographyState {}

type TypographyProps = ITypographyProps & WithStyles;

class Typography extends Component<TypographyProps, ITypographyState> {

    public render() {
        const { match: { params: { component } } } = this.props;

        const {
            select,
        } = this.props.classes;

        return (
            <>
                <DefaultForm />
                <ComponentSelect
                    component={component}
                />
                {(component) ? (
                    <ComponentForm
                        key={component}
                        form={`themeComponentForm${component}`}
                        component={component}
                    />
                ) : null}
            </>
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

export default withStyles(style)(Typography);
