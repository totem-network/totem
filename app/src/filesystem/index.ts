import FileSystemWindow from './components/FileSystemWindow';
import reducer, { IImmutableFileSystemState } from './reducers';
import categoriesSelector from './selectors/categories';
import { getFileType } from './utils/files';

const APPLICATION_ID = 'filesystem';

export {
    APPLICATION_ID,
    categoriesSelector,
    FileSystemWindow,
    getFileType,
    IImmutableFileSystemState,
    reducer,
};
