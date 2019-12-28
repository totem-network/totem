import React from 'react';
import Error from './Error';
import LoadingBar from './LoadingBar';

export interface IRenderQueryProps {
    component: any;
    data: any;
    error: any;
    loading: boolean;
    refetch: any;
    [key: string]: any;
}

const RenderQuery = ({
    component,
    data,
    error,
    loading,
    refetch,
    ...props
}: IRenderQueryProps) => {
    if (loading) {
        return (
            <LoadingBar />
        );
    }

    if (error) {
        const retry = () => {
            refetch();
            // TODO: refetch not reloading
            // https://github.com/apollographql/react-apollo/issues/321
        };

        return (
            <Error
                error={error}
                retry={retry}
            />
        );
    }

    const DataComponent = component;

    return (
        <DataComponent
            data={data}
            {...props}
        />
    );
};

export default RenderQuery;
