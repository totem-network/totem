import BottomNavigation from '@material-ui/core/BottomNavigation';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { isWidthDown } from '@material-ui/core/withWidth';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import useWidth from 'ui/hooks/useWidth';

export interface IViewNavProps {
    children: any;
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            [theme.breakpoints.up('lg')]: {
                bottom: 'auto',
                left: '50%',
                pointerEvents: 'none',
                textAlign: 'center',
                top: '0',
                transform: 'translate(-50%, 0)',
                zIndex: 2,
            },
            bottom: '0',
            position: 'absolute',
            width: '100%',
        },
    };
});

const ViewNav = ({
    children,
}: IViewNavProps) => {
    const classes = useStyles();
    const width = useWidth();

    if (isWidthDown('md', width)) {
        return (
            <BottomNavigation
                className={classes.container}
                showLabels={true}
            >
                {children}
            </BottomNavigation>
        );
    }

    return (
        <div className={classes.container}>
            {children}
        </div>
    );
};

export default ViewNav;
