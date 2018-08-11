import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import makeBlockie from 'ethereum-blockies-base64';
import React, { Component, ComponentType } from 'react';

interface IAvatarProps {
    address: string;
}

interface IAvatarState {}

type AvatarProps = IAvatarProps & WithStyles<'avatar'>;

class Avatar extends Component<AvatarProps, IAvatarState> {

    public render() {
        const { address } = this.props;
        const { avatar } = this.props.classes;

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

export default withStyles(style)(Avatar) as ComponentType<IAvatarProps>;
