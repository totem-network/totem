import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import makeBlockie from 'ethereum-blockies-base64';
import React, { Component } from 'react';
import { isAddress } from 'utils/ethereum';

export interface IAvatarProps {
    address?: string;
    domain?: string;
    image?: string;
    noProfile?: boolean;
    resolveDomain: (domain: string) => any;
}

interface IAvatarState {}

type AvatarProps = IAvatarProps & WithStyles;

class Avatar extends Component<AvatarProps, IAvatarState> {

    public componentDidMount() {
        const { address, domain, resolveDomain } = this.props;

        if (address && isAddress(address)) {
            return;
        }

        if (domain && domain.endsWith('.eth')) {
            resolveDomain(domain);
        }
    }

    public componentDidUpdate() {
        const { address, domain, resolveDomain } = this.props;

        if (address && isAddress(address)) {
            return;
        }

        if (domain && domain.endsWith('.eth')) {
            resolveDomain(domain);
        }
    }

    public render() {
        const { address, domain, image, noProfile } = this.props;
        const { avatar } = this.props.classes;

        if (!address && !image && !domain) {
            return (
                <ErrorOutline />
            );
        }

        if (image && !noProfile) {
            return (
                <img src={image} className={avatar} />
            );
        }

        if (!address && domain) {
            return (
                <AccountCircle />
            );
        }

        if (!address) {
            return (
                <ErrorOutline />
            );
        }

        // TODO: only rerender when address changes!
        return (
            <img src={makeBlockie(address)} className={avatar} />
        );
    }
}

const style: StyleRules = {
    avatar: {
        borderRadius: '50%',
        boxShadow: '2px 0 4px rgba(0, 0, 0, 0.4)',
        width: '100%',
    },
};

export default withStyles(style)(Avatar);
