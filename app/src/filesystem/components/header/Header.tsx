import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';

export interface IHeaderProps {}

export interface IHeaderState {}

type HeaderProps = IHeaderProps & WithStyles;

class Header extends Component<HeaderProps, IHeaderState> {

    public render() {
        const {
            container,
        } = this.props.classes;

        return (
            <div className={container}>
                {this.props.children}
            </div>
        );
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        container: {
            left: '50%',
            pointerEvents: 'none',
            position: 'absolute',
            textAlign: 'center',
            top: '0',
            transform: 'translate(-50%, 0)',
            zIndex: 2,
        },
    };
};

export default withStyles(style)(Header);
