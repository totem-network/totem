import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { isWidthUp } from '@material-ui/core/withWidth';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import useWidth from 'ui/hooks/useWidth';
import systemBarSelector from '../../selectors/systemBar';
import CurrentDate from '../clock/CurrentDate';
import CurrentTime from '../clock/CurrentTime';

interface IClockProps {}

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            [theme.breakpoints.up('lg')]: {
                height: '1.5vw',
                margin: '.25vw',
                position: 'absolute',
                right: '16vw',
                top: '7vh',
                width: '1.5vw',
            },
            // top right on mobile and top left floating on desktop
            margin: '.2rem .4rem',
        },
        containerDrawerVisible: {
            display: 'none',
        },
        time: {
            [theme.breakpoints.up('lg')]: {
                fontSize: '3rem',
            },
        },
        date: {
            [theme.breakpoints.up('lg')]: {
                margin: '0 .25vw',
                width: '20vw',
            },
            [theme.breakpoints.down('md')]: {
                bottom: '-1.8rem',
                color: theme.palette.primary.contrastText,
                margin: '.4rem',
                position: 'absolute',
            },
        },
    };
});

const Clock = ({}: IClockProps) => {
    const { isDrawerVisible } = useSelector(systemBarSelector, shallowEqual);

    const classes = useStyles();
    const width = useWidth();

    const renderDate = () => {
        if (isWidthUp('lg', width)) {
            return (
                <div
                    className={classes.date}
                >
                    <CurrentDate />
                </div>
            );
        }

        return null;
    };

    return (
        <div
            className={classNames(
                classes.container,
                {
                    [classes.containerDrawerVisible]: isDrawerVisible,
                },
            )}
        >
            <div
                className={classes.time}
            >
                <CurrentTime />
            </div>
            {renderDate()}
        </div>
    );
};

export default Clock;
