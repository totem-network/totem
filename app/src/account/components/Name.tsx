import React from 'react';
import { Query } from "react-apollo";
import getNameByAddressQuery from '../queries/getNameByAddress.graphql';

export interface INameProps {
    address: string;
}

type NameProps = INameProps;

const Name = ({
    address,
}: NameProps) => {
    return (
        <Query query={getNameByAddressQuery} variables={{address}}>
            {({ loading, error, data }: any) => {
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
            }}
        </Query>
    );
};

export default Name;
