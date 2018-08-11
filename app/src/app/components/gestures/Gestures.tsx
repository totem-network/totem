import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import { SwipeFromLeft } from 'gestures';
import React, { Component, ComponentType } from 'react';

interface IGesturesProps {
    swipeFromLeft: () => any;
}

interface IGesturesState {}

type GestureProps = IGesturesProps & WithStyles;

class Gestures extends Component<GestureProps, IGesturesState> {

    public render() {
        const { swipeFromLeft } = this.props;
        const { container } = this.props.classes;

        return (
            <div className={container}>
                <SwipeFromLeft onSwipe={swipeFromLeft} />
            </div>
        );
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        container: {
            [theme.breakpoints.up('lg')]: {
                display: 'none',
            },
            height: '100%',
            left: 0,
            overflow: 'hidden',
            position: 'fixed',
            top: 0,
            width: '100%',
        },
    };
};

export default withStyles(style)(Gestures) as ComponentType<IGesturesProps>;
