import { put } from 'redux-saga/effects';
import {
    ICreateIdentityAction,
} from './../actions/createIdentity';

export default function* createIdentitySaga(action: ICreateIdentityAction) {
    /*const uportClient = uportClientFactory.getClient(
        action.payload.identityManagerMnid,
        action.payload.registryMnid,
        action.payload.deviceKeys,
        action.payload.recoveryKeys,
    );

    const identityTransaction = yield uportClient.createIdentity(
        action.payload.type,
        action.payload.profile,
    );

    // TODO: make cancelable
    identityTransaction.onTransactionHash((transactionHash: string) => {
        console.log('Identity transaction :' + transactionHash);

        // put ...
    });

    put(createIdentityTransaction(
        identityTransaction,
    ));*/

    yield true;
}
