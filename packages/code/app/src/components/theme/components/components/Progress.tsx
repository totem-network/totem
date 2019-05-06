import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';

interface IProgressProps {}

interface IProgressState {}

type ProgressProps = IProgressProps & WithStyles;

class Progress extends Component<ProgressProps, IProgressState> {

    public render() {
        const {
            container,
            progress,
        } = this.props.classes;

        return (
            <div className={container}>
                <CircularProgress className={progress} />
                <CircularProgress className={progress} color="secondary" />
                <br /><br />
                <LinearProgress />
                <br />
                <LinearProgress color="secondary" />
            </div>
        );
    }

}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        container: {
            margin: '1rem',
        },
        progress: {
            margin: '.5rem',
        },
    };
};

export default withStyles(style)(Progress);
