import '@babel/polyfill';
import initializeSaga from 'account/sagas/initialize';
import { expect } from 'chai';
import { Map } from 'immutable';
import 'mocha';
import { runSaga } from 'redux-saga';
import { cloneableGenerator } from 'redux-saga/utils';
import { stub } from 'sinon';

describe('Account sagas', () => {
    describe('initialize', () => {
        it('should initialize with provided accounts', async () => {
            const generator = initializeSaga();

            /*expect(generator.next().value).to.be.deep.equal(
                takeLatest(LOGIN_METAMASK, loginWithMetaMask),
            );

            expect(generator.next().value).to.be.deep.equal(
                takeLatest(LOGIN_PRIVATE_KEY, loginWithPrivateKey),
            );*/

            // expect(generator.next().done).to.be.true;
        });
    });
});
