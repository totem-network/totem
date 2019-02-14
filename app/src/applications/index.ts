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
import TaskTitle from './components/task-manager/TaskTitle';
import ApplicationWindow from './containers/ApplicationWindow';
import HomeButton from './containers/HomeButton';
import Window from './containers/Window';
import reducer, { IImmutableApplicationsState } from './reducers';
import sagas from './sagas';
import instancesSelector from './selectors/instances';
import taskManagerSelector from './selectors/taskManager';
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
    taskManagerSelector,
    TaskTitle,
    Window,
    windowsSelector,
};
