import { getApolloClient } from 'api/client';
import { getTime } from 'date-fns';
import { APPLICATION_ID } from 'filesystem';
import addImagesMutation from 'filesystem/mutations/addImages.graphql';
import { blobToDataUrl, getFileType } from 'filesystem/utils/files';
import { addNotification } from 'notifications/actions/queue';
import { call, put, takeEvery } from 'redux-saga/effects';
import { generateId } from 'utils/uuid';
import { IUploadFilesAction, UPLOAD_FILES } from '../actions/uploadFiles';

function* uploadFiles(action: IUploadFilesAction) {
    const apolloClient = yield call(getApolloClient);

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < action.payload.files.length; i++) {
        const file = action.payload.files[i];

        const type = yield call(getFileType, file);

        console.log(file);

        // TODO: group files of same type

        const dataUrl = yield call(blobToDataUrl, file);

        switch (type) {
            case 'image':
                const addImagesResult = yield call([apolloClient, apolloClient.mutate], {
                    mutation: addImagesMutation,
                    variables: {
                        images: [{
                            dataUrl,
                            name: file.name,
                        }],
                    },
                });

                for (const uploadResult of addImagesResult.data.addImages) {
                    const id = yield call(generateId);

                    const timestamp = yield call(getTime, new Date());

                    yield put(addNotification({
                        application: APPLICATION_ID,
                        body: `${uploadResult.image.metaData.name}`,
                        id,
                        image: uploadResult.image.files.thumbnail,
                        expires: timestamp + 10000,
                        timestamp,
                        title: 'Image uploaded',
                    }))
                }

                break;
        }
    }
}

export default function* uploadFilesSaga() {
    yield takeEvery(UPLOAD_FILES, uploadFiles);
}
