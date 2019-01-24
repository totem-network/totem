import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';

interface ILoginMessageProps {}

interface ILoginMessageState {}

type LoginMessageProps = ILoginMessageProps & WithStyles;

class LoginMessage extends Component<LoginMessageProps, ILoginMessageState> {

    public render() {
        const { wrapper } = this.props.classes;

        return (
            <div className={wrapper}>
                <Typography variant="h2">
                    Hello
                </Typography>
            </div>
        );
    }
}

const style: StyleRules = {
    wrapper: {
        fontSize: '4rem',
        textTransform: 'uppercase',
    },
};

export default withStyles(style)(LoginMessage);
