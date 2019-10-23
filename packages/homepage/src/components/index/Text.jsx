import { h, Component } from 'preact';
import Media from 'react-media';

class Text extends Component {

    render() {
        const display = this.props.display;

        const containerStyle = {
            background: '#f0f0f0',
            boxShadow: '0px 0px 20px 10px #f0f0f0',
            margin: 0,
            padding: '1.6rem',
            position: 'absolute',
        };

        const mobileContainerStyle = {
            background: '#f0f0f0',
            boxShadow: '0px 0px 20px 10px #f0f0f0',
            margin: 0,
            padding: '10px',
            position: 'absolute',
        };

        const classes = ['text'];

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
                            Use Totem on your smartphone,<br />
                            tablet, laptop or other devices.
                        </div>
                    ) : (
                            <div
                                style={containerStyle}
                                className={classes.join(' ')}
                            >
                                Use Totem on your smartphone,<br />
                                tablet, laptop or other devices.
                        </div>
                        )
                }
            </Media>
        )
    }

}

export default Text;
