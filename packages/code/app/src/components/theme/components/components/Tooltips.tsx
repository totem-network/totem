import IconButton from '@material-ui/core/IconButton';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { Component } from 'react';

interface ITooltipsProps {}

interface ITooltipsState {}

type TooltipsProps = ITooltipsProps & WithStyles;

class Tooltips extends Component<TooltipsProps, ITooltipsState> {

    public render() {
        const {
            container,
        } = this.props.classes;

        return (
            <div className={container}>
                <Tooltip title="Delete">
                    <IconButton aria-label="Delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Add" aria-label="Add">
                    <IconButton aria-label="Add">
                        <AddIcon />
                    </IconButton>
                </Tooltip>
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

export default withStyles(style)(Tooltips);
