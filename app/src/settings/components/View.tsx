import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Public from '@material-ui/icons/Public';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { toggleView, ViewType } from '../actions/views';
import viewsSelector from '../selectors/views';
import AccountSubView from './account/SubView';
import Search from './Search';

interface IViewProps {}

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            [theme.breakpoints.down('md')]: {
                marginTop: theme.spacing(1),
            },
            boxSizing: 'border-box',
            padding: theme.spacing(0, 2),
            width: '100%',
        },
        listItem: {
            [theme.breakpoints.up('lg')]: {
                color: theme.palette.primary.contrastText,
            },
        },
        subHeader: {
            [theme.breakpoints.up('lg')]: {
                color: theme.palette.primary.contrastText,
            },
        }
    };
});

const View = ({}: IViewProps) => {
    const views = useSelector((state: any) => {
        return viewsSelector(state);
    }, shallowEqual);

    const dispatch = useDispatch();
    const classes = useStyles();

    const createSubViewToggler = (view: ViewType) => {
        return () => {
            dispatch(toggleView(view));
        };
    };

    return (
        <div
            className={classes.container}
        >
            <Search />
            <List
                component={'nav'}
                subheader={(
                    <ListSubheader
                        className={classes.subHeader}
                    >
                        Settings
                    </ListSubheader>
                )}
            >
                <ListItem
                    button={true}
                    className={classes.listItem}
                    onClick={createSubViewToggler('account')}
                >
                    <ListItemIcon>
                        <AccountCircle />
                    </ListItemIcon>
                    <ListItemText
                        primary={'Account'}
                    />
                    {views.account ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse
                    in={views.account}
                    timeout={'auto'}
                    unmountOnExit={true}
                >
                    <AccountSubView />
                </Collapse>
                <ListItem
                    button={true}
                    className={classes.listItem}
                >
                    <ListItemIcon>
                        <Public />
                    </ListItemIcon>
                    <ListItemText
                        primary={'Network'}
                    />
                    <ExpandMore />
                </ListItem>
            </List>
        </div>
    );
};

export default View;
