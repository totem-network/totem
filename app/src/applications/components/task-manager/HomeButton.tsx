import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useDispatch } from 'react-redux';
import { hideTaskManager } from '../../actions/taskManager';

interface IHomeButtonProps {}

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

const HomeButton = ({}: IHomeButtonProps) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleClick = () => {
        dispatch(hideTaskManager());
    };

    return (
        <div className={classes.homeButton} onClick={handleClick}>
            <HomeIcon fontSize={'inherit'} />
        </div>
    );
};

export default HomeButton;
