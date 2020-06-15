import { registerMethod } from 'did-resolver';
import { Provider } from 'ethers/providers/abstract-provider';
import DidRegistry from './DidRegistry';

const register = (ipfs: any, provider: Provider) => {
    // TODO: register 'vinyai' not VinyaiID, then resolve via IdentityManager

    const didRegistry = new DidRegistry(ipfs, provider);

    registerMethod('vinyai', (_, { id }) => {
        return resolve(didRegistry, id);
    });
};

const resolve = async (didRegistry: DidRegistry, id: any) => {
    const didDocument = await didRegistry.read(id);

    if (!didDocument) {
        return;
    }

    console.log(didDocument);

    return didDocument.getDidObject();
};

export default register;
