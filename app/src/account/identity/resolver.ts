import {
    DIDDocument,
    ParsedDID,
    Resolver,
} from 'did-resolver';
import { Provider } from 'ethers/providers/abstract-provider';
import didCache from './DidCache';
import DidRegistry from './DidRegistry';

/**
 * Global web3 provider for resolving DIDs
 * @var {Provider | undefined} blockchainProvider
 */
let blockchainProvider: Provider | undefined = undefined;

/**
 * Global ipfs provider for resolving DIDs
 * @var {any | undefined} storageProvider
 */
let storageProvider: any = undefined;

/**
 * Set a global web3 provider for DID resolver
 * @param {Provider} provider - Web3 provider for DID registry 
 */
export const setBlockchainProvider = (provider: Provider) => {
    blockchainProvider = provider;
};

/**
 * Set a global ipfs provider for DID resolver
 * @param {any} ipfs - Ipfs provider for DID registry 
 */
export const setStorageProvider = (ipfs: any) => {
    storageProvider = ipfs;
};

/**
 * Returns a resolve function if global blockchain and ipfs providers
 * are set to create a DID resolver
 */
export const getResolver = () => {
    if (!blockchainProvider) {
        throw new Error('No blockchain provider set in DID resolver');
    }

    if (!storageProvider) {
        throw new Error('No storage provider set in DID resolver');
    }

    const didRegsitry = new DidRegistry(storageProvider, blockchainProvider, undefined, didCache);

    const resolve = async (
        did: string,
        parsed: ParsedDID,
        didResolver: Resolver
    ): Promise<DIDDocument> => {
        // TODO: race identity registry on blockchain and onboarding centralized registry for resolving and take winner did
        const didDocument = await didRegsitry.read(did);

        if (!didDocument) {
            throw new Error('No DID Document for given address');
        }

        return didDocument.getDidObject();
    };

    return resolve;
};
