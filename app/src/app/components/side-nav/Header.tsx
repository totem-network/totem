import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { isWidthDown } from '@material-ui/core/withWidth';
import { makeStyles } from '@material-ui/styles';
import Avatar from 'account/components/Avatar';
import accountAddressSelector from 'account/selectors/accountAddress';
import { startApplication } from 'applications/actions/application';
import { APPLICATION_ID } from 'filesystem';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import useWidth from 'ui/hooks/useWidth';

interface IHeaderProps {}

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

const Header = ({}: IHeaderProps) => {
    const address = useSelector(accountAddressSelector, shallowEqual);

    const dispatch = useDispatch();

    const classes = useStyles();
    const width = useWidth();

    const openFileSystem = () => {
        dispatch(startApplication(APPLICATION_ID, '/apps/filesystem.json'));
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
