import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import withWidth, { isWidthDown, WithWidth } from '@material-ui/core/withWidth';
import classNames from 'classnames';
import React, {
    Component,
    Fragment,
    MouseEvent,
    TouchEvent,
} from 'react';
import Categories from '../../containers/side-nav/Categories';

interface ISideNavProps {
    instance: string;
    isVisible: boolean;
    hideSideNav: (instance: string) => any;
}

interface ISideNavState {}

type SideNavProps = ISideNavProps & WithStyles & WithWidth;

class SideNav extends Component<SideNavProps, ISideNavState> {

    protected touchStartX: number;

    protected touchCurrentX: number;

    protected willHide: boolean;

    protected domNode?: HTMLElement;

    constructor(props: SideNavProps, context: any) {
        super(props, context);

        this.handleClick = this.handleClick.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.setRef = this.setRef.bind(this);

        this.touchStartX = 0;
        this.touchCurrentX = 0;
        this.willHide = false;
    }

    public setRef(element: any) {
        this.domNode = element;
    }

    public blockClick(event: MouseEvent<HTMLElement>) {
        event.stopPropagation();
    }

    public handleClick() {
        const { width } = this.props;

        if (isWidthDown('md', width)) {
            this.hideSideNav();
        }
    }

    public handleTouchStart(event: TouchEvent<HTMLElement>) {
        this.touchStartX = event.touches[0].pageX;
        this.touchCurrentX = this.touchStartX;

        // TODO: add transition and remove on end with react spring
    }

    public handleTouchMove(event: TouchEvent<HTMLElement>) {
        const { isVisible } = this.props;

        this.touchCurrentX = event.touches[0].pageX;

        const deltaX = this.touchCurrentX - this.touchStartX;

        this.willHide = (deltaX < -50);

        // TODO set willHide to false if last swipe was in other direction

        if (!this.domNode) {
            return;
        }

        if (!isVisible) {
            return;
        }

        const translateX = Math.min(0, deltaX);

        this.domNode.style.transform = `translateX(${translateX}px)`;
    }

    public handleTouchEnd(event: TouchEvent<HTMLElement>) {
        if (this.willHide) {
            this.hideSideNav();
            return;
        }

        if (!this.domNode) {
            return;
        }

        this.domNode.style.transform = null;
    }

    public render() {
        const {
            instance,
            isVisible,
        } = this.props;
        const {
            container,
            containerBefore,
            containerVisible,
            containerVisibleBefore,
            nav,
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
                    onTouchEnd={this.handleTouchEnd}
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
                        ref={this.setRef}
                    >
                        <Categories
                            instance={instance}
                        />
                    </nav>
                </aside>
            </Fragment>
        );
    }

    protected hideSideNav() {
        const {
            instance,
            hideSideNav,
        } = this.props;

        hideSideNav(instance);

        if (!this.domNode) {
            return;
        }

        this.domNode.style.transform = null;
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
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
};

export default withStyles(style)(
    withWidth()(SideNav as any),
);