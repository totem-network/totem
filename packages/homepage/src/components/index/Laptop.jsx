import { h, Component } from 'preact';
import Media from 'react-media';

class Laptop extends Component {

    render () {
        const display = this.props.display;

        const classes = ['laptop'];

        if (display) {
            classes.push('show');
        }

        return (
            <Media query='(max-width: 768px)'>
                {matches =>
                    matches ? (
                        <div
                            className={classes.join(' ')}
                        >
                            <img src='/images/laptop-small.png' style={{
                                width: '100%'
                            }} />
                        </div>
                    ) : (
                        <div
                            className={classes.join(' ')}
                        >
                            <img src='/images/laptop-small.png' style={{
                                width: '100%'
                            }} />
                        </div>
                    )
                }
            </Media>
        )
    }

}

export default Laptop;
