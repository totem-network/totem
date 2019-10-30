import { h, Component } from 'preact';
 
class Privacy extends Component {

    // Open in "popup" like on youtube

    render () {

        const containerStyle = {
            background: '#f0f0f0',
            boxShadow: '0px 0px 20px 10px #f0f0f0',
            margin: 'auto',
            marginTop: '8rem',
            maxWidth: '1000px',
            padding: 0,
            width: '90%',
        };

        return (
            <div style={containerStyle}>
                <h1>Privacy Policy</h1>
                <p>
                    Totem ("us", "we", or "our") provides services accessible at
                    <b> https://totem.network</b>, <b>https://blog.totem.network </b>
                    and <b>https://totem.app</b> (each a "website" or "service").
                    Whenever you use one of our services, you trust us with your
                    information and data. Because this is such a big responsibility,
                    we protect your data with high technological standards and only
                    collect data, that is crucial to provide our services.
                </p>
                <p>
                    This privacy policy informs you what data we collect, how your
                    data is processed and how you control the information you trust
                    us with.
                </p>
                <h2>1. Definitions</h2>
                <p>
                    This policy is based on the terms used by the European legislator
                    for the adoption of the General Data Protection Regulation (GDPR).
                    To ensure our privacy policy is understandable by the public, our
                    customers and our business partners we define and explain the
                    terminology used in this policy.
                </p>
                <h3>Personal Data</h3>
                <p>
                    Personal data is any data relating to an identified or identifiable
                    natural person ("data subject"). An identifiable natural person is
                    one who can be identified, directly or indirectly, in particular by
                    reference to an identifier such as a name, an identification number,
                    location data, an online id or to one or more factors specific to
                    the physical, physiological, genetic, mental, economic, cultural or
                    social identity of that natural person.
                </p>
                <h3>Data Subject</h3>
                <p>
                    Data subject is any identified or identifiable natural person,
                    whose personal data is processed by the controller responsible for
                    the processing.
                </p>
                <h3>Processing</h3>
                <p>
                    ...
                </p>
                <h3>Limitation of Processing</h3>
                <p>
                    ...
                </p>
                <h3>Profiling</h3>
                <p>
                    ...
                </p>
                <h3>Pseudonymisation</h3>
                <p>
                    ...
                </p>
                <h3>Controller</h3>
                <p>
                    ...
                </p>
                <h3>Processor</h3>
                <p>
                    ...
                </p>
                <h3>Recipient</h3>
                <p>
                    ...
                </p>
                <h3>Third Party</h3>
                <p>
                    ...
                </p>
                <h3>Consent</h3>
                <p>
                    ...
                </p>
            </div>
        )
    }
}

export default Privacy;
