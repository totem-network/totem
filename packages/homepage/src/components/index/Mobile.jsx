import { h, Component } from 'preact';
import Media from 'react-media';

class Mobile extends Component {

    render () {
        const display = this.props.display;

        const containerStyle = {
            background: '#f0f0f0',
            boxShadow: '0px 0px 20px 10px #f0f0f0',
            margin: 0,
            padding: 0,
            position: 'absolute',
        };

        const mobileContainerStyle = {
            background: '#f0f0f0',
            boxShadow: '0px 0px 20px 10px #f0f0f0',
            margin: 0,
            padding: 0,
            position: 'absolute',
        };

        const classes = ['mobile'];

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
                            <img src='/assets/mobile-small.png' style={{
                                maxHeight: '30vh',
                            }} />
                        </div>
                    ) : (
                        <div
                            style={containerStyle}
                            className={classes.join(' ')}
                        >
                            <img src='/assets/mobile-small.png' style={{
                                maxHeight: '30vh',
                            }} />
                        </div>
                    )
                }
            </Media>
        )
    }

}

export default Mobile;
