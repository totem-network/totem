import { makeStyles } from '@material-ui/styles';
import React from 'react';
import LogoFlat from './../branding/LogoFlat';

interface IBrandingProps {}

const useStyles = makeStyles({
    logo:  {
        display: 'inline-block',
        verticalAlign: 'middle',
        width: '5vh',
    },
    wrapper: {
        bottom: '5vh',
        position: 'absolute',
        right: '5vw',
    },
});

const Branding = ({}: IBrandingProps) => {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <div className={classes.logo}>
                <LogoFlat />
            </div>
        </div>
    );
};

export default Branding;
