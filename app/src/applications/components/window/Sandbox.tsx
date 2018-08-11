import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import React, { Component, ComponentType } from 'react';

interface ISandboxProps {
    pointerEvents: boolean;
    src: string;
}

interface ISandboxState {}

type SandboxProps = ISandboxProps & WithStyles;

class Sandbox extends Component<SandboxProps, ISandboxState> {

    public render() {
        const { pointerEvents, src } = this.props;
        const { iframe, iframePointerEvents } = this.props.classes;

        return (
            <iframe
                className={classNames(
                    iframe,
                    {
                        [iframePointerEvents]: pointerEvents,
                    },
                )}
                src={src}
                allowFullScreen={true}
            />
        );
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        iframe: {
            [theme.breakpoints.up('lg')]: {
                height: 'calc(100% - 2rem)',
            },
            backgroundColor: '#ffffff',
            border: 'none',
            height: '100%',
            width: '100%',
        },
        iframePointerEvents: {
            pointerEvents: 'none',
        },
    };
};

export default withStyles(style)(Sandbox) as ComponentType<ISandboxProps>;
