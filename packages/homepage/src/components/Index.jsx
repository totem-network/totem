import { h, Component } from 'preact';
import Teaser from './index/Teaser';
import Features from './Features';
import Roadmap from './Roadmap';
import Team from './Team';
 
class Index extends Component {

    render () {
        const { mounted } = this.props;

        return (
            <div>
                <Teaser
                    mounted={mounted}
                />
                <Features />
                <Roadmap />
                <Team />
            </div>
        );
    }
}

export default Index;
