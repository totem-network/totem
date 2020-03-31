import { h, Component } from 'preact';
import Teaser from './index/Teaser';
import Features from './Features';
import Roadmap from './Roadmap';
import Team from './Team';
 
class Index extends Component {

    render () {
        const { mounted } = this.props;

        // TODO:
        /*
            Order of the index page

            Why? (totem exists, we work at totem, ...) the reason behind totem in a few headlines
            -> Feelings of the costumer, trust, loyalty -> desicion making
            -> Communicate Believes!!! -> Vision vs Plan!
            -> CONTROL OF YOUR DIGITAL LIFE
            How? (we do things, ...) the value proposition, what is unique
            -> Feelings of the costumer, trust, loyalty -> desicion making
            -> WITH GOOD DESIGN, DECENTRALIZED TECHNOLOGY
            What? (we offer) products and their details
            -> address the analytic part of human brains -> confidence in desicion with facts
            -> TOTEM.APP, TOTEM ROUTER/BOX, ...

            Not the other way round as other companies do!
        */

        return (
            <div>
                <Teaser
                    mounted={mounted}
                />
                {/* Abount/Mission/Vision: Fair Digital Life (WHY) */}
                {/* Blockchain, AI, Open Web Technology (HOW) */}
                <Features /> {/* WHAT */}
                <Roadmap />
                <Team />
            </div>
        );
    }
}

export default Index;
