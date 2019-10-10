import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { isWidthDown } from '@material-ui/core/withWidth';
import { makeStyles } from '@material-ui/styles';
import { Avatar } from 'account';
import { IStartApplicationAction } from 'applications';
import { APPLICATION_ID } from 'filesystem';
import React from 'react';
import { useWidth } from 'ui';

interface IHeaderProps {
    address: string;
    startApplication: (application: string, manifestUrl?: string) => IStartApplicationAction;
}

const useStyles = makeStyles((theme: Theme) => {
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
});

const Header = ({
    address,
    startApplication,
}: IHeaderProps) => {
    const classes = useStyles();
    const width = useWidth();

    const openFileSystem = () => {
        startApplication(APPLICATION_ID, '/apps/filesystem.json');
    };

    // TODO: add some info about logged in identity
    const mobileAccountInfo = isWidthDown('md', width) ?  null : null;

    return (
        <header className={classes.header}>
            <div className={classes.avatar} onClick={openFileSystem}>
                <Avatar address={address} />
            </div>
            {mobileAccountInfo}
        </header>
    );
};

export default Header;
