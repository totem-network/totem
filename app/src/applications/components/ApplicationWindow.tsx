import React, {
    Component,
    CSSProperties,
} from 'react';
import Window from '../containers/Window';
import Sandbox from './window/Sandbox';

interface IApplicationWindowProps {
    application: string;
    changing: boolean;
    finishChange: () => void;
    focused: boolean;
    instance: string;
    minimized: boolean;
    startChange: () => void;
    task: boolean;
    taskStyle: CSSProperties;
    windowHeight: number;
    windowWidth: number;
    x: number;
    y: number;
    zIndex: number;
}

interface IApplicationWindowState {}

class ApplicationWindow extends Component<IApplicationWindowProps, IApplicationWindowState> {

    public render() {
        const {
            application,
            changing,
            finishChange,
            focused,
            instance,
            minimized,
            startChange,
            task,
            taskStyle,
            windowHeight,
            windowWidth,
            x,
            y,
            zIndex,
        } = this.props;

        return (
            <Window
                finishChange={finishChange}
                focused={focused}
                instance={instance}
                minimized={minimized}
                startChange={startChange}
                task={task}
                taskStyle={taskStyle}
                windowHeight={windowHeight}
                windowWidth={windowWidth}
                x={x}
                y={y}
                zIndex={zIndex}
            >
                <Sandbox
                    pointerEvents={changing || task}
                    src={application}
                />
            </Window>
        );
    }
}

export default ApplicationWindow;
