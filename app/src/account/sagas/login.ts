// import { addAccount } from 'network';
import { put, takeLatest } from 'redux-saga/effects';
import {
    ILoginMetaMaskAction,
    ILoginPrivateKeyAction,
    LOGIN_METAMASK,
    LOGIN_PRIVATE_KEY,
    loginSuccess,
} from './../actions/login';

// const Wallet = require('ethers').Wallet;
// const utils = require('ethers').utils;

// TODO: use different accounts for different purposes, e.g. ledger for money, priv key for files, ...

function* loginWithPrivateKey(action: ILoginPrivateKeyAction) {
    const privateKey = action.payload.privateKey;

    // TODO: should also be part of the network module!
    // privateKey = utils.hexlify(privateKey);

    // TODO: will be replaced by network module, then something like
    // put(addAccountAction), take(ACCOUNT_ADDED)
    // should be in a web worker because its expensive
    // import TestWorker from 'worker-loader!test.worker';
    const account = {address: '1'}; // new Wallet(privateKey);

    // TODO
    // yield put(addAccount());

    if (account) {
        yield put(loginSuccess(account.address));
    } else {
        // TODO
    }
}

function* loginWithMetaMask(action: ILoginMetaMaskAction) {

    // TODO: will be replaced by network module, then something like
    // put(addAccountAction), take(ACCOUNT_ADDED)

    // TODO: take provider from ProviderManager
    if (
        !((window as any).Web3 &&
        (window as any).web3 &&
        (window as any).web3.currentProvider)
    ) {
        return false;
    }

    const web3 = new (window as any).Web3((window as any).web3.currentProvider);

    const accounts = yield web3.eth.accounts;

    // TODO
    // yield put(addAccount());

    if (accounts[0]) {
        yield put(loginSuccess(accounts[0]));
    } else {
        // TODO
    }

    yield true;
}

export default function* loginSaga() {
    yield takeLatest(LOGIN_PRIVATE_KEY, loginWithPrivateKey);
    yield takeLatest(LOGIN_METAMASK, loginWithMetaMask);
}
