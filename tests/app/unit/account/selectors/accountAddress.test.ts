import '@babel/polyfill';
import accountAddressSelector from 'account/selectors/accountAddress';
import { expect } from 'chai';
import { Map } from 'immutable';
import 'mocha';

describe('Account selectors', () => {
    describe('accountAddress', () => {
        it('should return the account address', () => {
            const state = Map({
                account: Map({
                    address: Map({
                        account: '0x738f85bA17262aa15BcD1Ec3129b7f86DafD9Fc9',
                    }),
                }),
            }) as any;

            const expectedResult = '0x738f85bA17262aa15BcD1Ec3129b7f86DafD9Fc9';

            expect(
                accountAddressSelector(state),
            ).to.be.equal(expectedResult);
        });

        it('should return null when no account address exists', () => {
            const state = Map({
                account: Map({
                    address: Map({
                        account: null,
                    }),
                }),
            }) as any;

            const expectedResult = null;

            expect(
                accountAddressSelector(state),
            ).to.be.equal(expectedResult);
        });
    });
});
