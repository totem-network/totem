'use strict';

// TODO: does not work

global.artifacts = artifacts;

const args = require('minimist')(process.argv.slice(2));
const network = args.network;

const { Logger, AppProject, Contracts, ImplementationDirectory, Package } = require('zos-lib')
const log = new Logger('Totem Badges')

const StandaloneERC721 = Contracts.getFromLocal('StandaloneERC721');

const contractName = 'Badges';
const tokenClass = 'StandaloneERC721';

async function setupApp(txParams) {
    log.info(`<< Setting up App >> network: ${network}`);

    const initialVersion = '0.0.1';
    return await AppProject.fetchOrDeploy(
        '@totem/badges',
        initialVersion,
        txParams,
        {}
    );
}

async function deployBadgesV1(project, owner, txParams) {
    log.info('<< Deploying version 1 >>');

    const Badges = Contracts.getFromLocal('Badges');
    await project.setImplementation(Badges, contractName);

    const BadgesProxy = await project.createProxy(Badges, {
        contractName,
        initMethod: 'initialize',
        initArgs: [owner]
    });

    const dependencyName = 'openzeppelin';
    const [dependencyAddress, dependencyVersion] = await getLibrary(txParams);
    await project.setDependency(dependencyName, dependencyAddress, dependencyVersion);

    log.info(`Creating ERC721 token proxy to use in ${contractName}...`);

    const TokenProxy = await project.createProxy(StandaloneERC721, {
        packageName: 'openzeppelin',
        contractName: tokenClass,
        initMethod: 'initialize',
        initArgs: [
            'Totem Badges',
            'TOTEM',
            [BadgesProxy.address],
            [BadgesProxy.address]
        ]
    });

    log.info(`Token proxy created at ${TokenProxy.address}`);
    log.info('Setting application\'s token...');

    await BadgesProxy.methods.setToken(TokenProxy.address).send(txParams);

    log.info('Token set succesfully');

    return true;
}

async function deployVersion2(project, donations, txParams) {

    // Create a new version of the project, linked to the ZeppelinOS EVM package.
    // Register a new implementation for 'Donations' and upgrade it's proxy to use the new implementation.
    log.info('<< Deploying version 2 >>')
    const secondVersion = '0.0.2'
    await project.newVersion(secondVersion)

    const dependencyName = 'openzeppelin';
    const [dependencyAddress, dependencyVersion] = await getLibrary(txParams)
    await project.setDependency('openzeppelin', dependencyAddress, dependencyVersion)

    const DonationsV2 = Contracts.getFromLocal('DonationsV2')
    await project.setImplementation(DonationsV2, contractName);
    await project.upgradeProxy(donations.address, DonationsV2, { contractName })
    donations = DonationsV2.at(donations.address)

    // Add an ERC721 token implementation to the project, request a proxy for it,
    // and set the token on 'Donations'.
    log.info(`Creating ERC721 token proxy to use in ${contractName}...`)
    const token = await project.createProxy(StandaloneERC721, {
        packageName: 'openzeppelin',
        contractName: tokenClass,
        initMethod: 'initialize',
        initArgs: [donations.address]
    })
    log.info(`Token proxy created at ${token.address}`)
    log.info('Setting application\'s token...')
    await donations.methods.setToken(token.address).send(txParams)
    log.info('Token set succesfully')
    return token;
}

async function getLibrary(txParams) {

    // Use deployed EVM package, or simulate one in local networks.
    // TODO: Install and link openzeppelin-zos here, instead of manually building a mock
    if(!network || network === 'local') {
        const version = '1.0.0';
        const thepackage = await Package.deploy(txParams);
        const directory = await thepackage.newVersion(version);
        const tokenImplementation = await StandaloneERC721.new();
        await directory.setImplementation(tokenClass, tokenImplementation.address);
        return [thepackage.address, version];
    } else {
        throw Error("Unknown network " + network);
    }
}

module.exports = async function() {
    const owner = web3.eth.accounts[0];
    const txParams = {
        from: owner,
        gas: 3000000,
        gasPrice: 100000000000
    };
    const app = await setupApp(txParams);
    const result = await deployBadgesV1(app, owner, txParams);
};

// Used in tests:
module.exports.setupApp = setupApp;
module.exports.deployBadgesV1 = deployBadgesV1;
module.exports.deployVersion2 = deployVersion2;