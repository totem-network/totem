import { h, Component } from 'preact';
import { Element } from 'react-scroll';
import ScrollPage from './ScrollPage';
 
class Features extends Component {

    render () {

        const h2 = {
            fontFamily: 'Universalis',
            fontWeight: '500',
            textTransform: 'lowercase',
        };

        const featureStyle = {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
        };

        const featureImageStyle = {
            marginLeft: '25%',
            width: '50%',
        };

        const headerStyle = {
            fontFamily: 'Universalis',
            fontWeight: '500',
            marginBottom: '3rem',
            textAlign: 'center',
            textTransform: 'lowercase',
        };

        const contentStyle = {
            marginTop: '2rem',
            marginLeft: '15%',
            textAlign: 'center',
            width: '70%',
        };

        return (
            <ScrollPage>
                <Element name={'features'} />
                <h2 style={h2}>Features</h2>
                <div style={featureStyle}>
                    <div className='feature'>
                        <h3 style={headerStyle}>Identity</h3>
                        <img src="/images/id.svg" style={featureImageStyle} />
                        <div style={contentStyle}>
                            Controll your digital life with an self souvaren identity.
                        </div>
                    </div>
                    <div className='feature'>
                        <h3 style={headerStyle}>Applications</h3>
                        <img src="/images/applications.svg" style={featureImageStyle} />
                        <div style={contentStyle}>
                            Access decentralized applications and web 3 services.
                        </div>
                    </div>
                    <div className='feature'>
                        <h3 style={headerStyle}>Files</h3>
                        <img src="/images/files.svg" style={featureImageStyle} />
                        <div style={contentStyle}>
                            Store all your files secure and encrypted with distributed
                            storage technologies.
                        </div>
                    </div>
                    <div className='feature'>
                        <h3 style={headerStyle}>AI</h3>
                        <img src="/images/ai.svg" style={featureImageStyle} />
                        <div style={contentStyle}>
                            Leverage artificial intelligence for an enhanced computing
                            experience without being manipulated.
                        </div>
                    </div>
                    <div className='feature'>
                        <h3 style={headerStyle} >Digital Assets</h3>
                        <img src="/images/assets.svg" style={featureImageStyle} />
                        <div style={contentStyle}>
                            Manage your crypto currencies, game items and other digital goods. 
                        </div>
                    </div>
                </div>
            </ScrollPage>
        )
    }
}

export default Features;
