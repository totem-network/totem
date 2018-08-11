import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import React, { Component } from 'react';

interface ILogoFlatProps {
    className?: string;
}

interface ILogoFlatState {}

type LogoFlatProps = ILogoFlatProps & WithStyles;

class LogoFlat extends Component<LogoFlatProps, ILogoFlatState> {

    public render() {
        const { className } = this.props;
        const { image } = this.props.classes;

        const logoClass = classNames(
            image,
            className,
        );

        return (
            <img src="/images/logo-flat.svg" className={logoClass} />
        );
    }
}

const style: StyleRules = {
    image: {
        width: '100%',
    },
};

export default withStyles(style)(LogoFlat);
