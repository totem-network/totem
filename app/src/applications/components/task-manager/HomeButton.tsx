import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { IHideTaskManagerAction } from '../../actions/taskManager';

interface IHomeButtonProps {
    hideTaskManager: () => IHideTaskManagerAction;
}

const useStyles = makeStyles({
    homeButton: {
        background: '#fff',
        borderRadius: '50%',
        bottom: '2vh',
        fontSize: '2.4rem',
        left: '50%',
        position: 'absolute',
        transform: 'translate(-50%, 0)',
    },
});

const HomeButton = ({
    hideTaskManager,
}: IHomeButtonProps) => {
    const classes = useStyles();

    const handleClick = () => {
        hideTaskManager();
    };

    return (
        <div className={classes.homeButton} onClick={handleClick}>
            <HomeIcon fontSize={'inherit'} />
        </div>
    );
};

export default HomeButton;
