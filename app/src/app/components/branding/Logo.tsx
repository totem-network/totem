import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import React, { Component } from 'react';

interface ILogoProps {
    className?: string;
}

interface ILogoState {}

type LogoProps = ILogoProps & WithStyles;

class Logo extends Component<LogoProps, ILogoState> {

    public render() {
        const { className } = this.props;
        const { image } = this.props.classes;

        const logoClass = classNames(
            image,
            className,
        );

        return (
            <img src="/images/logo.svg" className={logoClass} />
        );
    }
}

const style: StyleRules = {
    image: {
        width: '100%',
    },
};

export default withStyles(style)(Logo);
