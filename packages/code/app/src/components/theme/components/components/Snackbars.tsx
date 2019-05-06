import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import CloseIcon from '@material-ui/icons/Close';
import React, { Component } from 'react';

interface ISnackbarsProps {}

interface ISnackbarsState {
    openSnackbar1: boolean;
}

type SnackbarsProps = ISnackbarsProps & WithStyles;

class Snackbars extends Component<SnackbarsProps, ISnackbarsState> {

    constructor(props: SnackbarsProps, context?: any) {
        super(props, context);

        this.openSnackbar1 = this.openSnackbar1.bind(this);
        this.closeSnackbar1 = this.closeSnackbar1.bind(this);

        this.state = {
            openSnackbar1: false,
        };
    }

    public openSnackbar1() {
        this.setState({
            ...this.state,
            openSnackbar1: true,
        });
    }

    public closeSnackbar1() {
        this.setState({
            ...this.state,
            openSnackbar1: false,
        });
    }

    public render() {
        const {
            container,
        } = this.props.classes;

        return (
            <div className={container}>
                <Button
                    onClick={this.openSnackbar1}
                >
                    Open Snackbar
                </Button>
                <Snackbar
                    anchorOrigin={{
                        horizontal: 'left',
                        vertical: 'bottom',
                    }}
                    open={this.state.openSnackbar1}
                    autoHideDuration={6000}
                    onClose={this.closeSnackbar1}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Note archived</span>}
                    action={[
                        <Button key="undo" color="secondary" size="small" onClick={this.closeSnackbar1}>
                        UNDO
                        </Button>,
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.closeSnackbar1}
                        >
                        <CloseIcon />
                        </IconButton>,
                    ]}
                />
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

export default withStyles(style)(Snackbars);
