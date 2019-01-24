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
        /*fontWeightLight: 100,
        fontWeightMedium: 500,
        fontWeightRegular: 300,*/
        h1: {
            fontWeight: 100,
        },
        h2: {
            color: '#f0f0f0',
            fontWeight: 100,
        },
        h3: {
            fontWeight: 300,
        },
        h4: {
            fontWeight: 300,
        },
        h5: {
            fontWeight: 300,
        },
        subtitle1: {
            fontWeight: 300,
        },
        useNextVariants: true,
    },
});

export {
    Background,
    theme,
};
