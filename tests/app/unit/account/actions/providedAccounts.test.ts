import '@babel/polyfill';
import {
    ISetProvidedAccountsAction,
    setProvidedAccounts,
} from 'account/actions/providedAccounts';
import { expect } from 'chai';
import 'mocha';

describe('Account actions', () => {
    describe('profile', () => {
        it('should create an action to set the provided accounts', () => {
            const accounts = [
                '0x738f85bA17262aa15BcD1Ec3129b7f86DafD9Fc9',
            ];

            const expectedAction: ISetProvidedAccountsAction = {
                payload: {
                    accounts,
                },
                type: 'account/SET_PROVIDED_ACCOUNTS',
            };

            expect(
                setProvidedAccounts(accounts),
            ).to.be.deep.equal(expectedAction);
        });
    });
});
