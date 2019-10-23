import { h, Component } from 'preact';
import { hot } from 'react-hot-loader';
import Layout from './Layout';
import Buy from './index/Buy';
import Description from './index/Description';
import Text from './index/Text';
import Mobile from './index/Mobile';
import Laptop from './index/Laptop';
import Logo from './index/Logo';
import BackgroundVideo from './index/BackgroundVideo';
 
class Index extends Component {
    render () {
        const style = {
            height: '100%',
            margin: 0,
            padding: 0,
            position: 'relative',
            top: 0,
            width: '100%',
        };

        return (
            <div style={style}>
                <BackgroundVideo
                    endHandler={this.props.endHandler}
                    scroll={this.props.scroll}
                    videoEnded={this.props.videoEnded}
                />
                <Logo videoEnded={this.props.videoEnded} />
                <Description display={this.props.videoEnded} />
                {/*<Buy display={this.props.videoEnded} />*/}
                <Text display={this.props.videoEnded} />
                <Mobile display={this.props.videoEnded} />
                <Laptop display={this.props.videoEnded} />
            </div>
        );
    }
}

export default Index;
