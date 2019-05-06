import Drawer from '@material-ui/core/Drawer';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';

export interface IViewProps {
    match: any;
}

export interface IViewState {}

type ViewProps = IViewProps & WithStyles;

class View extends Component<ViewProps, IViewState> {

    public render() {
        const { match: { params: { category } } } = this.props;

        const {
            drawer,
            drawerPaper,
            main,
        } = this.props.classes;

        return (
            <>
                <Drawer
                    classes={{
                        paper: drawerPaper,
                    }}
                    className={drawer}
                    anchor="right"
                    variant="permanent"
                >
                    ..
                </Drawer>
                <main
                    className={main}
                >
                    ..
                </main>
            </>
        );
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        drawer: {
            width: '25vw',
        },
        drawerPaper: {
            width: '25vw',
        },
        main: {
            margin: '0 25vw 0 64px',
            padding: '1rem',
        },
    };
};

export default withStyles(style)(View);
