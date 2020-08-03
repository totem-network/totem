import {
    Provider,
    TransactionRequest,
    TransactionResponse,
} from '@ethersproject/abstract-provider';
import { Signer as AbstractSigner } from '@ethersproject/abstract-signer';
import { Bytes } from '@ethersproject/bytes';
import { Deferrable, resolveProperties } from "@ethersproject/properties";
import { prepareTransactionResponseParams } from '../links/prepareParams';
import { transferTransactionRequest } from './transferParams';

class ProxySigner extends AbstractSigner {

    readonly provider: Provider;

    protected proxyWeb3: any;

    constructor(proxyWeb3: any, provider: Provider) {
        super();

        this.proxyWeb3 = proxyWeb3;
        this.provider = provider;
    }

    public async getAddress(): Promise<string> {
        return this.proxyWeb3({
            type: 'signer/GET_ADDRESS',
            payload: {},
        });
    }

    public async sendTransaction(transaction: TransactionRequest): Promise<TransactionResponse> {
        const transferTransaction = await transferTransactionRequest(transaction);

        const result = await this.proxyWeb3({
            type: 'signer/SEND_TRANSACTION',
            payload: {
                transaction: transferTransaction,
            },
        });

        return prepareTransactionResponseParams(result);
    }

    public async signMessage(message: Bytes | string): Promise<string> {
        return this.proxyWeb3({
            type: 'signer/SIGN_MESSAGE',
            payload: {
                message,
            },
        });
    }

    public async signTransaction(transaction: Deferrable<TransactionRequest>): Promise<string> {
        const resolvedTransaction = await resolveProperties(transaction);
        const transferTransaction = await transferTransactionRequest(resolvedTransaction);

        return this.proxyWeb3({
            type: 'signer/SIGN_TRANSACTION',
            payload: {
                transaction: transferTransaction,
            },
        });
    }

    public connect(provider: Provider): AbstractSigner {
        return new ProxySigner(this.proxyWeb3, provider);
    }

}

export default ProxySigner;
