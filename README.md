<p align="center">
    <img src="app/assets/images/logo.svg" width="256" alt="Vinyai"/>
</p>

<div align="center">

[App](https://vinyai.app) |
[Homepage](https://vinyai.com) |
[Blog](https://blog.vinyai.com)

</div>

<div align="center">

[![Twitter](packages/homepage/src/assets/twitter.svg "Twitter")](https://twitter.com/VinyaiCom)

</div>

__Vinyai - Your digital life in one app!__

The vision of Vinyai is creating a progressive web app to store your personal
data like your photos, music, videos, finances, documents, chats and much more
in a secure place. Furthermore it allows you to use this data with artificial
intelligence or simple programs on your terms to make your digital life a bit
more comfortable without compromising on your right of privacy.

To achieve this goal Vinyai is based on decentralized technolgies like
blockchain (Ethereum) and IPFS. All software is open source and released
under GPL version 3 license.

__This is alpha software! Not all features are implemented completly!__

## 🚩 Contents

- [🚩 Contents](#%f0%9f%9a%a9-contents)
- [📦 Packages](#%f0%9f%93%a6-packages)
- [🔭 Screenshots](#%f0%9f%94%ad-screenshots)
- [🚀 Getting Started](#%f0%9f%9a%80-getting-started)
- [💻 Requirements](#%f0%9f%92%bb-requirements)
- [🎨 Features](#%f0%9f%8e%a8-features)
- [🙌 Contribute](#%f0%9f%99%8c-contribute)
- [✨ Sponsors](#%e2%9c%a8-sponsors)
- [💖 Special Thanks](#%f0%9f%92%96-special-thanks)
- [📜 License](#%f0%9f%93%9c-license)

## 📦 Packages

| Package                                                     | Description                                          |
| ----------------------------------------------------------- | ---------------------------------------------------- |
| [`@vinyai/identity-registry`](/packages/identity-registry)   | Contracts to link Ethereum address to DID Document   |

## 🔭 Screenshots

<img
    src="packages/homepage/src/assets/laptop-small.png"
    style="display: inline-block; margin: 0"
    width="60%"
/>
<img
    src="packages/homepage/src/assets/mobile-small-2x.png"
    style="display: inline-block; margin: 0"
    width="20%"
/>

## 🚀 Getting Started

Just clone this repository

    git clone https://git.vinyai.com/vinyai/vinyai.git
    cd vinyai

Install the npm dependencies

    npm install
    npx lerna bootstrap

If you want to run the development version

    npm run serve

If you want to run the production version

    npm run serve:production

To make a production build

    npm run build

Or run the unit tests

    npm run test:unit

## 💻 Requirements

To build Vinyai you need at least 8GB of free RAM!

- nodejs (Version 10)
- npm

## 🎨 Features

<img align="left" src="packages/homepage/src/assets/id.png" style="margin: 1rem; margin-right: 2rem;" width="100" />

__Identity:__

Own your online identity without the need to give it to a third
party. Vinyai uses the W3 decentralized identity standard to be
compatible with other DID applications.

<div style="clear: both;"></div>

<img align="right" src="packages/homepage/src/assets/files.png" style="margin: 1rem" width="100" />

__Files:__

Upload your photos, videos, music and other files with Vinyai to
decentralized file systems like IPFS. The files are encrypted and
can be shared with your friends.

<div style="clear: both;"></div>

<img align="left" src="packages/homepage/src/assets/assets.png" style="margin: 1rem; margin-right: 2rem;" width="100" />

__Digital Assets:__

Store your crypto currencies and other digital assets and secure them
with a multi signature wallet and second factor authentication.

<div style="clear: both;"></div>

<img align="right" src="packages/homepage/src/assets/applications.png" style="margin: 1rem" width="100" />

__Applications:__

Run decentralized applications within Vinyai and manage how they access your
data. Wether your use DeFi apps or alternatives to existing apps with better
privacy.

<div style="clear: both;"></div>

<img align="left" src="packages/homepage/src/assets/ai.png" style="margin: 1rem; margin-right: 2rem;" width="100" />

__Artificial Intelligence:__

Benefit from AI analyzing your data on your terms. No need to compromise
on privacy to experience applications fitting to your behavior. And if
you do not trust the AI just turn it off.
__This feature is not started at the moment!__

<div style="clear: both;"></div>

## 🙌 Contribute

Great open source projects live from their community! To be a part of Vinyai
here are some things you can contribute.

- __Develop new features for Vinyai!__
There is a lot to be done to make the vision come reality. If you want to
contribute a feature just reach out to discuss how to get started.

- __Help fixing bugs, closing issues or writing tests!__
A good stable software helps every user. You can contribute by finding or
fixing bugs, helping other users with their issues or expand the test suite.

- __Write a guest post on the Vinyai blog!__
To get people to use Vinyai, they need to hear of it at first. The blog contains
articles potential users find helpfull. Check out the categories on the blog
and contribute your knowledge!

- __Share Vinyai with everyone!__
Invite your friends to use the app, share it on your social media channels or
do whatever comes to your mind to grow Vinyai!

## ✨ Sponsors

<img src="packages/docs/assets/sponsor/browserstack.png" width="256">

[Browserstack](https://www.browserstack.com/) lets us test Vinyai on different devices!

## 💖 Special Thanks

Special Thanks to all open source projects and their contributers that made Vinyai
possible!

## 📜 License

Licensed under GPL version 3 or any later version. See [LICENSE.MD](LICENSE.MD)
