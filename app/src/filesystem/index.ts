import { ISideNavSelectCategoryAction, sideNavSelectCategory } from './actions/sideNav';
import FileSystemWindow from './containers/FileSystemWindow';
import reducer, { IImmutableFileSystemState } from './reducers';
import sagas from './sagas';
import categoriesSelector from './selectors/categories';
import { getFileType } from './utils/files';

const APPLICATION_ID = 'filesystem';

export {
    APPLICATION_ID,
    categoriesSelector,
    FileSystemWindow,
    getFileType,
    IImmutableFileSystemState,
    ISideNavSelectCategoryAction,
    reducer,
    sagas,
    sideNavSelectCategory,
};
