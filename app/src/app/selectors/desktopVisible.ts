import {
    showTaskManagerSelector,
    windowsSelector,
} from 'applications';
import { createSelector } from 'reselect';

export default createSelector(
    showTaskManagerSelector,
    windowsSelector,
    (showTaskManager, windows) => {
        let visible: boolean = true;

        if (showTaskManager) {
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
