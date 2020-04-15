import { isWidthUp } from '@material-ui/core/withWidth';
import Apps from '@material-ui/icons/Apps';
import { makeStyles } from '@material-ui/styles';
import { showLauncher } from 'app/actions/launcher';
import React from 'react';
import { useDispatch } from 'react-redux';
import useWidth from 'ui/hooks/useWidth';

interface ILauncherProps {}

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

const Launcher = ({}: ILauncherProps) => {
    const dispatch = useDispatch();

    const classes = useStyles();
    const width = useWidth();

    const handleClick = () => {
        dispatch(showLauncher());
    };

    return isWidthUp('lg', width) ?  (
        <div className={classes.launcher} onClick={handleClick}>
            <Apps fontSize={'inherit'} />
        </div>
    ) : null;
};

export default Launcher;
