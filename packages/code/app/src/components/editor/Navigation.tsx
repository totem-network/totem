import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutline';
import ColorLensIcon from '@material-ui/icons/ColorLensOutlined';
import FilterListIcon from '@material-ui/icons/FilterListOutlined';
import FormatShapesIcon from '@material-ui/icons/FormatShapesOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import MemoryIcon from '@material-ui/icons/MemoryOutlined';
import StorageIcon from '@material-ui/icons/StorageOutlined';
import WebAssetIcon from '@material-ui/icons/WebAssetOutlined';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

export interface INavigationProps {
    module?: string;
}

export interface INavigationState {}

type NavigationProps = INavigationProps & WithStyles;

class Navigation extends Component<NavigationProps, INavigationState> {

    public render() {
        const {
            module,
        } = this.props;

        const {
            drawer,
            drawerPaper,
        } = this.props.classes;

        return (
            <nav>
                <Drawer
                    classes={{
                        paper: drawerPaper,
                    }}
                    className={drawer}
                    variant="permanent"
                >
                    <List>
                        <Link to={'/theme'}>
                            <ListItem button={true} selected={(module === 'theme')}>
                                <ListItemIcon>
                                    <ColorLensIcon />
                                </ListItemIcon>
                            </ListItem>
                        </Link>
                        <Link to={'/actions'}>
                            <ListItem button={true} selected={(module === 'actions')}>
                                <ListItemIcon>
                                    <LabelOutlinedIcon />
                                </ListItemIcon>
                            </ListItem>
                        </Link>
                        <Link to={'/components'}>
                            <ListItem button={true} selected={(module === 'components')}>
                                <ListItemIcon>
                                    <FormatShapesIcon />
                                </ListItemIcon>
                            </ListItem>
                        </Link>
                        <Link to={'/containers'}>
                            <ListItem button={true} selected={(module === 'containers')}>
                                <ListItemIcon>
                                    <WebAssetIcon />
                                </ListItemIcon>
                            </ListItem>
                        </Link>
                        <Link to={'/reducers'}>
                            <ListItem button={true} selected={(module === 'reducers')}>
                                <ListItemIcon>
                                    <StorageIcon />
                                </ListItemIcon>
                            </ListItem>
                        </Link>
                        <Link to={'/sagas'}>
                            <ListItem button={true} selected={(module === 'sagas')}>
                                <ListItemIcon>
                                    <MemoryIcon />
                                </ListItemIcon>
                            </ListItem>
                        </Link>
                        <Link to={'/selectors'}>
                            <ListItem button={true} selected={(module === 'selectors')}>
                                <ListItemIcon>
                                    <FilterListIcon />
                                </ListItemIcon>
                            </ListItem>
                        </Link>
                        <Link to={'/validators'}>
                            <ListItem button={true} selected={(module === 'validators')}>
                                <ListItemIcon>
                                    <CheckCircleIcon />
                                </ListItemIcon>
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
            </nav>
        );
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        drawer: {
            width: '64px',
        },
        drawerPaper: {
            width: '64px',
        },
    };
};

export default withStyles(style)(Navigation);
