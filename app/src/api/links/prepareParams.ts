
import {
    Block,
    BlockWithTransactions,
    TransactionReceipt,
    TransactionRequest,
    TransactionResponse,
} from '@ethersproject/abstract-provider';
import { BigNumber } from '@ethersproject/bignumber';
import {
    ITransferableBlock,
    ITransferableBlockWithTransactions,
    ITransferableTransactionReceipt,
    ITransferableTransactionRequest,
    ITransferableTransactionResponse,
} from '../worker/transferParams';

export const prepareBlockParams = (
    block: ITransferableBlock,
): Block => {
    const result: Block = {
        ...block,
        gasLimit: BigNumber.from(block.gasLimit),
        gasUsed: BigNumber.from(block.gasUsed),
    };

    return result;
};

export const prepareBlockWithTransactionsParams = (
    block: ITransferableBlockWithTransactions,
): BlockWithTransactions => {
    const transactions: TransactionResponse[] = [];

    // TODO: check if for of is working
    for (const transaction of block.transactions) {
        transactions.push(prepareTransactionResponseParams(transaction));
    }

    const result: BlockWithTransactions = {
        ...block,
        gasLimit: BigNumber.from(block.gasLimit),
        gasUsed: BigNumber.from(block.gasUsed),
        transactions,
    };

    return result;
};

export const prepareTransactionReceiptParams = (
    transactionReceipt: ITransferableTransactionReceipt,
): TransactionReceipt => {
    const result: TransactionReceipt = {
        ...transactionReceipt,
        cumulativeGasUsed: BigNumber.from(transactionReceipt.cumulativeGasUsed),
        gasUsed: BigNumber.from(transactionReceipt.gasUsed),
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
        result.nonce = BigNumber.from(transactionRequest.nonce);
    }

    if (transactionRequest.gasLimit) {
        result.gasLimit = BigNumber.from(transactionRequest.gasLimit);
    }

    if (transactionRequest.gasPrice) {
        result.gasPrice = BigNumber.from(transactionRequest.gasPrice);
    }

    if (transactionRequest.value) {
        result.value = BigNumber.from(transactionRequest.value);
    }

    return result;
};

export const prepareTransactionResponseParams = (
    transactionResponse: ITransferableTransactionResponse,
): TransactionResponse => {
    const result: TransactionResponse = {
        ...transactionResponse,
        gasLimit: BigNumber.from(transactionResponse.gasLimit),
        gasPrice: BigNumber.from(transactionResponse.gasPrice),
        value: BigNumber.from(transactionResponse.value),
        wait: ((confirmations?: number): any => {
            return;
        }) as any,
    };

    return result;
};
