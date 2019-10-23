import { h, Component } from 'preact';
import { hot } from 'react-hot-loader';
 
class Layout extends Component {

    render () {
        const style = {
            height: '100%',
            margin: 0,
            padding: 0,
            position: 'relative',
            width: '100%',
        };

        return (
            <div style={style}>
                {this.props.children}
            </div>
        )
    }
}

export default Layout;
