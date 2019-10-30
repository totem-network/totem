import { h, Component } from 'preact';
import { Element } from 'react-scroll';
import ScrollPage from './ScrollPage';
 
class Roadmap extends Component {

    render () {

        const h2 = {
            fontFamily: 'Universalis',
            fontWeight: '500',
            textTransform: 'lowercase',
        };

        const year = {
            background: '#f0f0f0',
            boxShadow: '0px 0px 20px 10px #f0f0f0',
            fontFamily: 'Universalis',
            fontSize: '1.1rem',
            fontWeight: '500',
            marginTop: '4rem',
            textAlign: 'center',
        };

        const milestone = {
            background: '#f0f0f0',
            boxShadow: '0px 0px 20px 10px #f0f0f0',
            margin: '4rem 3rem',
            marginBottom: '1rem',
        };

        const row = {
            display: 'flex',
        };

        const q = {
            border: '2px solid #BBB',
            borderRadius: '50%',
            color: '#666',
            height: '2rem',
            lineHeight: '2rem',
            textAlign: 'center',
            width: '2rem',
        };

        const qd = Object.assign({}, q, {
            border: '2px solid #1976d2',
            color: '#1976d2',
        });

        const header = {
            fontFamily: 'Universalis',
            fontWeight: '500',
            lineHeight: '2rem',
            marginLeft: '1rem',
            textTransform: 'lowercase',
        };

        const border = {
            border: '1px solid #BBB',
            height: '60px',
            margin: '1rem',
            width: 0,
        };

        const borderd = Object.assign({}, border, {
            border: '1px solid #1976d2',
        });

        const description = {
            marginTop: '1.2rem',
            color: '#666',
        };

        return (
            <ScrollPage>
                <Element name={'roadmap'} />
                <h2 style={h2}>Roadmap</h2>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                }}>
                    <div className={'roadmap'}>
                        <div style={year}>
                            2018
                        </div>
                        <div style={milestone}>
                            <div style={row}>
                                <div style={qd}>
                                    Q3
                                </div>
                                <div style={header}>
                                    Applications
                                </div>
                            </div>
                            <div style={row}>
                                <div style={borderd} />
                                <div style={description}>
                                    Provide a platform for secure and decentralized applications.
                                </div>
                            </div>
                        </div>
                        <div style={milestone}>
                            <div style={row}>
                                <div style={qd}>
                                    Q4
                                </div>
                                <div style={header}>
                                    Identity
                                </div>
                            </div>
                            <div style={row}>
                                <div style={borderd} />
                                <div style={description}>
                                    Login with distributed identity systems.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'roadmap'}>
                        <div style={year}>
                            2019
                        </div>
                        <div style={milestone}>
                            <div style={row}>
                                <div style={q}>
                                    Q2
                                </div>
                                <div style={header}>
                                    Filesystem
                                </div>
                            </div>
                            <div style={row}>
                                <div style={border} />
                                <div style={description}>
                                    Allow applications to store and read files.
                                </div>
                            </div>
                        </div>
                        <div style={milestone}>
                            <div style={row}>
                                <div style={q}>
                                    Q3
                                </div>
                                <div style={header}>
                                    User Experience
                                </div>
                            </div>
                            <div style={row}>
                                <div style={border} />
                                <div style={description}>
                                    Adding animations, transitions and improve onboarding.
                                </div>
                            </div>
                        </div>
                        <div style={milestone}>
                            <div style={row}>
                            <div style={q}>
                                Q4
                            </div>
                                <div style={header}>
                                    Developer Tools
                                </div>
                            </div>
                            <div style={row}>
                                <div style={border} />
                                <div style={description}>
                                    Improving the developer experience for the Totem API.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'roadmap'}>
                        <div style={year}>
                            2020
                        </div>
                        <div style={milestone}>
                            <div style={row}>
                                <div style={q}>
                                    Q2
                                </div>
                                <div style={header}>
                                    AI
                                </div>
                            </div>
                            <div style={row}>
                                <div style={border} />
                                <div style={description}>
                                    AI enhanced helpers like sorting photos or searching documents.
                                </div>
                            </div>
                        </div>
                        <div style={milestone}>
                            <div style={row}>
                                <div style={q}>
                                    Q4
                                </div>
                                <div style={header}>
                                    XR
                                </div>
                            </div>
                            <div style={row}>
                                <div style={border} />
                                <div style={description}>
                                    Augmented and virtual reality plattform for applications.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollPage>
        )
    }
}

export default Roadmap;
