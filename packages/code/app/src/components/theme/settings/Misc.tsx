import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import MiscForm from '../../../containers/theme/settings/MiscForm';

export interface IMiscProps {
    component?: string;
    match: any;
}

export interface IMiscState {}

type MiscProps = IMiscProps & WithStyles;

class Misc extends Component<MiscProps, IMiscState> {

    public render() {
        const { match: { params: { component } } } = this.props;

        const {
            select,
        } = this.props.classes;

        return (
            <>
                <MiscForm />
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

export default withStyles(style)(Misc);
