import Button from '@material-ui/core/Button';
import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import LogoFlat from 'app/components/branding/LogoFlat';
import { Form, Formik } from 'formik';
import React, { Component } from 'react';

// TODO: TypeScript fix
const Field = require('redux-form/immutable').Field;

export interface IPayButtonData {}

export interface IPayButtonProps {}

interface IPayButtonState {}

export type PayButtonProps = IPayButtonProps &
    WithStyles;

class PayButton extends Component<PayButtonProps, IPayButtonState> {

    constructor(
        props: PayButtonProps,
        context?: any,
    ) {
        super(props, context);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleSubmit(values: any) {
        const password = values.get('password');
    }

    public handleChange(event: any) {
        // event.preventDefault();
        // console.log(event);
    }

    public render() {
        const { buttonWrapper, logo } = this.props.classes;

        return (
            <Formik
                initialValues={{}}
                onSubmit={this.handleSubmit}
            >
                <Form>
                    <div className={buttonWrapper}>
                        <Button type='submit' color='primary' variant="contained">
                            <LogoFlat className={logo} />
                            Pay
                        </Button>
                    </div>
                </Form>
            </Formik>
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

export default withStyles(style)(PayButton);
