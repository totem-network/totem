import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';

interface IMenusProps {}

interface IMenusState {
    anchorElement1: any;
    openMenu1: boolean;
}

type MenusProps = IMenusProps & WithStyles;

class Menus extends Component<MenusProps, IMenusState> {

    constructor(props: MenusProps, context?: any) {
        super(props, context);

        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);

        this.state = {
            anchorElement1: null,
            openMenu1: false,
        };
    }

    public openMenu(event: any) {
        this.setState({
            ...this.state,
            anchorElement1: event.currentTarget,
            openMenu1: true,
        });
    }

    public closeMenu() {
        this.setState({
            ...this.state,
            anchorElement1: null,
            openMenu1: false,
        });
    }

    public render() {
        const {
            container,
        } = this.props.classes;

        return (
            <div className={container}>
                <Button
                    aria-haspopup="true"
                    onClick={this.openMenu}
                >
                    Open Menu
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorElement1}
                    open={this.state.openMenu1}
                    onClose={this.closeMenu}
                >
                    <MenuItem onClick={this.closeMenu}>Profile</MenuItem>
                    <MenuItem onClick={this.closeMenu}>My account</MenuItem>
                    <MenuItem onClick={this.closeMenu}>Logout</MenuItem>
                </Menu>
            </div>
        );
    }

}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        container: {
            margin: '1rem',
        },
    };
};

export default withStyles(style)(Menus);
