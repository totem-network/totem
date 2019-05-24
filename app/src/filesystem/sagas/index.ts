import { all, fork } from 'redux-saga/effects';
import sideNavSelectCategorySaga from './sideNavSelectCategory';

export default function* appSaga() {
    yield all([
        fork(sideNavSelectCategorySaga),
    ]);
}
