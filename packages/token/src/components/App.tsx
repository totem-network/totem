import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Buy from './Buy';

interface IAppProps {}

interface IAppState {}

class App extends Component<IAppProps, IAppState> {

    public render() {
        return (
            <div
                style={{
                    margin: 'auto',
                    maxWidth: '1200px',
                    width: '80%',
                }}
            >
                <Buy />
                <div className='section'>
                    <h2>Whats the goal of Totem?</h2>
                    <p>
                        Your digital life in one app! Totem provides an overview about
                        the users data in decentralized networks. It is a secure and
                        private way to interact with crypto currencies, digital assets
                        and data like photos, videos and more.
                    </p>
                    <p>
                        The goal is to create a simple interface to move the forest of
                        protocols and wallets out of the users way.
                    </p>
                </div>
                <div className='section'>
                    <h2>Continuous Funding</h2>
                    <p>
                        Totem is choosing a continuous organisation model because it has
                        some advantages over raising a lot of funds at once.
                    </p>
                    <p>
                        <b>For Totem:</b><br />
                        The DAO can grow with the challenges that emerge along to road.
                        It is also less distracting to focus on the product not primarly
                        on raising funds. And Totem can align long term goals with the
                        community.
                    </p>
                    <p>
                        <b>For token holders:</b><br />
                        Token holders always have liquidity as the token has a reserve.
                        They can invest a small amount and buy more tokens if they like
                        the direction Totem is going. If not they can easily sell their
                        tokens without a marketplace.
                    </p>
                </div>
                <div className='section'>
                    <h2>What is the token for?</h2>
                    <p>
                        Totem only offers a limited amount of what the users can do with
                        their data. But developers can build applications to get even more
                        out of Totem.
                    </p>
                    <p>
                        Those apps can be installed by the user through an app store. Token
                        holders vote which apps should get listed. Those token curated
                        registries will give the user a comprehensive view over the most
                        useful apps. Honest voters can earn tokens by curating those lists.
                    </p>
                </div>
                <div className='section'>
                    <h2>What happens with your money?</h2>
                    <p>
                        <b>75% for the Totem DAO:</b><br />
                        A majority of the funds are being used to drive the development of Totem
                        further. Reaching the goals set in the roadmap below is the primary
                        focus. Besides this it will be used for outsourcing some tasks
                        where other companies or individuals can achieve better results.
                        Any excess funds will go into research of new features or technologies and
                        growing the user base with advertisement.
                    </p>
                    <p>
                        <b>20% for token liquidity:</b><br />
                        To ensure token holders can exchange their tokens back into Ether
                        without relying on an exchange and someone to actually buy the
                        token, 20% are put into a reserve.
                    </p>
                    <p>
                        <b>5% for founders token reserve:</b><br />
                        Another 5% are put into the liquidity reserve to release founders
                        and DAO tokens, that will be distributed to contributers and
                        their friends and families. After a certain amount is reached
                        those 5% will go to the Totem DAO.
                    </p>
                </div>
                <div className='section'>
                    <h2>Roadmap</h2>
                    <p>
                        <b>Short term:</b><br />
                        The main focus is on the filesystem. Once the user is able to
                        store files and easily interact with digital assets it shifts
                        to making onboarding a low friction process. For more details
                        on getting users to the app see below.
                    </p>
                    <p>
                        <b>Mid term:</b><br />
                        After the minimum viable product is done, making it easier for
                        developers the extend Totem is the next goal. Developer tools
                        will enable a fast way to provide users with more features
                        available through the app store.
                    </p>
                    <p>
                        <b>Long term:</b><br />
                        Once the basics are working it is time to improve Totem with
                        emerging technologies like AI or XR. Artifical intelligence
                        can take advantage of the users data to enhance the experience.
                        App developers can take this data to build augmentet or virtual
                        reality applications without compromising on privacy.
                    </p>
                </div>
                <div className='section'>
                    <h2>User onboarding</h2>
                    <p>
                        One big problem of bringing new users into crypto currencies and
                        web3 is too much friction to get started. Installing a plugin or
                        app, buying some crypto to do the first useful action is a burden
                        for most people.
                    </p>
                    <p>
                        But recent updates like meta transactions or create2 are allowing
                        developers to change this situation. With Totem users will be able
                        to interact with web3 as soon as they enter the web app.
                    </p>
                    <p>
                        An easy onboarding process is not enough to get people using Totem.
                        Potential users must find Totem through channels like social media
                        or search engines.
                    </p>
                    <p>
                        A blog about how you can protect your privacy and data will provide
                        value to people that are willing to change their online behavior
                        and are interested in an app like Totem. Besides the blog a new social
                        media strategy with news about privacy will bring more users to Totem.
                        Once this seed is planted it can be boosted by ads to increase adoption.
                    </p>
                </div>
                <br />
                <br />
                <br />
            </div>
        );
    }

}

let exportedApp = App;
if (process.env.NODE !== 'production' && module.hot) {
    exportedApp = hot(module)(App);
}

export default exportedApp;
