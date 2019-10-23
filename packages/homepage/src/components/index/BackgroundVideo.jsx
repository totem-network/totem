import { h, Component } from 'preact';
import Media from 'react-media';

class BackgroundVideo extends Component {

    render () {
        const endHandler = this.props.endHandler;

        const style = {
            height: '100vh',
            left: 0,
            margin: 0,
            padding: 0,
            pointerEvents: 'auto',
            opacity: 1,
            top: 0,
            transition: 'opacity .2s',
            width: '100%',
        };

        if (this.props.videoEnded) {
            style.pointerEvents = 'none';
            style.opacity = '0';
        }

        return (
            <video
                autoPlay={true}
                muted={true}
                playsInline={true}
                style={style}
                ref={(element) => {
                    if (!element) return;
                    element.addEventListener('ended', () => {
                        endHandler();
                    }, false);
                }}
            >
                <Media query='(max-width: 1280px)'>
                    {matches =>
                        matches ? (
                            <source src="/assets/intro.mp4" type="video/mp4" />
                        ) : (
                            <source src="/assets/intro_fhd.mp4" type="video/mp4" />
                        )
                    }
                </Media>
                <Media query='(max-width: 1280px)'>
                    {matches =>
                        matches ? (
                            <source src="/assets/intro.webm" type="video/webm" />
                        ) : (
                            <source src="/assets/intro_fhd.webm" type="video/webm" />
                        )
                    }
                </Media>
            </video>
        )
    }

}

export default BackgroundVideo;
