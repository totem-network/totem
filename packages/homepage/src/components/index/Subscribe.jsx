import { h, Component } from 'preact';
import Media from 'react-media';

class Subscribe extends Component {

    render () {
        const display = this.props.display;

        const containerStyle = {
            margin: 0,
            padding: 0,
            position: 'absolute',
        };

        const mobileContainerStyle = {
            margin: 0,
            padding: 0,
            position: 'absolute',
        };

        const classes = ['subscribe'];

        if (display) {
            classes.push('show');
        }

        return (
            <Media query='(max-width: 768px)'>
                {matches =>
                    matches ? (
                        <div
                            style={mobileContainerStyle}
                            className={classes.join(' ')}
                        >
                            <a href='https://blog.vinyai.com/subscribe/'>
                                Subscribe
                            </a>
                        </div>
                    ) : (
                        <div
                            style={containerStyle}
                            className={classes.join(' ')}
                        >
                            <a href='https://blog.vinyai.com/subscribe/'>
                                Subscribe
                            </a>
                        </div>
                    )
                }
            </Media>
        )
    }

}

export default Subscribe;
