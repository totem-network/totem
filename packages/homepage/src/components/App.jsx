import { h, Component } from 'preact';
import CookieBanner from 'react-cookie-banner';
import { hot } from 'react-hot-loader';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import Navigation from './navigation/Navigation';
import Particles from './layout/Particles';
import Index from './Index';
import Privacy from './Privacy';
 
class App extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            mounted: false,
        }
    }

    componentDidMount() {
        window.setTimeout(() => {
            this.setState(Object.assign({}, {
                mounted: true,
            }));
        });
    }

    render () {
        const mounted = this.state.mounted;

        const style = {
            height: '100%',
            margin: 0,
            padding: 0,
            width: '100%',
            overflowX: 'hidden',
            overflowY: 'auto',
        };

        const container = {
            margin: 'auto',
            maxWidth: '1600px',
            padding: 0,
            position: 'relative',
            width: '100%',
            zIndex: 1,
        };

        return (
            <div style={style}>
                <Navigation
                    mounted={mounted}
                />
                <Particles mounted={mounted} />
                <div style={container}>
                    <Router>
                        <Switch>
                            <Route path="/" exact={true}>
                                <Index mounted={mounted} />
                            </Route>
                            <Route path="/privacy" exact={true}>
                                <Privacy />
                            </Route>
                        </Switch>
                    </Router>
                </div>
                <CookieBanner
                    styles={{
                        banner: {
                            boxShadow: '0px 1px 5px 2px #ddd',
                            backgroundColor: '#f8f8f8',
                            bottom: 0,
                            position: 'absolute',
                        },
                        message: {
                            color: '#666',
                            fontWeight: 400,
                        },
                    }}
                    message='This page uses cookies!'
                />
            </div>
        )
    }
}

let exportedApp = App;
if (process.env.NODE !== 'production' && module.hot) {
    exportedApp = hot(module)(App);
}

export default exportedApp;
