/*import { providers, Signer } from 'ethers';
import { TransactionRequest, TransactionResponse } from 'ethers/providers/abstract-provider';
import { async } from 'q';

class MetaMaskSigner extends Signer {

    public provider: providers.BaseProvider;

    protected web3: any;

    constructor(web3: any) {
        super();

        if (!web3.isMetaMask) {
            throw new Error('Provide a MetaMask web3 instance');
        }

        this.web3 = web3;

        this.provider = new providers.Web3Provider(web3);
    }

    public async getAddress(): Promise<string> {
        return this.web3.selectAddress;
    }

    public async signMessage(message: string): Promise<string> {
        return '';
    }

    public async sendTransaction(transaction: TransactionRequest): Promise<TransactionResponse> {
        const params = [{
            data: transaction.data,
            from: transaction.from,
            gas: transaction.gasLimit,
            gasPrice: transaction.gasPrice,
            nonce: transaction.nonce,
            to: transaction.to,
            value: transaction.value,
        }];

        const transactionHash = await this.web3.sendAsync({
            from: transaction.from,
            method: 'eth_sendTransaction',
            params,
        });

        // if hash !== zero hash, else confirmations = 0, from = from

        const transactionData = await this.web3.sendAsync({
            method: 'eth_getTransactionByHash',
            params: [transactionHash],
        });

        if (!transactionData) {

        }

        const response = {
            blockNumber: transactionData.blockNumber,
            blockHash: transactionData.blockHash,
            timestamp,
            confirmations,
            from,
            raw,
            wait: async (confirmations: number) => {

            },
        };

        return response;
    }

}

export default MetaMaskSigner;*/
