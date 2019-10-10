import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React from 'react';

interface ISandboxProps {
    pointerEvents: boolean;
    src: string;
}

const useStyles = makeStyles((theme: Theme) => {
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
});

const Sandbox = ({
    pointerEvents,
    src,
}: ISandboxProps) => {
    const classes = useStyles();

    return (
        <iframe
            className={classNames(
                classes.iframe,
                {
                    [classes.iframePointerEvents]: pointerEvents,
                },
            )}
            src={src}
            allowFullScreen={true}
        />
    );
};

export default Sandbox;
