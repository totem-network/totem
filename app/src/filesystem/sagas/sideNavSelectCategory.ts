import { focusWindow, startApplication } from 'applications';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { ISideNavSelectCategoryAction, SIDE_NAV_SELECT_CATEGORY } from '../actions/sideNav';
import instancesSelector from '../selectors/instances';

function* sideNavSelectCategory(action: ISideNavSelectCategoryAction) {
    const instances = yield select(instancesSelector);

    let instanceStarted = false;
    for (const instanceId in instances) {
        if (instances[instanceId].category === action.payload.category) {
            instanceStarted = true;
            yield put(focusWindow(instanceId));
        }
    }

    if (!instanceStarted) {
        yield put(startApplication('filesystem', '/apps/filesystem.json', {
            category: action.payload.category,
        }));
    }
}

export default function* sideNavSelectCategorySaga() {
    yield takeEvery(SIDE_NAV_SELECT_CATEGORY, sideNavSelectCategory);
}
