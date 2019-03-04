import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import withWidth, { isWidthDown, WithWidth } from '@material-ui/core/withWidth';
import { Avatar } from 'account';
import { IStartApplicationAction } from 'applications';
import { APPLICATION_ID } from 'filesystem';
import React, { Component } from 'react';

interface IHeaderProps {
    address: string;
    startApplication: (application: string, manifestUrl?: string) => IStartApplicationAction;
}

interface IHeaderState {}

type HeaderProps = IHeaderProps & WithStyles & WithWidth;

class Header extends Component<HeaderProps, IHeaderState> {

    constructor(props: HeaderProps, context?: any) {
        super(props, context);

        this.openFileSystem = this.openFileSystem.bind(this);
    }

    public openFileSystem() {
        const { startApplication } = this.props;

        startApplication(APPLICATION_ID, '/apps/filesystem.json');
    }

    public render() {
        const { address } = this.props;
        const { avatar, header } = this.props.classes;

        return (
            <header className={header}>
                <div className={avatar} onClick={this.openFileSystem}>
                    <Avatar address={address} />
                </div>
                {this.renderMobile()}
            </header>
        );
    }

    protected renderMobile() {
        const { width } = this.props;

        // TODO: add some info about logged in identity

        return isWidthDown('md', width) ?  null : null;
    }

}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        avatar: {
            [theme.breakpoints.up('lg')]: {
                position: 'static',
                transform: 'none',
                width: '100%',
            },
            cursor: 'pointer',
            left: '50%',
            position: 'absolute',
            top: '50%',
            transform: 'translate(-50%, -50%)',
        },
        header: {
            [theme.breakpoints.down('md') + ' and (orientation:landscape)']: {
                height: '100%',
                width: '50%',
            },
            [theme.breakpoints.up('lg')]: {
                height: 'auto',
                marginBottom: '.8vw',
                marginLeft: '.6vw',
                marginTop: '1vw',
                position: 'static',
            },
            height: '33vh',
            position: 'relative',
            width: '100%',
        },
    };
};

export default withStyles(style)(
    withWidth()(Header),
);
