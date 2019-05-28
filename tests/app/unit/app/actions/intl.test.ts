import '@babel/polyfill';
import {
    changeLocale,
    IChangeLocaleAction,
} from 'app/actions/intl';
import { expect } from 'chai';
import 'mocha';
import { spy } from 'sinon';

describe('App actions', () => {
    describe('intl', () => {
        it('should create an action to change the locale', () => {
            const locale = 'en_US';

            const expectedAction: IChangeLocaleAction = {
                payload: {
                    locale,
                },
                type: 'app/CHANGE_LOCALE',
            };

            expect(
                changeLocale(locale),
            ).to.be.deep.equal(expectedAction);
        });
    });
});
