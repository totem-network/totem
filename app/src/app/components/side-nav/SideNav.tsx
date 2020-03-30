import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { isWidthDown } from '@material-ui/core/withWidth';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, {
    MouseEvent,
    TouchEvent,
} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useWidth } from 'ui';
import { hideSideNav } from '../../actions/sideNav';
import sideNavSelector from '../../selectors/sideNav';
import Categories from './Categories';
import Header from './Header';
import Launcher from './Launcher';
import Tasks from './Tasks';

interface ISideNavProps {}

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            [theme.breakpoints.up('lg')]: {
                borderRadius: '50%',
                height: '60%',
                overflow: 'visible',
                pointerEvents: 'auto',
                top: '20%',
                width: '3vw',
            },
            height: '100%',
            left: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: theme.zIndex.drawer,
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
            zIndex: theme.zIndex.drawer,
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
                borderRadius: '0 1.5vw 1.5vw 0',
                boxShadow: '2px 0 12px rgba(0, 0, 0, 0.4)',
                overflow: 'visible',
                transform: 'none',
                width: '3.4vw',
                willChange: 'auto',
            },
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
        navBackground: {
            [theme.breakpoints.up('lg')]: {
                borderRadius: '0 1.5vw 1.5vw 0',
                background: 'rgba(0, 0, 30, 0.6)',
            },
            background: '#f0f0f0',
            height: '100%',
            position: 'absolute',
            width: '100%',
            zIndex: -1,
        },
        navVisible: {
            boxShadow: '2px 0 12px rgba(0, 0, 0, 0.4)',
            transform: 'none',
        },
    };
});

const SideNav = ({}: ISideNavProps) => {
    const { isVisible } = useSelector(sideNavSelector, shallowEqual);

    const dispatch = useDispatch();
    const classes = useStyles();
    const width = useWidth();

    let touchStartX = 0;
    let touchCurrentX = 0;
    let willHide = false;
    let domNode: any = null;

    const setRef = (element: any) => {
        domNode = element;
    };

    const hide = () => {
        dispatch(hideSideNav());

        if (!domNode) {
            return;
        }

        domNode.style.transform = '';
    };

    const blockClick = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
    };

    const handleClick = () => {
        if (isWidthDown('md', width)) {
            hide();
        }
    };

    const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
        touchStartX = event.touches[0].pageX;
        touchCurrentX = touchStartX;

        // TODO: add transition and remove on end with react spring
    };

    const handleTouchMove = (event: TouchEvent<HTMLElement>) => {

        touchCurrentX = event.touches[0].pageX;

        const deltaX = touchCurrentX - touchStartX;

        willHide = (deltaX < -50);

        // TODO set willHide to false if last swipe was in other direction

        if (!domNode) {
            return;
        }

        if (!isVisible) {
            return;
        }

        const translateX = Math.min(0, deltaX);

        domNode.style.transform = `translateX(${translateX}px)`;
    };

    const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
        if (willHide) {
            hide();
            return;
        }

        if (!domNode) {
            return;
        }

        domNode.style.transform = '';
    };

    const content = (isWidthDown('md', width)) ? (
        <>
            <div className={classes.navBackground} />
            <Header />
            <Categories />
        </>
    ) : (
        <>
            <div className={classes.navBackground} />
            <Header />
            <Tasks />
            <Launcher />
        </>
    );

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
                onClick={handleClick}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
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
                    ref={setRef}
                >
                    {content}
                </nav>
            </aside>
        </>
    );
};

export default SideNav;
