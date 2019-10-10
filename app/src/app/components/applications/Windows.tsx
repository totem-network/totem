import { makeStyles } from '@material-ui/styles';
import { ApplicationWindow, TaskTitle } from 'applications';
import classNames from 'classnames';
import {
    APPLICATION_ID as FILESYSTEM_APPLICATION_ID,
    FileSystemWindow,
} from 'filesystem';
import { List } from 'immutable';
import React, { Fragment, useState } from 'react';
import HomeButton from './HomeButton';
import TaskInfo from './TaskInfo';

interface IInstance {
    application: string;
    icon: string;
    id: string;
    themeColor: string;
    title: string;
}

interface IWindow {
    height: number;
    minimized: boolean;
    instance: string;
    width: number;
    x: number;
    y: number;
}

interface IWindowsProps {
    instances: IInstance[];
    showTaskManager: boolean;
    windows: IWindow[];
}

const useStyles = makeStyles({
    container: {
        height: '100%',
        overflow: 'hidden',
        position: 'absolute',
        width: '100%',
    },
    containerNoPointerEvents: {
        pointerEvents: 'none',
    },
    windowContainer: {
        height: '100%',
        width: '100%',
    },
});

const getFocusedIndex = (windows: IWindow[]) => {
    return List(windows).findLastIndex((window?: IWindow) => {
        if (!window) {
            return false;
        }

        return !window.minimized;
    });
};

const getWindowComponent = (instanceId: string, instances: IInstance[]) => {
    const windowInstance = List(instances).find((instance) => {
        if (!instance) {
            return false;
        }

        return (instance.id === instanceId);
    });

    switch (windowInstance.application) {
        case FILESYSTEM_APPLICATION_ID:
            return FileSystemWindow;
        default:
            return ApplicationWindow;
    }
};

const Windows = ({
    instances,
    showTaskManager,
    windows,
}: IWindowsProps) => {
    const classes = useStyles();

    const containerClass = classNames(
        classes.container,
        {
            [classes.containerNoPointerEvents]: (
                getFocusedIndex(windows) === -1 &&
                !showTaskManager
            ),
        },
    );

    const focusedIndex = getFocusedIndex(windows);

    const orderedWindows: any = {};

    windows.forEach((window: IWindow, index: number) => {
        orderedWindows[window.instance] = index;
    });

    const windowComponents = List(windows).sort((a: IWindow, b: IWindow) => {
        // sorting by instance is required to prevent reloading of applications iframe
        // to change the order in the view change the orderedWindows object
        return a.instance.localeCompare(b.instance);
    }).map((window) => {
        if (!window) {
            return null;
        }

        let focused: boolean = false;
        if (focusedIndex === orderedWindows[window.instance]) {
            focused = true;
        }

        let minimized = window.minimized;
        let offset = 0;
        let taskStyle = {};

        if (showTaskManager) {
            minimized = false;
            focused = true;

            // TODO: replace focusedIndex with index from sorted windows
            let sortedIndex = focusedIndex;
            if (focusedIndex === -1) {
                sortedIndex = 0;
            }

            offset = orderedWindows[window.instance] - sortedIndex;

            taskStyle = {
                left: offset * 75 + 'vw',
                top: '-5vh',
            };
        }

        const WindowComponent = getWindowComponent(window.instance, instances);

        return (
            <Fragment key={window.instance}>
                <WindowComponent
                    focused={focused}
                    instance={window.instance}
                    minimized={minimized}
                    task={showTaskManager}
                    taskStyle={taskStyle}
                    windowHeight={window.height}
                    windowWidth={window.width}
                    x={window.x}
                    y={window.y}
                    zIndex={orderedWindows[window.instance]}
                />
                <TaskInfo
                    instanceId={window.instance}
                    instances={instances}
                    offset={offset}
                    showTaskManager={showTaskManager}
                />
            </Fragment>
        );
    });

    return (
        <div className={containerClass}>
            {windowComponents}
            <HomeButton
                showTaskManager={showTaskManager}
            />
        </div>
    );
};

export default Windows;
