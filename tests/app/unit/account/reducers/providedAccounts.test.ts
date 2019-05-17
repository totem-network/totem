import '@babel/polyfill';
import {
    ISetProvidedAccountsAction,
    ProvidedAccountsAction,
} from 'account/actions/providedAccounts';
import providedAccounts from 'account/reducers/providedAccounts';
import {
    expect,
    use as chaiUse,
} from 'chai';
import chaiImmutable from 'chai-immutable';
import { fromJS } from 'immutable';
import 'mocha';

chaiUse(chaiImmutable);

describe('Account reducers', () => {
    describe('providedAccounts', () => {
        it('should return the initial state', () => {
            const action: ProvidedAccountsAction = {
                type: '',
            };

            const expectedState = fromJS([]);

            expect(providedAccounts(undefined, action)).to.be.deep.equal(expectedState);
        });

        it('should set the address of the state', () => {
            const action: ISetProvidedAccountsAction = {
                payload: {
                    accounts: ['0x738f85bA17262aa15BcD1Ec3129b7f86DafD9Fc9'],
                },
                type: 'account/SET_PROVIDED_ACCOUNTS',
            };

            const expectedState = fromJS([
                '0x738f85bA17262aa15BcD1Ec3129b7f86DafD9Fc9',
            ]);

            expect(providedAccounts(undefined, action)).to.be.deep.equal(expectedState);
        });
    });
});
