import Chip from '@material-ui/core/Chip';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import DoneIcon from '@material-ui/icons/Done';
import FaceIcon from '@material-ui/icons/Face';
import React, { Component } from 'react';

interface IChipsProps {}

interface IChipsState {}

type ChipsProps = IChipsProps & WithStyles;

class Chips extends Component<ChipsProps, IChipsState> {

    public render() {
        const {
            chip,
            container,
        } = this.props.classes;

        return (
            <div className={container}>
                <Chip label="Basic Chip" className={chip} />
                <Chip
                    icon={<FaceIcon />}
                    label="Clickable Deletable Chip"
                    // tslint:disable-next-line:jsx-no-lambda
                    onClick={() => { alert('Clicked'); }}
                    // tslint:disable-next-line:jsx-no-lambda
                    onDelete={() => { alert('Deleted'); }}
                    className={chip}
                />
                <Chip
                    icon={<FaceIcon />}
                    label="Deletable Primary Chip"
                    // tslint:disable-next-line:jsx-no-lambda
                    onDelete={() => { alert('Deleted'); }}
                    className={chip}
                    color="primary"
                />
                <Chip
                    icon={<FaceIcon />}
                    label="Deletable Secondary Chip"
                    // tslint:disable-next-line:jsx-no-lambda
                    onDelete={() => { alert('Deleted'); }}
                    className={chip}
                    color="secondary"
                />
            </div>
        );
    }

}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        chip: {
            margin: '.5rem',
        },
        container: {
            display: 'flex',
            margin: '1rem',
            maxWidth: '200px',
        },
    };
};

export default withStyles(style)(Chips);
