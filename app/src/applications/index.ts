import {
    IStartApplicationAction,
    startApplication,
} from './actions/application';
import {
    hideLauncher,
    IHideLauncherAction,
    IShowLauncherAction,
    showLauncher,
} from './actions/launcher';
import {
    focusWindow,
    IFocusWindowAction,
} from './actions/windows';
import TaskTitle from './components/task-manager/TaskTitle';
import HomeButton from './containers/HomeButton';
import StartApplicationDialog from './containers/StartApplicationDialog';
import Window from './containers/Window';
import reducer, { IImmutableApplicationsState } from './reducers';
import sagas from './sagas';
import instancesSelector from './selectors/instances';
import launcherSelector from './selectors/launcher';
import taskManagerSelector from './selectors/taskManager';
import windowsSelector from './selectors/windows';

export {
    focusWindow,
    hideLauncher,
    HomeButton,
    IFocusWindowAction,
    IHideLauncherAction,
    IImmutableApplicationsState,
    instancesSelector,
    IShowLauncherAction,
    IStartApplicationAction,
    launcherSelector,
    reducer,
    sagas,
    showLauncher,
    startApplication,
    StartApplicationDialog,
    taskManagerSelector,
    TaskTitle,
    Window,
    windowsSelector,
};
