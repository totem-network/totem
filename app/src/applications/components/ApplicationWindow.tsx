import React, {
    CSSProperties,
} from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import instanceSelector from '../selectors/instance';
import Sandbox from './window/Sandbox';
import Window from './window/Window';

interface IApplicationWindowProps {
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
    const { application } = useSelector((state) => {
        return instanceSelector(state, instance);
    }, shallowEqual);

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
