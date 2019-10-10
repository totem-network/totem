import React from 'react';
import { IntlProvider } from 'react-intl';

interface IIntlProps {
    children: any;
    locale: string;
}

const Intl = ({
    children,
    locale,
}: IIntlProps) => {
    return (
        <IntlProvider locale={locale}>
            {children}
        </IntlProvider>
    );
};

export default Intl;
