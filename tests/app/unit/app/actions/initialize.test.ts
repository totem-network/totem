import '@babel/polyfill';
import {
    IInitializeAction,
    initialize,
    IWeb3InitializedAction,
    web3Initialized,
} from 'app/actions/initialize';
import { expect } from 'chai';
import 'mocha';
import { spy } from 'sinon';

describe('App actions', () => {
    describe('initialize', () => {
        it('should create an action to initialize the app', () => {
            const ethereum = spy();

            const expectedAction: IInitializeAction = {
                payload: {
                    ethereum,
                },
                type: 'app/INITIALIZE',
            };

            expect(
                initialize(ethereum),
            ).to.be.deep.equal(expectedAction);
        });

        it('should create an action for a successful web3 initialization', () => {
            const expectedAction: IWeb3InitializedAction = {
                payload: {},
                type: 'app/WEB3_INITIALIZED',
            };

            expect(
                web3Initialized(),
            ).to.be.deep.equal(expectedAction);
        });
    });
});
