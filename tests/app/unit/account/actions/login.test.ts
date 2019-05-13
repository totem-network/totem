import '@babel/polyfill';
import {
    ILoginMetaMaskAction,
    ILoginPrivateKeyAction,
    ILoginSuccessAction,
    LOGIN_METAMASK,
    LOGIN_PRIVATE_KEY,
    LOGIN_SUCCESS,
    loginMetaMask,
    loginPrivateKey,
    loginSuccess,
} from 'account/actions/login';
import { expect } from 'chai';
import 'mocha';

describe('Account actions', () => {
    describe('login', () => {
        it('should create an action to login with a private key', () => {
            const privateKey = '0xeb318bc8d92cbe47029136b553c7ddcddbbc50ed7d055bc7b469effb0af55862';

            const expectedAction: ILoginPrivateKeyAction = {
                payload: {
                    privateKey,
                },
                type: LOGIN_PRIVATE_KEY,
            };

            expect(
                loginPrivateKey(privateKey),
            ).to.be.deep.equal(expectedAction);
        });

        it('should create an action to login with MetaMask', () => {
            const expectedAction: ILoginMetaMaskAction = {
                payload: {},
                type: LOGIN_METAMASK,
            };

            expect(
                loginMetaMask(),
            ).to.be.deep.equal(expectedAction);
        });

        it('should create an action for a successful login', () => {
            const address = '0x738f85ba17262aa15bcd1ec3129b7f86dafd9fc9';

            const expectedAction: ILoginSuccessAction = {
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
