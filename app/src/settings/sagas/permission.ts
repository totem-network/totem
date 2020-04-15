import { call, put, takeEvery } from 'redux-saga/effects';
import {
    ITogglePermissionAction,
    TOGGLE_PERMISSION,
} from '../actions/permission';

function* togglePermission(action: ITogglePermissionAction) {
    //
}

export default function* permissionSaga() {
    yield takeEvery(TOGGLE_PERMISSION, togglePermission);
}
