import FileSystemWindow from './components/FileSystemWindow';
import reducer, { IImmutableFileSystemState } from './reducers';
// import { getFileType } from './utils/files';

const APPLICATION_ID = 'filesystem';

export {
    APPLICATION_ID,
    FileSystemWindow,
    // getFileType,
    IImmutableFileSystemState,
    reducer,
};
