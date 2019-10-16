import React from 'react';
import { IntlProvider } from 'react-intl';
import { shallowEqual, useSelector } from 'react-redux';
import intlSelector from './../selectors/intl';

interface IIntlProps {
    children: any;
}

const Intl = ({
    children,
}: IIntlProps) => {
    const { locale } = useSelector(intlSelector, shallowEqual);

    return (
        <IntlProvider locale={locale}>
            {children}
        </IntlProvider>
    );
};

export default Intl;
