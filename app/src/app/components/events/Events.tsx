import React, { Component } from 'react';
import FileDrop from '../../containers/events/FileDrop';

interface IEventsProps {}

interface IEventsState {}

class Events extends Component<IEventsProps, IEventsState> {

    public render() {
        return (
            <>
                <FileDrop />
            </>
        );
    }
}

export default Events;
