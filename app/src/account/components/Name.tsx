import { useApolloClient, useQuery } from '@apollo/react-hooks';
import React from 'react';
import GET_NAME_BY_ADDRESS from '../queries/getNameByAddress.graphql';

export interface INameProps {
    address: string;
}

type NameProps = INameProps;

const Name = ({
    address,
}: NameProps) => {
    const apolloClient = useApolloClient();
    const { loading, error, data } = useQuery(GET_NAME_BY_ADDRESS, {
        client: apolloClient,
        variables: { address },
    });

    if (data && data.getProfile && data.getProfile.name) {
        return (
            <span>
                {data.getProfile.name}
            </span>
        );
    }

    return (
        <span>
            {address}
        </span>
    );
};

export default Name;
