import { h, Component } from 'preact';
import Headline from './Headline';
 
class Teaser extends Component {
    render () {
        const style = {
            margin: '10rem 0 0 0',
            padding: 0,
            position: 'relative',
            width: '100%',
        };

        return (
            <div style={style}>
                <Headline display={this.props.mounted} />
            </div>
        );
    }
}

export default Teaser;
