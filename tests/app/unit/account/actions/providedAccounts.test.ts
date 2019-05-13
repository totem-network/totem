import '@babel/polyfill';
import {
    ISetProvidedAccountsAction,
    SET_PROVIDED_ACCOUNTS,
    setProvidedAccounts,
} from 'account/actions/providedAccounts';
import { expect } from 'chai';
import 'mocha';

describe('Account actions', () => {
    describe('profile', () => {
        it('should create an action to set the provided accounts', () => {
            const accounts = [
                '0x738f85ba17262aa15bcd1ec3129b7f86dafd9fc9',
            ];

            const expectedAction: ISetProvidedAccountsAction = {
                payload: {
                    accounts,
                },
                type: SET_PROVIDED_ACCOUNTS,
            };

            expect(
                setProvidedAccounts(accounts),
            ).to.be.deep.equal(expectedAction);
        });
    });
});
