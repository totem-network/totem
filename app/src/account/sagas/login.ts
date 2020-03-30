import { utils, Wallet } from 'ethers';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    ILoginMetaMaskAction,
    ILoginPrivateKeyAction,
    LOGIN_METAMASK,
    LOGIN_PRIVATE_KEY,
    loginSuccess,
} from './../actions/login';

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

export function* loginWithPrivateKey(action: ILoginPrivateKeyAction) {
    const privateKey = yield call(utils.hexlify, action.payload.privateKey);

    // TODO: should be in a web worker because its expensive
    // import TestWorker from 'worker-loader!test.worker';
    const account = yield call(createWallet, privateKey);

    // TODO: openBox on login before loginSuccess

    if (account) {
        yield put(loginSuccess(account.address));
    } else {
        // TODO: put login error
    }
}

export function* loginWithMetaMask(action: ILoginMetaMaskAction) {
    const accounts = yield call(getProvidedAccounts);

    // TODO: openBox on login before loginSuccess

    if (accounts && accounts[0]) {
        yield put(loginSuccess(accounts[0]));
    } else {
        // TODO: put login error
    }
}

export default function* loginSaga() {
    yield takeLatest(LOGIN_METAMASK, loginWithMetaMask);
    yield takeLatest(LOGIN_PRIVATE_KEY, loginWithPrivateKey);
}
