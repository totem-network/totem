import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { CHANGE_THEME, ThemeAction } from '../actions/theme';

export interface IImmutableThemeState extends ThemeOptions {}

const initialState = {};

function themeReducer(state: IImmutableThemeState = initialState, action: ThemeAction): IImmutableThemeState {

    switch (action.type) {
        case CHANGE_THEME:
            return action.payload.theme;
    }

    return state;
}

export default themeReducer;
