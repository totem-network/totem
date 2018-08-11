import {
    List,
} from 'immutable';
import { combineReducers } from 'redux';
import { IImmutableStateMap } from 'redux-utils';
import {
    ADD_WINDOW,
    CLOSE_WINDOW,
    FOCUS_WINDOW,
    MINIMIZE_ALL,
    MINIMIZE_WINDOW,
    MOVE_WINDOW,
    RESIZE_WINDOW,
    WindowsAction,
} from './../actions/windows';

interface IWindowsState {
    height: number;
    instance: string;
    minimized: boolean;
    width: number;
    x: number;
    y: number;
}

export interface IImmutableWindowsState extends List<IWindowsState> {}

const initialState = List<IWindowsState>([]);

function windowsReducer(
    state: IImmutableWindowsState = initialState,
    action: WindowsAction,
): IImmutableWindowsState {

    let windowIndex: any = null;
    if ([
        FOCUS_WINDOW,
        MINIMIZE_WINDOW,
        MOVE_WINDOW,
        RESIZE_WINDOW,
    ].indexOf(action.type) !== -1) {
        windowIndex = state.findIndex((window) => {
            if (!window) {
                return false;
            }

            return (window.instance === action.payload.instance);
        });
    }

    switch (action.type) {
        case ADD_WINDOW:
            return state.push({
                height: action.payload.height,
                instance: action.payload.instance,
                minimized: false,
                width: action.payload.width,
                x: action.payload.x,
                y: action.payload.y,
            });
        case CLOSE_WINDOW:
            return state.filter((window) => {
                if (!window) {
                    return false;
                }

                return (window.instance !== action.payload.instance);
            }) as IImmutableWindowsState;
        case FOCUS_WINDOW:
            const focusedWindow = state.get(windowIndex);

            return state.remove(windowIndex).push({
                ...focusedWindow,
                minimized: false,
            });
        case MINIMIZE_ALL:
            return state.map((window?: IWindowsState) => {
                if (!window) {
                    return window;
                }

                return {
                    ...window,
                    minimized: true,
                };
            }) as IImmutableWindowsState;
        case MINIMIZE_WINDOW:
            return state.update(windowIndex, (window) => {
                return {
                    ...window,
                    minimized: true,
                };
            });
        case MOVE_WINDOW:
            return state.update(windowIndex, (window) => {
                return {
                    ...window,
                    x: window.x + action.payload.x,
                    y: window.y + action.payload.y,
                };
            });
        case RESIZE_WINDOW:
            return state.update(windowIndex, (window) => {
                return {
                    ...window,
                    height: window.height + action.payload.height,
                    width: window.width + action.payload.width,
                };
            });
    }

    return state;
}

export default windowsReducer;
