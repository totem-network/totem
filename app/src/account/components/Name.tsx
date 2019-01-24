import React, { Component, ComponentType } from 'react';

export interface INameProps {
    address: string;
    name?: string;
}

interface INameState {}

type NameProps = INameProps;

class Name extends Component<NameProps, INameState> {

    public render() {
        const {
            address,
            name,
        } = this.props;

        if (!name) {
            return (
                <span>
                    {address}
                </span>
            );
        }

        return (
            <span>
                {name}
            </span>
        );
    }
}

export default Name;
