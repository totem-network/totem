import IdentityRegistry from '@vinyai/identity-registry/build/contracts/IdentityRegistry.json';
import identityRegistryRopsten from '@vinyai/identity-registry/.openzeppelin/ropsten.json';
import { Signer } from 'ethers/abstract-signer';
import { Contract } from 'ethers/contract';
import { Provider } from 'ethers/providers/abstract-provider';
import { toUtf8Bytes, toUtf8String } from 'ethers/utils';
import DidDocument from './DidDocument';

const deployedContracts = {
    ropsten: identityRegistryRopsten.contracts.IdentityRegistry.address,
};

class DidRegistry {

    protected contract?: Contract;

    protected ipfs: any;

    protected provider: Provider;

    protected signer?: Signer;
    
    protected network?: string;

    constructor(ipfs: any, provider: Provider, signer?: Signer) {
        this.ipfs = ipfs;
        this.provider = provider;
        this.signer = signer;
    }

    public async create(didDocument: DidDocument) {
        if (!this.signer) {
            throw new Error('DidRegistry needs a signer to have write access');
        }

        const didJSON = didDocument.toJSON();

        const [{ hash }] = await this.ipfs.add(Buffer.from(didJSON));

        const IdentityRegistryContract = await this.getRegistryContract();

        return IdentityRegistryContract.connect(this.signer).setDidDocument(toUtf8Bytes(hash));
    }

    public async read(address: string) {
        const IdentityRegistryContract = await this.getRegistryContract();

        const hash = toUtf8String(await IdentityRegistryContract.getDidDocument(address));

        if (hash === '0x') {
            return;
        }

        const didJSON = await this.ipfs.cat(hash);

        console.log(Buffer.from(didJSON).toString());

        // TODO: return; if no didJson on ipfs

        // TODO: cache dids! then listen for events and update cache if entry changes
        // Use a global cache and add a setCache method to DidRegistry

        return DidDocument.fromJSON(Buffer.from(didJSON).toString());
    }

    public async update(didDocument: DidDocument) {
        return this.create(didDocument);
    }

    public async deactivate() {
        if (!this.signer) {
            throw new Error('DidRegistry needs a signer to have write access');
        }

        const IdentityRegistryContract = await this.getRegistryContract();

        return IdentityRegistryContract.connect(this.signer).revokeDidDocument();
    }

    protected async getRegistryContract() {
        const network = await this.provider.getNetwork();
        if (!(network.name in deployedContracts)) {
            throw new Error('Network not supported for DidRegistry');
        }

        if (!this.contract || (
            this.network &&
            this.network !== network.name
        )) {
            const IdentityRegistryContract = new Contract(
                (deployedContracts as any)[network.name],
                IdentityRegistry.abi,
                this.provider,
            );
    
            this.contract = IdentityRegistryContract;
            this.network = network.name;
        }

        return this.contract;
    }

}

export default DidRegistry;
