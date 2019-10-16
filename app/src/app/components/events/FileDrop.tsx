import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { uploadFiles } from '../../actions/uploadFiles';

interface IFileDropProps {}

const FileDrop = ({}: IFileDropProps) => {
    const dispatch = useDispatch();

    const onDrop = (event: DragEvent) => {
        event.stopPropagation();
        event.preventDefault();

        if (!event.dataTransfer) {
            return;
        }

        dispatch(uploadFiles(event.dataTransfer.files));
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
