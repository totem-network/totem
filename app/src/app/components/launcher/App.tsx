import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';

interface IAppProps {
    imageUrl: string;
    launchApplication: (application: string, manifest?: string) => void;
    manifest: string;
    name: string;
    url: string;
}

interface IAppState {}

type AppProps = IAppProps & WithStyles;

class App extends Component<AppProps, IAppState> {

    constructor(props: AppProps, context?: any) {
        super(props, context);

        this.launchApplication = this.launchApplication.bind(this);
    }

    public launchApplication() {
        const {
            manifest,
            url,
        } = this.props;

        this.props.launchApplication(url, manifest);
    }

    public render() {
        const {
            imageUrl,
            name,
        } = this.props;

        const {
            container,
            image,
        } = this.props.classes;

        return (
            <div
                className={container}
                onClick={this.launchApplication}
            >
                <img src={imageUrl} className={image} />
                {name}
            </div>
        );
    }
}

const style: StyleRules = {
    container: {
        cursor: 'pointer',
        margin: '0 2vw',
        textAlign: 'center',
        width: '5vw',
    },
    image: {
        width: '100%',
    },
};

export default withStyles(style)(App);
