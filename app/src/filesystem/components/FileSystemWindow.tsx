import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import withWidth, { isWidthDown, WithWidth } from '@material-ui/core/withWidth';
import { IShowSideNavAction } from 'app';
import { Window } from 'applications';
import { SwipeFromLeft } from 'gestures';
import React, {
    Component,
    CSSProperties,
} from 'react';
import SideNav from '../containers/SideNav';
import Views from '../containers/Views';

interface IFileSystemWindowProps {
    changing: boolean;
    finishChange: () => void;
    focused: boolean;
    instance: string;
    minimized: boolean;
    showSideNav: () => IShowSideNavAction;
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

type FileSystemWindowProps = IFileSystemWindowProps & WithStyles & WithWidth;

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
                {this.renderWindowContent()}
            </Window>
        );
    }

    public renderWindowContent() {
        const {
            instance,
            showSideNav,
            width,
        } = this.props;

        const { container } = this.props.classes;

        if (isWidthDown('sm', width)) {
            // TODO: swipe from left -> show sidenav
            return (
                <div className={container}>
                    <Views
                        instance={instance}
                    />
                    <SwipeFromLeft
                        onSwipe={showSideNav}
                    />
                </div>
            );
        }

        return (
            <div className={container}>
                <SideNav
                    instance={instance}
                />
                <Views
                    instance={instance}
                />
            </div>
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

export default withStyles(style)(
    withWidth()(FileSystemWindow as any),
);
