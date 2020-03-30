import { takeEvery } from 'redux-saga/effects';
import { CLEAR_STORAGE, IClearStorageAction } from './../actions/clearStorage';

function* clearStorage(action: IClearStorageAction) {
    window.localStorage.clear();
    window.sessionStorage.clear();

    if (action.payload.deleteEverything) {
        // TODO: does not work in every browser!
        if ((window.indexedDB as any).databases) {
            const databases = yield (window.indexedDB as any).databases();
            databases.forEach((database: any) => {
                window.indexedDB.deleteDatabase(database.name);
            });
        }
    }
}

export default function* clearStorageSaga() {
    yield takeEvery(CLEAR_STORAGE, clearStorage);
}
