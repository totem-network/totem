const { scripts, ConfigVariablesInitializer } = require('zos');
const { add, create, link, push } = scripts;

// TODO: does not work

async function deploy(options) {
    await link({ dependencies: ['openzeppelin-eth'] });

    add({ contractsData: [{ name: 'Badges', alias: 'Badges' }] });

    if (options.network === 'local') {
        options.deployDependencies = true;
    }

    await push(options);

    const tokenContract = await create(Object.assign({
        packageName: 'openzeppelin-eth',
        contractName: 'StandaloneERC721',
        initMethod: 'initialize',
        initArgs: [
            'Totem Badges',
            'TOTEM',
            [options.from],
            [options.from]
        ]
    }, options));

    const badgesContract = await create(Object.assign({
        contractAlias: 'Badges',
        initMethod: 'initialize',
        initArgs: [
            options.from,
            tokenContract.address
        ]
    }, options));

    await tokenContract.addMinter(badgesContract.address);
}

module.exports = function(deployer, networkName, accounts) {
    deployer.then(async () => {
        const { network, txParams } = await ConfigVariablesInitializer.initNetworkConfiguration({
            network: networkName,
            from: accounts[0]
        });

        await deploy({
            from: accounts[0],
            network,
            txParams
        });
    })
}