import React, { Component } from 'react';
import { IUploadFilesAction } from '../../actions/uploadFiles';

interface IFileDropProps {
    uploadFiles: (files: FileList) => IUploadFilesAction;
}

interface IFileDropState {}

class FileDrop extends Component<IFileDropProps, IFileDropState> {

    constructor(props: IFileDropProps, context?: any) {
        super(props, context);

        this.onDrop = this.onDrop.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
    }

    public componentDidMount() {
        document.body.addEventListener('drop', this.onDrop);
        document.body.addEventListener('dragover', this.onDragOver, true);
    }

    public componentWillUnmount() {
        document.body.removeEventListener('drop', this.onDrop, true);
        document.body.addEventListener('dragover', this.onDragOver, true);
    }

    public onDrop(event: DragEvent) {
        event.stopPropagation();
        event.preventDefault();

        if (!event.dataTransfer) {
            return;
        }

        this.props.uploadFiles(event.dataTransfer.files);
    }

    public onDragOver(event: DragEvent) {
        event.preventDefault();
    }

    public render() {
        return (
            <></>
        );
    }
}

export default FileDrop;
