import { providers } from 'ethers';

// TODO: a provider that request signed messages from every key need for a specific transaction
// example: Transactions over 100$ needs to be signed by metamask, over 1000$ by ledger
// gnosis multisig handles rules on blockchain, provider automatically asks for all needed to sign
// handles GSN too

class MultiSignatureProvider extends providers.BaseProvider {

    protected readonly provider: providers.BaseProvider;

    constructor(provider: providers.BaseProvider) {
        super(provider.getNetwork());

        this.provider = provider;
    }

    // This should return a Promise (and may throw erros)
    // method is the method name (e.g. getBalance) and params is an
    // object with normalized values passed in, depending on the method
    public async perform(method: any, params: any): Promise<any> {
        return this.provider.perform(method, params).then((result) => {
            // console.log('DEBUG', method, params, '=>', result);
        }, (error) => {
            // console.log('DEBUG:ERROR', method, params, '=>', error);
            throw error;
        });
    }
}

export default MultiSignatureProvider;
