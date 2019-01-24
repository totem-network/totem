import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import React, {
    Component,
    Fragment,
} from 'react';
import Direction from './resize/Direction';

interface IResizeProps {
    finish: () => void;
    move: (x: number, y: number) => void;
    resize: (width: number, height: number) => void;
}

interface IResizeState {}

type ResizeProps = IResizeProps & WithStyles;

class Resize extends Component<ResizeProps, IResizeState> {

    public render() {
        const {
            bottom,
            bottomLeft,
            bottomRight,
            left,
            right,
            top,
            topLeft,
            topRight,
        } = this.props.classes;

        return (
            <Fragment>
                <Direction
                    className={topLeft}
                    direction='ne'
                    {...this.props}
                />
                <Direction
                    className={topRight}
                    direction='nw'
                    {...this.props}
                />
                <Direction
                    className={bottomLeft}
                    direction='se'
                    {...this.props}
                />
                <Direction
                    className={bottomRight}
                    direction='sw'
                    {...this.props}
                />
                <Direction
                    className={top}
                    direction='n'
                    {...this.props}
                />
                <Direction
                    className={left}
                    direction='e'
                    {...this.props}
                />
                <Direction
                    className={right}
                    direction='w'
                    {...this.props}
                />
                <Direction
                    className={bottom}
                    direction='s'
                    {...this.props}
                />
            </Fragment>
        );
    }
}

const style: StyleRules = {
    bottom: {
        bottom: '0',
        cursor: 's-resize',
        height: '5px',
        position: 'absolute',
        width: '100%',
    },
    bottomLeft: {
        bottom: '0',
        cursor: 'se-resize',
        height: '15px',
        position: 'absolute',
        right: '0',
        width: '10px',
        zIndex: 1,
    },
    bottomRight: {
        bottom: '0',
        cursor: 'sw-resize',
        height: '7px',
        left: '0',
        position: 'absolute',
        width: '7px',
        zIndex: 1,
    },
    left: {
        cursor: 'w-resize',
        height: '100%',
        left: '0',
        position: 'absolute',
        top: '0',
        width: '5px',
    },
    right: {
        cursor: 'e-resize',
        height: '100%',
        position: 'absolute',
        right: '0',
        top: '0',
        width: '5px',
    },
    top: {
        cursor: 'n-resize',
        height: '5px',
        position: 'absolute',
        top: '0',
        width: '100%',
    },
    topLeft: {
        cursor: 'nw-resize',
        height: '7px',
        left: '0',
        position: 'absolute',
        top: '0',
        width: '7px',
        zIndex: 1,
    },
    topRight: {
        cursor: 'ne-resize',
        height: '15px',
        position: 'absolute',
        right: '0',
        top: '0',
        width: '10px',
        zIndex: 1,
    },
};

export default withStyles(style)(Resize);
