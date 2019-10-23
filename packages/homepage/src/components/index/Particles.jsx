import { h, Component } from 'preact';
import Media from 'react-media';

class BackgroundVideo extends Component {

    componentDidMount() {
        if (this.props.videoEnded && !this.state.loaded) {
            particlesJS.load('particles-js', 'assets/particles.json', function() {
                console.log('callback - particles.js config loaded');
            });

            this.setState({
                loaded: true,
            });
        }
    }

    componentDidUpdate() {
        if (this.props.videoEnded && !this.state.loaded) {
            particlesJS.load('particles-js', 'assets/particles.json', function() {
                console.log('callback - particles.js config loaded');
            });

            this.setState({
                loaded: true,
            });
        }
    }

    render () {
        const style = {
            height: '100vh',
            left: 0,
            margin: 0,
            padding: 0,
            pointerEvents: 'none',
            position: 'fixed',
            opacity: 1,
            top: 0,
            transition: 'opacity .3s',
            width: '100%',
            zIndex: 0,
        };

        if (!this.props.videoEnded) {
            return null;
        }

        return (
            <div id="particles-js" style={style} />
        );
    }

}

export default BackgroundVideo;
