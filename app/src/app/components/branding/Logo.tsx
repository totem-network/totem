import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React from 'react';

interface ILogoProps {
    className?: string;
}

const useStyles = makeStyles({
    image: {
        width: '100%',
    },
});

const Logo = ({
    className,
}: ILogoProps) => {
    const classes = useStyles();

    const logoClass = classNames(
        classes.image,
        className,
    );

    return (
        <img src="/images/logo.svg" className={logoClass} />
    );
};

export default Logo;
