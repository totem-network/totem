import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';

interface IDialogsProps {}

interface IDialogsState {
    open1: boolean;
}

type DialogsProps = IDialogsProps & WithStyles;

class Dialogs extends Component<DialogsProps, IDialogsState> {

    constructor(props: DialogsProps, context?: any) {
        super(props, context);

        this.handleOpen1 = this.handleOpen1.bind(this);
        this.handleClose1 = this.handleClose1.bind(this);

        this.state = {
            open1: false,
        };
    }

    public handleOpen1() {
        this.setState({
            ...this.state,
            open1: true,
        });
    }

    public handleClose1() {
        this.setState({
            ...this.state,
            open1: false,
        });
    }

    public render() {
        const {
            container,
        } = this.props.classes;

        return (
            <div className={container}>
                <Button variant="outlined" color="primary" onClick={this.handleOpen1}>
                    Open alert dialog
                </Button>
                <Dialog
                    open={this.state.open1}
                    onClose={this.handleClose1}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        This is an alert dialog
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                            unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                            dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose1} color="primary">
                        Disagree
                        </Button>
                        <Button onClick={this.handleClose1} color="primary" autoFocus={true}>
                        Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        container: {
            margin: '1rem',
        },
    };
};

export default withStyles(style)(Dialogs);
