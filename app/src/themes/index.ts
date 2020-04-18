import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
    mass: {
        application: 1000,
    },
    palette: {
        primary: {
            contrastText: '#f0f0f0',
            main: blue[700], // #1976D2
        },
        secondary: {
            main: pink.A200, // #FF4081
        },
        background: {
            paper: '#f0f0f0',
        },
    },
    shape: {
        borderRadius: 8,
    },
    typography: {
        body1: {
            fontWeight: 300,
        },
        caption: {
            fontWeight: 300,
        },
        fontWeightLight: 300,
        fontWeightMedium: 500,
        fontWeightRegular: 400,
        h1: {
            fontFamily: 'Universalis',
            fontWeight: 500,
        },
        h2: {
            fontFamily: 'Universalis',
            fontWeight: 500,
        },
        h3: {
            fontFamily: 'Universalis',
            fontWeight: 300,
        },
        h4: {
            fontFamily: 'Universalis',
            fontWeight: 300,
        },
        h5: {
            fontFamily: 'Universalis',
            fontWeight: 300,
        },
        subtitle1: {
            fontFamily: 'Universalis',
            fontWeight: 300,
        },
    },
});

export {
    theme,
};
