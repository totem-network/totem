import { h, Component } from 'preact';
import { Element } from 'react-scroll';
import ScrollPage from './ScrollPage';
 
class Team extends Component {

    render () {

        const h2 = {
            fontFamily: 'Universalis',
            fontWeight: '500',
            textTransform: 'lowercase',
        };

        return (
            <ScrollPage>
                <Element name={'team'} />
                <h2 style={h2}>Team</h2>
                <div style={{
                    marginTop: '2rem',
                    marginBottom: '2rem',
                    textAlign: 'center',
                }}>
                    <div style={{
                        background: '#f0f0f0',
                        boxShadow: '0px 0px 20px 10px #f0f0f0',
                        margin: 'auto',
                        marginBottom: '1rem',
                        width: '20vw',
                    }}>
                        <img src="/images/daniel.png" style={{
                            borderRadius: '50%',
                            maxWidth: '128px',
                            width: '20vw',
                        }} />
                    </div>
                    Daniel Wagner
                    <div style={{
                        color: '#666',
                    }}>
                        Founder
                    </div>
                </div>
            </ScrollPage>
        )
    }
}

export default Team;
