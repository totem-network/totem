import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { Action } from 'redux';

// change theme

export type CHANGE_THEME = 'CHANGE_THEME';
export const CHANGE_THEME: CHANGE_THEME = 'CHANGE_THEME';

export interface IChangeThemeAction extends Action {
    type: CHANGE_THEME;
    payload: IChangeThemePayload;
}

export interface IChangeThemePayload {
    theme: ThemeOptions;
}

export function changeTheme(theme: ThemeOptions): IChangeThemeAction {
    return {
        payload: {
            theme,
        },
        type: CHANGE_THEME,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type ThemeAction = IChangeThemeAction |
        IOtherAction;
