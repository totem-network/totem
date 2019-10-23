import { h, Component } from 'preact';
import Media from 'react-media';

class Logo extends Component {

    render () {
        const endHandler = this.props.endHandler;

        const style = {
            background: '#f0f0f0',
            borderRadius: '50%',
            boxShadow: '0px 0px 20px 0px #f0f0f0',
            left: '50%',
            margin: 'auto',
            padding: 0,
            position: 'absolute',
            opacity: 1,
            top: '49.8%',
            transform: 'translate(-50%, -50%)',
            transition: 'all .15s',
            width: '26.2%',
        };

        if (!this.props.videoEnded) {
            style.opacity = '0';
        }

        return (
            <Media query='(max-width: 768px)'>
                {matches =>
                    matches ? (
                        <img
                            src='/assets/logo.svg'
                            style={style}
                        />
                    ) : (
                        <img
                            src='/assets/logo.svg'
                            style={Object.assign({}, style, {
                                width: (!this.props.videoEnded) ? '26.2%' : '5%',
                            })}
                        />
                    )
                }
            </Media>
        )
    }

}

export default Logo;
