import { useApolloClient, useQuery } from '@apollo/react-hooks';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import { makeStyles } from '@material-ui/styles';
import makeBlockie from 'ethereum-blockies-base64';
import React from 'react';
import { isAddress } from 'utils/ethereum';
import GET_AVATAR_BY_ADDRESS from '../queries/getAvatarByAddress.graphql';
import GET_AVATAR_BY_DOMAIN from '../queries/getAvatarByDomain.graphql';

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

    const apolloClient = useApolloClient();
    const { loading, error, data } = (domain) ? useQuery(GET_AVATAR_BY_DOMAIN, {
        client: apolloClient,
        variables: { domain },
    }) : useQuery(GET_AVATAR_BY_ADDRESS, {
        client: apolloClient,
        variables: { address },
    });

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

    if (!data) {
        if (address && isAddress(address)) {
            return (
                <img src={makeBlockie(address)} className={classes.avatar} />
            );
        }

        return (
            <AccountCircle />
        );
    }

    if (noProfile || !data.getProfile || !data.getProfile.image) {
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

export default Avatar;
