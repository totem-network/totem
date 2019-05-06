import { ApolloLink, Operation } from 'apollo-link';

const extractFiles = (value: any, path: string = ''): Map<string, any> => {
    const files = new Map();

    const addFile = (paths: any, file: any) => {
        const storedPaths = files.get(file);
        if (storedPaths) {
            storedPaths.push(...paths);
        } else {
            files.set(file, paths);
        }
    };

    if (
      (typeof File !== 'undefined' && value instanceof File) ||
      (typeof Blob !== 'undefined' && value instanceof Blob)
    ) {
        addFile([path], value);
    } else {
        const prefix = path ? `${path}.` : '';

        if (typeof FileList !== 'undefined' && value instanceof FileList) {
            Array.from(value).forEach((file: File, i: number) => {
                addFile([`${prefix}${i}`], file);
            });
        } else if (Array.isArray(value)) {
            value.forEach((child, i) => {
                const result = extractFiles(child, `${prefix}${i}`);
                result.forEach(addFile);
            });
        } else if (value && value.constructor === Object) {
            for (const i in value) {
                if (value) {
                    const result = extractFiles(value[i], `${prefix}${i}`);
                    result.forEach(addFile);
                }
            }
        }
    }

    return files;
};

export default ({
    ipfsInstance,
}: any) => {
    return new ApolloLink((operation: Operation, forward: any) => {
        const context = operation.getContext();

        const { operationName, extensions, variables, query } = operation;
        const body = { operationName, variables };

        const files = extractFiles(body);

        if (files.size) {
            files.forEach((paths, file) => {
                // TODO: upload file

                paths.forEach((path: string) => {
                    const pathArray = path[0].split('.');

                    // TODO: update operation

                    console.log(pathArray);
                });
            });
        }

        return forward(operation);
    });
};
