import { utils, Wallet } from 'ethers';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getCurrentNetworkSigner } from 'utils/blockchain';
import {
    ILoginMetaMaskAction,
    ILoginPrivateKeyAction,
    LOGIN_METAMASK,
    LOGIN_PRIVATE_KEY,
    loginSuccess,
} from '../actions/login';
import boxes from '../profile/boxes';

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

export function* openBox(address: string) {
    const currentSigner = yield call(getCurrentNetworkSigner);
    const wrappedSigner = yield call(boxes.wrapEthersSigner, currentSigner);

    return yield call([boxes, boxes.openBox], address, wrappedSigner);
}

export function* loginWithPrivateKey(action: ILoginPrivateKeyAction) {
    const privateKey = yield call(utils.hexlify, action.payload.privateKey);

    // TODO: should be in a web worker because its expensive
    // import TestWorker from 'worker-loader!test.worker';
    const account = yield call(createWallet, privateKey);

    if (account) {
        yield call(openBox, account.address);

        yield put(loginSuccess(account.address));
    } else {
        // TODO: put login error
    }
}

export function* loginWithMetaMask(action: ILoginMetaMaskAction) {
    const accounts = yield call(getProvidedAccounts);

    if (accounts && accounts[0]) {
        yield call(openBox, accounts[0]);

        yield put(loginSuccess(accounts[0]));
    } else {
        // TODO: put login error
    }
}

export default function* loginSaga() {
    yield takeLatest(LOGIN_METAMASK, loginWithMetaMask);
    yield takeLatest(LOGIN_PRIVATE_KEY, loginWithPrivateKey);
}
