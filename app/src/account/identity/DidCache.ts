import DidDocument from './DidDocument';

interface ICacheDocuments {
    [key: string]: DidDocument;
}

export class DidCache {

    protected cache: ICacheDocuments;

    constructor() {
        this.cache = {};
    }

    // TODO: optional expire
    public setDid(did: string, didDocument: DidDocument) {
        this.cache[did] = didDocument;
    }

    public getDid(did: string) {
        return this.cache[did];
    }

    public clearDid(did: string) {
        delete this.cache[did];
    }

}

export default new DidCache();
