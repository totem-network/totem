import { h, Component } from 'preact';
import Media from 'react-media';

class Buy extends Component {

    render () {
        const display = this.props.display;

        const buyTokens = {
            background: '#1976D2',
            borderRadius: '.3rem',
            color: '#fff',
            display: 'block',
            fontSize: '1rem',
            height: '1.5rem',
            left: '50%',
            lineHeight: '1.5rem',
            margin: '1.25rem 1rem',
            padding: '.5rem 1rem',
            position: 'absolute',
            textDecoration: 'none',
            top: '29%',
            transform: 'translate(-50%, 0)',
        };

        const classes = ['buy'];

        if (display) {
            classes.push('show');
        }

        return (
            <Media query='(max-width: 768px)'>
                {matches =>
                    matches ? null : (
                        <a className={classes.join(' ')} style={buyTokens} href="https://token.totem.network" rel="noopener">
                            BUY TOKENS!
                        </a>
                    )
                }
            </Media>
        )
    }

}

export default Buy;
