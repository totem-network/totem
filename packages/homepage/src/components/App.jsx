import { h, Component } from 'preact';
import CookieBanner from 'react-cookie-banner';
import { hot } from 'react-hot-loader';
import Navigation from './index/Navigation';
import Particles from './index/Particles';
import Index from './Index';
import Features from './Features';
import Roadmap from './Roadmap';
import Team from './Team';
 
class App extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            videoEnded: false,
        }

        this.endHandler = this.endHandler.bind(this);
        this.scrollHandler = this.scrollHandler.bind(this);
    }

    endHandler() {
        this.setState(Object.assign({}, {
            videoEnded: true,
        }));
    }

    scrollHandler(scrollFlag) {
        this.setState(Object.assign({}, {
            scroll: scrollFlag,
        }));
    }

    render () {
        const videoEnded = this.state.videoEnded;
        const scroll = this.state.scroll;

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

        const scrollHandler = this.scrollHandler;

        return (
            <div style={style} ref={(element) => {
                if (!element) return;

                let last_known_scroll_position = 0;
                let ticking = false;

                element.addEventListener('scroll', (event) => {
                    last_known_scroll_position = element.scrollTop;

                    if (!ticking) {
                        window.requestAnimationFrame(function() {

                            const flag = window.scrolled;
                            
                            if (scroll && last_known_scroll_position === 0) {
                                window.scrolled = false;
                            }
                            
                            if (!scroll && last_known_scroll_position !== 0) {
                                window.scrolled = true;
                            }

                            if (flag !== window.scrolled) {
                                scrollHandler(window.scrolled);
                            }

                            ticking = false;
                        });
                    
                        ticking = true;
                    }
                });
            }}>
                <Navigation
                    scroll={scroll}
                    videoEnded={videoEnded}
                />
                <Particles videoEnded={videoEnded} />
                <div style={container}>
                    <Index
                        endHandler={this.endHandler}
                        scroll={scroll}
                        videoEnded={videoEnded}
                    />
                    <Features />
                    <Roadmap />
                    <Team />
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
