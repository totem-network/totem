import {
    IStartApplicationAction,
    startApplication,
} from './actions/application';
import {
    ADD_INSTANCE,
    CLOSE_INSTANCE,
    InstancesAction,
} from './actions/instances';
import {
    focusWindow,
    IFocusWindowAction,
} from './actions/windows';
import ApplicationWindow from './components/ApplicationWindow';
import HomeButton from './components/task-manager/HomeButton';
import TaskTitle from './components/task-manager/TaskTitle';
import Window from './components/window/Window';
import reducer, { IImmutableApplicationsState } from './reducers';
import sagas from './sagas';
import instancesSelector from './selectors/instances';
import showTaskManagerSelector from './selectors/showTaskManager';
import windowSelector from './selectors/window';
import windowsSelector from './selectors/windows';

export {
    ADD_INSTANCE,
    ApplicationWindow,
    CLOSE_INSTANCE,
    focusWindow,
    HomeButton,
    IFocusWindowAction,
    IImmutableApplicationsState,
    InstancesAction,
    instancesSelector,
    IStartApplicationAction,
    reducer,
    sagas,
    startApplication,
    showTaskManagerSelector,
    TaskTitle,
    Window,
    windowSelector,
    windowsSelector,
};
