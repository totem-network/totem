import '@babel/polyfill';
import { loginSuccess } from 'account/actions/login';
import loginSaga, {
    createWallet,
    getProvidedAccounts,
    loginWithMetaMask,
    loginWithPrivateKey,
} from 'account/sagas/login';
import { expect } from 'chai';
import { utils } from 'ethers';
import 'mocha';
import { call, put, takeLatest } from 'redux-saga/effects';

describe('Account sagas', () => {
    describe('login', () => {
        it('should create a saga for login actions', async () => {
            const generator = loginSaga();

            expect(generator.next().value).to.be.deep.equal(
                takeLatest('account/LOGIN_METAMASK', loginWithMetaMask),
            );

            expect(generator.next().value).to.be.deep.equal(
                takeLatest('account/LOGIN_PRIVATE_KEY', loginWithPrivateKey),
            );

            expect(generator.next().done).to.be.true;
        });

        it('should login with a private key', async () => {
            const generator = loginWithPrivateKey({
                payload: {
                    privateKey: '0xeb318bc8d92cbe47029136b553c7ddcddbbc50ed7d055bc7b469effb0af55862',
                },
                type: 'account/LOGIN_PRIVATE_KEY',
            });

            expect(generator.next().value).to.be.deep.equal(
                call(utils.hexlify, '0xeb318bc8d92cbe47029136b553c7ddcddbbc50ed7d055bc7b469effb0af55862'),
            );

            expect(generator.next(
                '0xeb318bc8d92cbe47029136b553c7ddcddbbc50ed7d055bc7b469effb0af55862'
            ).value).to.be.deep.equal(
                call(createWallet, '0xeb318bc8d92cbe47029136b553c7ddcddbbc50ed7d055bc7b469effb0af55862'),
            );

            expect(generator.next({
                address: '0x738f85bA17262aa15BcD1Ec3129b7f86DafD9Fc9',
            }).value).to.be.deep.equal(
                put(loginSuccess('0x738f85bA17262aa15BcD1Ec3129b7f86DafD9Fc9')),
            );

            expect(generator.next().done).to.be.true;
        });

        it('should login with MetaMask', async () => {
            const generator = loginWithMetaMask({
                payload: {},
                type: 'account/LOGIN_METAMASK',
            });

            expect(generator.next().value).to.be.deep.equal(
                call(getProvidedAccounts),
            );

            expect(generator.next([
                '0x738f85bA17262aa15BcD1Ec3129b7f86DafD9Fc9',
            ]).value).to.be.deep.equal(
                put(loginSuccess('0x738f85bA17262aa15BcD1Ec3129b7f86DafD9Fc9')),
            );

            expect(generator.next().done).to.be.true;
        });
    });
});
