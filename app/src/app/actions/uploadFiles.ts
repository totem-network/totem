import { Action } from 'redux';

// upload files

export type UPLOAD_FILES = 'app/UPLOAD_FILES';
export const UPLOAD_FILES: UPLOAD_FILES = 'app/UPLOAD_FILES';

export interface IUploadFilesAction extends Action {
    type: UPLOAD_FILES;
    payload: IUploadFilesPayload;
}

export interface IUploadFilesPayload {
    files: FileList;
}

export function uploadFiles(files: FileList): IUploadFilesAction {
    return {
        payload: {
            files,
        },
        type: UPLOAD_FILES,
    };
}

interface IOtherAction extends Action {
    payload?: any;
}

export type UploadFilesAction = IUploadFilesAction |
    IOtherAction;
