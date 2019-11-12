import { h, Component } from 'preact';

class Privacy extends Component {

    // TODO: popup within cookie banner with opt out options

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
                    Processing is any operation or set of operations which is performed
                    on personal data or on sets of personal data, whether or not by
                    automated means, such as collection, recording, organisation,
                    structuring, storage, adaptation or alteration, retrieval,
                    consultation, use, disclosure by transmission, dissemination or
                    otherwise making available, alignment or combination, restriction,
                    erasure or destruction.
                </p>
                <h3>Restriction of Processing</h3>
                <p>
                    Restriction of Processing is the marking of stored personal data with
                    the aim of limiting their processing in the future.
                </p>
                <h3>Profiling</h3>
                <p>
                    Profiling is any form of automated processing of personal data
                    consisting of the use of personal data to evaluate certain personal
                    aspects relating to a natural person, in particular to analyse or
                    predict aspects concerning that natural person’s performance at work,
                    economic situation, health, personal preferences, interests,
                    reliability, behaviour, location or movements.
                </p>
                <h3>Pseudonymisation</h3>
                <p>
                    Pseudonymisation is the processing of personal data in such a manner
                    that the personal data can no longer be attributed to a specific data
                    subject without the use of additional information, provided that such
                    additional information is kept separately and is subject to technical
                    and organisational measures to ensure that the personal data are not
                    attributed to an identified or identifiable natural person.
                </p>
                <h3>Controller</h3>
                <p>
                    Controller is the natural or legal person, public authority, agency or
                    other body which, alone or jointly with others, determines the purposes
                    and means of the processing of personal data; where the purposes and
                    means of such processing are determined by Union or Member State law,
                    the controller or the specific criteria for its nomination may be
                    provided for by Union or Member State law.
                </p>
                <h3>Processor</h3>
                <p>
                    Processor is a natural or legal person, public authority, agency or
                    other body which processes personal data on behalf of the controller.
                </p>
                <h3>Recipient</h3>
                <p>
                    Recipient is a natural or legal person, public authority, agency or
                    another body, to which the personal data are disclosed, whether a third
                    party or not. However, public authorities which may receive personal
                    data in the framework of a particular inquiry in accordance with Union
                    or Member State law shall not be regarded as recipients; the processing
                    of those data by those public authorities shall be in compliance with
                    the applicable data protection rules according to the purposes of the
                    processing.
                </p>
                <h3>Third Party</h3>
                <p>
                    Third party is a natural or legal person, public authority, agency or
                    body other than the data subject, controller, processor and persons
                    who, under the direct authority of the controller or processor, are
                    authorised to process personal data.
                </p>
                <h3>Consent</h3>
                <p>
                    Consent of the data subject means any freely given, specific, informed
                    and unambiguous indication of the data subject’s wishes by which he or
                    she, by a statement or by a clear affirmative action, signifies
                    agreement to the processing of personal data relating to him or her.
                </p>
                <h2>2. Information Collection And Use</h2>
                <p>
                    Whenever you are using the App, subscribe to our service or visiting
                    our websites, we may collect, store and use personal data that you
                    disclose to us. Data we may collect are:
                    <ul>
                        <li>
                            your browser and the used version
                        </li>
                        <li>
                            your operating system
                        </li>
                        <li>
                            the website referred you to our websites
                        </li>
                        <li>
                            informations on how you use our services, such as pages visited
                            or actions you take in the App
                        </li>
                        <li>
                            the date and time of your visit
                        </li>
                        <li>
                            your IP address (which gets anonymized)
                        </li>
                        <li>
                            the internet service provider connecting you to our services
                        </li>
                        <li>
                            other similar data to protect our systems from cyber attacks
                        </li>
                    </ul>
                </p>
                <p>
                    We do not connect this information with your personal identity.
                    Furthermore we use this data to:
                    <ul>
                        <li>
                            deliver our services to you
                        </li>
                        <li>
                            optimize our services, content and marketing
                        </li>
                        <li>
                            to guarantee high availability of our services
                        </li>
                        <li>
                            to work with law enforcement in case of any cyber attacks
                        </li>
                    </ul>
                </p>
                <p>
                    We use this anonymized data to make statistical analysis and with the
                    goal to protect your data. We never connect any of this data with other
                    data you provided us or store within the App.
                </p>
                <p>
                    Any data you store inside the Totem App like your photos, videos or
                    music is encrypted on your device, so only you and the people you
                    share the data with can access it.
                </p>
                <h2>3. Data Usage when subscribing to the Newsletter</h2>
                <p>
                    On our websites you can register for our newsletter. In order to
                    register you must provide your e-mail address. By registering, you
                    give us your consent to process your personal data in order to
                    periodically send the newsletter to the subscribed e-mail address.
                </p>
                <p>
                    When subscribing to our newsletter an e-mail is send to you in order
                    to confirm the subscription, called double-opt-in.
                </p>
                <p>
                    All data given to us by subscribing to the newsletter are only processed
                    to periodically send you the newsletter or information regarding the
                    newsletter service. Your data is never shared with any third party.
                </p>
                <p>
                    To withdraw your consent, we provide a link on the end of each newsletter
                    to unsubscribe. After unsubscribing from our newsletter we will delete
                    your personal data collected by this service.
                </p>
                <h2>4. Newsletter Tracking</h2>
                <p>
                    Our newsletter contains a so called tracking pixel. A tracking pixel is
                    a small image embedded into HTML e-mails. This allows us to see if and
                    when the e-mail is opened by the data subject to provide a more
                    interesting newsletter with better content. We never share any personal
                    data collected in this process. You always have the right to withdraw
                    consent given to us via double-opt-in subscription. When you unsubscribe
                    from our service your data gets deleted automatically.
                </p>
                <h2>5. Contact</h2>
                <p>
                    Our websites provide a contact address to enable fast communication with
                    our customers. If you get in contact with us we store data you provide
                    us for the sake of communication. This data never gets shared with any
                    third party.
                </p>
                <h2>6. Cookies</h2>
                <p>
                    We use cookies to improve our services and provide you a better
                    experience. A cookie is a file containing an identifier (a string of
                    letters and numbers) that is sent by a web server to a web browser and
                    is stored by the browser on your device. Some cookies are deleted when
                    you close the browser (session cookies), while other cookies remain on
                    your device (persistant cookies). Persistant cookies allow us to
                    recognize you at your next visit on our websites. You may prevent the
                    setting of cookies in your browsers settings at any time, but it may
                    not be possible to use all functions of our services.
                </p>
                <h2>7. Updates to our Privacy Policy</h2>
                <p>
                    We may update our privacy policy due to legal or internal changes. We
                    will inform you about these changes at least 6 weeks before they are
                    active. If you do not object to these changes the current version of
                    the privacy policy published on our website is applicable.
                </p>
                <h2>8. Rectification or Deletion of your Personal Data</h2>
                <p>
                    At any time you have the possibility to check, to rectify or to delete
                    your personal data provided to us by sending an e-mail to
                    <b> info@totem.network</b>. You also have the right to withdraw any
                    consent you have given to us to collect or process your personal data.
                </p>
                <h2>9. Rights of the Data Subject</h2>
                <p>
                    The General Data Protection Regulation (GDPR) grants you several rights
                    regarding your personal data and information.
                </p>
                <h3>Right to be informed</h3>
                <p>
                    You have the right to be informed about what data we collect in our
                    services, how we use your data, why we collect and use data and the legal
                    basis of our data collection and usage.
                </p>
                <h3>Right to access</h3>
                <p>
                    You have the right to access your personal data collected and processed by
                    us. Just contact us and we send you a copy of all your personal data, how
                    we are using it, with whom we shared it and where we got your data from.
                </p>
                <h3>Right to rectification (correction)</h3>
                <p>
                    You have the right to rectify your personal data which you believe it is
                    inaccurate and ask us to complete your personal data if you believe it is
                    incomplete.
                </p>
                <h3>Right to erasure (to be forgotten)</h3>
                <p>
                    You have the right to ask us to erase your personal information under
                    following circumstances:
                    <ul>
                        <li>
                            We do not longer need your data
                        </li>
                        <li>
                            You have given us consent to use your data and now have withdrawn
                            the consent
                        </li>
                        <li>
                            You have objected to the use of your data, and your interests
                            outweigh our interests of using it
                        </li>
                        <li>
                            Whenever we have collected or used your personal information
                            without a legal basis
                        </li>
                        <li>
                            When we have a legal obligation to erase your data
                        </li>
                        <li>
                            The data was collected from you as a child
                        </li>
                    </ul>
                </p>
                <h3>Right to restriction of processing</h3>
                <p>
                    You have the right to ask us to restrict the processing of your personal
                    data when:
                    <ul>
                        <li>
                            You filed a request under your right to rectification
                        </li> 
                        <li>
                            You made an objection to the use of your data under your right
                            to objection
                        </li> 
                        <li>
                            We processed your data without a legal basis, but you do not want
                            us to delete it
                        </li> 
                        <li>
                            We do not longer need your data, but you do not want us to delete
                            it
                        </li>    
                    </ul>
                </p>
                <h3>Right to data portability</h3>
                <p>
                    You have the right to get your personal data from us in a way that is
                    accessible and machine-readable.
                </p>
                <h3>Right to object</h3>
                <p>
                    You have the right to object to the processing of your personal data
                    under following circumstances:
                    <ul>
                        <li>
                            We use your personal data for a task carried out in the public
                            interest
                        </li>
                        <li>
                            We use your personal data for our legitimate interests
                        </li>
                        <li>
                            We use your personal data for scientific or historical research
                            or statistical purposes
                        </li>
                        <li>
                            We use your personal data for direct marketing
                        </li>
                    </ul>
                </p>
                <h3>Right to not be subject to automated decision making</h3>
                <p>
                    You have the right to not be subject to automated decision making solely
                    on automated processing.
                </p>
                <h2>10. Data Protection Officer</h2>
                <p>
                    If you have any questions regarding our collection or use of your
                    personal data or access, rectify or delete your personal data or
                    withdraw any consent you given us please send us an e-mail to
                    <b> info@totem.network</b>.
                </p>
                <div>
                    Updated: November 2019
                </div>
            </div>
        )
    }
}

export default Privacy;
