import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import PaletteForm from '../../../containers/theme/settings/PaletteForm';

export interface IPaletteProps {
    component?: string;
    match: any;
}

export interface IPaletteState {}

type PaletteProps = IPaletteProps & WithStyles;

class Palette extends Component<PaletteProps, IPaletteState> {

    public render() {
        const { match: { params: { component } } } = this.props;

        const {
            select,
        } = this.props.classes;

        return (
            <>
                <PaletteForm />
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

export default withStyles(style)(Palette);
