import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import withWidth, { isWidthDown, WithWidthProps } from '@material-ui/core/withWidth';
import classNames from 'classnames';
import React, {
    Component,
    ComponentType,
    Fragment,
    MouseEvent,
    TouchEvent,
} from 'react';
import { IHideSideNavAction } from './../../actions/sideNav';
import Header from './../../containers/side-nav/Header';
import Launcher from './../../containers/side-nav/Launcher';
import Tasks from './../../containers/side-nav/Tasks';

interface ISideNavProps {
    isVisible: boolean;
    hideSideNav: () => IHideSideNavAction;
}

interface ISideNavState {}

type SideNavProps = ISideNavProps & WithStyles & WithWidthProps;

class SideNav extends Component<SideNavProps, ISideNavState> {

    protected touchStartX: number;

    protected touchCurrentX: number;

    constructor(props: SideNavProps, context: any) {
        super(props, context);

        this.handleClick = this.handleClick.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);

        this.touchStartX = 0;
        this.touchCurrentX = 0;
    }

    public blockClick(event: MouseEvent<HTMLElement>) {
        event.stopPropagation();
    }

    public handleClick() {
        const { hideSideNav, width } = this.props;

        if (isWidthDown('md', width)) {
            hideSideNav();
        }
    }

    public handleTouchStart(event: TouchEvent<HTMLElement>) {
        this.touchStartX = event.touches[0].pageX;
        this.touchCurrentX = this.touchStartX;
    }

    public handleTouchMove(event: TouchEvent<HTMLElement>) {
        this.touchCurrentX = event.touches[0].pageX;

        const translateX = this.touchCurrentX - this.touchStartX;

        if (translateX < -50) {
            this.props.hideSideNav();
        }
    }

    public render() {
        const { isVisible } = this.props;
        const {
            backgroundBlur,
            container,
            containerBefore,
            containerVisible,
            containerVisibleBefore,
            nav,
            navBackground,
            navVisible,
        } = this.props.classes;

        return (
            <Fragment>
                <div
                    className={classNames(
                        containerBefore,
                        {
                            [containerVisibleBefore]: isVisible,
                        },
                    )}
                />
                <aside
                    onClick={this.handleClick}
                    onTouchStart={this.handleTouchStart}
                    onTouchMove={this.handleTouchMove}
                    className={classNames(
                        container,
                        {
                            [containerVisible]: isVisible,
                        },
                    )}
                >
                    <nav
                        className={classNames(
                            nav,
                            {
                                [navVisible]: isVisible,
                            },
                        )}
                    >
                        <div className={navBackground} />
                        <Header />
                        <Tasks />
                        <Launcher />
                    </nav>
                </aside>
            </Fragment>
        );
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        container: {
            [theme.breakpoints.up('lg')]: {
                overflow: 'visible',
                pointerEvents: 'auto',
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
                overflow: 'visible',
                transform: 'none',
                width: '3.4vw',
                willChange: 'auto',
            },
            boxShadow: '2px 0 12px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'flex-start',
            overflow: 'hidden',
            position: 'relative',
            transform: 'translateX(-102%)',
            transition: 'transform .3s ease-out',
            width: '90%',
            willChange: 'transform',
        },
        navBackground: {
            background: 'rgba(0, 0, 30, 0.6)',
            height: '100%',
            position: 'absolute',
            width: '100%',
            zIndex: -1,
        },
        navVisible: {
            transform: 'none',
        },
    };
};

export default withStyles(style)(
    withWidth()(SideNav) as ComponentType<ISideNavProps & WithStyles>,
) as ComponentType<ISideNavProps>;
