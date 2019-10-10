import React, { useEffect } from 'react';
import { IUploadFilesAction } from '../../actions/uploadFiles';

interface IFileDropProps {
    uploadFiles: (files: FileList) => IUploadFilesAction;
}

const FileDrop = ({
    uploadFiles,
}: IFileDropProps) => {
    const onDrop = (event: DragEvent) => {
        event.stopPropagation();
        event.preventDefault();

        if (!event.dataTransfer) {
            return;
        }

        uploadFiles(event.dataTransfer.files);
    };

    const onDragOver = (event: DragEvent) => {
        event.preventDefault();
    };

    useEffect(() => {
        document.body.addEventListener('drop', onDrop);
        document.body.addEventListener('dragover', onDragOver, true);

        return () => {
            document.body.removeEventListener('drop', onDrop, true);
            document.body.removeEventListener('dragover', onDragOver, true);
        };
    }, [uploadFiles]);

    return (
        <></>
    );
};

export default FileDrop;
