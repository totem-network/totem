import '@babel/polyfill';
import { setProvidedAccounts } from 'account/actions/providedAccounts';
import initializeSaga from 'account/sagas/initialize';
import { IInitializeAction, web3Initialized } from 'app/actions/initialize';
import { expect } from 'chai';
import { Map } from 'immutable';
import 'mocha';
import { call, put, take } from 'redux-saga/effects';
import { stub } from 'sinon';

describe('Account sagas', () => {
    describe('initialize', () => {
        it('should initialize with provided accounts', async () => {
            /*const generator = initializeSaga();

            const accounts = [
                '0x738f85bA17262aa15BcD1Ec3129b7f86DafD9Fc9',
            ];

            const action: IInitializeAction = {
                payload: {
                    ethereum: {
                        enable: stub().returns(accounts),
                    },
                },
                type: 'app/INITIALIZE',
            };

            expect(generator.next().value).to.be.deep.equal(
                take('app/INITIALIZE'),
            );

            expect(generator.next(action).value).to.be.deep.equal(
                call(action.payload.ethereum.enable),
            );

            expect(generator.next(accounts).value).to.be.deep.equal(
                put(web3Initialized()),
            );

            expect(generator.next().value).to.be.deep.equal(
                put(setProvidedAccounts(accounts)),
            );*/

            // tslint:disable-next-line:no-unused-expression
            // expect(generator.next().done).to.be.true;
        });
    });
});
