import React, { Component, StatelessComponent } from 'react';
import { connect } from 'react-redux';
import { IImmutableState } from './../../reducers';
import loggedInSelector from './../selectors/loggedIn';

interface INotLoggedInProps {
    loggedIn?: boolean;
}

interface INotLoggedInState {}

class NotLoggedIn extends Component<INotLoggedInProps, INotLoggedInState> {

    public render() {
        if (!this.props.loggedIn) {
            return this.props.children;
        }

        return null;
    }
}

const mapStateToProps = (state: any) => {
    return {
        loggedIn: loggedInSelector(state),
    };
};

export default connect<{
    loggedIn?: boolean;
}, {}, INotLoggedInProps>(
    mapStateToProps,
)(NotLoggedIn);
