import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';

interface IAppProps {
    launchApplication: (application: string) => void;
}

interface IAppState {}

type AppProps = IAppProps & WithStyles;

class App extends Component<AppProps, IAppState> {

    constructor(props: AppProps, context?: any) {
        super(props, context);

        this.launchApplication = this.launchApplication.bind(this);
    }

    public launchApplication() {
        this.props.launchApplication('https://3box.io/');
    }

    public render() {
        const {
            container,
            image,
        } = this.props.classes;

        return (
            <div
                className={container}
                onClick={this.launchApplication}
            >
                <img src="/images/apps/3box_256x256.png" className={image} />
            </div>
        );
    }
}

const style: StyleRules = {
    container: {
        textAlign: 'center',
        width: '5vw',
    },
    image: {
        width: '100%',
    },
};

export default withStyles(style)(App);
