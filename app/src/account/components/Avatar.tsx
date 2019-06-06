import AccountCircle from '@material-ui/icons/AccountCircle';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import { makeStyles } from '@material-ui/styles';
import makeBlockie from 'ethereum-blockies-base64';
import React from 'react';
import { Query } from "react-apollo";
import { isAddress } from 'utils/ethereum';
import getAvatarByAddressQuery from '../queries/getAvatarByAddress.graphql';
import getAvatarByDomainQuery from '../queries/getAvatarByDomain.graphql';

export interface IAvatarProps {
    address?: string;
    domain?: string;
    noProfile?: boolean;
}

const useStyles = makeStyles({
    avatar: {
        borderRadius: '50%',
        boxShadow: '2px 0 4px rgba(0, 0, 0, 0.4)',
        width: '100%',
    },
});

const Avatar = ({
    address,
    domain,
    noProfile,
}: IAvatarProps) => {
    const classes = useStyles();

    const renderQuery = ({ loading, error, data }: any) => {
        if (loading) {
            if (address && isAddress(address)) {
                return (
                    <img src={makeBlockie(address)} className={classes.avatar} />
                );
            }
            // TODO: size
            return (
                <AccountCircle />
            );
        }

        if (error) {
            // TODO: size
            return (
                <ErrorOutline />
            );
        }

        if (noProfile || !data.getProfile.image) {
            if (!data.getProfile.address || !isAddress(data.getProfile.address)) {
                // TODO: size
                return (
                    <ErrorOutline />
                );
            }

            return (
                <img src={makeBlockie(data.getProfile.address)} className={classes.avatar} />
            );
        }

        return (
            <img src={'https://ipfs.infura.io/ipfs/' + data.getProfile.image} className={classes.avatar} />
        );
    };

    if (domain) {
        return (
            <Query query={getAvatarByDomainQuery} variables={{domain}}>
                {renderQuery}
            </Query>
        );
    }

    return (
        <Query query={getAvatarByAddressQuery} variables={{address}}>
            {renderQuery}
        </Query>
    );
};

export default Avatar;
