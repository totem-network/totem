import proxyWeb3 from 'api/links/proxyWeb3';
import { proxy } from 'comlink';
import { utils, Wallet } from 'ethers';
import { call, put, takeLatest } from 'redux-saga/effects';
import { api } from 'worker';
import {
    ILoginMetaMaskAction,
    ILoginPrivateKeyAction,
    LOGIN_METAMASK,
    LOGIN_PRIVATE_KEY,
    loginSuccess,
} from '../actions/login';

export const createWallet = (privateKey: string) => {
    return new Wallet(privateKey);
};

export const getProvidedAccounts = () => {
    if (
        !((window as any).Web3 &&
        (window as any).web3 &&
        (window as any).web3.currentProvider)
    ) {
        return false;
    }

    const web3 = new (window as any).Web3((window as any).web3.currentProvider);

    return web3.eth.accounts;
};

export function* initializeApiWorker() {
    return yield (api as any).initialize(proxy(proxyWeb3));
}

export function* loginWithPrivateKey(action: ILoginPrivateKeyAction) {
    const privateKey = yield call(utils.hexlify, action.payload.privateKey);

    // TODO: should be in a web worker because its expensive
    const account = yield call(createWallet, privateKey);

    if (account) {
        yield call(initializeApiWorker);

        yield put(loginSuccess(account.address));
    } else {
        // TODO: put login error
    }
}

export function* loginWithMetaMask(action: ILoginMetaMaskAction) {
    const accounts = yield call(getProvidedAccounts);

    if (accounts && accounts[0]) {
        yield call(initializeApiWorker);

        yield put(loginSuccess(accounts[0]));
    } else {
        // TODO: put login error
    }
}

export default function* loginSaga() {
    yield takeLatest(LOGIN_METAMASK, loginWithMetaMask);
    yield takeLatest(LOGIN_PRIVATE_KEY, loginWithPrivateKey);
}
