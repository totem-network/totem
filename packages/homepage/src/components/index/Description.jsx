import { h, Component } from 'preact';
import Media from 'react-media';

class Description extends Component {

    render () {
        const display = this.props.display;

        const containerStyle = {
            background: '#f0f0f0',
            boxShadow: '0px 0px 20px 10px #f0f0f0',
            fontSize: '2rem',
            fontWeight: '300',
            left: '20%',
            margin: 0,
            padding: '1.6rem',
            position: 'absolute',
        };

        const mobileContainerStyle = {
            background: '#f0f0f0',
            boxShadow: '0px 0px 20px 10px #f0f0f0',
            fontSize: '1.4rem',
            fontWeight: '300',
            left: '10%',
            margin: 0,
            padding: '10px',
            position: 'absolute',
        };

        const buyTokens = {
            background: '#1976D2',
            borderRadius: '.3rem',
            color: '#fff',
            display: 'block',
            fontSize: '1rem',
            height: '1.5rem',
            lineHeight: '1.5rem',
            margin: '1.25rem 1rem',
            padding: '.5rem 1rem',
            textDecoration: 'none',
        };

        const classes = ['description'];

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
                            <h2 style={{
                                marginLeft: 0,
                                marginTop: 0,
                            }}>Totem</h2>
                            Your digital life<br />
                            in one app!
                            <a style={buyTokens} href="https://token.totem.network" rel="noopener">
                                BUY TOKENS!
                            </a>
                        </div>
                    ) : (
                        <div
                            style={containerStyle}
                            className={classes.join(' ')}
                        >
                            <h2 style={{
                                marginLeft: 0,
                                marginTop: 0,
                                fontSize: '3rem',
                            }}>Totem</h2>
                            Your digital life<br />
                            in one app!
                        </div>
                    )
                }
            </Media>
        )
    }

}

export default Description;
