import {
    Block,
    BlockTag,
    BlockWithTransactions,
    EventType,
    Filter,
    Listener,
    Log,
    Provider as AbstractProvider,
    TransactionReceipt,
    TransactionRequest,
    TransactionResponse,
} from '@ethersproject/abstract-provider';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { Network } from '@ethersproject/networks';
import {
    prepareBlockParams,
    prepareBlockWithTransactionsParams,
    prepareTransactionReceiptParams,
    prepareTransactionResponseParams,
} from '../links/prepareParams';
import { transferTransactionRequest } from './transferParams';

class ProxyProvider extends AbstractProvider {

    protected proxyWeb3: any;

    constructor(proxyWeb3: any) {
        super();

        this.proxyWeb3 = proxyWeb3;
    }

    public async call(
        transaction: TransactionRequest,
        blockTag?: BlockTag | Promise<BlockTag>,
    ): Promise<string> {
        const transferTransaction = await transferTransactionRequest(transaction);

        return this.proxyWeb3({
            type: 'provider/CALL',
            payload: {
                transaction: transferTransaction,
                blockTag,
            },
        });
    }

    // TODO:
    public emit(eventName: EventType, ...args: Array<any>): boolean {
        return true;
    }

    public async estimateGas(transaction: TransactionRequest): Promise<BigNumber> {
        const transferTransaction = await transferTransactionRequest(transaction);

        const result = await this.proxyWeb3({
            type: 'provider/ESTIMATE_GAS',
            payload: {
                transaction: transferTransaction,
            },
        });

        return BigNumber.from(result);
    }

    public async getBalance(
        addressOrName: string | Promise<string>,
        blockTag?: BlockTag | Promise<BlockTag>,
    ): Promise<BigNumber> {
        const result = await this.proxyWeb3({
            type: 'provider/GET_BALANCE',
            payload: {
                addressOrName,
                blockTag,
            },
        });

        return BigNumber.from(result);
    }

    public async getBlock(
        blockHashOrBlockTag: BlockTag | string | Promise<BlockTag | string>,
        includeTransactions?: boolean,
    ): Promise<Block> {
        const result = await this.proxyWeb3({
            type: 'provider/GET_BLOCK',
            payload: {
                blockHashOrBlockTag,
                includeTransactions,
            },
        });

        return prepareBlockParams(result);
    }

    public async getBlockNumber(): Promise<number> {
        return this.proxyWeb3({
            type: 'provider/GET_BLOCK_NUMBER',
            payload: {},
        });
    }

    public async getBlockWithTransactions(
        blockHashOrBlockTag: BlockTag | string | Promise<BlockTag | string>,
    ): Promise<BlockWithTransactions> {
        const result = await this.proxyWeb3({
            type: 'provider/GET_BLOCK_WITH_TRANSACTIONS',
            payload: {
                blockHashOrBlockTag: await blockHashOrBlockTag,
            },
        });

        return prepareBlockWithTransactionsParams(result);
    }

    public async getCode(
        addressOrName: string | Promise<string>,
        blockTag?: BlockTag | Promise<BlockTag>,
    ): Promise<string> {
        return this.proxyWeb3({
            type: 'provider/GET_CODE',
            payload: {
                addressOrName,
                blockTag,
            },
        });
    }

    public async getGasPrice(): Promise<BigNumber> {
        const result = await this.proxyWeb3({
            type: 'provider/GET_GAS_PRICE',
            payload: {},
        });

        return BigNumber.from(result);
    }

    public async getLogs(filter: Filter): Promise<Log[]> {
        return this.proxyWeb3({
            type: 'provider/GET_LOGS',
            payload: {
                filter,
            },
        });
    }

    public async getNetwork(): Promise<Network> {
        return this.proxyWeb3({
            type: 'provider/GET_NETWORK',
            payload: {},
        });
    }

    public async getStorageAt(
        addressOrName: string | Promise<string>,
        position: BigNumberish | Promise<BigNumberish>,
        blockTag?: BlockTag | Promise<BlockTag>,
    ): Promise<string> {
        if (BigNumber.isBigNumber(await position)) {
            position = position.toString();
        }

        return this.proxyWeb3({
            type: 'provider/GET_STORAGE_AT',
            payload: {
                addressOrName,
                blockTag,
                position,
            },
        });
    }

    public async getTransaction(transactionHash: string): Promise<TransactionResponse> {
        const result = await this.proxyWeb3({
            type: 'provider/GET_TRANSACTION',
            payload: {
                transactionHash,
            },
        });

        return prepareTransactionResponseParams(result);
    }

    public async getTransactionCount(
        addressOrName: string | Promise<string>,
        blockTag?: BlockTag | Promise<BlockTag>,
    ): Promise<number> {
        return this.proxyWeb3({
            type: 'provider/GET_TRANSACTION_COUNT',
            payload: {
                addressOrName,
                blockTag,
            },
        });
    }

    public async getTransactionReceipt(transactionHash: string): Promise<TransactionReceipt> {
        const result = await this.proxyWeb3({
            type: 'provider/GET_TRANSACTION_RECEIPT',
            payload: {
                transactionHash,
            },
        });

        return prepareTransactionReceiptParams(result);
    }

    public listenerCount(eventName?: any) {
        return 0;
    }

    public listeners() {
        return [];
    }

    public async lookupAddress(address: string | Promise<string>): Promise<string> {
        return this.proxyWeb3({
            type: 'provider/LOOKUP_ADDRESS',
            payload: {
                address,
            },
        });
    }

    public off(eventName: EventType, listener?: Listener) {
        return this;
    }

    public on(eventName: any, listener: any) {
        return this;
    }

    public once(eventName: any, listener: any) {
        return this;
    }

    public removeAllListeners(eventName: any) {
        return this;
    }

    public removeListener(eventName: any, listener: any) {
        return this;
    }

    public async resolveName(name: string | Promise<string>): Promise<string> {
        return this.proxyWeb3({
            type: 'provider/RESOLVE_NAME',
            payload: {
                name,
            },
        });
    }

    public async sendTransaction(signedTransaction: string | Promise<string>): Promise<TransactionResponse> {
        const result = await this.proxyWeb3({
            type: 'provider/SEND_TRANSACTION',
            payload: {
                signedTransaction,
            },
        });

        return prepareTransactionResponseParams(result);
    }

    public async waitForTransaction(transactionHash: string, confirmations?: number): Promise<TransactionReceipt> {
        const result = await this.proxyWeb3({
            type: 'provider/WAIT_FOR_TRANSACTION',
            payload: {
                transactionHash,
                confirmations,
            },
        });

        return prepareTransactionReceiptParams(result);
    }

}

export default ProxyProvider;
