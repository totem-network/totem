import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import sideNavSelector from '../../selectors/sideNav';
import Categories from './Categories';

interface ISideNavProps {
    instance: string;
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            [theme.breakpoints.up('lg')]: {
                overflow: 'visible',
                pointerEvents: 'auto',
                position: 'static',
                width: '3vw',
            },
            height: '100%',
            left: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            position: 'fixed',
            top: 0,
            width: '100%',
        },
        containerBefore: {
            [theme.breakpoints.up('lg')]: {
                display: 'none',
                willChange: 'auto',
            },
            background: 'rgba(0, 0, 0, 0.2)',
            display: 'block',
            height: '100%',
            left: 0,
            opacity: 0,
            pointerEvents: 'none',
            position: 'absolute',
            top: 0,
            transition: 'opacity .3s ease-out',
            width: '100%',
            willChange: 'opacity',
        },
        containerVisible: {
            pointerEvents: 'auto',
        },
        containerVisibleBefore: {
            [theme.breakpoints.up('lg')]: {
                display: 'none',
            },
            opacity: 1,
        },
        nav: {
            [theme.breakpoints.down('md') + ' and (orientation:landscape)']: {
                flexDirection: 'row',
            },
            [theme.breakpoints.up('lg')]: {
                boxShadow: '2px 0 6px rgba(0, 0, 0, 0.1)',
                overflow: 'visible',
                transform: 'none',
                width: '220px',
                willChange: 'auto',
            },
            background: '#f8f8f8',
            boxShadow: '2px 0 12px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'flex-start',
            overflow: 'hidden',
            position: 'relative',
            transform: 'translateX(-102%)',
            // transition: 'transform .3s ease-out',
            width: '90%',
            willChange: 'transform',
        },
        navVisible: {
            transform: 'none',
        },
    };
});

const SideNav = ({
    instance,
}: ISideNavProps) => {
    const isVisible = useSelector((state) => {
        return sideNavSelector(state, instance);
    }, shallowEqual);

    const classes = useStyles();

    return (
        <>
            <div
                className={classNames(
                    classes.containerBefore,
                    {
                        [classes.containerVisibleBefore]: isVisible,
                    },
                )}
            />
            <aside
                className={classNames(
                    classes.container,
                    {
                        [classes.containerVisible]: isVisible,
                    },
                )}
            >
                <nav
                    className={classNames(
                        classes.nav,
                        {
                            [classes.navVisible]: isVisible,
                        },
                    )}
                >
                    <Categories
                        instance={instance}
                    />
                </nav>
            </aside>
        </>
    );
};

export default SideNav;
