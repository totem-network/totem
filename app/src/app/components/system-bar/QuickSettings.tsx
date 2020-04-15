import { Theme } from '@material-ui/core/styles/createMuiTheme';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import Settings from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/styles';
import { logout } from 'account/actions/logout';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
    DrawerView,
    showSystemBarDrawer,
} from '../../actions/systemBar';
import Item from './Item';

interface IQuickSettingsProps {}

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            [theme.breakpoints.up('lg')]: {
                borderRadius: '2vw',
                background: 'rgba(0, 0, 30, 0.6)',
                color: theme.palette.primary.contrastText,
                display: 'flex',
                flexDirection: 'column',
                left: '-64px',
                position: 'absolute',
                top: '16px',
            },
        },
    };
});

const QuickSettings = ({}: IQuickSettingsProps) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const logoutHandler = () => {
        dispatch(logout());
    };

    const createClickHandler = (view: DrawerView) => {
        return () => {
            dispatch(showSystemBarDrawer(view));
        };
    };

    return (
        <nav
            className={classes.container}
        >
            <Item
                onClick={logoutHandler}
            >
                <PowerSettingsNew fontSize={'inherit'} />
            </Item>
            <Item
                onClick={createClickHandler('settings')}
            >
                <Settings fontSize={'inherit'} />
            </Item>
        </nav>
    );
};

export default QuickSettings;
