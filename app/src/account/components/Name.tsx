import React, { Component, ComponentType } from 'react';

export interface INameProps {
    address: string;
    name?: string;
}

interface INameState {}

type NameProps = INameProps;

class Name extends Component<NameProps, INameState> {

    public render() {
        const { name } = this.props;

        if (!name) {
            return null;
        }

        return (
            <span>
                {name}
            </span>
        );
    }
}

export default Name;
