import Button from '@material-ui/core/Button';
import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import { LogoFlat } from 'app';
import React, { Component, ComponentType } from 'react';
import {
    Form,
    InjectedFormProps,
} from 'redux-form';

// TODO: TypeScript fix
const Field = require('redux-form/immutable').Field;

export interface IPayButtonData {}

export interface IPayButtonProps {}

interface IPayButtonState {}

type PayButtonProps = IPayButtonProps &
    InjectedFormProps<IPayButtonData, IPayButtonProps> &
    WithStyles;

class PayButton extends Component<PayButtonProps, IPayButtonState> {

    constructor(
        props: PayButtonProps,
        context?: any,
    ) {
        super(props, context);

        this.onSubmit = this.onSubmit.bind(this);
    }

    public onSubmit(values: any) {
        const password = values.get('password');
    }

    public handleChange(event: any) {
        // event.preventDefault();
        // console.log(event);
    }

    public render() {
        const { buttonWrapper, logo } = this.props.classes;

        return (
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className={buttonWrapper}>
                    <Button type='submit' color='primary' variant="contained">
                        <LogoFlat className={logo} />
                        Pay
                    </Button>
                </div>
            </Form>
        );
    }

}

const style: StyleRules = {
    buttonWrapper: {
        'marginTop': '2rem',
    },
    logo: {
        height: '1rem',
        marginLeft: '-.5rem',
        marginRight: '1rem',
        verticalAlign: 'middle',
        width: '1rem',
    },
};

export default withStyles(style)(PayButton) as ComponentType<
    IPayButtonProps &
    InjectedFormProps<IPayButtonData, IPayButtonProps>
>;
