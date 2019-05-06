import Paper from '@material-ui/core/Paper';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';

interface IPapersProps {}

interface IPapersState {}

type PapersProps = IPapersProps & WithStyles;

class Papers extends Component<PapersProps, IPapersState> {

    public render() {
        const {
            container,
            paper,
        } = this.props.classes;

        return (
            <div className={container}>
                <Paper className={paper} elevation={1}>
                    <Typography variant="h5">
                        This is a sheet of paper.
                    </Typography>
                    <Typography>
                        Paper can be used to build surface or other elements for your application.
                    </Typography>
                </Paper>
            </div>
        );
    }

}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        container: {
            margin: '1rem',
        },
        paper: {
            padding: '1rem',
        },
    };
};

export default withStyles(style)(Papers);
