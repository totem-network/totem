import showTaskManagerSelector from 'applications/selectors/showTaskManager';
import windowsSelector from 'applications/selectors/windows';
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
