import { Signer as AbstractSigner } from 'ethers/abstract-signer';
import {
    Provider,
    TransactionRequest,
    TransactionResponse,
} from 'ethers/providers/abstract-provider';
import { Arrayish } from 'ethers/utils/bytes';
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

    public async signMessage(message: Arrayish | string): Promise<string> {
        return this.proxyWeb3({
            type: 'signer/SIGN_MESSAGE',
            payload: {
                message,
            },
        });
    }

}

export default ProxySigner;
