import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import Background from './components/Background';

const theme = createMuiTheme({
    palette: {
        primary: {
            contrastText: '#f0f0f0',
            main: blue[700], // #1976D2
        },
        secondary: {
            main: pink.A200, // #FF4081
        },
    },
    typography: {
        body1: {
            fontWeight: 300,
        },
        caption: {
            fontWeight: 300,
        },
        display1: {
            fontWeight: 300,
        },
        display2: {
            fontWeight: 300,
        },
        display3: {
            color: '#f0f0f0',
            fontWeight: 100,
        },
        display4: {
            fontWeight: 100,
        },
        /*fontWeightLight: 100,
        fontWeightMedium: 500,
        fontWeightRegular: 300,*/
        headline: {
            fontWeight: 300,
        },
        subheading: {
            fontWeight: 300,
        },
    },
});

export {
    Background,
    theme,
};
