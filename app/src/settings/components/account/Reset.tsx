import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { hideResetAccountModal, resetAccount, showResetAccountModal } from '../../actions/account';
import resetAccountModalSelector from '../../selectors/resetAccountModal';
import resettingAccountSelector from '../../selectors/resettingAccount';

interface IResetProps {}

const useStyles = makeStyles((theme: Theme) => {
    return {
        item: {
            [theme.breakpoints.up('lg')]: {
                color: theme.palette.primary.contrastText,
            },
            paddingLeft: theme.spacing(4),
        },
        loadingButtonWrapper: {
            position: 'relative',
        },
        loadingButtonProgress: {
            color: theme.palette.secondary.contrastText,
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
    };
});

const Reset = ({}: IResetProps) => {
    const dialog = useSelector((state: any) => {
        return resetAccountModalSelector(state);
    }, shallowEqual);

    const resetting = useSelector((state: any) => {
        return resettingAccountSelector(state);
    }, shallowEqual);

    const dispatch = useDispatch();
    const classes = useStyles();

    // Handle search in every component too -> expand all components and hide those with no results
    // Handle search with redux!!!!!!! side effects with redux saga, not passing functions!!!

    const openDialog = () => {
        dispatch(showResetAccountModal());
    };

    const closeDialog = () => {
        dispatch(hideResetAccountModal());
    };

    const reset = () => {
        dispatch(resetAccount());
    }

    return (
        <>
            <ListItem
                className={classes.item}
            >
                <ListItemText
                    primary={'Reset Account'}
                />
                <ListItemSecondaryAction>
                    <Button
                        color={'secondary'}
                        onClick={openDialog}
                        variant={'contained'}
                    >
                        Reset
                    </Button>
                </ListItemSecondaryAction>
            </ListItem>
            <Dialog
                open={dialog}
            >
                <DialogTitle>
                    Reset Account
                </DialogTitle>
                <DialogContent>
                    Do you really want to delete everthing
                    in your account?<br /><br />
                    You will get signed out after the reset is finished.
                </DialogContent>
                <DialogActions>
                    <Button
                        disabled={resetting}
                        onClick={closeDialog}
                    >
                        Cancel
                    </Button>
                    <div
                        className={classes.loadingButtonWrapper}
                    >
                        <Button
                            color={'secondary'}
                            onClick={reset}
                            variant={'contained'}
                        >
                            Reset
                        </Button>
                        {resetting && <CircularProgress size={24} className={classes.loadingButtonProgress} />}
                    </div>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Reset;
