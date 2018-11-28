import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import React, { Component } from 'react';

interface IBackgroundProps {
    className?: string;
}

interface IBackgroundState {}

type BackgroundProps = IBackgroundProps & WithStyles;

class Background extends Component<BackgroundProps, IBackgroundState> {

    public render() {
        const { className } = this.props;
        const { image } = this.props.classes;

        const backgroundClass = classNames(
            image,
            className,
        );

        return (
            <img src="/images/launcher-background.svg" className={backgroundClass} />
        );
    }
}

const style: StyleRules = {
    image: {
        height: '100%',
        width: '100%',
    },
};

export default withStyles(style)(Background);
