import { isWidthDown } from '@material-ui/core/withWidth';
import { makeStyles } from '@material-ui/styles';
import { IShowSideNavAction } from 'app';
import { Window } from 'applications';
import { SwipeFromLeft } from 'gestures';
import React, {
    CSSProperties,
} from 'react';
import { useWidth } from 'ui';
import SideNav from '../containers/SideNav';
import Views from '../containers/Views';

interface IFileSystemWindowProps {
    focused: boolean;
    instance: string;
    minimized: boolean;
    showSideNav: () => IShowSideNavAction;
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
    showSideNav,
    task,
    taskStyle,
    windowHeight,
    windowWidth,
    x,
    y,
    zIndex,
}: IFileSystemWindowProps) => {
    const classes = useStyles();
    const width = useWidth();

    const windowContent = (isWidthDown('sm', width)) ? (
            <div className={classes.container}>
                <Views
                    instance={instance}
                />
                <SwipeFromLeft
                    onSwipe={showSideNav}
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
