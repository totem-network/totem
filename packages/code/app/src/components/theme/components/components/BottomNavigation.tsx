import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import RestoreIcon from '@material-ui/icons/Restore';
import React, { Component } from 'react';

interface IBottomNavigationComponentProps {}

interface IBottomNavigationComponentState {}

type BottomNavigationComponentProps = IBottomNavigationComponentProps & WithStyles;

class BottomNavigationComponent extends Component<BottomNavigationComponentProps, IBottomNavigationComponentState> {

    public render() {
        const {
            container,
        } = this.props.classes;

        return (
            <div className={container}>
                <BottomNavigation
                    showLabels={true}
                >
                    <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                    <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
                </BottomNavigation>
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

export default withStyles(style)(BottomNavigationComponent);
