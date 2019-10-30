import { h, Component } from 'preact';
import Media from 'react-media';

class Headline extends Component {

    render () {
        const display = this.props.display;

        const containerStyle = {
            background: '#f0f0f0',
            boxShadow: '0px 0px 20px 10px #f0f0f0',
            color: '#333333',
            fontFamily: 'Universalis',
            fontSize: '4rem',
            fontWeight: '500',
            margin: 0,
            padding: '1.6rem',
            paddingTop: '2.6rem',
            opacity: 0,
            textTransform: 'lowercase',
            transition: '0.35s ease-out',
            transitionDelay: '.25s',
        };

        if (display) {
            containerStyle.opacity = 1;
            containerStyle.paddingTop = '1.6rem';
        }

        return (
            <div
                style={containerStyle}
            >
                Your digital life in one app!
            </div>
        )
    }

}

export default Headline;
