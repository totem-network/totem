import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component, ComponentType } from 'react';

interface IBackgroundProps {}

interface IBackgroundState { }

type BackgroundProps = IBackgroundProps & WithStyles;

class Background extends Component<BackgroundProps, IBackgroundState> {

    public render() {
        const { background } = this.props.classes;

        return (
            <div className={background} />
        );
    }

}

const style: StyleRules = {
    background: {
        backgroundImage: 'url(\'/images/background.svg\')',
        backgroundSize: 'cover',
        height: '100%',
        width: '100%',
    },
};

export default withStyles(style)(Background) as ComponentType<IBackgroundProps>;
