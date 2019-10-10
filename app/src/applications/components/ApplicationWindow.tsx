import React, {
    CSSProperties,
} from 'react';
import Window from '../containers/Window';
import Sandbox from './window/Sandbox';

interface IApplicationWindowProps {
    application: string;
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

const ApplicationWindow = ({
    application,
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
}: IApplicationWindowProps) => {
    return (
        <Window
            focused={focused}
            instance={instance}
            minimized={minimized}
            task={task}
            taskStyle={taskStyle}
            windowHeight={windowHeight}
            windowWidth={windowWidth}
            x={x}
            y={y}
            zIndex={zIndex}
        >
            <Sandbox
                pointerEvents={task}
                src={application}
            />
        </Window>
    );
};

export default ApplicationWindow;
