import {
    Block,
    TransactionReceipt,
    TransactionRequest,
    TransactionResponse,
} from 'ethers/providers/abstract-provider';
import { bigNumberify } from 'ethers/utils/bignumber';
import {
    ITransferableBlock,
    ITransferableTransactionReceipt,
    ITransferableTransactionRequest,
    ITransferableTransactionResponse,
} from '../worker/transferParams';

export const prepareBlockParams = (
    block: ITransferableBlock,
): Block => {
    const result: Block = {
        ...block,
        gasLimit: bigNumberify(block.gasLimit),
        gasUsed: bigNumberify(block.gasUsed),
    };

    return result;
};

export const prepareTransactionReceiptParams = (
    transactionReceipt: ITransferableTransactionReceipt,
): TransactionReceipt => {
    const result: TransactionReceipt = {
        ...transactionReceipt,
        cumulativeGasUsed: (transactionReceipt.cumulativeGasUsed) ?
            bigNumberify(transactionReceipt.cumulativeGasUsed) : undefined,
        gasUsed: (transactionReceipt.gasUsed) ?
            bigNumberify(transactionReceipt.gasUsed) : undefined,
    };

    return result;
};

export const prepareTransactionRequestParams = (
    transactionRequest: ITransferableTransactionRequest,
): TransactionRequest => {
    const result: TransactionRequest = {
        ...transactionRequest,
    };

    if (transactionRequest.nonce) {
        result.nonce = bigNumberify(transactionRequest.nonce);
    }

    if (transactionRequest.gasLimit) {
        result.gasLimit = bigNumberify(transactionRequest.gasLimit);
    }

    if (transactionRequest.gasPrice) {
        result.gasPrice = bigNumberify(transactionRequest.gasPrice);
    }

    if (transactionRequest.value) {
        result.value = bigNumberify(transactionRequest.value);
    }

    return result;
};

export const prepareTransactionResponseParams = (
    transactionResponse: ITransferableTransactionResponse,
): TransactionResponse => {
    const result: TransactionResponse = {
        ...transactionResponse,
        gasLimit: bigNumberify(transactionResponse.gasLimit),
        gasPrice: bigNumberify(transactionResponse.gasPrice),
        value: bigNumberify(transactionResponse.value),
        wait: ((confirmations?: number): any => {
            return;
        }) as any,
    };

    return result;
};
