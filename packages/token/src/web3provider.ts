import { getDefaultProvider, providers } from 'ethers';

let provider = null;
// tslint:disable-next-line:prefer-conditional-expression
if (typeof (window as any).web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    provider = new providers.Web3Provider((window as any).web3.currentProvider);
} else {
    // Allow read-only access to the blockchain if no Mist/Metamask/EthersWallet
    provider = getDefaultProvider();
}

let signerOrProvider: any = provider;
if ((provider as any).getSigner) {
    if ((provider as any).getSigner()) {
        signerOrProvider = (provider as any).getSigner();
    }
}

export {
    provider,
    signerOrProvider,
};
