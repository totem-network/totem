import { isWidthDown } from '@material-ui/core/withWidth';
import { makeStyles } from '@material-ui/styles';
import { showSideNav } from 'app/actions/sideNav';
import Window from 'applications/components/window/Window';
import SwipeFromLeft from 'gestures/components/SwipeFromLeft';
import React, {
    CSSProperties,
} from 'react';
import { useDispatch } from 'react-redux';
import useWidth from 'ui/hooks/useWidth';
import SideNav from '../components/side-nav/SideNav';
import Views from './category/Views';

interface IFileSystemWindowProps {
    focused: boolean;
    instance: string;
    minimized: boolean;
    task: boolean;
    taskStyle: CSSProperties;
    windowHeight: number;
    windowWidth: number;
    x: number;
    y: number;
    zIndex: number;
}

const useStyles = makeStyles({
    container: {
        backgroundColor: '#f0f0f0',
        height: '100%',
        width: '100%',
    },
});

const FileSystemWindow = ({
    focused,
    instance,
    minimized,
    task,
    taskStyle,
    windowHeight,
    windowWidth,
    x,
    y,
    zIndex,
}: IFileSystemWindowProps) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const width = useWidth();

    const handleSwipe = () => {
        dispatch(showSideNav());
    };

    const windowContent = (isWidthDown('sm', width)) ? (
            <div className={classes.container}>
                <Views
                    instance={instance}
                />
                <SwipeFromLeft
                    onSwipe={handleSwipe}
                />
            </div>
        ) : (
            <div className={classes.container}>
                <SideNav
                    instance={instance}
                />
                <Views
                    instance={instance}
                />
            </div>
        );

    return (
        <Window
            focused={focused}
            instance={instance}
            minimized={minimized}
            noHeader={true}
            task={task}
            taskStyle={taskStyle}
            windowHeight={windowHeight}
            windowWidth={windowWidth}
            x={x}
            y={y}
            zIndex={zIndex}
        >
            {windowContent}
        </Window>
    );
};

export default FileSystemWindow;
