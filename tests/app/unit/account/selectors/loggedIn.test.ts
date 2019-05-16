import '@babel/polyfill';
import loggedInSelector from 'account/selectors/loggedIn';
import { expect } from 'chai';
import { Map } from 'immutable';
import 'mocha';

describe('Account selectors', () => {
    describe('loggedIn', () => {
        it('should return true when an account address exists', () => {
            const state = Map({
                account: Map({
                    address: Map({
                        account: '0x738f85bA17262aa15BcD1Ec3129b7f86DafD9Fc9',
                    }),
                }),
            }) as any;

            const expectedResult = true;

            expect(
                loggedInSelector(state),
            ).to.be.equal(expectedResult);
        });

        it('should return false when no account address exists', () => {
            const state = Map({
                account: Map({
                    address: Map({
                        account: null,
                    }),
                }),
            }) as any;

            const expectedResult = false;

            expect(
                loggedInSelector(state),
            ).to.be.equal(expectedResult);
        });
    });
});
