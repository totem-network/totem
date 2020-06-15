import { getApolloClient } from 'api/client';
import { clearStorage } from 'app/actions/clearStorage';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
    accountResetSuccess,
    IResetAccountAction,
    RESET_ACCOUNT,
} from '../actions/account';
import resetProfileMutation from '../mutations/resetProfile.graphql';

function* resetAccount(action: IResetAccountAction) {
    const apolloClient = yield call(getApolloClient);

    const resetProfileResult = yield call([apolloClient, apolloClient.mutate], {
        mutation: resetProfileMutation,
    });

    yield put(clearStorage(true));

    yield put(accountResetSuccess());
}

export default function* resetSaga() {
    yield takeEvery(RESET_ACCOUNT, resetAccount);
}
