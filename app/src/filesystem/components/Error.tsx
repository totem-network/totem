import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import React, { Component } from 'react';

export interface IErrorProps {
    error: any;
    retry: () => void;
}

export interface IErrorState {}

type ErrorProps = IErrorProps & WithStyles;

class Error extends Component<ErrorProps, IErrorState> {

    // TODO: log error to sentry
    public componentDidMount() {
        const {
            error,
        } = this.props;

        console.log(error);
    }

    public render() {
        const {
            retry,
        } = this.props;

        const {
            container,
            message,
            retryButton,
        } = this.props.classes;

        return (
            <div className={container}>
                <ErrorOutline
                    fontSize='inherit'
                />
                <div className={message}>
                    Error: Could not load files
                </div>
                <div className={retryButton} onClick={retry}>
                    Retry
                </div>
            </div>
        );
    }
}

const style: StyleRulesCallback<Theme, IErrorProps> = (theme: Theme) => {
    return {
        container: {
            color: theme.palette.error.main,
            fontSize: '4rem',
            left: '50%',
            pointerEvents: 'none',
            position: 'absolute',
            textAlign: 'center',
            top: '50%',
            transform: 'translate(-50%, -50%)',
        },
        message: {
            fontSize: '1rem',
            marginTop: '.5rem',
        },
        retryButton: {
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            pointerEvents: 'auto',
        },
    };
};

export default withStyles(style)(Error);
