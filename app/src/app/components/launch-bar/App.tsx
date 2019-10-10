import { makeStyles } from '@material-ui/styles';
import React from 'react';

interface IAppProps {
    launchApplication: (application: string, manifest?: string) => void;
}

const useStyles = makeStyles({
    container: {
        height: '7.5vh',
        padding: '1.25vh',
    },
    image: {
        height: '100%',
    },
});

const App = ({
    launchApplication,
}: IAppProps) => {
    const classes = useStyles();

    const launchApplication3Box = () => {
        launchApplication('https://3box.io/', '/apps/3box.json');
    };

    return (
        <div
            className={classes.container}
            onClick={launchApplication3Box}
        >
            <img src="/images/apps/3box_256x256.png" className={classes.image} />
        </div>
    );
};

export default App;
