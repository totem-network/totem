import { isWidthUp } from '@material-ui/core/withWidth';
import Apps from '@material-ui/icons/Apps';
import { makeStyles } from '@material-ui/styles';
import { IShowLauncherAction } from 'app/actions/launcher';
import React from 'react';
import { useWidth } from 'ui';

interface ILauncherProps {
    showLauncher: () => IShowLauncherAction;
}

const useStyles = makeStyles({
    launcher: {
        cursor: 'pointer',
        fontSize: '2.4vw',
        marginBottom: '.5vw',
        marginLeft: '.5vw',
        marginTop: 'auto',
        width: '100%',
    },
});

const Launcher = ({
    showLauncher,
}: ILauncherProps) => {
    const classes = useStyles();
    const width = useWidth();

    return isWidthUp('lg', width) ?  (
        <div className={classes.launcher} onClick={showLauncher}>
            <Apps fontSize={'inherit'} />
        </div>
    ) : null;
};

export default Launcher;
