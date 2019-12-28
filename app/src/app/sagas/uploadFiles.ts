import { getApolloClient } from 'api';
import addImagesMutation from 'filesystem/mutations/addImages.graphql';
import { blobToDataUrl, getFileType } from 'filesystem/utils/files';
import { call, put, takeEvery } from 'redux-saga/effects';
import { IUploadFilesAction, UPLOAD_FILES } from '../actions/uploadFiles';

function* uploadFiles(action: IUploadFilesAction) {
    const apolloClient = yield call(getApolloClient);

    for (const file of action.payload.files) {
        const type = yield call(getFileType, file);

        // TODO: group files of same type

        const dataUrl = yield call(blobToDataUrl, file);

        switch (type) {
            case 'image':
                const addImagesResult = yield apolloClient.mutate({
                    mutation: addImagesMutation,
                    variables: {
                        images: [{
                            dataUrl,
                            name: 'Test',
                        }],
                    },
                });
                /*const addImagesResult = yield call(apolloClient.mutate, {
                    mutation: addImagesMutation,
                    variables: {
                        images: [{
                            dataUrl,
                            name: 'Test',
                        }],
                    },
                });*/
                console.log(addImagesResult);
                console.log(1);
                console.log(2);
                break;
        }
    }
}

export default function* uploadFilesSaga() {
    yield takeEvery(UPLOAD_FILES, uploadFiles);
}
