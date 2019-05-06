import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';

interface IIntlProps {
    locale: string;
}

interface IIntlState { }

class Intl extends Component<IIntlProps, IIntlState> {

    public render() {
        const { children, locale } = this.props;

        return (
            <IntlProvider locale={locale}>
                {this.props.children}
            </IntlProvider>
        );
    }

}

export default Intl;
