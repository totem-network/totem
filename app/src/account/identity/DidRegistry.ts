import IdentityRegistry from '@vinyai/identity-registry/build/contracts/IdentityRegistry.json';
import identityRegistryRopsten from '@vinyai/identity-registry/.openzeppelin/ropsten.json';
import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { Contract } from '@ethersproject/contracts';
import { toUtf8Bytes, toUtf8String } from '@ethersproject/strings';
import { DidCache } from './DidCache';
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
    
    protected cache?: DidCache;

    constructor(ipfs: any, provider: Provider, signer?: Signer, cache?: DidCache) {
        this.ipfs = ipfs;
        this.provider = provider;
        this.signer = signer;
        this.cache = cache;
    }

    public async create(didDocument: DidDocument) {
        if (!this.signer) {
            throw new Error('DidRegistry needs a signer to have write access');
        }

        const didJson = didDocument.toJSON();

        const didUploadResult = await this.ipfs.add(didJson).next();
        const hash = didUploadResult.value.cid.toString();

        const IdentityRegistryContract = await this.getRegistryContract();

        const transaction = IdentityRegistryContract.connect(this.signer).setDidDocument(toUtf8Bytes(hash));

        if (this.cache) {
            // TODO: listen for events and update cache if entry changes
            this.cache.setDid(didDocument.getId(), didDocument);
        }

        return transaction;
    }

    public async read(did: string) {
        let address = did.split(':')[2];

        if (address.includes('?')) {
            address = address.split('?')[0];
        }

        if (address.includes('#')) {
            address = address.split('#')[0];
        }

        if (address.includes('/')) {
            address = address.split('/')[0];
        }

        // TODO: isAddress

        if (this.cache) {
            const cachedDid = this.cache.getDid(did);

            if (cachedDid) {
                return cachedDid;
            }
        }

        const IdentityRegistryContract = await this.getRegistryContract();

        const hash = toUtf8String(await IdentityRegistryContract.getDidDocument(address));

        if (hash === '0x' || hash === '') {
            return;
        }

        const didJsonParts = [];
        for await (const didJsonPart of this.ipfs.cat(hash)) { 
            didJsonParts.push(didJsonPart);
        }

        const didDocument = DidDocument.fromJSON(Buffer.concat(didJsonParts).toString());

        if (this.cache && didDocument) {
            // TODO: listen for events and update cache if entry changes
            this.cache.setDid(didDocument.getId(), didDocument);
        }

        return didDocument;
    }

    public async update(didDocument: DidDocument) {
        return this.create(didDocument);
    }

    public async deactivate() {
        if (!this.signer) {
            throw new Error('DidRegistry needs a signer to have write access');
        }

        const IdentityRegistryContract = await this.getRegistryContract();

        const transaction = IdentityRegistryContract.connect(this.signer).revokeDidDocument();

        if (this.cache) {
            this.cache.clearDid(`did:vinyai:${await this.signer.getAddress()}`);
        }

        return transaction;
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
