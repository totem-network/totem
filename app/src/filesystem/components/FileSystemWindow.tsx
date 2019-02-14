import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import { Window } from 'applications';
import React, {
    Component,
    CSSProperties,
} from 'react';
import SideNav from '../containers/SideNav';
import Types from '../containers/Types';

interface IFileSystemWindowProps {
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

interface IFileSystemWindowState {}

type FileSystemWindowProps = IFileSystemWindowProps & WithStyles;

class FileSystemWindow extends Component<FileSystemWindowProps, IFileSystemWindowState> {

    public render() {
        const {
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

        const { container } = this.props.classes;

        return (
            <Window
                finishChange={finishChange}
                focused={focused}
                instance={instance}
                minimized={minimized}
                noHeader={true}
                startChange={startChange}
                taskStyle={taskStyle}
                windowHeight={windowHeight}
                windowWidth={windowWidth}
                x={x}
                y={y}
                zIndex={zIndex}
            >
                <div className={container}>
                    <SideNav
                        instance={instance}
                    />
                    <Types
                        instance={instance}
                    />
                </div>
            </Window>
        );
    }
}

const style: StyleRules = {
    container: {
        backgroundColor: '#f0f0f0',
        height: '100%',
        width: '100%',
    },
};

export default withStyles(style)(FileSystemWindow);
