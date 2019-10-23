import { h, Component } from 'preact';

class ScrollPage extends Component {

    render () {

        const scrollStyle = {
            margin: 'auto',
            maxWidth: '1200px',
            padding: 0,
            width: '100%',
        };

        if (this.props.full) {
            scrollStyle.height = '100vh';
        }

        return (
            <div style={scrollStyle} className={'scrollpage'}>
                {this.props.children}
            </div>
        )
    }
}

export default ScrollPage;
