import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';

interface ITextFieldsProps {}

interface ITextFieldsState {}

type TextFieldsProps = ITextFieldsProps & WithStyles;

class TextFields extends Component<TextFieldsProps, ITextFieldsState> {

    public render() {
        const {
            container,
            textfield,
        } = this.props.classes;

        return (
            <div className={container}>
                <TextField
                    label="Name"
                    defaultValue="Daniel"
                    margin="normal"
                    className={textfield}
                />
                <TextField
                    label="Name"
                    defaultValue="Daniel"
                    margin="normal"
                    variant={'outlined'}
                    className={textfield}
                />
                <TextField
                    label="Name"
                    defaultValue="Daniel"
                    margin="normal"
                    variant={'filled'}
                    className={textfield}
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
        textfield: {
            margin: '.5rem',
        },
    };
};

export default withStyles(style)(TextFields);
