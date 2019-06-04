import '@babel/polyfill';
import providedAccountSelector from 'account/selectors/providedAccount';
import { expect } from 'chai';
import { List, Map } from 'immutable';
import 'mocha';

describe('Account selectors', () => {
    describe('providedAccount', () => {
        it('should return the provided account address', () => {
            const state = Map({
                account: Map({
                    providedAccounts: List([
                        '0x738f85bA17262aa15BcD1Ec3129b7f86DafD9Fc9',
                    ]),
                }),
            }) as any;

            const expectedResult = '0x738f85bA17262aa15BcD1Ec3129b7f86DafD9Fc9';

            expect(
                providedAccountSelector(state),
            ).to.be.equal(expectedResult);
        });

        it('should return undefined when no account is provided', () => {
            const state = Map({
                account: Map({
                    providedAccounts: List([]),
                }),
            }) as any;

            const expectedResult = undefined;

            expect(
                providedAccountSelector(state),
            ).to.be.equal(expectedResult);
        });
    });
});
