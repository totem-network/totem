import { makeStyles } from '@material-ui/styles';
import React from 'react';

interface IAppProps {
    imageUrl: string;
    launchApplication: (application: string, manifest?: string) => void;
    manifest: string;
    name: string;
    url: string;
}

const useStyles = makeStyles({
    container: {
        cursor: 'pointer',
        margin: '0 2vw',
        textAlign: 'center',
        width: '5vw',
    },
    image: {
        width: '100%',
    },
});

const App = ({
    imageUrl,
    launchApplication,
    manifest,
    name,
    url,
}: IAppProps) => {
    const classes = useStyles();

    const handleClick = () => {
        launchApplication(url, manifest);
    };

    return (
        <div
            className={classes.container}
            onClick={handleClick}
        >
            <img src={imageUrl} className={classes.image} />
            {name}
        </div>
    );
};

export default App;
