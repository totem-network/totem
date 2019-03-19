import { Contract, providers, utils } from 'ethers';
import { DateTime } from 'luxon';
import React, { Component } from 'react';
import Badge from './Badge';
import BadgesContractData from './Badges.json';

let provider = null;
if (typeof window.web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    provider = new providers.Web3Provider(window.web3.currentProvider);
} else {
    console.log('No web3? You should consider trying MetaMask!')
    // Allow read-only access to the blockchain if no Mist/Metamask/EthersWallet
    provider = providers.getDefaultProvider();
}

// 0xCE43450785eAF4c5962b6109432761a1af08e4fd
const BadgesContract = new Contract('0xCE43450785eAF4c5962b6109432761a1af08e4fd', BadgesContractData.abi, provider.getSigner());

const getBadges = async () => {
    const length = await BadgesContract.getBadgesLength();
    const badgesLength = length.toNumber();

    const badges = [];

    const lastBlock = await provider.getBlockNumber();
    console.log(lastBlock);

    for (let i = 0; i < badgesLength; i++) {
        const badge = {};

        const badgeURI = await BadgesContract._badges(i);
        const badgeData = await BadgesContract.getBadgeData(badgeURI);

        const seconds = badgeData.expires.sub(lastBlock).toNumber() * 13;

        badge.price = utils.formatEther(badgeData.price);
        badge.expires = '~' + DateTime.local().plus({
            seconds
        }).toLocaleString(DateTime.DATETIME_MED);

        const badgeResponse = await fetch(badgeURI);

        const badgeJSON = await badgeResponse.text();
        const badgeMetaData = JSON.parse(badgeJSON);

        badge.name = badgeMetaData.name;
        badge.image = badgeMetaData.image;

        badge.buy = () => {
            BadgesContract.buy(badgeURI, {
                value: badgeData.price
            });
        };

        badges.push(badge);
    }

    return badges;
};

class Badges extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            badges: []
        };
    }

    componentDidMount() {
        getBadges().then((badges) => {
            this.setState({
                ...this.state,
                badges,
            });
        });
    }

    render() {
        const { badges } = this.state;

        return badges.map((badge, index) => {
            return (
                <Badge
                    key={index}
                    name={badge.name}
                    image={badge.image}
                    price={badge.price}
                    expires={badge.expires}
                    buy={badge.buy}
                />
            );
        });
    }
}

export default Badges;
