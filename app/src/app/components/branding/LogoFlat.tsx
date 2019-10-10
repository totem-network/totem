import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React from 'react';

interface ILogoFlatProps {
    className?: string;
}

const useStyles = makeStyles({
    image: {
        width: '100%',
    },
});

const LogoFlat = ({
    className,
}: ILogoFlatProps) => {
    const classes = useStyles();

    const logoClass = classNames(
        classes.image,
        className,
    );

    return (
        <img src="/images/logo-flat.svg" className={logoClass} />
    );
};

export default LogoFlat;
