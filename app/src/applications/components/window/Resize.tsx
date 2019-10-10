import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Direction from './resize/Direction';

interface IResizeProps {
    finish: () => void;
    move: (x: number, y: number) => void;
    resize: (width: number, height: number) => void;
}

const useStyles = makeStyles({
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
        zIndex: 1,
    },
    topLeft: {
        cursor: 'nw-resize',
        height: '7px',
        left: '0',
        position: 'absolute',
        top: '0',
        width: '7px',
        zIndex: 2,
    },
    topRight: {
        cursor: 'ne-resize',
        height: '15px',
        position: 'absolute',
        right: '0',
        top: '0',
        width: '10px',
        zIndex: 2,
    },
});

const Resize = (props: IResizeProps) => {
    const classes = useStyles();

    return (
        <>
            <Direction
                className={classes.topLeft}
                direction='ne'
                {...props}
            />
            <Direction
                className={classes.topRight}
                direction='nw'
                {...props}
            />
            <Direction
                className={classes.bottomLeft}
                direction='se'
                {...props}
            />
            <Direction
                className={classes.bottomRight}
                direction='sw'
                {...props}
            />
            <Direction
                className={classes.top}
                direction='n'
                {...props}
            />
            <Direction
                className={classes.left}
                direction='e'
                {...props}
            />
            <Direction
                className={classes.right}
                direction='w'
                {...props}
            />
            <Direction
                className={classes.bottom}
                direction='s'
                {...props}
            />
        </>
    );
};

export default Resize;
