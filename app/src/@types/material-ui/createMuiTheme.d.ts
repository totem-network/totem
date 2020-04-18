import { Theme } from '@material-ui/core/styles/createMuiTheme';

declare module '@material-ui/core/styles/createMuiTheme' {

    interface Theme {
        mass: {
            application: number
        }
    }

    // allow configuration using `createMuiTheme`
    interface ThemeOptions {
        mass?: {
            application?: number
        }
    }

}
