import '@babel/polyfill';
import {
    LOGIN_PRIVATE_KEY,
    LOGIN_SUCCESS,
    loginPrivateKey,
    loginSuccess,
} from 'account/actions/login';
import { expect } from 'chai';
import 'mocha';

describe('Account actions', () => {
    describe('login', () => {
        it('should create an action to login with a private key', () => {
            const privateKey = 'someid';
            const password = 'somepw';

            const expectedAction = {
                payload: {
                    password,
                    privateKey,
                },
                type: LOGIN_PRIVATE_KEY,
            };

            expect(
                loginPrivateKey(privateKey, password),
            ).to.be.deep.equal(expectedAction);
        });

        it('should create an action for a successful login', () => {
            const address = 'someid';

            const expectedAction = {
                payload: {
                    address,
                },
                type: LOGIN_SUCCESS,
            };

            expect(
                loginSuccess(address),
            ).to.be.deep.equal(expectedAction);
        });
    });
});
