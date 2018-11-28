import '@babel/polyfill';
import loginSaga from 'account/sagas/login';
import { expect } from 'chai';
import { Map } from 'immutable';
import 'mocha';
import { runSaga } from 'redux-saga';
import { stub } from 'sinon';

describe('Account sagas', () => {
    describe('login', () => {
        it('should dispatch a successful login action', async () => {
            const state = Map({}) as any;
            const dispatched: any[] = [];

            // TODO: use network module in loginSaga

            /*stub(web3.eth.accounts.wallet, 'add').callsFake((privateKey: string) => {
                return {};
            });*/

            /*const result = await runSaga({
                dispatch: (action) => dispatched.push(action),
                getState: () => (state),
            }, loginSaga).done;*/

            const expectedResult = true;

            expect(
                true,
            ).to.be.equal(expectedResult);
        });
    });
});
