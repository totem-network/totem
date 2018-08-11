import {
    IStartApplicationAction,
    startApplication,
} from './actions/application';
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
import taskManagerSelector from './selectors/taskManager';
import windowsSelector from './selectors/windows';

export {
    focusWindow,
    HomeButton,
    IFocusWindowAction,
    IImmutableApplicationsState,
    instancesSelector,
    IStartApplicationAction,
    reducer,
    sagas,
    startApplication,
    StartApplicationDialog,
    taskManagerSelector,
    TaskTitle,
    Window,
    windowsSelector,
};
