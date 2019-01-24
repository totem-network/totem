import {
    taskManagerSelector,
    windowsSelector,
} from 'applications';
import { createSelector } from 'reselect';

export default createSelector(
    taskManagerSelector,
    windowsSelector,
    (taskManager, windows) => {
        let visible: boolean = true;

        if (taskManager.showTaskManager) {
            visible = false;
        }

        // TODO: is application open?
        windows.forEach((window: any) => {
            if (!window) {
                return;
            }

            if (!window.minimized) {
                visible = false;
            }
        });

        return {
            isVisible: visible,
        };
    },
);
