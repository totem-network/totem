import {
    Block,
    Log,
    TransactionReceipt,
    TransactionRequest,
    TransactionResponse,
} from 'ethers/providers/abstract-provider';
import { BigNumber } from 'ethers/utils/bignumber';
import { Arrayish } from 'ethers/utils/bytes';
import { Network } from 'ethers/utils/networks';

export type TransferableBigNumberish = string | number | ArrayLike<number>;

export interface ITransferableBlock {
    hash: string;
    parentHash: string;
    number: number;
    timestamp: number;
    nonce: string;
    difficulty: number;
    gasLimit: string;
    gasUsed: string;
    miner: string;
    extraData: string;
    transactions: string[];
}

export interface ITransferableNetwork {
    name: string;
    chainId: number;
    ensAddress?: string;
}

export interface ITransferableTransactionReceipt {
    to?: string;
    from?: string;
    contractAddress?: string;
    transactionIndex?: number;
    root?: string;
    gasUsed?: string;
    logsBloom?: string;
    blockHash?: string;
    transactionHash?: string;
    logs?: Log[];
    blockNumber?: number;
    confirmations?: number;
    cumulativeGasUsed?: string;
    byzantium: boolean;
    status?: number;
}

export interface ITransferableTransactionRequest {
    to?: string;
    from?: string;
    nonce?: TransferableBigNumberish;
    gasLimit?: TransferableBigNumberish;
    gasPrice?: TransferableBigNumberish;
    data?: Arrayish;
    value?: TransferableBigNumberish;
    chainId?: number;
}

export interface ITransferableTransactionResponse {
    hash?: string;
    to?: string;
    from: string;
    nonce: number;
    gasLimit: string;
    gasPrice: string;
    data: string;
    value: string;
    chainId: number;
    r?: string;
    s?: string;
    v?: number;
    blockNumber?: number;
    blockHash?: string;
    timestamp?: number;
    confirmations: number;
    raw?: string;
    // TODO: wait handler with eventlisteners on worker side, when possible, otherwise proxy
    // wait: (confirmations?: number) => Promise<TransactionReceipt>;
}

export const transferBlock = async (
    block: Block,
): Promise<ITransferableBlock> => {
    const result: ITransferableBlock = {
        ...block,
        gasLimit: block.gasLimit.toString(),
        gasUsed: block.gasUsed.toString(),
    };

    return result;
};

export const transferNetwork = async (
    network: Network,
): Promise<ITransferableNetwork> => {
    const result: ITransferableNetwork = {
        name: network.name,
        chainId: network.chainId,
        ensAddress: network.ensAddress,
    };

    return result;
};

export const transferTransactionReceipt = async (
    transactionReceipt: TransactionReceipt,
): Promise<ITransferableTransactionReceipt> => {
    const result: ITransferableTransactionReceipt = {
        ...transactionReceipt,
        cumulativeGasUsed: (transactionReceipt.cumulativeGasUsed) ?
            transactionReceipt.cumulativeGasUsed.toString() : undefined,
        gasUsed: (transactionReceipt.gasUsed) ?
            transactionReceipt.gasUsed.toString() : undefined,
    };

    return result;
};

export const transferTransactionRequest = async (
    transaction: TransactionRequest,
): Promise<ITransferableTransactionRequest> => {
    const result: ITransferableTransactionRequest = {};

    if (transaction.to) {
        result.to = await transaction.to;
    }

    if (transaction.from) {
        result.from = await transaction.from;
    }

    if (transaction.nonce) {
        transaction.nonce = await transaction.nonce;

        result.nonce = BigNumber.isBigNumber(transaction.nonce) ?
            transaction.nonce.toString() : transaction.nonce;
    }

    if (transaction.gasPrice) {
        transaction.gasPrice = await transaction.gasPrice;

        result.gasPrice = BigNumber.isBigNumber(transaction.gasPrice) ?
            transaction.gasPrice.toString() : transaction.gasPrice;
    }

    if (transaction.gasLimit) {
        transaction.gasLimit = await transaction.gasLimit;

        result.gasLimit = BigNumber.isBigNumber(transaction.gasLimit) ?
            transaction.gasLimit.toString() : transaction.gasLimit;
    }

    if (transaction.data) {
        result.data = await transaction.data;
    }

    if (transaction.value) {
        transaction.value = await transaction.value;

        result.value = BigNumber.isBigNumber(transaction.value) ?
            transaction.value.toString() : transaction.value;
    }

    if (transaction.chainId) {
        result.chainId = await transaction.chainId;
    }

    return result;
};

export const transferTransactionResponse = async (
    transactionResponse: TransactionResponse,
): Promise<ITransferableTransactionResponse> => {
    const result: ITransferableTransactionResponse = {
        hash: transactionResponse.hash,
        to: transactionResponse.to,
        from: transactionResponse.from,
        nonce: transactionResponse.nonce,
        gasLimit: transactionResponse.gasLimit.toString(),
        gasPrice: transactionResponse.gasPrice.toString(),
        data: transactionResponse.data,
        value: transactionResponse.value.toString(),
        chainId: transactionResponse.chainId,
        r: transactionResponse.r,
        s: transactionResponse.s,
        v: transactionResponse.v,
        blockNumber: transactionResponse.blockNumber,
        blockHash: transactionResponse.blockHash,
        timestamp: transactionResponse.timestamp,
        confirmations: transactionResponse.confirmations,
        raw: transactionResponse.raw,
    };

    return result;
};
