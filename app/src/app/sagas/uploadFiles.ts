import { apolloClient } from 'api';
import addImagesMutation from 'filesystem/mutations/addImages.graphql';
import { getFileType } from 'filesystem/utils/files';
import { call, put, takeEvery } from 'redux-saga/effects';
import { IUploadFilesAction, UPLOAD_FILES } from '../actions/uploadFiles';

function* uploadFiles(action: IUploadFilesAction) {
    for (const file of action.payload.files) {
        const type = yield call(getFileType, file);

        // TODO: group files of same type for better performance

        switch (type) {
            case 'image':
                yield call(apolloClient.mutate, {
                    mutation: addImagesMutation,
                    variables: {
                        images: [file],
                    },
                });
                break;
        }
    }
}

export default function* uploadFilesSaga() {
    yield takeEvery(UPLOAD_FILES, uploadFiles);
}
