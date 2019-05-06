import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React, { Component } from 'react';

interface IAppBarComponentProps {}

interface IAppBarComponentState {}

type AppBarComponentProps = IAppBarComponentProps & WithStyles;

class AppBarComponent extends Component<AppBarComponentProps, IAppBarComponentState> {

    public render() {
        const {
            container,
        } = this.props.classes;

        return (
            <div className={container}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit">
                            Home
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        container: {
            //
        },
    };
};

export default withStyles(style)(AppBarComponent);
